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

import React, { useReducer } from "react";

import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { timestamp } from "../../firebase/config";
import Modal from "react-modal";

// hooks
import { useFirestore } from "../../firebase/useFirestore";
import { useFirebaseDocumentTyped } from "../../firebase/useFirebaseDocument";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";

// widgets
import KeyPad from "./KeyPad";
import Timer from "./subcomponents/Timer";
import SimpleProblemFrame from "./SimpleProblemFrame";

// helpers
import {
  CalculateDigitsTotalAnswer,
  CalculateDigitsCorrectAnswer,
} from "../../utilities/LabelHelper";
import { RelevantKeys, InterventionFormat } from "../../maths/Facts";

import { DetermineErrorCorrection } from "../../utilities/Logic";
import {
  PerformanceModel,
  PerformanceModelInterface,
} from "../../models/PerformanceModel";
import {
  FactEntryModel,
  FactModelInterface,
} from "../../models/FactEntryModel";

// styles
import "./ExplicitTiming.css";
import {
  PerformanceDataInterface,
  StudentDataInterface,
} from "../../firebase/types/GeneralTypes";
import { RoutedIdTargetParam } from "../CommonTypes/CommonPageTypes";
import { BenchmarkActions, SharedActionSequence } from "./types/InterventionTypes";
import { InitialBenchmarkState, InterventionReducer, useEventListener } from "./functionality/InterventionBehavior";

const DelCode = "Del";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function ExplicitTiming() {
  const { id, target } = useParams<RoutedIdTargetParam>();
  const { user } = useAuthorizationContext();
  const history = useHistory();

  const { document } = useFirebaseDocumentTyped<StudentDataInterface>(
    {
      collectionString: "students",
      idString: id
    });
  const { addDocument2, response } = useFirestore("", target, id);
  const { updateDocument } = useFirestore("students", undefined, undefined);

  const [state, dispatch] = useReducer(InterventionReducer, InitialBenchmarkState);

  //const [currentAction, setCurrentAction] = useState(SharedActionSequence.Start);
  //const [buttonText, setButtonText] = useState("Start");
  //const [isOnInitialTry, setIsOnInitialTry] = useState(true);

  // quants
  //const [numberCorrectInitial, setNumberCorrectInitial] = useState(0);
  //const [numberErrors, setNumberErrors] = useState(0);
  //const [totalDigits, setTotalDigits] = useState(0);
  //const [totalCorrectDigits, setCorrectTotalDigits] = useState(0);
  //const [numberTrials, setNumberTrials] = useState(0);
  //const [nRetries, setNRetries] = useState(0);

  //const [loadedData, setLoadedData] = useState(false);
  //const [workingData, setWorkingData] = useState<string[]>();
  //const [operatorSymbol, setOperatorSymbol] = useState("");

  //const [coverProblemItem, setCoverProblemItem] = useState(true);

  //const [preTrialTime, setPreTrialTime] = useState<Date>();
  //const [startTime, setStartTime] = useState<Date>();
  //const [factModelList, setModelList] = useState<FactModelInterface[]>();

  //const [viewRepresentationInternal, setViewRepresentationInternal] =
  //  useState("");
  //const [entryRepresentationInternal, setEntryRepresentationInternal] =
  //  useState("");

  /// modal stuff
  //const [modalIsOpen, setIsOpen] = useState(false);

  // Timer Stuff
  //const [secondsLeft, setSecondsLeft] = useState(0);

  /** keyHandler
   *
   * Handle keyboard input
   *
   * @param {React.KeyboardEvent<HTMLElement>} key keyevent
   */
  function keyHandler(key: React.KeyboardEvent<HTMLElement>): void {
    if (key.key === "Enter") return;

    if (RelevantKeys.includes(key.key)) {
      let modKey = key.key === "Backspace" ? "Del" : key.key;
      modKey = key.key === "Delete" ? "Del" : modKey;

      if (modKey === " ") {
        if (state.CurrentAction !== SharedActionSequence.Entry) {
          captureButtonAction();
          return;
        }

        return;
      }

      captureKeyClick(modKey);
    }
  }

  // Add event listener to hook
  useEventListener("keydown", keyHandler);

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
      (document as StudentDataInterface).currentErrorApproach!
    );
  }

  //function openModal(): void {
  //  setIsOpen(true);
  //}

  //function closeModal(): void {
  //  setIsOpen(false);
  //}

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
    let finalEntries = state.FactModelList;

    if (finalFactObject !== null) {
      finalEntries?.push(finalFactObject);
    }

    const end = new Date();

    let performanceInformation: PerformanceModelInterface = PerformanceModel();

    const uploadObject = {
      correctDigits: state.TotalDigitsCorrect,
      errCount: state.NumErrors,
      nCorrectInitial: state.NumCorrectInitial,
      nRetries: 0,
      sessionDuration: (end.getTime() - state.StartTime!.getTime()) / 1000,
      setSize: document!.factsTargeted.length,
      totalDigits: state.TotalDigits,
      entries: finalEntries.map((entry) => Object.assign({}, entry)),
      id: document!.id,
      creator: user!.uid,
      target: document!.currentTarget,
      method: "Benchmark",
      dateTimeEnd: end.toString(),
      dateTimeStart: state.StartTime!.toString(),
      createdAd: timestamp.fromDate(new Date()),
    };

    /*
    HACK
    // Strings
    performanceInformation.data.id = ;
    performanceInformation.data.creator = ;
    performanceInformation.data.target = (
      document as StudentDataInterface
    ).currentTarget;
    performanceInformation.data.method = InterventionFormat.ExplicitTiming;

    // Numerics
    performanceInformation.data.correctDigits = totalCorrectDigits;
    performanceInformation.data.errCount = numberErrors;
    performanceInformation.data.nCorrectInitial = numberCorrectInitial;
    performanceInformation.data.nRetries = nRetries;
    performanceInformation.data.sessionDuration =
      (end.getTime() - startTime!.getTime()) / 1000;
    performanceInformation.data.setSize = (
      document as StudentDataInterface
    ).factsTargeted.length;
    performanceInformation.data.totalDigits = totalDigits;

    // Timestamps
    performanceInformation.data.createdAt = timestamp.fromDate(new Date());
    performanceInformation.data.dateTimeEnd = end.toString();
    performanceInformation.data.dateTimeStart = startTime!.toString();

    // Arrays
    performanceInformation.data.entries = finalEntries!;
    */

    // Sanity check for all required components

    //if (!performanceInformation.CheckObject()) {
    //  alert("Firebase data was not well-formed");
    //  return;
    //}

    //const objectToSend: PerformanceDataInterface =
    //  performanceInformation.SubmitObject();

    // Update collection with latest performance
    //await addDocument(objectToSend);
    await addDocument2(uploadObject);

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
    let isMatching =
      state.ViewRepresentationInternal.trim() === combinedResponse.trim();

    // Increment initial attempt, if correct
    if (state.OnInitialTry && isMatching) {
      setNumberCorrectInitial(state.NumCorrectInitial + 1);
    }

    // Increment errors, if incorrect
    if (!isMatching) {
      setNumberErrors(state.NumErrors + 1);
    }

    var current = new Date();
    let secs = (current.getTime() - state.PreTrialTime!.getTime()) / 1000;

    let holderPreTime = state.PreTrialTime;

    // Update time for trial
    setPreTrialTime(new Date());

    if (shouldShowFeedback(!isMatching)) {
      // Error correction prompt

      openModal();
    } else {
      let totalDigitsShown = CalculateDigitsTotalAnswer(
        state.ViewRepresentationInternal
      );

      setTotalDigits(state.TotalDigits + totalDigitsShown);

      let totalDigitsCorrect = CalculateDigitsCorrectAnswer(
        combinedResponse,
        state.ViewRepresentationInternal
      );

      setCorrectTotalDigits(state.TotalDigitsCorrect + totalDigitsCorrect);

      setNumberTrials(state.NumbTrials + 1);

      let currentItem: FactModelInterface = FactEntryModel();
      /*
      HACK
      currentItem.data.factCorrect = isMatching;
      currentItem.data.initialTry = isOnInitialTry;

      currentItem.data.factType = (
        document as StudentDataInterface
      ).currentTarget;
      currentItem.data.factString = viewRepresentationInternal;
      currentItem.data.factEntry = combinedResponse;

      currentItem.data.latencySeconds = secs;

      currentItem.data.dateTimeEnd = timestamp.fromDate(new Date(current));
      currentItem.data.dateTimeStart = timestamp.fromDate(
        new Date(holderPreTime!)
      );
      */

      setIsOnInitialTry(true);

      // Note: issue where state change not fast enough to catch latest
      if (state.WorkingData!.length === 0) {
        // If finished, upload list w/ latest item
        submitDataToFirebase(currentItem);
      } else {
        // Otherise, add it to the existing list
        setModelList([...factModelList!, currentItem]);

        const listItem = state.WorkingData![0];

        const updatedList = state.WorkingData!.filter(function (item) {
          return item !== listItem;
        });

        // Update the collection--remove current item from list
        setWorkingData(updatedList);

        // Set the 'true' item, less set-level coding component
        setViewRepresentationInternal(listItem.split(":")[0]);

        // Set the 'true' item, less set-level coding component
        setEntryRepresentationInternal("");
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
      setEntryRepresentationInternal(state.EntryRepresentationInternal.slice(0, -1));
    } else {
      // Add to end of string
      setEntryRepresentationInternal(state.EntryRepresentationInternal + char);
    }
  }

  return (
    <div className="wrapperET">
      <Modal
        isOpen={state.ModalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        preventScroll={true}
        style={customStyles}
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
            setEntryRepresentationInternal("");
            setNRetries(state.NumRetries + 1);
            closeModal();
          }}
        >
          Close Window
        </button>
      </Modal>
      <div className="topBoxET">
        <h2 style={{ display: "inline-block" }}>
          Explicit Timing: (
          {document ? (document as StudentDataInterface).name : <></>}), Time:{" "}
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
