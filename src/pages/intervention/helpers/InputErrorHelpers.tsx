/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InterventionState } from "../interfaces/InterventionInterfaces";

/** checkForMalformedInput
 *
 * Returns true if the input does not resemble the math problem
 *
 * @param char
 * @param state
 * @returns
 */
export function checkForMalformedInput(
  char: string,
  state: InterventionState
): boolean {
  const strCheck = state.EntryRepresentationInternal;

  // Row 1 check
  if (
    !strCheck.includes(state.OperatorSymbol) &&
    char !== state.OperatorSymbol &&
    strCheck.length === 2
  ) {
    return true;
  } else {
    // Row 2 check
    if (
      strCheck.includes(state.OperatorSymbol) &&
      !strCheck.includes("=") &&
      char !== "="
    ) {
      const strCheck2 = state.EntryRepresentationInternal.split(
        state.OperatorSymbol
      );

      if (strCheck2.length === 2 && strCheck2[1].length === 2) {
        return true;
      } else {
        return false;
      }
    } else {
      // Row 3 check
      if (strCheck.includes("=")) {
        const strCheck3 = state.EntryRepresentationInternal.split("=");

        if (strCheck3.length === 2 && strCheck3[1].length === 2) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
}
