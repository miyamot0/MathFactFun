/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { InterventionState } from "../../interfaces/InterventionInterfaces";
import SimpleProblemFrame from "../SimpleProblemFrame";

export interface SimpleProblemItemLayoutInterface {
  state: InterventionState;
}

export default function SimpleProblemItemLayout({
  state,
}: SimpleProblemItemLayoutInterface): JSX.Element {
  return (
    <div
      className="box2ET"
      style={{
        opacity: state.CoverProblemItem ? 0.5 : 1,
        backgroundColor: state.CoverProblemItem ? "gray" : "transparent",
      }}
    >
      <SimpleProblemFrame
        problemStem={state.ViewRepresentationInternal}
        coverProblemSpace={state.CoverProblemItem}
        entryString={state.EntryRepresentationInternal}
      />
    </div>
  );
}
