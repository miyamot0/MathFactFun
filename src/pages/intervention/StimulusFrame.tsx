/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

// styles
import "./StimulusFrame.css";

interface StimulusFrameInterface {
  itemString: string;
  operator: string;
  coverStimulusItem: boolean;
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
function setCharAt(str: string, index: number, chr: string): string {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

/** PanelItem
 *
 * Create a panel for entry
 *
 * @param {string} char Character for panel
 * @returns {JSX.Element}
 */
function PanelItem(char: string): JSX.Element {
  return (
    <div className="stimulus-button-section">
      <p className="stimulus-btn">{char}</p>
    </div>
  );
}

export default function StimulusFrame({
  itemString,
  operator,
  coverStimulusItem,
}: StimulusFrameInterface) {
  const sharedStyle = {
    backgroundColor: coverStimulusItem ? "gray" : "transparent",
    color: coverStimulusItem ? "gray" : "black",
  };

  if (!itemString || itemString.length <= 0 || !operator) {
    return (
      <div className="stimulus-block-wrapper">
        <div
          className="stimulus-block1 stimulus-block-shared"
          style={sharedStyle}
        ></div>
        <div
          className="stimulus-block2 stimulus-block-shared"
          style={sharedStyle}
        ></div>
        <div
          className="stimulus-block3 stimulus-block-shared"
          style={sharedStyle}
        ></div>
        <div
          className="stimulus-block4 stimulus-block-shared"
          style={sharedStyle}
        ></div>
        <div
          className="stimulus-block5 stimulus-block-shared"
          style={sharedStyle}
        ></div>
        <div
          className="stimulus-block6 stimulus-block-shared"
          style={sharedStyle}
        ></div>
        <div
          className="stimulus-equalsLine"
          style={{
            backgroundColor: coverStimulusItem ? "gray" : "transparent",
          }}
        ></div>
        <div
          className="stimulus-block7 stimulus-block-shared"
          style={sharedStyle}
        ></div>
        <div
          className="stimulus-block8 stimulus-block-shared"
          style={sharedStyle}
        ></div>
        <div
          className="stimulus-block9 stimulus-block-shared"
          style={sharedStyle}
        ></div>
      </div>
    );
  }

  const upperPortion = itemString.split("=")[0].split(operator);
  const upperPortionA = upperPortion[0].padStart(3, " ");
  const upperPortionB = upperPortion[1].padStart(3, " ");
  const lowerPortion = itemString.split("=")[1].padStart(3, " ");

  const catchChar = operator === "/" ? "\u00F7" : operator;

  const newUpperPortionB = setCharAt(upperPortionB, 0, catchChar);

  return (
    <div className="stimulus-block-wrapper">
      <div
        className="stimulus-block1 stimulus-block-shared"
        style={sharedStyle}
      >
        {PanelItem(upperPortionA[0])}
      </div>
      <div
        className="stimulus-block2 stimulus-block-shared"
        style={sharedStyle}
      >
        {PanelItem(upperPortionA[1])}
      </div>
      <div
        className="stimulus-block3 stimulus-block-shared"
        style={sharedStyle}
      >
        {PanelItem(upperPortionA[2])}
      </div>
      <div
        className="stimulus-block4 stimulus-block-shared"
        style={sharedStyle}
      >
        {PanelItem(newUpperPortionB[0])}
      </div>
      <div
        className="stimulus-block5 stimulus-block-shared"
        style={sharedStyle}
      >
        {PanelItem(newUpperPortionB[1])}
      </div>
      <div
        className="stimulus-block6 stimulus-block-shared"
        style={sharedStyle}
      >
        {PanelItem(newUpperPortionB[2])}
      </div>
      <div
        className="stimulus-equalsLine"
        style={{
          backgroundColor: coverStimulusItem ? "gray" : "black",
        }}
      ></div>
      <div
        className="stimulus-block7 stimulus-block-shared"
        style={sharedStyle}
      >
        {PanelItem(lowerPortion[0])}
      </div>
      <div
        className="stimulus-block8 stimulus-block-shared"
        style={sharedStyle}
      >
        {PanelItem(lowerPortion[1])}
      </div>
      <div
        className="stimulus-block9 stimulus-block-shared"
        style={sharedStyle}
      >
        {PanelItem(lowerPortion[2])}
      </div>
    </div>
  );
}
