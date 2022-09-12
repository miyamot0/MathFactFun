import { ErrorHandling } from "../../../maths/Facts";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";

/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Shared logic file
 */

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

export function checkLiNullUndefinedBlank(str: string) {
  return str === null || str === undefined || str.trim().length === 0;
}
