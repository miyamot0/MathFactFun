/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import { InterventionState } from "../../interfaces/InterventionInterfaces";
import Timer from "../Timer";

export default function TopHeaderTimed({
  approach,
  document,
  state,
  callbackToSubmit,
}: {
  approach: string;
  document: StudentDataInterface | null;
  state: InterventionState;
  callbackToSubmit: any;
}): JSX.Element {
  return (
    <div className="topBoxET">
      <h2 style={{ display: "inline-block" }}>
        {approach}: ({document ? document.name : <></>}), Time:{" "}
        {document ? (
          <Timer
            secondsTotal={state.SecondsLeft}
            startTimerTime={state.StartTime}
            callbackFunction={callbackToSubmit}
          />
        ) : (
          <></>
        )}
      </h2>
    </div>
  );
}
