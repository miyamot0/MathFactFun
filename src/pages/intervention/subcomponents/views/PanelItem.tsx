/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

/** PanelItem
 *
 * Create a panel for entry
 *
 * @param {string} char Character for panel
 * @returns {JSX.Element}
 */
export function PanelItem(char: string): JSX.Element {
  return (
    <div className="stimulus-button-section">
      <p className="stimulus-btn">{char}</p>
    </div>
  );
}
