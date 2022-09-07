/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Taped Problems intervention
 */

import React from "react";

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
import SimpleProblemFrame from "./SimpleProblemFrame";
import TimerButton from "./subcomponents/TimerButton";

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
import "./TapedProblems.css";
import {
  PerformanceDataInterface,
  StudentDataInterface,
} from "../../firebase/types/GeneralTypes";

const ActionSequence = {
  Start: "ActionSequence.Start",
  Answer: "ActionSequence.Answer",
  Entry: "ActionSequence.Entry",
  Begin: "ActionSequence.Begin",
};

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

interface RoutedStudentSet {
  id?: string;
  target?: string;
}

export default function TapedProblems() {
  const { id, target } = useParams<RoutedStudentSet>();
  const { user } = useAuthorizationContext();
  const history = useHistory();

  const { document } = useFirebaseDocumentTyped<StudentDataInterface>(
    {
      collectionString: "students",
      idString: id
    });
  const { addDocument, response } = useFirestore("", target, id);
  const { updateDocument } = useFirestore("students", undefined, undefined);

  const [currentAction, setCurrentAction] = useState(ActionSequence.Start);
  const [buttonText, setButtonText] = useState("Start");
  const [isOnInitialTry, setIsOnInitialTry] = useState(true);

  // quants
  const [numberCorrectInitial, setNumberCorrectInitial] = useState(0);
  const [numberErrors, setNumberErrors] = useState(0);
  const [totalDigits, setTotalDigits] = useState(0);
  const [totalCorrectDigits, setCorrectTotalDigits] = useState(0);
  const [numberTrials, setNumberTrials] = useState(0);
  const [nRetries, setNRetries] = useState(0);

  const [loadedData, setLoadedData] = useState(false);
  const [workingData, setWorkingData] = useState<string[]>();
  const [operatorSymbol, setOperatorSymbol] = useState("");

  const [coverProblemItem, setCoverProblemItem] = useState(true);

  const [preTrialTime, setPreTrialTime] = useState<Date>();
  const [startTime, setStartTime] = useState<Date>();
  const [factModelList, setModelList] = useState<FactModelInterface[]>();

  const [viewRepresentationInternal, setViewRepresentationInternal] =
    useState("");
  const [entryRepresentationInternal, setEntryRepresentationInternal] =
    useState("");

  /// modal stuff
  const [modalIsOpen, setIsOpen] = useState(false);

  // Timer Stuff
  const [secondsLeft, setSecondsLeft] = useState(0);

  /** useEventListener
   *
   * listener for events
   *
   * @param {string} eventName ...
   * @param {(key: React.KeyboardEvent<HTMLElement>) => void} handler ...
   * @param {Window} element ...
   */
  function useEventListener(
    eventName: string,
    handler: (key: React.KeyboardEvent<HTMLElement>) => void,
    element: Window = window
  ): void {
    const savedHandler = useRef({});
    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);
    useEffect(
      () => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event: any) => {
          if (typeof savedHandler.current === "function") {
            savedHandler.current(event);
          }
        };

        element.addEventListener(eventName, eventListener);

        return () => {
          element.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, element] // Re-run if eventName or element changes
    );
  }

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
        if (currentAction !== ActionSequence.Entry) {
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

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && !loadedData) {
      // Establish working set
      setWorkingData((document as StudentDataInterface).factsTargeted!);
      setSecondsLeft((document as StudentDataInterface).minForTask! * 60);

      // Flag that data is loaded
      setLoadedData(true);
    }
  }, [document, loadedData, setLoadedData, operatorSymbol, setOperatorSymbol]);

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
   * @param {FactModelInterface} finalFactObject final item completed
   */
  async function submitDataToFirebase(
    finalFactObject: FactModelInterface | null
  ): Promise<void> {
    let finalEntries = factModelList;

    if (finalFactObject !== null) {
      finalEntries?.push(finalFactObject);
    }

    const end = new Date();

    let performanceInformation: PerformanceModelInterface = PerformanceModel();

    /*
    HACK
    // Strings
    performanceInformation.data.id = document!.id;
    performanceInformation.data.creator = user!.uid;
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

    if (!performanceInformation.CheckObject()) {
      alert("Firebase data was not well-formed");
      return;
    }

    const objectToSend: PerformanceDataInterface =
      performanceInformation.SubmitObject();

    // Update collection with latest performance
    await addDocument(objectToSend);

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
      currentAction === ActionSequence.Start ||
      currentAction === ActionSequence.Begin
    ) {
      // Establish start of math fact
      setPreTrialTime(new Date());

      if (startTime === null) {
        // Establish start of session
        setStartTime(new Date());
      }

      const listItem = workingData![0];

      const updatedList = workingData!.filter(function (item) {
        return item !== listItem;
      });

      // Update the collection--remove current item from list
      setWorkingData(updatedList);

      // Set the 'true' item, less set-level coding component
      setViewRepresentationInternal(listItem.split(":")[0]);

      // Set the 'true' item, less set-level coding component
      setEntryRepresentationInternal("");

      setCoverProblemItem(false);

      setCurrentAction(ActionSequence.Answer);

      setButtonText("Check");

      return;
    }

    const combinedResponse =
      viewRepresentationInternal.split("=")[0] +
      "=" +
      entryRepresentationInternal;

    // Compare if internal and inputted string match
    let isMatching =
      viewRepresentationInternal.trim() === combinedResponse.trim();

    // Increment initial attempt, if correct
    if (isOnInitialTry && isMatching) {
      setNumberCorrectInitial(numberCorrectInitial + 1);
    }

    // Increment errors, if incorrect
    if (!isMatching) {
      setNumberErrors(numberErrors + 1);
    }

    var current = new Date();
    let secs = (current.getTime() - preTrialTime!.getTime()) / 1000;

    let holderPreTime = preTrialTime;

    // Update time for trial
    setPreTrialTime(new Date());

    if (shouldShowFeedback(!isMatching)) {
      // Error correction prompt
      openModal();
    } else {
      let totalDigitsShown = CalculateDigitsTotalAnswer(
        viewRepresentationInternal
      );

      setTotalDigits(totalDigits + totalDigitsShown);

      let totalDigitsCorrect = CalculateDigitsCorrectAnswer(
        combinedResponse,
        viewRepresentationInternal
      );

      setCorrectTotalDigits(totalCorrectDigits + totalDigitsCorrect);

      setNumberTrials(numberTrials + 1);

      let currentItem = FactEntryModel();
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
      if (workingData!.length === 0) {
        // If finished, upload list w/ latest item
        submitDataToFirebase(currentItem);
      } else {
        // Otherise, add it to the existing list
        setModelList([...factModelList!, currentItem]);

        const listItem = workingData![0];

        const updatedList = workingData!.filter(function (item) {
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
      if (entryRepresentationInternal.length === 0) return;

      // Lop off end of string
      setEntryRepresentationInternal(entryRepresentationInternal.slice(0, -1));
    } else {
      // Add to end of string
      setEntryRepresentationInternal(entryRepresentationInternal + char);
    }
  }

  function timerCallback(message: string): void {
    console.log(message);
  }

  return (
    <div className="wrapperTP">
      <Modal
        isOpen={modalIsOpen}
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
            setNRetries(nRetries + 1);
            closeModal();
          }}
        >
          Close Window
        </button>
      </Modal>
      <div className="topBoxTP">
        <h2 style={{ display: "inline-block" }}>
          Taped Problems: (
          {document ? (document as StudentDataInterface).name : <></>})
        </h2>
      </div>
      <div
        className="box2TP"
        style={{
          opacity: coverProblemItem ? 0.5 : 1,
          backgroundColor: coverProblemItem ? "gray" : "transparent",
        }}
      >
        <SimpleProblemFrame
          problemStem={viewRepresentationInternal}
          coverProblemSpace={coverProblemItem}
          entryString={entryRepresentationInternal}
        />
      </div>
      <div className="box1TP">
        <TimerButton callBackFunction={timerCallback} nProblems={5} delta={5} />
      </div>

      <div className="box3TP">
        <section>
          <button className="global-btn" onClick={() => captureButtonAction()}>
            {buttonText}
          </button>
        </section>
      </div>

      <div
        className="box5TP"
        style={{
          opacity: coverProblemItem ? 0.5 : 1,
        }}
      >
        <KeyPad
          callBackFunction={captureKeyClick}
          operatorSymbol={operatorSymbol}
          showEquals={false}
        />
      </div>
    </div>
  );
}
