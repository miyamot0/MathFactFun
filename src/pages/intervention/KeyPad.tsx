/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

// styles
import "./KeyPad.css";

interface CallbackInterface {
  (string): void;
}

interface KeypadInterface {
  callBackFunction: CallbackInterface;
  operatorSymbol: string;
  showEquals: boolean;
}

export default function KeyPad({
  callBackFunction,
  operatorSymbol,
  showEquals = true,
}: KeypadInterface) {
  /** KeyItem
   *
   * Generate a key with respective character and callback
   *
   * @param {String} char Key
   * @returns {Widget}
   */
  function KeyItem(char: string): JSX.Element {
    const char2 = char === "\u00F7" ? "/" : char;

    return (
      <div
        className="key-button-section"
        onClick={() => callBackFunction(char2.trim())}
      >
        <p className="key-btn">{char}</p>
      </div>
    );
  }

  if (operatorSymbol === undefined) {
    return (
      <div className="key-pad-wrapper">
        <div className="key1 key-shared">{KeyItem(" 1 ")}</div>
        <div className="key2 key-shared">{KeyItem(" 2 ")} </div>
        <div className="key3 key-shared">{KeyItem(" 3 ")} </div>
        <div className="key4 key-shared">{KeyItem(" + ")} </div>
        <div className="key5 key-shared">{KeyItem(" 4 ")} </div>
        <div className="key6 key-shared">{KeyItem(" 5 ")} </div>
        <div className="key7 key-shared">{KeyItem(" 6 ")}</div>
        <div className="key8 key-shared">{KeyItem(" - ")}</div>
        <div className="key9 key-shared">{KeyItem(" 7 ")}</div>
        <div className="key10 key-shared">{KeyItem(" 8 ")}</div>
        <div className="key11 key-shared">{KeyItem(" 9 ")}</div>
        <div className="key12 key-shared">{KeyItem(" x ")}</div>
        <div className="key13 key-shared">{KeyItem("Del")}</div>
        <div className="key14 key-shared">{KeyItem(" 0 ")}</div>
        <div className="key15 key-shared">{KeyItem(" = ")}</div>
        <div className="key16 key-shared">{KeyItem("\u00F7")}</div>
      </div>
    );
  } else {
    return (
      <div className="key-pad-wrapper">
        <div className="key1 key-shared">{KeyItem(" 1 ")}</div>
        <div className="key2 key-shared">{KeyItem(" 2 ")} </div>
        <div className="key3 key-shared">{KeyItem(" 3 ")} </div>
        <div
          className="key4 key-shared"
          style={{
            visibility: operatorSymbol.includes("+") ? "visible" : "hidden",
          }}
        >
          {KeyItem(" + ")}{" "}
        </div>
        <div className="key5 key-shared">{KeyItem(" 4 ")} </div>
        <div className="key6 key-shared">{KeyItem(" 5 ")} </div>
        <div className="key7 key-shared">{KeyItem(" 6 ")}</div>
        <div
          className="key8 key-shared"
          style={{
            visibility: operatorSymbol.includes("-") ? "visible" : "hidden",
          }}
        >
          {KeyItem(" - ")}
        </div>
        <div className="key9 key-shared">{KeyItem(" 7 ")}</div>
        <div className="key10 key-shared">{KeyItem(" 8 ")}</div>
        <div className="key11 key-shared">{KeyItem(" 9 ")}</div>
        <div
          className="key12 key-shared"
          style={{
            visibility: operatorSymbol.includes("x") ? "visible" : "hidden",
          }}
        >
          {KeyItem(" x ")}
        </div>
        <div className="key13 key-shared">{KeyItem("Del")}</div>
        <div className="key14 key-shared">{KeyItem(" 0 ")}</div>

        {showEquals ? (
          <div className="key15 key-shared">{KeyItem(" = ")}</div>
        ) : (
          <></>
        )}

        <div
          className="key16 key-shared"
          style={{
            visibility: operatorSymbol.includes("/") ? "visible" : "hidden",
          }}
        >
          {KeyItem("\u00F7")}
        </div>
      </div>
    );
  }
}
