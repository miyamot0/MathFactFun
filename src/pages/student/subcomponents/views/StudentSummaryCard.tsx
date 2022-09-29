/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { GetApproachStringFromLabel } from "../../../../utilities/LabelHelper";
import { StudentDataInterface } from "../../interfaces/StudentInterfaces";

export interface StudentSummaryCardInterface {
    student: StudentDataInterface;
}

export default function StudentSummaryCard({ student }: StudentSummaryCardInterface) {
    return <div className="student-summary">
        <h2 className="global-page-title">Student Information</h2>
        <hr />
        <p><b>Current Grade:</b> {student.currentGrade}</p>
        <p><b>Current Target for Intervention:</b> {student.currentTarget}</p>
        <p><b>Current Intervention:</b>{` ${GetApproachStringFromLabel(student.currentApproach)}`}</p>
        <p><b>Details</b>: {student.details}</p>
        <p className="due-date">
            Next Benchmark Scheduled: {student.dueDate.toDate().toDateString()}
        </p>
    </div>
}