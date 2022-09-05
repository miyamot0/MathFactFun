/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Student list widget
 */

import React from "react";
import firebase from "firebase/app";

import { Link } from "react-router-dom";
import { GetApproachStringFromLabel } from "../utilities/LabelHelper";

import "./StudentList.css";
import { StudentDataInterface } from "../firebase/types/GeneralTypes";
import { StudentListInterface } from "../pages/dashboard/Types/DashboardTypes";

/** checkIfProgrammingCurrent
 *
 * Check to confirm if programming is up to date
 *
 * @param {firebase.firestore.Timestamp} date Check if programming is up to date
 * @returns {Bool}
 */
function checkIfProgrammingCurrent(
  date: firebase.firestore.Timestamp | null
): boolean {
  if (date === null) {
    return false;
  }

  const dateObj = date.toDate();
  const dateNow = new Date();
  let difference = dateObj.getTime() - dateNow.getTime();
  let daysSince = Math.ceil(difference / (1000 * 3600 * 24));

  let areOnSameDay =
    dateObj.getFullYear() === dateNow.getFullYear() &&
    dateObj.getMonth() === dateNow.getMonth() &&
    dateObj.getDate() === dateNow.getDate();

  return areOnSameDay || daysSince < 1 ? false : true;
}

/** checkIfBenchmarksCompleted
 *
 * Check to see if benchmarks completed
 *
 * @param {StudentDataInterface} student student record
 * @returns {Bool}
 */
function checkIfBenchmarksCompleted(student: StudentDataInterface): boolean {
  let confirmedCompleted = true;

  student.currentBenchmarking.forEach((bm) => {
    if (!confirmedCompleted) return;

    const tag = `${bm} ${student.dueDate!.toDate().toDateString()}`;

    if (!student.completedBenchmark.includes(tag)) {
      confirmedCompleted = false;
    }
  });

  return confirmedCompleted;
}

/** generateWrapper
 *
 * Wrap info in a link, if benchmark is due
 *
 * @param {StudentDataInterface} student document info
 * @returns {Link}
 */
function generateWrapper(student: StudentDataInterface): JSX.Element {
  const isBenchmarkingCurrent = checkIfProgrammingCurrent(student.dueDate);
  const isBenchmarkingCompleted = checkIfBenchmarksCompleted(student);

  if (isBenchmarkingCurrent) {
    return (
      <p>
        <span className="on-track"></span>
        {""}Next Benchmark(s): {student.dueDate!.toDate().toDateString()}
      </p>
    );
  }

  if (isBenchmarkingCompleted) {
    return (
      <p>
        <span className="on-track"></span>
        {""}Current Benchmark(s) Completed
      </p>
    );
  }

  return (
    <Link to={`/probe/${student.id}`}>
      <span className="needs-review"></span>
      {""}Benchmarking Needed
    </Link>
  );
}

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
  return students ? (
    <div className="student-list">
      {students.length === 0 && <p>No students in this category.</p>}
      {students.map((student) => (
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
          {generateWrapper(student)}
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
}
