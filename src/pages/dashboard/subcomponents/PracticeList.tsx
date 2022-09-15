/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {
  checkIfDateCurrent,
  dynamicallyGenerateLink,
} from "./helpers/DashboardSubcomponentHelpers";
import { GetApproachStringFromLabel } from "../../../utilities/LabelHelper";
import { PracticeListInterface } from "../types/DashboardTypes";

import "./styles/PracticeList.css";

export default function PracticeList({
  students,
}: PracticeListInterface): JSX.Element {
  const errMessage =
    students.length === 0 ? (
      <p>No students receiving intervention in this category.</p>
    ) : (
      <></>
    );

  const outputDisplay = students ? (
    students.map((student) => (
      <div className="practice-list-card" key={student.id}>
        {dynamicallyGenerateLink(student)}
        <hr />
        <p
          style={{
            marginTop: "5px",
          }}
        >
          <b>Approach:</b> {GetApproachStringFromLabel(student.currentApproach)}
        </p>
        <p
          style={{
            marginTop: "5px",
          }}
        >
          <b>Target:</b> {student.currentTarget} ({student.factsTargeted.length}{" "}
          in Set)
        </p>
        <p
          style={{
            marginTop: "5px",
          }}
        >
          <b>Items in Set:</b> {student.factsTargeted.length}
        </p>
        <br></br>
        <p>
          {checkIfDateCurrent(student.lastActivity) ? (
            <span className="practiced-today"> </span>
          ) : (
            <span className="needs-practice"> </span>
          )}{" "}
          Last Practice: {student.lastActivity.toDate().toDateString()}
        </p>
      </div>
    ))
  ) : (
    <></>
  );

  return students ? (
    <div className="practice-list">
      {errMessage}

      {outputDisplay}
    </div>
  ) : (
    <div></div>
  );
}
