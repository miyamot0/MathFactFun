/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

/** KeyItem
 *
 * Generate a key with respective character and callback
 *
 * @param {String} char Key
 * @returns {Widget}
 */
export function KeyItem(
  char: string,
  callBackFunction: (arg0: string) => void
): JSX.Element {
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
