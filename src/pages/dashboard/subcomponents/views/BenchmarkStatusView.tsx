/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../../utilities/LabelHelper'
import { StudentDataInterface } from '../../../student/interfaces/StudentInterfaces'
import {
    checkIfBenchmarksCompleted,
    checkIfProgrammingCurrent,
} from '../helpers/DashboardSubcomponentHelpers'

export interface BenchmarkStatusView {
    student: StudentDataInterface
}

/** BenchmarkStatusView
 *
 * List out whether benchmarking has come due
 *
 * @param {StudentDataInterface} student document info
 * @returns {Link}
 */
export default function BenchmarkStatusView({
    student,
}: BenchmarkStatusView): JSX.Element {
    const isBenchmarkingCurrent = checkIfProgrammingCurrent(student.dueDate)
    const isBenchmarkingCompleted = checkIfBenchmarksCompleted(student)

    /*
  if (isTutorialCompleted === false) {
    return (
      <Link to={`/tutorial/benchmark/${student.id}`} className="student-list-tail-item">
        <span className="needs-training"></span>
        {""}Complete Initial Tutorial
      </Link>
    );
  }
  */

    if (isBenchmarkingCurrent) {
        const formattedDate = formatDate({
            date: student.dueDate.toDate(),
            format: 'display',
        })
        return (
            <p className="student-list-tail-item">
                <span className="on-track"></span>
                `Benchmarking Starts: ${formattedDate}`
            </p>
        )
    }

    if (isBenchmarkingCompleted) {
        return (
            <p className="student-list-tail-item">
                <span className="benchmark-completed"></span>
                {''}Current Benchmarking Complete
            </p>
        )
    }

    return (
        <Link to={`/probe/${student.id}`} className="student-list-tail-item">
            <span className="needs-review"></span>
            {''}Benchmarking is Due
        </Link>
    )
}
