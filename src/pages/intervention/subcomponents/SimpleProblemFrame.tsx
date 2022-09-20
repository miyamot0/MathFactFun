/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {
  createVerticalStringSimpleProblemFrame,
  getColorForEqualsLine,
} from "./helpers/ProblemHelpers";
import { SimpleProblemFrameInterface } from "./interfaces/SimpleProblemFrameInterface";

// styles
import "./styles/SimpleProblemFrame.css";

export default function SimpleProblemFrame({
  problemStem,
  coverProblemSpace,
  entryString,
}: SimpleProblemFrameInterface) {
  const sharedStyle = {
    backgroundColor: coverProblemSpace ? "gray" : "transparent",
  };

  const colorOfEqualsLine = getColorForEqualsLine(
    problemStem,
    coverProblemSpace
  );

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

  const displayMatrix = createVerticalStringSimpleProblemFrame(
    problemStem,
    entryString
  );

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
