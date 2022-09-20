/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { checkInputNullOrUndefined } from "../../../../utilities/FormHelpers";
import { checkIfNullUndefinedOrEmpty } from "../../../setcreator/helpers/SetCreatorHelpers";

/** createVerticalString
 *
 * Creates a verticalized array for the widget
 *
 * @param {string} str Entered string
 * @returns {string[][]} Array of Arrays, 3x3 gride
 */
export function createVerticalStringProblemFrame(str: string): string[][] {
  let operator = "";
  let toIter = 0;

  const newText = [];
  newText[0] = ["", "", ""];
  newText[1] = ["", "", ""];
  newText[2] = ["", "", ""];

  if (str.includes("+")) {
    operator = "+";
  } else if (str.includes("-")) {
    operator = "-";
  } else if (str.includes("x")) {
    operator = "x";
  } else if (str.includes("/")) {
    operator = "/";
  }

  // Just one row
  if (operator === "" && str.length > 0 && str.length <= 2) {
    let shuf = 0;

    for (toIter = str.length - 1; toIter >= 0; toIter--) {
      newText[0][2 - shuf] = str[toIter];
      shuf++;
    }

    return newText;
  }

  // Just lines
  if (!str.includes("=") && str.includes(operator)) {
    const frontProb = str.split(operator)[0];

    let shuf = 0;

    for (toIter = frontProb.length - 1; toIter >= 0; toIter--) {
      newText[0][2 - shuf] = frontProb[toIter];
      shuf++;
    }

    const backProb = str.split(operator)[1];

    shuf = 0;

    newText[1][0] = operator === "/" ? "\u00F7" : operator;

    for (toIter = backProb.length - 1; toIter >= 0; toIter--) {
      newText[1][2 - shuf] = backProb[toIter];
      shuf++;
    }
  }

  // Just lines
  if (!str.includes("=") && str.includes(operator)) {
    const frontProb = str.split(operator)[0];

    let shuf = 0;

    for (toIter = frontProb.length - 1; toIter >= 0; toIter--) {
      newText[0][2 - shuf] = frontProb[toIter];
      shuf++;
    }

    const backProb = str.split(operator)[1];

    shuf = 0;

    newText[1][0] = operator === "/" ? "\u00F7" : operator;

    for (toIter = backProb.length - 1; toIter >= 0; toIter--) {
      newText[1][2 - shuf] = backProb[toIter];
      shuf++;
    }

    return newText;
  }

  // Just lines
  if (str.includes("=") && str.includes(operator)) {
    const preAnswer = str.split("=")[0];
    const frontProb = preAnswer.split(operator)[0];

    let shuf = 0;

    for (toIter = frontProb.length - 1; toIter >= 0; toIter--) {
      newText[0][2 - shuf] = frontProb[toIter];
      shuf++;
    }

    const backProb = preAnswer.split(operator)[1];

    shuf = 0;

    newText[1][0] = operator === "/" ? "\u00F7" : operator;

    for (toIter = backProb.length - 1; toIter >= 0; toIter--) {
      newText[1][2 - shuf] = backProb[toIter];
      shuf++;
    }

    const answerProb = str.split("=")[1];

    shuf = 0;

    for (toIter = answerProb.length - 1; toIter >= 0; toIter--) {
      newText[2][2 - shuf] = answerProb[toIter];
      shuf++;
    }

    return newText;
  }

  return newText;
}

/** createVerticalString
 *
 * Creates a verticalized array for the widget
 *
 * @param {string} str Entered string
 * @param {string} ans Entered answer
 * @returns {string[][]} Array of Arrays, 3x3 gride
 */
export function createVerticalStringSimpleProblemFrame(
  str: string,
  ans: string
): string[][] {
  str = str.split("=")[0] + "=";

  let operator = "";
  let toIter = 0;

  const newText = [];
  newText[0] = ["", "", ""];
  newText[1] = ["", "", ""];
  newText[2] = ["", "", ""];

  if (str.includes("+")) {
    operator = "+";
  } else if (str.includes("-")) {
    operator = "-";
  } else if (str.includes("x")) {
    operator = "x";
  } else if (str.includes("/")) {
    operator = "/";
  }

  const preAnswer = str.split("=")[0];
  const frontProb = preAnswer.split(operator)[0];

  let shuf = 0;

  for (toIter = frontProb.length - 1; toIter >= 0; toIter--) {
    newText[0][2 - shuf] = frontProb[toIter];
    shuf++;
  }

  const backProb = preAnswer.split(operator)[1];

  shuf = 0;

  newText[1][0] = operator === "/" ? "\u00F7" : operator;

  for (toIter = backProb.length - 1; toIter >= 0; toIter--) {
    newText[1][2 - shuf] = backProb[toIter];
    shuf++;
  }

  const answerProb = str.split("=")[1];

  shuf = 0;

  for (toIter = answerProb.length - 1; toIter >= 0; toIter--) {
    newText[2][2 - shuf] = answerProb[toIter];
    shuf++;
  }

  if (ans.trim().length > 0) {
    const ans2 = ans.trim();

    for (toIter = ans2.length - 1; toIter >= 0; toIter--) {
      newText[2][2 - shuf] = ans2[toIter];
      shuf++;
    }
  }

  return newText;
}

/** setCharAt
 *
 * Update character in string
 *
 * @param {string} str Current string
 * @param {number} index Index in string
 * @param {string} chr Replacement character
 * @returns {string}
 */
export function setCharAt(str: string, index: number, chr: string): string {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

/** function
 *
 * @param {number} num
 * @returns {string}
 */
export function padTimeDigits(num: number): string {
  return String(num).padStart(2, "0");
}

/** getColorForEqualsLine
 *
 * @param problemString
 * @param coverProblemSpace
 * @returns
 */
export function getColorForEqualsLine(
  problemString: string,
  coverProblemSpace: boolean
): string {
  if (checkInputNullOrUndefined(problemString)) {
    return "transparent";
  }

  if (problemString.includes("=")) {
    return "black";
  } else {
    if (coverProblemSpace === true) {
      return "gray";
    } else {
      return "transparent";
    }
  }
}
