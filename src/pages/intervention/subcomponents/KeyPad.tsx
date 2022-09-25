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
  return (
    <div className="key-pad-wrapper">
      <KeyItem
        char={" 1 "}
        showEquals={showEquals}
        addedClass={"key1"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" 2 "}
        showEquals={showEquals}
        addedClass={"key2"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" 3 "}
        showEquals={showEquals}
        addedClass={"key3"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" + "}
        showEquals={showEquals}
        addedClass={"key4"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />

      <KeyItem
        char={" 4 "}
        showEquals={showEquals}
        addedClass={"key5"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" 5 "}
        showEquals={showEquals}
        addedClass={"key6"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" 6 "}
        showEquals={showEquals}
        addedClass={"key7"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" - "}
        showEquals={showEquals}
        addedClass={"key8"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />

      <KeyItem
        char={" 7 "}
        showEquals={showEquals}
        addedClass={"key9"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" 8 "}
        showEquals={showEquals}
        addedClass={"key10"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" 9 "}
        showEquals={showEquals}
        addedClass={"key11"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" x "}
        showEquals={showEquals}
        addedClass={"key12"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />

      <KeyItem
        char={"Del"}
        showEquals={showEquals}
        addedClass={"key13"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" 0 "}
        showEquals={showEquals}
        addedClass={"key14"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={" = "}
        showEquals={showEquals}
        addedClass={"key15"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <KeyItem
        char={"\u00F7"}
        showEquals={showEquals}
        addedClass={"key16"}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
    </div>
  );
}
