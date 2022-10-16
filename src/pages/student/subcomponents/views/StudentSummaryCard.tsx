/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import StudentSummaryCurrentBenchmarking from './StudentSummaryCurrentBenchmarking'
import StudentSummaryCurrentIntervention from './StudentSummaryCurrentIntervention'
import StudentSummaryCurrentTarget from './StudentSummaryCurrentTarget'
import { StudentDataInterface } from '../../interfaces/StudentInterfaces'
import StudentSummaryCurrentSet from './StudentSummaryCurrentSet'
import StudentSummaryCurrentErrorCorrection from './StudentSummaryErrorCorrection'
import StudentSummaryCurrentReinforcementApproach from './StudentSummaryCurrentReinforcementApproach'
import StudentSummaryCurrentAimLine from './StudentCurrentAimLine'

export interface StudentSummaryCardInterface {
    student: StudentDataInterface
}

export default function StudentSummaryCard({
    student,
}: StudentSummaryCardInterface) {
    return (
        <div className="student-summary">
            <h2 className="global-page-title">Current Student Settings</h2>
            <hr />

            <StudentSummaryCurrentBenchmarking student={student} />

            <StudentSummaryCurrentSet student={student} />

            <StudentSummaryCurrentTarget student={student} />

            <StudentSummaryCurrentIntervention student={student} />

            <StudentSummaryCurrentAimLine student={student} />

            <StudentSummaryCurrentReinforcementApproach student={student} />

            <StudentSummaryCurrentErrorCorrection student={student} />

            <p>
                <b>Relevant Programming Details</b>: {student.details}
            </p>
            <p className="due-date">
                Next Benchmark Scheduled:{' '}
                {student.dueDate.toDate().toDateString()}
            </p>
        </div>
    )
}
