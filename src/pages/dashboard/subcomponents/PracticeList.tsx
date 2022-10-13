/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {
  InterventionRoutingLink,
} from "./helpers/DashboardSubcomponentHelpers";
import { GetApproachStringFromLabel } from "../../../utilities/LabelHelper";
import { PracticeListInterface } from "../types/DashboardTypes";

import "./styles/PracticeList.css";
import PracticeStatusView from "./views/PracticeStatusView";

export default function PracticeList({ students, }: PracticeListInterface): JSX.Element {

  const addedPaddingStyle = {
    marginTop: "5px",
  }

  if (students === null || students.length === 0) {
    return <p className="no-practice-objects">No students with intervention programmed.</p>;
  } else {
    return (
      <div className="practice-list">
        {students.map((student) => (
          <div className="practice-list-card" key={student.id}>
            <InterventionRoutingLink student={student} />

            <hr />

            <p style={addedPaddingStyle}>
              <b>Approach:</b>{` ${GetApproachStringFromLabel(student.currentApproach)}`}
            </p>

            <p style={addedPaddingStyle}>
              <b>Target:</b> {student.currentTarget} (
              {student.factsTargeted.length} in Set)
            </p>

            <p style={addedPaddingStyle}>
              <b>Items in Set:</b> {student.factsTargeted.length}
            </p>

            <br></br>

            <PracticeStatusView student={student} />
          </div>
        ))}
      </div>
    );
  }
}
