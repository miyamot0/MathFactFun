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

import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { timestamp } from "../../firebase/config";
import Modal from "react-modal";

// hooks
import { useFirestore } from "../../firebase/useFirestore";
import { useFirebaseDocument } from "../../firebase/useFirebaseDocument";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";

// widgets
import KeyPad from "./KeyPad";
import Timer from "../../components/Timer";
import SimpleProblemFrame from "./SimpleProblemFrame";

// helpers
import {
  CalculateDigitsTotalAnswer,
  CalculateDigitsCorrectAnswer,
} from "../../utilities/LabelHelper";
import { RelevantKeys, InterventionFormat } from "../../maths/Facts";

import { DetermineErrorCorrection } from "../../utilities/Logic";
import {
  PerformanceDataInterface,
  PerformanceModel,
  PerformanceModelInterface,
} from "../../models/PerformanceModel";
import {
  FactEntryModel,
  FactModelInterface,
} from "../../models/FactEntryModel";

// styles
import "./ExplicitTiming.css";
import { StudentDataInterface } from "../../models/StudentModel";

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
};

export default function ExplicitTiming() {
  const { id, target } = useParams<RoutedStudentSet>();
  const { user } = useAuthorizationContext();
  const history = useHistory();

  const { document } = useFirebaseDocument("students", id);
  const { addDocument, response } = useFirestore("", target, id);
  const { updateDocument } = useFirestore("students");

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
  const [workingData, setWorkingData] = useState(null);
  const [operatorSymbol, setOperatorSymbol] = useState("");

  const [coverProblemItem, setCoverProblemItem] = useState(true);

  const [preTrialTime, setPreTrialTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [factModelList, setModelList] = useState([]);

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
    const savedHandler = useRef(null);
    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);
    useEffect(
      () => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event) => {
          savedHandler.current(event);
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
  function shouldShowFeedback(trialError): boolean {
    return DetermineErrorCorrection(
      trialError,
      (document as StudentDataInterface).currentErrorApproach
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
      setWorkingData((document as StudentDataInterface).factsTargeted);
      setSecondsLeft((document as StudentDataInterface).minForTask * 60);

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
    finalFactObject: FactModelInterface
  ): Promise<void> {
    const finalEntries: FactModelInterface[] =
      finalFactObject == null
        ? [...factModelList]
        : [...factModelList, finalFactObject];

    const end = new Date();

    let performanceInformation: PerformanceModelInterface = PerformanceModel();

    // Strings
    performanceInformation.data.id = document.id;
    performanceInformation.data.creator = user.uid;
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
      (end.getTime() - startTime.getTime()) / 1000;
    performanceInformation.data.setSize = (
      document as StudentDataInterface
    ).factsTargeted.length;
    performanceInformation.data.totalDigits = totalDigits;

    // Timestamps
    performanceInformation.data.createdAt = timestamp.fromDate(new Date());
    performanceInformation.data.dateTimeEnd = end.toString();
    performanceInformation.data.dateTimeStart = startTime.toString();

    // Arrays
    performanceInformation.data.entries = finalEntries;

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
      await updateDocument(id, studentObject);

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

      const listItem = workingData[0];

      const updatedList = workingData.filter(function (item) {
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
    let secs = (current.getTime() - preTrialTime.getTime()) / 1000;

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
        new Date(holderPreTime)
      );

      setIsOnInitialTry(true);

      // Note: issue where state change not fast enough to catch latest
      if (workingData.length === 0) {
        // If finished, upload list w/ latest item
        submitDataToFirebase(currentItem);
      } else {
        // Otherise, add it to the existing list
        setModelList([...factModelList, currentItem]);

        const listItem = workingData[0];

        const updatedList = workingData.filter(function (item) {
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

  return (
    <div className="wrapperET">
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
      <div className="topBoxET">
        <h2 style={{ display: "inline-block" }}>
          Explicit Timing: (
          {document ? (document as StudentDataInterface).name : <></>}), Time:{" "}
          {document ? (
            <Timer
              secondsTotal={secondsLeft}
              startTimerTime={startTime}
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
      <div className="box3ET">
        <section>
          <button className="global-btn " onClick={() => captureButtonAction()}>
            {buttonText}
          </button>
        </section>
      </div>

      <div
        className="box5ET"
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
