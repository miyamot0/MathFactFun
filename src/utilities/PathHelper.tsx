/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** confirmIfInterventionScreen
 *
 * Disable sidebar if on practice/intervention screen
 *
 * @param {String} address
 * @returns {Bool} does address fit exclusion
 */
export function confirmIfInterventionScreen(address: string): boolean {
  const screens = Object.keys(InterventionPaths);
  const addressStringLower = address.toLowerCase();

  let valueToReturn = false;

  if (
    addressStringLower === '/' ||
    !addressStringLower.includes('/') ||
    addressStringLower.trim().length === 0
  ) {
    return false;
  }

  const stringArray = addressStringLower
    .split('/')
    .filter(str => str.trim().length > 1)[0];

  screens.forEach(screen => {
    const pageReferenceLower = screen.toLowerCase();
    if (stringArray.includes(pageReferenceLower)) {
      valueToReturn = true;
    }
  });

  return valueToReturn;
}

// eslint-disable-next-line
export const InterventionPaths = {
  Benchmark: 'Benchmark',
  CoverCopyCompare: 'CoverCopyCompare',
  Cloze: 'Cloze',
  ExplicitTiming: 'ExplicitTiming',
  TapedProblems: 'TapedProblems',
  tutorial: 'tutorial',
};
