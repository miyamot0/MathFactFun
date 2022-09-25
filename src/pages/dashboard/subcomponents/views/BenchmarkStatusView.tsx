/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utilities/LabelHelper";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import {
  checkIfBenchmarksCompleted,
  checkIfProgrammingCurrent,
} from "../helpers/DashboardSubcomponentHelpers";

/** generateWrapper
 *
 * Wrap info in a link, if benchmark is due
 *
 * @param {StudentDataInterface} student document info
 * @returns {Link}
 */
export default function BenchmarkStatusView({
  student,
}: {
  student: StudentDataInterface;
}): JSX.Element {
  const isBenchmarkingCurrent = checkIfProgrammingCurrent(student.dueDate);
  const isBenchmarkingCompleted = checkIfBenchmarksCompleted(student);

  if (isBenchmarkingCurrent) {
    return (
      <p className="student-list-tail-item">
        <span className="on-track"></span>
        {""}Benchmarking Starts:{" "}
        {formatDate({ date: student.dueDate.toDate(), format: "display" })}
      </p>
    );
  }

  if (isBenchmarkingCompleted) {
    return (
      <p className="student-list-tail-item">
        <span className="on-track"></span>
        {""}Current Benchmarking Complete
      </p>
    );
  }

  return (
    <Link to={`/probe/${student.id}`} className="student-list-tail-item">
      <span className="needs-review"></span>
      {""}Benchmarking is Due
    </Link>
  );
}
