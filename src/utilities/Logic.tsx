/**
 * Shared logic file
 */

import { ErrorHandling } from "../maths/Facts";

/** ConfirmIfInterventionScreen
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
