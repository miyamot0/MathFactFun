/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import BenchmarkStatusView from './views/BenchmarkStatusView'
import DashboardHeaderStatusView from './views/DashboardHeaderStatusView'
import { GetApproachStringFromLabel } from '../../../utilities/LabelHelper'
import { StudentListInterface } from '../types/DashboardTypes'

import './styles/StudentList.css'
import DashboardBodyStatusView from './views/DashboardBodyStatusView'

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
    if (students === null || students.length === 0) {
        return (
            <p className="no-students-in-list">No students in this category.</p>
        )
    } else {
        return (
            <div className="student-list">
                {students.map((student) => {
                    return (
                        <div className="student-list-card" key={student.id}>
                            <div className="student-list-head-item">
                                <DashboardHeaderStatusView student={student} />

                                <hr />

                                <DashboardBodyStatusView student={student} />
                            </div>

                            <div className="student-list-tail-item">
                                <BenchmarkStatusView student={student} />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
