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

export default function TopHeaderTimed({
  document,
}: {
  approach: string;
  document: StudentDataInterface | null;
  state: InterventionState;
  callbackToSubmit: any;
}): JSX.Element {
  return (
    <div className="topBox">
      <h2>Cover Copy Compare: ({document ? document.name : <></>})</h2>
    </div>
  );
}
