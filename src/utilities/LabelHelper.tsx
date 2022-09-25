/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** formatDate
 *
 * Clean up date to normal format
 *
 * @param {Date} date Prior date object
 * @returns {String} Date output
 */
export function formatDate({
  date,
  format = "firebase",
}: {
  date: Date;
  format?: string | undefined;
}): string {
  const d = new Date(date);
  const year = d.getFullYear();

  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  if (format === "firebase") {
    return [year, month, day].join("-");
  } else {
    return [month, day, year].join("/");
  }
}

/** calculateDigitsTotalInProblem
 *
 * Calculates the total number of digits in math fact string
 *
 * @param {String} entry String for math fact
 * @returns {Int} Number of digits
 */
export function calculateDigitsTotalInProblem(entry: string): number {
  let operator = "";

  // Check out operators
  if (entry.includes("+")) {
    operator = "+";
  } else if (entry.includes("-")) {
    operator = "-";
  } else if (entry.includes("x")) {
    operator = "x";
  } else if (entry.includes("/")) {
    operator = "/";
  } else {
    throw Error("No operator found in fact string");
  }

  // Check out operators
  if (!entry.includes("=")) {
    throw Error("No equality sign found in fact string");
  }

  const prefixTotal = entry.split("=")[0];
  const prefixFirst = prefixTotal.split(operator)[0];
  const prefixSecond = prefixTotal.split(operator)[1];
  const suffixTotal = entry.split("=")[1];

  let digits = 0;

  digits += prefixFirst.trim().length;
  digits += prefixSecond.trim().length;
  digits += suffixTotal.trim().length;

  return digits;
}

/** CalculateDigitsTotalAnswer
 *
 * Calculates the total number of digits in math fact string
 *
 * @param {String} entry String for math fact
 * @returns {Int} Number of digits
 */
export function CalculateDigitsTotalAnswer(entry: string): number {
  if (!entry.includes("=")) {
    throw Error("No equality sign found in fact string");
  }

  const suffixTotal = entry.split("=")[1];

  let digits = 0;

  digits += suffixTotal.trim().length;

  return digits;
}

/** CalculateDigitsCorrect
 *
 * Calculate how many digits are correct in an entry
 *
 * @param {String} entry String for math fact
 * @param {String} comparison String for user-entered math fact
 * @param {String} trueOperator Operator known to be true
 * @returns {Int} Number of digits correct
 */
export function CalculateDigitsCorrect(
  entry: string,
  comparison: string,
  trueOperator: string
): number {
  let operator = "";

  if (entry.includes("+")) {
    operator = "+";
  } else if (entry.includes("-")) {
    operator = "-";
  } else if (entry.includes("x")) {
    operator = "x";
  } else if (entry.includes("/")) {
    operator = "/";
  }

  let digitsCorrect = 0;

  if (entry.trim().length === 0) return digitsCorrect;

  const entryPrefixInitial = entry.split("=")[0];
  const dsplyprefixInitial = comparison.split("=")[0];

  const entryPrefixFirst = entryPrefixInitial.split(operator)[0];
  const dsplyPrefixFirst = dsplyprefixInitial.split(trueOperator)[0];

  let i = 0;

  /* istanbul ignore else*/
  if (entryPrefixFirst && entryPrefixFirst.trim().length !== 0) {
    // Initial prefix
    for (i = 0; i < dsplyPrefixFirst.length; i++) {
      /* istanbul ignore else*/
      if (entryPrefixFirst.length - 1 >= i) {
        /* istanbul ignore else*/
        if (entryPrefixFirst[i] === dsplyPrefixFirst[i]) {
          digitsCorrect++;
        }
      }
    }
  }

  /* istanbul ignore else*/
  if (entry.includes(trueOperator)) {
    const entryPrefixSecond = entryPrefixInitial.split(operator)[1];
    const dsplyPrefixSecond = dsplyprefixInitial.split(trueOperator)[1];

    /* istanbul ignore else*/
    if (entryPrefixSecond !== null && entryPrefixSecond.trim().length !== 0) {
      // Secondary prefix
      for (i = 0; i < dsplyPrefixSecond.length; i++) {
        /* istanbul ignore else*/
        if (entryPrefixSecond.length - 1 >= i) {
          /* istanbul ignore else*/
          if (entryPrefixSecond[i] === dsplyPrefixSecond[i]) {
            digitsCorrect++;
          }
        }
      }
    }
  }

  if (entry.includes("=")) {
    const entryPrefixTerminal = entry.split("=")[1];
    const dsplyprefixTerminal = comparison.split("=")[1];

    /* istanbul ignore else*/
    if (entryPrefixTerminal && entryPrefixTerminal.trim().length !== 0) {
      // suffix

      for (i = 0; i < dsplyprefixTerminal.length; i++) {
        /* istanbul ignore else*/
        if (entryPrefixTerminal.length - 1 >= i) {
          /* istanbul ignore else*/
          if (entryPrefixTerminal[i] === dsplyprefixTerminal[i]) {
            digitsCorrect++;
          }
        }
      }
    }
  }

  return digitsCorrect;
}

/** CalculateDigitsCorrectAnswer
 *
 * Calculate how many digits are correct in an entry
 *
 * @param {String} entry String for math fact
 * @param {String} comparison String for user-entered math fact
 * @param {String} trueOperator Operator known to be true
 * @returns {Int} Number of digits correct
 */
export function CalculateDigitsCorrectAnswer(
  entry: string,
  comparison: string
): number {
  let digitsCorrect = 0;

  /* istanbul ignore else*/
  if (!entry.includes("=") || !comparison.includes("=")) {
    throw Error("No equality sign found in fact string");
  } else {
    /* istanbul ignore else*/
    if (entry.trim().length === 0) {
      return 0;
    } else {
      const entryPrefixTerminal = entry.split("=")[1];
      const dsplyprefixTerminal = comparison.split("=")[1];

      /* istanbul ignore else*/
      if (entryPrefixTerminal && entryPrefixTerminal.trim().length !== 0) {
        // suffix
        for (let i = 0; i < dsplyprefixTerminal.length; i++) {
          /* istanbul ignore else*/
          if (entryPrefixTerminal.length - 1 >= i) {
            /* istanbul ignore else*/
            if (entryPrefixTerminal[i] === dsplyprefixTerminal[i]) {
              digitsCorrect++;
            }
          }
        }
      }
    }
  }

  return digitsCorrect;
}

/** GetOperatorFromLabel
 *
 * Pull the relevant operation from math fact label
 *
 * @param {String} label String for user-supplied
 * @returns {String} Operator
 */
export function GetOperatorFromLabel(
  label: string
): "+" | "-" | "x" | "/" | "" {
  switch (label) {
    case "Addition":
      return "+";
    case "Subtraction":
      return "-";
    case "Multiplication":
      return "x";
    case "Division":
      return "/";
    default:
      throw Error("No matching operation");
  }
}

/** GetApproachStringFromLabel
 *
 * Convert label to proper string
 *
 * @param {String} label String for user-supplied
 * @returns {String} Label
 */
export function GetApproachStringFromLabel(
  label: string | undefined
):
  | "Cover Copy Compare"
  | "Cloze"
  | "Taped Problems"
  | "Explicit Timing"
  | "N/A"
  | "" {
  switch (label) {
    case "CoverCopyCompare":
      return "Cover Copy Compare";
    case "Cloze":
      return "Cloze";
    case "TapedProblems":
      return "Taped Problems";
    case "ExplicitTiming":
      return "Explicit Timing";
    case "N/A":
      return "N/A";
    default:
      return "";
  }
}

/** OnlyUnique
 *
 * Lambda to act upon array
 *
 * @param {*} value Current value
 * @param {Int} index Index in array
 * @param {Array} self current array
 * @returns {Bool} returns if in array
 */
export function OnlyUnique(
  value: any,
  index: any,
  self: string | any[]
): boolean {
  if (self === undefined || value === undefined || index === undefined) {
    throw Error("Value was undefined");
  }

  return self.indexOf(value) === index;
}

/** Sum
 *
 * Sum items in array
 *
 * @param {number | undefined} prev Prior value
 * @param {number | undefined} next Next value
 * @returns {number} total
 */
export function Sum(
  prev: number | undefined,
  next: number | undefined
): number {
  if (prev === undefined || next === undefined) {
    throw Error("A value was undefined");
  }

  return prev + next;
}
