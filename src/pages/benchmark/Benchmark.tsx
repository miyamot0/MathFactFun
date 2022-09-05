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
import { timestamp } from "../../firebase/config";

// Hooks
import { useFirestore } from "../../firebase/useFirestore";
import { useFirebaseDocument } from "../../firebase/useFirebaseDocument";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";

// Widgets
import KeyPad from "../intervention/KeyPad";
import Timer from "../../components/Timer";
import SimpleProblemFrame from "../intervention/SimpleProblemFrame";

// Helpers
import {
  CalculateDigitsTotalAnswer,
  CalculateDigitsCorrectAnswer,
  GetOperatorFromLabel,
} from "../../utilities/LabelHelper";
import { RelevantKeys } from "../../maths/Facts";

import { FactsOnFire } from "../../maths/Mind";
import { PerformanceModel } from "../../models/PerformanceModel";
import { FactEntryModel } from "../../models/FactEntryModel";

import { FactModelInterface } from "../../models/FactEntryModel";
import { PerformanceModelInterface } from "../../models/PerformanceModel";

// Styles
import "../intervention/ExplicitTiming.css";
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

interface RoutedStudentSet {
  id?: string;
  target?: string;
}

export default function Benchmark() {
  const { id, target } = useParams<RoutedStudentSet>();
  const { user } = useAuthorizationContext();
  const history = useHistory();

  const { document } = useFirebaseDocument("students", id);
  const { addDocument, response } = useFirestore("", target!.split("-")[0], id);
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

  /** getCoreProblemSet
   *
   * Pull to appropriate problem type from MIND
   *
   * @param {string} target target for probes
   * @returns {string[][]}
   */
  function getCoreProblemSet(target: string): string[][] {
    switch (target) {
      case "Addition":
        return FactsOnFire.Addition;
      case "Subtraction":
        return FactsOnFire.Subtraction;
      case "Division":
        return FactsOnFire.Division;
      case "Multiplication":
        return FactsOnFire.Multiplication;
      default:
        return FactsOnFire.Addition;
    }
  }

  /** getSetFromArray
   *
   * Pull the appropriate subset of problems from MIND
   *
   * @param {string[][]} array mass array of MIND problem sets
   * @param {string} set set tag
   * @returns {string[]}
   */
  function getSetFromArray(array: string[][], set: string): string[] {
    let start = 0;
    let end = 5;

    if (set === "B") {
      start = 6;
      end = 11;
    }

    if (set === "C") {
      start = 12;
      end = 17;
    }

    let problems: string[][] = array.slice(start, end);

    return problems.reduce(
      (accumulator, value) => accumulator.concat(value),
      [] as string[]
    );

    //return [].concat.apply([], array.slice(start, end));
  }

  /** getUniqueProblems
   *
   * Filter out reciprocals, per BP
   *
   * @param {string[]} arrayProblems array of problems
   * @param {string} operatorSymbol operator symbol, for parsing
   * @returns {string[]}
   */
  function getUniqueProblems(arrayProblems: string[], operatorSymbol: string) {
    const firstWave = [...new Set(arrayProblems)];
    let secondWave = [...new Set(arrayProblems)];

    let probsToRemove: string[] = [];

    // First as truth
    firstWave.forEach((problem) => {
      const probA = problem.split("=")[0];

      // Two nums
      const numsA = probA.split(operatorSymbol);

      if (probsToRemove.includes(problem)) return;

      secondWave.forEach((otherProblem) => {
        // Skip matching conditions
        if (problem === otherProblem) return;

        const probB = otherProblem.split("=")[0];
        const numsB = probB.split(operatorSymbol);

        // its a reciprocal
        if (numsA[0] === numsB[1] && numsA[1] === numsB[0]) {
          probsToRemove.push(otherProblem);
        }
      });
    });

    secondWave = secondWave.filter(
      (value, i) => !probsToRemove.includes(value)
    );

    return secondWave;
  }

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && !loadedData) {
      const targetTrim = target!.split("-")[0];
      const coreItems = getCoreProblemSet(targetTrim);
      const coreSet = getSetFromArray(
        coreItems,
        (document as StudentDataInterface).problemSet!
      );
      const coreSetClean = getUniqueProblems(
        coreSet,
        GetOperatorFromLabel(targetTrim)
      );

      // Set benchmark problems
      // TODO: randomize order of sets?
      setWorkingData(coreSetClean);

      // Set fixed time of 2 min
      setSecondsLeft(120);

      // Flag that data is loaded
      setLoadedData(true);
    }
  }, [
    document,
    loadedData,
    target,
    setLoadedData,
    operatorSymbol,
    setOperatorSymbol,
  ]);

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
    const currentBenchmarkArea = target!.split("-")[0];

    let performanceInformation: PerformanceModelInterface = PerformanceModel();

    /*
    HACK

    // Strings
    performanceInformation.data.id = document!.id;
    performanceInformation.data.creator = user!.uid;
    performanceInformation.data.target = currentBenchmarkArea;
    performanceInformation.data.method = "Benchmark";

    // Numerics
    performanceInformation.data.correctDigits = totalCorrectDigits;
    performanceInformation.data.errCount = numberErrors;
    performanceInformation.data.nCorrectInitial = numberCorrectInitial;
    performanceInformation.data.nRetries = 0;
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
      let completedBenchmark = (document as StudentDataInterface)
        .completedBenchmark;

      completedBenchmark.push(
        `${target} ${(document as StudentDataInterface)
          .dueDate!.toDate()
          .toDateString()}`
      );

      // Omit time updates
      const studentObject = {
        completedBenchmark,
      };

      // Update field regarding last activity
      await updateDocument(id!, studentObject);

      // Push to home
      if (!response.error) {
        history.push(`/probe/${id}`);
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
    currentItem.data.factType = target;
    currentItem.data.factEntry = combinedResponse;

    currentItem.data.latencySeconds = secs;

    currentItem.data.dateTimeEnd = timestamp.fromDate(new Date(current));
    currentItem.data.dateTimeStart = timestamp.fromDate(
      new Date(holderPreTime!)
    );
    */

    setIsOnInitialTry(true);

    // Potential issue: state change not fast enough to catch latest
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
      <div className="topBoxET">
        <h2 style={{ display: "inline-block" }}>
          Benchmark: (
          {document ? (document as StudentDataInterface).name : <></>}), Time:{" "}
          {document ? (
            <Timer
              secondsTotal={secondsLeft}
              startTimerTime={startTime!}
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
