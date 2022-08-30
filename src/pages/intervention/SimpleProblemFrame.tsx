import React from "react";

// styles
import "./SimpleProblemFrame.css";

interface SimpleProblemFrameInterface {
  problemStem: string;
  coverProblemSpace: boolean;
  entryString: string;
}

/** createVerticalString
 *
 * Creates a verticalized array for the widget
 *
 * @param {string} str Entered string
 * @param {string} ans Entered answer
 * @returns {string[][]} Array of Arrays, 3x3 gride
 */
function createVerticalString(str: string, ans: string): string[][] {
  str = str.split("=")[0] + "=";

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

  if (ans.trim().length > 0) {
    let ans2 = ans.trim();

    for (toIter = ans2.length - 1; toIter >= 0; toIter--) {
      newText[2][2 - shuf] = ans2[toIter];
      shuf++;
    }
  }

  return newText;
}

export default function SimpleProblemFrame({
  problemStem,
  coverProblemSpace,
  entryString,
}: SimpleProblemFrameInterface) {
  const sharedStyle = {
    backgroundColor: coverProblemSpace ? "gray" : "transparent",
  };

  const colorOfEqualsLine = problemStem.includes("=")
    ? "black"
    : coverProblemSpace
    ? "gray"
    : "transparent";

  if (!problemStem || problemStem.length <= 0) {
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

  const displayMatrix = createVerticalString(problemStem, entryString);

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
