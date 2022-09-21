/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { InterventionState } from "../../interfaces/InterventionInterfaces";
import ProblemFrame from "../ProblemFrame";

export default function ProblemItemLayout({
  state,
}: {
  state: InterventionState;
}): JSX.Element {
  return (
    <div
      className="box2"
      style={{
        opacity: state.CoverProblemItem ? 0.5 : 1,
        backgroundColor: state.CoverProblemItem ? "gray" : "transparent",
      }}
    >
      <h2>My Answer</h2>
      <ProblemFrame
        entryString={state.EntryRepresentationInternal}
        coverProblemSpace={state.CoverProblemItem}
      />
    </div>
  );
}
