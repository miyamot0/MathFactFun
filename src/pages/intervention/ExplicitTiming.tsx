/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer, useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import { timestamp } from "../../firebase/config";
import Modal from "react-modal";

// hooks
import { useFirestore } from "../../firebase/hooks/useFirestore";
import { useFirebaseDocumentTyped } from "../../firebase/hooks/useFirebaseDocument";
import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";

// widgets
import KeyPad from "./subcomponents/KeyPad";
import Timer from "./subcomponents/Timer";
import SimpleProblemFrame from "./subcomponents/SimpleProblemFrame";

// helpers
import {
  CalculateDigitsTotalAnswer,
  CalculateDigitsCorrectAnswer,
  GetOperatorFromLabel,
} from "../../utilities/LabelHelper";

import { RoutedIdTargetParam } from "../../interfaces/RoutingInterfaces";
import {
  InterventionActions,
  DelCode,
  InitialInterventionState,
  InterventionReducer,
  SharedActionSequence,
} from "./functionality/InterventionBehavior";

// styles
import "./styles/ExplicitTiming.css";
import { ErrorModalCustomStyle } from "./subcomponents/ModalStyles";
import { InterventionFormat, RelevantKeys } from "../../maths/Facts";
import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";
import {
  shouldShowFeedback,
  useEventListener,
} from "./helpers/InterventionHelpers";
import { FactDataInterface } from "../setcreator/interfaces/SetCreatorInterfaces";
import {
  commonKeyHandler,
  commonKeyListener,
  completeLoadingDispatch,
} from "./helpers/DispatchingHelpers";
import { submitPerformancesToFirebase } from "./helpers/InterventionHelpers";

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
    InitialInterventionState
  );

  const [modalIsOpen, setIsOpen] = useState(false);

  Modal.setAppElement("#root");

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  // Add event listener to hook
  useEventListener("keydown", (key: React.KeyboardEvent<HTMLElement>) => {
    commonKeyListener(
      key,
      state,
      InterventionFormat.ExplicitTiming,
      captureButtonAction,
      null,
      null,
      dispatch
    );
  });

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && !state.LoadedData) {
      completeLoadingDispatch({
        intervention: InterventionFormat.CoverCopyCompare,
        workingData: document.factsTargeted,
        operatorSymbol: GetOperatorFromLabel(document.currentTarget),
        secondsLeft: document.minForTask * 60,
        dispatch,
      });
    }
  }, [document, state.LoadedData, state.OperatorSymbol]);

  /** callbackToSubmit
   *
   * Caller, linked to submission to firebase
   *
   */
  function callbackToSubmit() {
    submitPerformancesToFirebase({
      user,
      id,
      interventionFormat: InterventionFormat.ExplicitTiming,
      finalFactObject: null,
      document,
      state,
      response,
      addDocument,
      updateDocument,
      history,
    });
  }

  /** captureButtonAction
   *
   * Button interactions to fire
   *
   */
  function captureButtonAction(): void {
    if (document === null) {
      return;
    }

    if (
      state.CurrentAction === SharedActionSequence.Start ||
      state.CurrentAction === SharedActionSequence.Begin
    ) {
      const listItem = state.WorkingData[0];

      const updatedList = state.WorkingData.filter(function (item) {
        return item !== listItem;
      });

      dispatch({
        type: InterventionActions.BenchmarkBatchStartBegin,
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
    const secs = (current.getTime() - state.PreTrialTime.getTime()) / 1000;

    const holderPreTime = state.PreTrialTime;

    if (shouldShowFeedback(!isMatching, document)) {
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
        factType: document.currentTarget,
        factString: state.ViewRepresentationInternal,
        factEntry: combinedResponse,
        latencySeconds: secs,
        dateTimeEnd: timestamp.fromDate(new Date(current)),
        dateTimeStart: timestamp.fromDate(new Date(holderPreTime)),
      };

      dispatch({
        type: InterventionActions.ExplicitTimingBatchIncrement,
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

      dispatch({
        type: InterventionActions.ExplicitTimingModalPreErrorLog,
        payload: {
          uFactModel: [...state.FactModelList, currentItem2],
        },
      });

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
        factType: document.currentTarget,
        factString: state.ViewRepresentationInternal,
        factEntry: combinedResponse,
        latencySeconds: secs,
        dateTimeEnd: timestamp.fromDate(new Date(current)),
        dateTimeStart: timestamp.fromDate(new Date(holderPreTime)),
      };

      dispatch({
        type: InterventionActions.ExplicitTimingBatchIncrement,
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
      if (state.WorkingData.length === 0) {
        submitPerformancesToFirebase({
          user,
          id,
          interventionFormat: InterventionFormat.CoverCopyCompare,
          finalFactObject: currentItem2,
          document,

          state,
          response,
          addDocument,
          updateDocument,
          history,
        });
      } else {
        const listItem = state.WorkingData[0];
        const updatedList = state.WorkingData.filter(function (item) {
          return item !== listItem;
        });

        dispatch({
          type: InterventionActions.BenchmarkBatchStartIncrementPost,
          payload: {
            uFactModel: [...state.FactModelList, currentItem2],
            uWorkingData: updatedList,
            uView: listItem.split(":")[0],
            uEntry: "",
          },
        });
      }
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
        ariaHideApp={!(process.env.NODE_ENV === "test")}
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
              type: InterventionActions.ExplicitTimingModalRetry,
              payload: {
                uEntryRepresentationInternal: "",
                uNumRetries: state.NumRetries + 1,
                uOnInitialTry: false,
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
              startTimerTime={state.StartTime}
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
          callBackFunction={(key: string) => {
            commonKeyHandler(
              InterventionFormat.ExplicitTiming,
              key,
              state,
              dispatch
            );
          }}
          operatorSymbol={state.OperatorSymbol}
          showEquals={false}
        />
      </div>
    </div>
  );
}
