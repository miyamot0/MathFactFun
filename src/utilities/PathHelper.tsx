/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


/**
 * Helper file
 */

/** ConfirmIfInterventionScreen
 *
 * Disable sidebar if on practice/intervention screen
 *
 * @param {String} address
 * @returns {Bool} does address fit exclusion
 */
export function ConfirmIfInterventionScreen(address: string): boolean {
  const screens = [
    "CoverCopyCompare",
    "ExplicitTiming",
    "Cloze",
    "TapedProblems",
    "benchmark",
  ];

  let valueToReturn = false;

  screens.forEach((screen) => {
    if (address.includes(screen) && !address.includes("Progress")) {
      valueToReturn = true;
    }
  });

  return valueToReturn;
}
