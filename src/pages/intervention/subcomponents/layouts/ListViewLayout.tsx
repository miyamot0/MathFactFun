/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { InterventionState } from "../../interfaces/InterventionInterfaces";

export default function ListViewLayout({
  className,
  state,
  captureItemClick,
}: {
  className: string;
  state: InterventionState;
  captureItemClick: any;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: state.CoverListViewItems ? 0.5 : 1,
        backgroundColor: state.CoverListViewItems ? "gray" : "transparent",
      }}
    >
      <h2>Items in Stimulus Set</h2>
      <ul className="list-styling">
        {state.WorkingData ? (
          state.WorkingData.map((fact) => {
            return (
              <li
                className="list-styling clickable-li-ccc"
                key={fact}
                onClick={() => captureItemClick(fact)}
              >
                {fact.split(":")[0]}
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
