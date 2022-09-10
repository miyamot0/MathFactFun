/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Explicit Timing intervention
 */

import React, { useReducer, useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import { timestamp } from "../../firebase/config";
import Modal from "react-modal";

// hooks
import { useFirestore } from "../../firebase/useFirestore";
import { useFirebaseDocumentTyped } from "../../firebase/useFirebaseDocument";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";

// widgets
import KeyPad from "./subcomponents/KeyPad";
import Timer from "./subcomponents/Timer";
import SimpleProblemFrame from "./subcomponents/SimpleProblemFrame";

// helpers
import {
  CalculateDigitsTotalAnswer,
  CalculateDigitsCorrectAnswer,
} from "../../utilities/LabelHelper";

import { DetermineErrorCorrection } from "../../utilities/InterventionHelper";

import { RoutedIdTargetParam } from "../../utilities/RoutingHelpers";
import {
  BenchmarkActions,
  SharedActionSequence,
} from "./types/InterventionTypes";
import {
  DelCode,
  InitialBenchmarkState,
  InterventionReducer,
  keyHandler,
  useEventListener,
} from "./functionality/InterventionBehavior";

// styles
import "./ExplicitTiming.css";
import { ErrorModalCustomStyle } from "./subcomponents/ModalStyles";
import { InterventionFormat } from "../../maths/Facts";
import { StudentDataInterface } from "../student/types/StudentTypes";
import { FactDataInterface } from "../setcreator/types/SetCreatorTypes";

Modal.setAppElement("#root");

export default function ExplicitTiming() {
  const { id, target } = useParams<RoutedIdTargetParam>();
  const { user } = useAuthorizationContext();
  const history = useHistory();

  const { document } = useFirebaseDocumentTyped<StudentDataInterface>({
    collectionString: "students",
    idString: id,
  });
  const { addDocument, response } = useFirestore("", target, id);
  const { updateDocument } = useFirestore("students", undefined, undefined);

  const [state, dispatch] = useReducer(
    InterventionReducer,
    InitialBenchmarkState
  );

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  // Add event listener to hook
  useEventListener("keydown", (key) =>
    keyHandler(key, captureKeyClick, captureButtonAction, state.CurrentAction)
  );

  /** shouldShowFeedback
   *
   * Handle branching logic for error message
   *
   * @param {boolean} trialError was there an error?
   * @returns {boolean}
   */
  function shouldShowFeedback(trialError: boolean): boolean {
    return DetermineErrorCorrection(
      trialError,
      document!.currentErrorApproach!
    );
  }

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && !state.LoadedData) {
      dispatch({
        type: BenchmarkActions.ExplicitTimingBatchStartPreflight,
        payload: {
          uWorkingData: document.factsTargeted,
          uTimer: document.minForTask! * 60,
          uLoadedData: true,
        },
      });
    }
  }, [document, state.LoadedData, state.OperatorSymbol]);

  /** callbackToSubmit
   *
   * Caller, linked to submission to firebase
   *
   */
  function callbackToSubmit() {
    submitDataToFirebase(null);
  }

  /** submitDataToFirebase
   *
   * Push data to server
   *
   * @param {FactDataInterface} finalFactObject final item completed
   */
  async function submitDataToFirebase(
    finalFactObject: FactDataInterface | null
  ): Promise<void> {
    const finalEntries = state.FactModelList;

    if (finalFactObject !== null) {
      finalEntries?.push(finalFactObject);
    }

    const end = new Date();

    const uploadObject = {
      correctDigits: state.TotalDigitsCorrect,
      errCount: state.NumErrors,
      nCorrectInitial: state.NumCorrectInitial,
      nRetries: state.NumRetries,
      sessionDuration: (end.getTime() - state.StartTime!.getTime()) / 1000,
      setSize: document!.factsTargeted.length,
      totalDigits: state.TotalDigits,
      entries: finalEntries.map((entry) => Object.assign({}, entry)),
      id: document!.id,
      creator: user!.uid,
      target: document!.currentTarget,
      method: InterventionFormat.ExplicitTiming,
      dateTimeEnd: end.toString(),
      dateTimeStart: state.StartTime!.toString(),
      createdAd: timestamp.fromDate(new Date()),
    };

    await addDocument(uploadObject);

    // If added without issue, update timestamp
    if (!response.error) {
      const currentDate = new Date();
      const studentObject = {
        lastActivity: timestamp.fromDate(currentDate),
      };

      // Update field regarding last activity
      await updateDocument(id!, studentObject);

      // Push to home
      if (!response.error) {
        history.push(`/practice`);
      }
    }
  }

  /** captureButtonAction
   *
   * Button interactions to fire
   *
   */
  function captureButtonAction(): void {
    if (
      state.CurrentAction === SharedActionSequence.Start ||
      state.CurrentAction === SharedActionSequence.Begin
    ) {
      const listItem = state.WorkingData![0];

      const updatedList = state.WorkingData!.filter(function (item) {
        return item !== listItem;
      });

      dispatch({
        type: BenchmarkActions.BenchmarkBatchStartBegin,
        payload: {
          ButtonText: "Check",
          CoverProblem: false,
          UpdateEntry: "",
          UpdateView: listItem.split(":")[0],
          WorkingData: updatedList,
          StartTime: state.StartTime === null ? new Date() : state.StartTime,
          TrialTime: new Date(),
          CurrentAction: SharedActionSequence.Answer,
        },
      });

      return;
    }

    const combinedResponse =
      state.ViewRepresentationInternal.split("=")[0] +
      "=" +
      state.EntryRepresentationInternal;

    // Compare if internal and inputted string match
    const isMatching =
      state.ViewRepresentationInternal.trim() === combinedResponse.trim();

    let uNumberCorrectInitial = state.NumCorrectInitial;
    let uNumberErrors = state.NumErrors;

    // Increment initial attempt, if correct
    if (state.OnInitialTry && isMatching) {
      uNumberCorrectInitial = uNumberCorrectInitial + 1;
    }

    // Increment errors, if incorrect
    if (!isMatching) {
      uNumberErrors = state.NumErrors + 1;
    }

    const current = new Date();
    const secs = (current.getTime() - state.PreTrialTime!.getTime()) / 1000;

    const holderPreTime = state.PreTrialTime;

    if (shouldShowFeedback(!isMatching)) {
      openModal();
    } else {
      const totalDigitsShown = CalculateDigitsTotalAnswer(
        state.ViewRepresentationInternal
      );

      const totalDigitsCorrect = CalculateDigitsCorrectAnswer(
        combinedResponse,
        state.ViewRepresentationInternal
      );

      const currentItem2: FactDataInterface = {
        factCorrect: isMatching,
        initialTry: state.OnInitialTry,
        factType: document!.currentTarget,
        factString: state.ViewRepresentationInternal,
        factEntry: combinedResponse,
        latencySeconds: secs,
        dateTimeEnd: timestamp.fromDate(new Date(current)),
        dateTimeStart: timestamp.fromDate(new Date(holderPreTime!)),
      };

      dispatch({
        type: BenchmarkActions.ExplicitTimingBatchIncrement,
        payload: {
          uNumberCorrectInitial,
          uNumberErrors,
          uTotalDigits: state.TotalDigits + totalDigitsShown,
          uTotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
          uNumberTrials: state.NumbTrials + 1,
          uInitialTry: state.OnInitialTry,
          uTrialTime: new Date(),
        },
      });

      // Note: issue where state change not fast enough to catch latest
      if (state.WorkingData!.length === 0) {
        // If finished, upload list w/ latest item
        submitDataToFirebase(currentItem2);
      } else {
        const listItem = state.WorkingData![0];
        const updatedList = state.WorkingData!.filter(function (item) {
          return item !== listItem;
        });

        dispatch({
          type: BenchmarkActions.BenchmarkBatchStartIncrementPost,
          payload: {
            uFactModel: [...state.FactModelList!, currentItem2],
            uWorkingData: updatedList,
            uView: listItem.split(":")[0],
            uEntry: "",
          },
        });
      }
    }
  }

  /** captureKeyClick
   *
   * Process incoming key
   *
   * @param {string} char
   */
  function captureKeyClick(char: string): void {
    // Processing add/remove of character
    if (char === DelCode) {
      // # Rule #7: Exit out if nothin to delete
      if (state.EntryRepresentationInternal.length === 0) return;

      // Lop off end of string
      dispatch({
        type: BenchmarkActions.GeneralUpdateEntry,
        payload: state.EntryRepresentationInternal.slice(0, -1),
      });
    } else {
      // Add to end of string
      dispatch({
        type: BenchmarkActions.GeneralUpdateEntry,
        payload: state.EntryRepresentationInternal + char,
      });
    }
  }

  return (
    <div className="wrapperET">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        preventScroll={true}
        style={ErrorModalCustomStyle}
        contentLabel="Example Modal"
      >
        <h2 style={{ color: "#5F686D" }}>Double-check your math!</h2>
        <div
          style={{ marginTop: "25px", marginBottom: "25px", color: "#939391" }}
        >
          Close this window, and then try again.
        </div>
        <button
          className="global-btn "
          style={{ float: "right" }}
          onClick={() => {
            dispatch({
              type: BenchmarkActions.ExplicitTimingModalRetry,
              payload: {
                EntryRepresentationInternal: "",
                NumRetries: state.NumRetries + 1,
              },
            });

            closeModal();
          }}
        >
          Close Window
        </button>
      </Modal>
      <div className="topBoxET">
        <h2 style={{ display: "inline-block" }}>
          Explicit Timing: ({document ? document.name : <></>}), Time:{" "}
          {document ? (
            <Timer
              secondsTotal={state.SecondsLeft}
              startTimerTime={state.StartTime!}
              callbackFunction={callbackToSubmit}
            />
          ) : (
            <></>
          )}
        </h2>
      </div>
      <div
        className="box2ET"
        style={{
          opacity: state.CoverProblemItem ? 0.5 : 1,
          backgroundColor: state.CoverProblemItem ? "gray" : "transparent",
        }}
      >
        <SimpleProblemFrame
          problemStem={state.ViewRepresentationInternal}
          coverProblemSpace={state.CoverProblemItem}
          entryString={state.EntryRepresentationInternal}
        />
      </div>
      <div className="box3ET">
        <section>
          <button className="global-btn " onClick={() => captureButtonAction()}>
            {state.ButtonText}
          </button>
        </section>
      </div>

      <div
        className="box5ET"
        style={{
          opacity: state.CoverProblemItem ? 0.5 : 1,
        }}
      >
        <KeyPad
          callBackFunction={captureKeyClick}
          operatorSymbol={state.OperatorSymbol}
          showEquals={false}
        />
      </div>
    </div>
  );
}
