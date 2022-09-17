/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from "react";
import { ErrorHandling, RelevantKeys } from "../../../maths/Facts";
import { FactsOnFire } from "../../../maths/Mind";
import { GetOperatorFromLabel } from "../../../utilities/LabelHelper";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { SharedActionSequence } from "../functionality/InterventionBehavior";

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

/** keyHandler
 *
 * Handle keyboard input
 *
 * @param {React.KeyboardEvent<HTMLElement>} key keyevent
 */
export function keyHandler(
  key: React.KeyboardEvent<HTMLElement>,
  captureKeyClick2: (char: string) => void,
  captureButtonAction2: () => void,
  currentAction: string
): void {
  if (key.key === "Enter") return;

  if (RelevantKeys.includes(key.key)) {
    let modKey = key.key === "Backspace" ? "Del" : key.key;
    modKey = key.key === "Delete" ? "Del" : modKey;

    if (modKey === " ") {
      if (
        currentAction !== SharedActionSequence.Entry &&
        currentAction !== SharedActionSequence.Start
      ) {
        () => captureButtonAction2();
        return;
      }

      return;
    }

    captureKeyClick2(modKey);
  }
}
