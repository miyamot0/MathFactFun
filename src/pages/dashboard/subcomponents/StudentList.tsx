/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Link } from "react-router-dom";
import { GetApproachStringFromLabel } from "../../../utilities/LabelHelper";
import { StudentListInterface } from "../types/DashboardTypes";
import { generateWrapperStudentList } from "./helpers/DashboardSubcomponentHelpers";
import "./styles/StudentList.css";

/** StudentList
 *
 * Construct list of widgets per student
 *
 * @param {StudentDataInterface[]} students array of students
 * @returns {Link}
 */
export default function StudentList({
  students,
}: StudentListInterface): JSX.Element {
  const errMessage =
    students.length === 0 ? <p>No students in this category.</p> : <></>;

  const outputDisplay = students ? (
    students.map((student) => (
      <div className="student-list-card" key={student.id}>
        <Link to={`/student/${student.id}`} key={student.id}>
          {student.name} ({student.currentGrade})
        </Link>

        <hr />
        <p>
          <b>Benchmarking:</b> {student.currentBenchmarking.join(", ")}
        </p>
        <p>
          <b>Intervention:</b>{" "}
          {GetApproachStringFromLabel(student.currentApproach)}
        </p>
        <p>
          <b>Intervention Target:</b> {student.currentTarget}
        </p>
        <p>
          <b>Intervention Set Items:</b> {student.factsTargeted.length}
        </p>
        <br></br>
        {generateWrapperStudentList(student)}
      </div>
    ))
  ) : (
    <></>
  );

  return students ? (
    <div className="student-list">
      {errMessage}

      {outputDisplay}
    </div>
  ) : (
    <div></div>
  );
}
