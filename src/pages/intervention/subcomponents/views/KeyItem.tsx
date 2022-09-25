/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import RippleButton from "./RipplingButton";

/** KeyItem
 *
 * Generate a key with respective character and callback
 *
 * @param {String} char Key
 * @returns {Widget}
 */
export function KeyItem({
  char,
  addedClass,
  operatorSymbol,
  showEquals,
  callBackFunction,
}: {
  char: string;
  addedClass: string;
  operatorSymbol: string;
  showEquals: boolean;
  callBackFunction: (arg0: string) => void;
}): JSX.Element {
  const char2 = char === "\u00F7" ? "/" : char;

  let showKey = true;

  if (addedClass === "key16" && !operatorSymbol.includes("/")) {
    showKey = false;
  } else if (addedClass === "key12" && !operatorSymbol.includes("x")) {
    showKey = false;
  } else if (addedClass === "key8" && !operatorSymbol.includes("-")) {
    showKey = false;
  } else if (addedClass === "key4" && !operatorSymbol.includes("+")) {
    showKey = false;
  } else if (addedClass === "key15" && !showEquals) {
    showKey = false;
  }

  let rippleColor = "ripple-button-green";

  if (addedClass === "key15") {
    rippleColor = "ripple-button-lightblue";
  } else if (addedClass === "key13") {
    rippleColor = "ripple-button-red";
  } else if (
    addedClass === "key4" ||
    addedClass === "key8" ||
    addedClass === "key12" ||
    addedClass === "key16"
  ) {
    rippleColor = "ripple-button-purple";
  }

  const classList = `key-shared key-button-section ${addedClass} ${rippleColor}`;

  return (
    <RippleButton
      classList={classList}
      char={char}
      showKey={showKey}
      onClick={callBackFunction}
    />
    /*
    <div
      className={classList}
      style={{
        visibility: showKey ? "visible" : "hidden",
      }}
      onClick={() => callBackFunction(char2.trim())}
    >
      {char}
    </div>
    */
  );
}
