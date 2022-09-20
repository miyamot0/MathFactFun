/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { KeypadInterface } from "./interfaces/KeyPadInterfaces";

// styles
import "./styles/KeyPad.css";
import { KeyItem } from "./views/KeyItem";

export default function KeyPad({
  callBackFunction,
  operatorSymbol,
  showEquals = true,
}: KeypadInterface) {
  if (operatorSymbol === undefined) {
    return (
      <div className="key-pad-wrapper">
        <div className="key1 key-shared">
          {KeyItem(" 1 ", callBackFunction)}
        </div>
        <div className="key2 key-shared">
          {KeyItem(" 2 ", callBackFunction)}{" "}
        </div>
        <div className="key3 key-shared">
          {KeyItem(" 3 ", callBackFunction)}{" "}
        </div>
        <div className="key4 key-shared">
          {KeyItem(" + ", callBackFunction)}{" "}
        </div>
        <div className="key5 key-shared">
          {KeyItem(" 4 ", callBackFunction)}{" "}
        </div>
        <div className="key6 key-shared">
          {KeyItem(" 5 ", callBackFunction)}{" "}
        </div>
        <div className="key7 key-shared">
          {KeyItem(" 6 ", callBackFunction)}
        </div>
        <div className="key8 key-shared">
          {KeyItem(" - ", callBackFunction)}
        </div>
        <div className="key9 key-shared">
          {KeyItem(" 7 ", callBackFunction)}
        </div>
        <div className="key10 key-shared">
          {KeyItem(" 8 ", callBackFunction)}
        </div>
        <div className="key11 key-shared">
          {KeyItem(" 9 ", callBackFunction)}
        </div>
        <div className="key12 key-shared">
          {KeyItem(" x ", callBackFunction)}
        </div>
        <div className="key13 key-shared">
          {KeyItem("Del", callBackFunction)}
        </div>
        <div className="key14 key-shared">
          {KeyItem(" 0 ", callBackFunction)}
        </div>
        <div className="key15 key-shared">
          {KeyItem(" = ", callBackFunction)}
        </div>
        <div className="key16 key-shared">
          {KeyItem("\u00F7", callBackFunction)}
        </div>
      </div>
    );
  } else {
    return (
      <div className="key-pad-wrapper">
        <div className="key1 key-shared">
          {KeyItem(" 1 ", callBackFunction)}
        </div>
        <div className="key2 key-shared">
          {KeyItem(" 2 ", callBackFunction)}{" "}
        </div>
        <div className="key3 key-shared">
          {KeyItem(" 3 ", callBackFunction)}{" "}
        </div>
        <div
          className="key4 key-shared"
          style={{
            visibility: operatorSymbol.includes("+") ? "visible" : "hidden",
          }}
        >
          {KeyItem(" + ", callBackFunction)}{" "}
        </div>
        <div className="key5 key-shared">
          {KeyItem(" 4 ", callBackFunction)}{" "}
        </div>
        <div className="key6 key-shared">
          {KeyItem(" 5 ", callBackFunction)}{" "}
        </div>
        <div className="key7 key-shared">
          {KeyItem(" 6 ", callBackFunction)}
        </div>
        <div
          className="key8 key-shared"
          style={{
            visibility: operatorSymbol.includes("-") ? "visible" : "hidden",
          }}
        >
          {KeyItem(" - ", callBackFunction)}
        </div>
        <div className="key9 key-shared">
          {KeyItem(" 7 ", callBackFunction)}
        </div>
        <div className="key10 key-shared">
          {KeyItem(" 8 ", callBackFunction)}
        </div>
        <div className="key11 key-shared">
          {KeyItem(" 9 ", callBackFunction)}
        </div>
        <div
          className="key12 key-shared"
          style={{
            visibility: operatorSymbol.includes("x") ? "visible" : "hidden",
          }}
        >
          {KeyItem(" x ", callBackFunction)}
        </div>
        <div className="key13 key-shared">
          {KeyItem("Del", callBackFunction)}
        </div>
        <div className="key14 key-shared">
          {KeyItem(" 0 ", callBackFunction)}
        </div>

        {showEquals ? (
          <div className="key15 key-shared">
            {KeyItem(" = ", callBackFunction)}
          </div>
        ) : (
          <></>
        )}

        <div
          className="key16 key-shared"
          style={{
            visibility: operatorSymbol.includes("/") ? "visible" : "hidden",
          }}
        >
          {KeyItem("\u00F7", callBackFunction)}
        </div>
      </div>
    );
  }
}
