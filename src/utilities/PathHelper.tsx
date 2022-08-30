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
