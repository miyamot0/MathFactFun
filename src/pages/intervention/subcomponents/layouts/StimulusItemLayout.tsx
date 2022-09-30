/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { InterventionState } from "../../interfaces/InterventionInterfaces";
import StimulusFrame from "../StimulusFrame";

export interface StimulusItemLayoutInterface {
  state: InterventionState;
}

export default function StimulusItemLayout({
  state,
}: StimulusItemLayoutInterface): JSX.Element {
  return (
    <div
      className="box1"
      style={{
        opacity: state.CoverStimulusItem ? 0.5 : 1,
        backgroundColor: state.CoverStimulusItem ? "gray" : "transparent",
      }}
    >
      <h2>Problem to Copy</h2>
      <StimulusFrame
        itemString={state.ViewRepresentationInternal}
        operator={state.OperatorSymbol}
        coverStimulusItem={state.CoverStimulusItem}
      />
    </div>
  );
}
