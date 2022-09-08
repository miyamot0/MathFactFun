/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Modal from "react-modal";

// hooks
import { useFirestore } from "../../firebase/useFirestore";
import { useFirebaseDocumentTyped } from "../../firebase/useFirebaseDocument";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";
import { timestamp } from "../../firebase/config";

// widgets
import KeyPad from "./KeyPad";
import ProblemFrame from "./ProblemFrame";
import StimulusFrame from "./StimulusFrame";

// helpers
import {
  CalculateDigitsTotal,
  CalculateDigitsCorrect,
  GetOperatorFromLabel,
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
import "./CoverCopyCompare.css";
import {
  PerformanceDataInterface,
  StudentDataInterface,
} from "../../firebase/types/GeneralTypes";

const ActionSequence = {
  Entry: "ActionSequence.Entry",
  Begin: "ActionSequence.Begin",
  CoverCopy: "ActionSequence.CoverCopy",
  Compare: "ActionSequence.Compare",
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

export default function CoverCopyCompare() {
  const { id, target } = useParams<RoutedStudentSet>();
  const { user } = useAuthorizationContext();
  const history = useHistory();

  const { document } = useFirebaseDocumentTyped<StudentDataInterface>({
    collectionString: "students",
    idString: id,
  });
  const { addDocument, response } = useFirestore("", target, id);
  const { updateDocument } = useFirestore("students", undefined, undefined);

  const [loadedData, setLoadedData] = useState(false);
  const [workingData, setWorkingData] = useState<string[]>();
  const [operatorSymbol, setOperatorSymbol] = useState("");

  const [currentAction, setCurrentAction] = useState(ActionSequence.Entry);
  const [buttonText, setButtonText] = useState("Cover");
  const [showButton, setShowButton] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);
  const [isOnInitialTry, setIsOnInitialTry] = useState(true);
  const [coverStimulusItem, setCoverStimulusItem] = useState(true);
  const [coverProblemItem, setCoverProblemItem] = useState(true);
  const [coverListViewItems, setCoverListViewItems] = useState(false);
  const [toVerify, setToVerify] = useState(false);
  const [nextLiItem, setNextLiItem] = useState<string>();

  // quants
  const [numberCorrectInitial, setNumberCorrectInitial] = useState(0);
  const [numberErrors, setNumberErrors] = useState(0);
  const [totalDigits, setTotalDigits] = useState(0);
  const [totalCorrectDigits, setCorrectTotalDigits] = useState(0);
  const [numberTrials, setNumberTrials] = useState(0);
  const [nRetries, setNRetries] = useState(0);

  const [preTrialTime, setPreTrialTime] = useState<Date>();
  const [startTime, setStartTime] = useState<Date>();
  const [factModelList, setModelList] = useState<FactModelInterface[]>();

  const [viewRepresentationInternal, setViewRepresentationInternal] =
    useState("");
  const [entryRepresentationInternal, setEntryRepresentationInternal] =
    useState("");

  /// modal stuff
  const [modalIsOpen, setIsOpen] = useState(false);

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
    if (RelevantKeys.includes(key.key)) {
      let modKey = key.key === "Backspace" ? "Del" : key.key;
      modKey = key.key === "Delete" ? "Del" : modKey;

      if (modKey === " ") {
        if (currentAction !== ActionSequence.Entry) {
          captureButtonAction();
          return;
        }

        if (nextLiItem !== null && nextLiItem !== undefined) {
          captureItemClick(nextLiItem);
        }

        return;
      }

      modKey = key.key === "*" ? "x" : modKey;
      modKey = key.key === "Enter" ? "=" : modKey;

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
      setWorkingData((document as StudentDataInterface).factsTargeted);

      // Establish operator sign
      setOperatorSymbol(
        GetOperatorFromLabel(
          (document as StudentDataInterface).currentTarget!.toString()
        )
      );

      // Flag that data is loaded
      setLoadedData(true);
    }
  }, [document, loadedData, setLoadedData, operatorSymbol, setOperatorSymbol]);

  /** submitDataToFirebase
   *
   * Push data to server
   *
   * @param {FactModelInterface} finalFactObject final item completed
   */
  async function submitDataToFirebase(
    finalFactObject: FactModelInterface
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
    performanceInformation.data.method = InterventionFormat.CoverCopyCompare;

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
    // Note: need a flag for update w/o waiting for state change
    let quickCheck = false;

    if (currentAction === ActionSequence.Entry) {
      // From entry, to begin
      setCurrentAction(ActionSequence.Begin);
      setButtonText("Cover");
      setCoverStimulusItem(false);
      setCoverProblemItem(true);
    } else if (currentAction === ActionSequence.Begin) {
      // From begin, to cover copy
      setCurrentAction(ActionSequence.CoverCopy);
      setCoverStimulusItem(true);
      setCoverProblemItem(false);
      setButtonText("Copied");
    } else if (currentAction === ActionSequence.CoverCopy) {
      // From cover copy, to compare
      setCurrentAction(ActionSequence.Compare);
      setButtonText("Compared");
      setCoverStimulusItem(false);
      setCoverProblemItem(false);
    } else {
      setCurrentAction(ActionSequence.Entry);
      setToVerify(true);
      quickCheck = true;
    }

    // Fire if ready to check response
    if (toVerify || quickCheck) {
      setToVerify(false);

      // Compare if internal and inputted string match
      let isMatching =
        viewRepresentationInternal.trim() ===
        entryRepresentationInternal.trim();

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
        let totalDigitsShown = CalculateDigitsTotal(viewRepresentationInternal);

        setTotalDigits(totalDigits + totalDigitsShown);

        let totalDigitsCorrect = CalculateDigitsCorrect(
          entryRepresentationInternal,
          viewRepresentationInternal,
          operatorSymbol
        );

        setCorrectTotalDigits(totalCorrectDigits + totalDigitsCorrect);

        setNumberTrials(numberTrials + 1);

        // Reset logic to default
        setViewRepresentationInternal("");
        setEntryRepresentationInternal("");
        setButtonText("Cover");
        setShowButton(false);
        setIsOngoing(false);
        setCoverListViewItems(false);
        setCoverStimulusItem(true);
        setCoverProblemItem(true);
        setIsOnInitialTry(true);

        let currentItem = FactEntryModel();

        /*
        HACK
        currentItem.data.factCorrect = isMatching;
        currentItem.data.initialTry = isOnInitialTry;

        currentItem.data.factType = (
          document as StudentDataInterface
        ).currentTarget;
        currentItem.data.factString = viewRepresentationInternal;
        currentItem.data.factEntry = entryRepresentationInternal;

        currentItem.data.latencySeconds = secs;

        currentItem.data.dateTimeEnd = timestamp.fromDate(new Date(current));
        currentItem.data.dateTimeStart = timestamp.fromDate(
          new Date(holderPreTime!)
        );
        */

        // Note: isusue where state change not fast enough to catch latest
        if (workingData!.length === 0) {
          // If finished, upload list w/ latest item
          submitDataToFirebase(currentItem);
        } else {
          // Otherise, add it to the existing list
          setModelList([...factModelList!, currentItem]);
        }
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
    // Rule 1: Exit out if not in Covered/Copying sequence
    if (currentAction !== ActionSequence.CoverCopy) return;

    // Rule 2: Exit out if multiple operators
    if (
      char === operatorSymbol &&
      entryRepresentationInternal.includes(operatorSymbol)
    )
      return;

    // Rule 3: Like #2, but no multiple equals sign
    if (char === "=" && entryRepresentationInternal.includes("=")) return;

    // Rule #4: No '=' before an operator
    if (char === "=" && !entryRepresentationInternal.includes(operatorSymbol))
      return;

    // Rule #5/#6: No '=', before an digit AFTER operator
    if (char === "=" && entryRepresentationInternal.includes(operatorSymbol)) {
      let problemParts = entryRepresentationInternal.split(operatorSymbol);

      // Rule #5: If just 1 part, disregard (i.e., no operator)
      if (problemParts.length <= 1) return;

      // Rule #6: If first is just whitespace, disregard (i.e., JUST operator)
      if (problemParts[1].trim().length === 0) return;
    }

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

  /** captureItemClick
   *
   * Function to handle input (list item selected)
   *
   * @param {string} listItem li element selected
   */
  function captureItemClick(listItem: string): void {
    // If a problem is loaded, exit out of event
    if (isOngoing) return;

    // Establish start of math fact
    setPreTrialTime(new Date());

    if (startTime === null) {
      // Establish start of session
      setStartTime(new Date());
    }

    // Set the 'true' item, less set-level coding component
    setViewRepresentationInternal(listItem.split(":")[0]);

    // Flag that a problem is loaded
    setIsOngoing(true);

    // Update button text
    setButtonText("Cover");

    // Update button display status:
    setShowButton(true);

    // Flag to remove cover for stimulus item
    setCoverStimulusItem(false);

    const updatedList = workingData!.filter(function (item) {
      return item !== listItem;
    });

    // Update the collection--remove current item from list
    setWorkingData(updatedList);

    // Queue up next LI
    setNextLiItem(updatedList[0]);

    // Flag to cover up list items (to dim them)
    setCoverListViewItems(true);

    // Force a call to update status
    captureButtonAction();
  }

  return (
    <div className="wrapper">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        preventScroll={true}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Double-check your math!</h2>
        <div style={{ marginTop: "5px", marginBottom: "10px" }}>
          Close this window, and then try again.
        </div>
        <button
          className="global-btn "
          style={{ float: "right" }}
          onClick={() => {
            setEntryRepresentationInternal("");
            setIsOngoing(true);
            setToVerify(false);
            setIsOnInitialTry(false);

            setCurrentAction(ActionSequence.Begin);
            setButtonText("Cover");
            setCoverStimulusItem(false);
            setCoverProblemItem(true);

            setNRetries(nRetries + 1);

            closeModal();
          }}
        >
          Close
        </button>
      </Modal>
      <div className="topBox">
        <h2>
          Cover Copy Compare: (
          {document ? (document as StudentDataInterface).name : <></>})
        </h2>
      </div>
      <div
        className="box1"
        style={{
          opacity: coverStimulusItem ? 0.5 : 1,
          backgroundColor: coverStimulusItem ? "gray" : "transparent",
        }}
      >
        <h2>Problem to Copy</h2>
        <StimulusFrame
          itemString={viewRepresentationInternal}
          operator={operatorSymbol}
          coverStimulusItem={coverStimulusItem}
        />
      </div>
      <div
        className="box2"
        style={{
          opacity: coverProblemItem ? 0.5 : 1,
          backgroundColor: coverProblemItem ? "gray" : "transparent",
        }}
      >
        <h2>My Answer</h2>
        <ProblemFrame
          entryString={entryRepresentationInternal}
          coverProblemSpace={coverProblemItem}
        />
      </div>
      <div className="box3">
        <section>
          <button
            className="global-btn "
            style={{ visibility: showButton ? "visible" : "hidden" }}
            onClick={() => captureButtonAction()}
          >
            {buttonText}
          </button>
        </section>
      </div>
      <div
        className="box4"
        style={{
          opacity: coverListViewItems ? 0.5 : 1,
          backgroundColor: coverListViewItems ? "gray" : "transparent",
        }}
      >
        <h2>Items in Stimulus Set</h2>
        <ul className="list-styling">
          {workingData ? (
            workingData.map((fact) => {
              return (
                <li
                  className="list-styling"
                  key={fact}
                  onClick={() => captureItemClick(fact)}
                >
                  {fact.split(":")[0]}
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div
        className="box5"
        style={{
          opacity: coverProblemItem ? 0.5 : 1,
        }}
      >
        <KeyPad
          callBackFunction={captureKeyClick}
          operatorSymbol={operatorSymbol}
          showEquals={true}
        />
      </div>
    </div>
  );
}
