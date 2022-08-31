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
export function FormatDate(date: string | number | Date): string {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

/** CalculateDigitsTotal
 *
 * Calculates the total number of digits in math fact string
 *
 * @param {String} entry String for math fact
 * @returns {Int} Number of digits
 */
export function CalculateDigitsTotal(entry: string): number {
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

  let prefixTotal = entry.split("=")[0];
  let prefixFirst = prefixTotal.split(operator)[0];
  let prefixSecond = prefixTotal.split(operator)[1];
  let suffixTotal = entry.split("=")[1];

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
  let suffixTotal = entry.split("=")[1];

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

  let entryPrefixInitial = entry.split("=")[0];
  let dsplyprefixInitial = comparison.split("=")[0];

  let entryPrefixFirst = entryPrefixInitial.split(operator)[0];
  let dsplyPrefixFirst = dsplyprefixInitial.split(trueOperator)[0];

  let i = 0;

  if (entryPrefixFirst && entryPrefixFirst.trim().length !== 0) {
    // Initial prefix
    for (i = 0; i < dsplyPrefixFirst.length; i++) {
      if (entryPrefixFirst.length - 1 >= i) {
        if (entryPrefixFirst[i] === dsplyPrefixFirst[i]) {
          digitsCorrect++;
        }
      }
    }
  }

  if (entry.includes(trueOperator)) {
    let entryPrefixSecond = entryPrefixInitial.split(operator)[1];
    let dsplyPrefixSecond = dsplyprefixInitial.split(trueOperator)[1];

    if (entryPrefixSecond !== null && entryPrefixSecond.trim().length !== 0) {
      // Secondary prefix
      for (i = 0; i < dsplyPrefixSecond.length; i++) {
        if (entryPrefixSecond.length - 1 >= i) {
          if (entryPrefixSecond[i] === dsplyPrefixSecond[i]) {
            digitsCorrect++;
          }
        }
      }
    }
  }

  if (entry.includes("=")) {
    let entryPrefixTerminal = entry.split("=")[1];
    let dsplyprefixTerminal = comparison.split("=")[1];

    if (entryPrefixTerminal && entryPrefixTerminal.trim().length !== 0) {
      // suffix
      for (i = 0; i < dsplyprefixTerminal.length; i++) {
        if (entryPrefixTerminal.length - 1 >= i) {
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

  if (entry.trim().length === 0) return digitsCorrect;

  let entryPrefixTerminal = entry.split("=")[1];
  let dsplyprefixTerminal = comparison.split("=")[1];

  if (entryPrefixTerminal && entryPrefixTerminal.trim().length !== 0) {
    // suffix
    for (var i = 0; i < dsplyprefixTerminal.length; i++) {
      if (entryPrefixTerminal.length - 1 >= i) {
        if (entryPrefixTerminal[i] === dsplyprefixTerminal[i]) {
          digitsCorrect++;
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
      return "";
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
  label: string
):
  | "Cover Copy Compare"
  | "Cloze"
  | "Taped Problems"
  | "Explicit Timing"
  | "---" {
  switch (label) {
    case "CoverCopyCompare":
      return "Cover Copy Compare";
    case "Cloze":
      return "Cloze";
    case "TapedProblems":
      return "Taped Problems";
    case "ExplicitTiming":
      return "Explicit Timing";
    default:
      return "---";
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
  return self.indexOf(value) === index;
}

/** Sum
 *
 * Sum items in array
 *
 * @param {Int} prev Prior value
 * @param {Int} next Next value
 * @returns {Int} total
 */
export function Sum(prev: number, next: number): number {
  return prev + next;
}
