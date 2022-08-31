/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

// styles
import "./ProblemFrame.css";

interface ProblemFrameInterface {
  entryString: string;
  coverProblemSpace: boolean;
}

/** createVerticalString
 *
 * Creates a verticalized array for the widget
 *
 * @param {string} str Entered string
 * @returns {string[][]} Array of Arrays, 3x3 gride
 */
function createVerticalString(str: string): string[][] {
  let operator = "";
  let toIter = 0;

  let newText = [];
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
    let frontProb = str.split(operator)[0];

    let shuf = 0;

    for (toIter = frontProb.length - 1; toIter >= 0; toIter--) {
      newText[0][2 - shuf] = frontProb[toIter];
      shuf++;
    }

    let backProb = str.split(operator)[1];

    shuf = 0;

    newText[1][0] = operator === "/" ? "\u00F7" : operator;

    for (toIter = backProb.length - 1; toIter >= 0; toIter--) {
      newText[1][2 - shuf] = backProb[toIter];
      shuf++;
    }
  }

  // Just lines
  if (!str.includes("=") && str.includes(operator)) {
    let frontProb = str.split(operator)[0];

    let shuf = 0;

    for (toIter = frontProb.length - 1; toIter >= 0; toIter--) {
      newText[0][2 - shuf] = frontProb[toIter];
      shuf++;
    }

    let backProb = str.split(operator)[1];

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
    let preAnswer = str.split("=")[0];
    let frontProb = preAnswer.split(operator)[0];

    let shuf = 0;

    for (toIter = frontProb.length - 1; toIter >= 0; toIter--) {
      newText[0][2 - shuf] = frontProb[toIter];
      shuf++;
    }

    let backProb = preAnswer.split(operator)[1];

    shuf = 0;

    newText[1][0] = operator === "/" ? "\u00F7" : operator;

    for (toIter = backProb.length - 1; toIter >= 0; toIter--) {
      newText[1][2 - shuf] = backProb[toIter];
      shuf++;
    }

    let answerProb = str.split("=")[1];

    shuf = 0;

    for (toIter = answerProb.length - 1; toIter >= 0; toIter--) {
      newText[2][2 - shuf] = answerProb[toIter];
      shuf++;
    }

    return newText;
  }

  return newText;
}

export default function ProblemFrame({
  entryString,
  coverProblemSpace,
}: ProblemFrameInterface) {
  const sharedStyle = {
    backgroundColor: coverProblemSpace ? "gray" : "transparent",
  };

  const colorOfEqualsLine = entryString.includes("=")
    ? "black"
    : coverProblemSpace
      ? "gray"
      : "transparent";

  if (!entryString || entryString.length <= 0) {
    return (
      <div className="block-wrapper">
        <div className="block1 block-shared" style={sharedStyle}></div>
        <div className="block2 block-shared" style={sharedStyle}></div>
        <div className="block3 block-shared" style={sharedStyle}></div>
        <div className="block4 block-shared" style={sharedStyle}></div>
        <div className="block5 block-shared" style={sharedStyle}></div>
        <div className="block6 block-shared" style={sharedStyle}></div>
        <div
          className="stimulus-equalsLine"
          style={{
            backgroundColor: colorOfEqualsLine,
          }}
        ></div>
        <div className="block7 block-shared" style={sharedStyle}></div>
        <div className="block8 block-shared" style={sharedStyle}></div>
        <div className="block9 block-shared" style={sharedStyle}></div>
      </div>
    );
  }

  const displayMatrix = createVerticalString(entryString);

  return (
    <div className="block-wrapper">
      <div className="block1 block-shared">{displayMatrix[0][0]}</div>
      <div className="block2 block-shared">{displayMatrix[0][1]}</div>
      <div className="block3 block-shared">{displayMatrix[0][2]}</div>
      <div className="block4 block-shared">{displayMatrix[1][0]}</div>
      <div className="block5 block-shared">{displayMatrix[1][1]}</div>
      <div className="block6 block-shared">{displayMatrix[1][2]}</div>
      <div
        className="stimulus-equalsLine"
        style={{
          backgroundColor: colorOfEqualsLine,
        }}
      ></div>
      <div className="block7 block-shared">{displayMatrix[2][0]}</div>
      <div className="block8 block-shared">{displayMatrix[2][1]}</div>
      <div className="block9 block-shared">{displayMatrix[2][2]}</div>
    </div>
  );
}
