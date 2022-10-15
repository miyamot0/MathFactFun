/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { GetApproachStringFromLabel } from '../../../utilities/LabelHelper'
import { StudentListInterface } from '../types/DashboardTypes'
import BenchmarkStatusView from './views/BenchmarkStatusView'

import SettingsIcon from '../../../assets/gear.svg'

import './styles/StudentList.css'

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
                                <div
                                    className="horizontal-header-student-list-item"
                                    style={{
                                        display: 'inline-block',
                                        width: '100%',
                                    }}
                                >
                                    <p style={{ display: 'inline-block' }}>
                                        {student.name} ({student.currentGrade})
                                    </p>

                                    <Link
                                        to={`/student/${student.id}`}
                                        key={student.id}
                                        style={{
                                            display: 'inline-block',
                                            float: 'right',
                                        }}
                                        className="student-list-settings-link"
                                    >
                                        <img
                                            src={SettingsIcon}
                                            alt="Settings link"
                                        ></img>
                                    </Link>
                                </div>
                                <hr />
                                <p>
                                    <b>Benchmarking:</b>{' '}
                                    {student.currentBenchmarking.join(', ')}
                                </p>
                                <p>
                                    <b>Intervention:</b>{' '}
                                    {GetApproachStringFromLabel(
                                        student.currentApproach
                                    )}
                                </p>
                                <p>
                                    <b>Intervention Target:</b>{' '}
                                    {student.currentTarget}
                                </p>
                                <p>
                                    <b>Intervention Set Items:</b>{' '}
                                    {student.factsTargeted.length}
                                </p>
                                <br></br>
                            </div>

                            <BenchmarkStatusView student={student} />
                        </div>
                    )
                })}
            </div>
        )
    }
}
