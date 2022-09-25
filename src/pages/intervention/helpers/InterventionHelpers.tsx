/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { useEffect, useRef } from "react";
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import { ErrorHandling, InterventionFormat } from "../../../maths/Facts";
import { FactsOnFire } from "../../../maths/Mind";
import { GetOperatorFromLabel } from "../../../utilities/LabelHelper";
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import {
  InterventionState,
  PerformanceDataInterface,
} from "../interfaces/InterventionInterfaces";
import {
  coverCopyCompareSequence,
  explicitTimingSequence,
} from "./DispatchingHelpers";

/** DetermineErrorCorrection
 *
 * Disable sidebar if on practice/intervention screen
 *
 * @param {String} address
 * @returns {Bool} does address fit exclusion
 */
export function DetermineErrorCorrection(
  hasError: boolean,
  setting: string
): boolean {
  // Incorrect, show every time
  if (setting === ErrorHandling.Never) {
    return false;
  }

  // Incorrect, show every time
  if (hasError && setting === ErrorHandling.EveryTime) {
    return true;
  }

  return false;
}

/** shouldShowFeedback
 *
 * Handle branching logic for error message
 *
 * @param {boolean} trialError was there an error?
 * @param {StudentDataInterface} document student doc
 * @returns {boolean}
 */
export function shouldShowFeedback(
  trialError: boolean,
  document: StudentDataInterface
): boolean {
  return DetermineErrorCorrection(trialError, document.currentErrorApproach);
}

/** checkLiNullUndefinedBlank
 *
 * @param {string} str
 * @returns {boolean}
 */
export function checkLiNullUndefinedBlank(str: string): boolean {
  return str === null || str === undefined || str.trim().length === 0;
}

/** getCoreProblemSet
 *
 * Pull to appropriate problem type from MIND
 *
 * @param {string} target target for probes
 * @returns {string[][]}
 */
export function getCoreProblemSet(target: string): string[][] {
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
      throw Error("Target for problem set missing");
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
export function getSetFromArray(array: string[][], set: string): string[] {
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

  const problems: string[][] = array.slice(start, end);

  return problems.reduce(
    (accumulator, value) => accumulator.concat(value),
    [] as string[]
  );
}

/** getUniqueProblems
 *
 * Filter out reciprocals, per BP
 *
 * @param {string[]} arrayProblems array of problems
 * @param {string} operatorSymbol operator symbol, for parsing
 * @returns {string[]}
 */
export function getUniqueProblems(
  arrayProblems: string[],
  operatorSymbol: string
): string[] {
  const firstWave = [...new Set(arrayProblems)];
  let secondWave = [...new Set(arrayProblems)];

  const probsToRemove: string[] = [];

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

  secondWave = secondWave.filter((value) => !probsToRemove.includes(value));

  return secondWave;
}

/** loadWorkingDataBenchmark
 *
 * @param {StudentDataInterface} document
 * @param {string} target
 * @returns {string[]}
 */
export function loadWorkingDataBenchmark(
  document: StudentDataInterface,
  target: string
): string[] {
  const targetTrim = target.split("-")[0];
  const coreItems = getCoreProblemSet(targetTrim);
  const coreSet = getSetFromArray(coreItems, document.problemSet);

  return getUniqueProblems(coreSet, GetOperatorFromLabel(targetTrim));
}

/** useEventListener
 *
 * listener for events
 *
 * @param {string} eventName ...
 * @param {(key: React.KeyboardEvent<HTMLElement>) => void} handler ...
 * @param {Window} element ...
 */
export function useEventListener(
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

/** submitPerformancesToFirebase
 *
 * @param param0
 * @returns
 */
export async function submitPerformancesToFirebase({
  user,
  id,
  interventionFormat,
  target,
  finalFactObject,
  document,
  state,
  response,
  addDocument,
  updateDocument,
  history,
}: {
  user: firebase.User | null;
  id: string | null;
  interventionFormat: string;
  target: string;
  finalFactObject: FactDataInterface | null;
  document: StudentDataInterface | null;
  state: InterventionState;
  response: FirestoreState;
  addDocument: (doc: PerformanceDataInterface) => Promise<void>;
  updateDocument: (id: string, updates: any) => Promise<void>;
  history: any;
}) {
  const finalEntries = state.FactModelList;

  if (!state.StartTime || !user || !document || !id) {
    return;
  }

  if (finalFactObject !== null) {
    finalEntries?.push(finalFactObject);
  }

  const end = new Date();

  const uploadObject = {
    correctDigits: state.TotalDigitsCorrect,
    errCount: state.NumErrors,
    nCorrectInitial: state.NumCorrectInitial,
    nRetries: state.NumRetries,
    sessionDuration: (end.getTime() - state.StartTime.getTime()) / 1000,
    setSize: document.factsTargeted.length,
    totalDigits: state.TotalDigits,
    entries: finalEntries.map((entry) => Object.assign({}, entry)),
    id: document.id,
    creator: user.uid,
    target: document.currentTarget,
    method: interventionFormat,
    dateTimeEnd: end.toString(),
    dateTimeStart: state.StartTime.toString(),
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  };

  await addDocument(uploadObject);

  // If added without issue, update timestamp
  if (!response || response.error === null) {
    const currentDate = new Date();

    const updatedStudentObject = {
      lastActivity: firebase.firestore.Timestamp.fromDate(currentDate),
      completedBenchmark: document.completedBenchmark,
    } as StudentDataInterface;

    if (interventionFormat === "Benchmark") {
      // Update benchmarking records, if a benchmark
      const completedBenchmark = document.completedBenchmark;
      completedBenchmark.push(
        `${target} ${document.dueDate.toDate().toDateString()}`
      );
      const updatedStudentObject = {
        lastActivity: firebase.firestore.Timestamp.fromDate(currentDate),
        completedBenchmark,
      } as StudentDataInterface;

      await updateDocument(id, updatedStudentObject);
    } else {
      // Update field regarding last activity
      const updatedStudentObject = {
        lastActivity: firebase.firestore.Timestamp.fromDate(currentDate),
      } as StudentDataInterface;

      await updateDocument(id, updatedStudentObject);
    }

    // Push to home
    if (response.error === null && interventionFormat === "Benchmark") {
      history.push(`/dashboard`);
    } else if (response.error === null) {
      history.push(`/practice`);
    } else {
      return;
    }
  }
}

/** sharedButtonActionSequence
 *
 * @param user
 * @param id
 * @param approach
 * @param document
 * @param state
 * @param openModal
 * @param addDocument
 * @param updateDocument
 * @param response
 * @param history
 * @param dispatch
 */
export function sharedButtonActionSequence(
  user: firebase.User | null,
  id: string,
  target: string,
  approach: string,
  document: StudentDataInterface | null,
  state: InterventionState,
  openModal: any,
  addDocument: any,
  updateDocument: any,
  response: any,
  history: any,
  dispatch: any
): void {
  if (document === null || user === null) {
    throw Error("Document or user is null");
  }

  switch (approach) {
    case InterventionFormat.CoverCopyCompare:
      coverCopyCompareSequence(
        user,
        id,
        target,
        document,
        state,
        approach,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      );
      return;
    case InterventionFormat.ExplicitTiming:
      explicitTimingSequence(
        user,
        id,
        target,
        document,
        state,
        approach,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      );
      return;
    case "Benchmark":
      explicitTimingSequence(
        user,
        id,
        target,
        document,
        state,
        approach,
        openModal,
        addDocument,
        updateDocument,
        response,
        history,
        dispatch
      );
      return;
    default:
      throw Error("No routing information supplied");
  }
}
