/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { formatDate } from "../../../../utilities/LabelHelper";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import { checkIfDateCurrent } from "../helpers/DashboardSubcomponentHelpers";

/** PracticeStatusView
 *
 * Wrap info in a view
 *
 * @param {StudentDataInterface} student document info
 * @returns {Link}
 */
export default function PracticeStatusView({
  student,
}: {
  student: StudentDataInterface;
}): JSX.Element {
  return (
    <p>
      {checkIfDateCurrent(student.lastActivity) ? (
        <span className="practiced-today"> </span>
      ) : (
        <span className="needs-practice"> </span>
      )}{" "}
      Last Practice:{" "}
      {formatDate({ date: student.lastActivity.toDate(), format: "display" })}
    </p>
  );
}
