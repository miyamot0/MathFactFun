/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { StudentDataInterface } from '../../../student/interfaces/StudentInterfaces'
import { OutputStyledFeedbackBenchmarking } from '../helpers/DashboardSubcomponentHelpers'
import PlayIcon from '../../../../assets/play.svg'

export interface BenchmarkItemStatusView {
    benchmark: string
    benchmarkCompleted: boolean
    student: StudentDataInterface
}

/** BenchmarkItemStatusView
 *
 * @param {StudentDataInterface} student document info
 * @returns {Link}
 */
export default function BenchmarkItemStatusView({
    benchmark,
    benchmarkCompleted,
    student,
}: BenchmarkItemStatusView): JSX.Element {
    const classNameConditional = benchmarkCompleted
        ? 'benchmarkd-today'
        : 'needs-benchmark'

    return (
        <p>
            <span className={classNameConditional} />

            <OutputStyledFeedbackBenchmarking
                IsCompleted={benchmarkCompleted}
            />

            {!benchmarkCompleted && (
                <Link
                    to={`/benchmark/${student.id}/${benchmark}`}
                    key={student.id}
                    style={{
                        float: 'right',
                        width: 30,
                        height: 30,
                        backgroundColor: '#ff9439',
                        borderRadius: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    className="student-list-settings-link"
                >
                    <img
                        src={PlayIcon}
                        style={{
                            marginLeft: '2px',
                            filter: 'invert(100%)',
                        }}
                        alt="Settings link"
                    ></img>
                </Link>
            )}

            {benchmarkCompleted && (
                <span
                    className="student-list-settings-link"
                    style={{ display: 'inline-block', float: 'right' }}
                >
                    <img src={PlayIcon} alt="Settings link"></img>
                </span>
            )}
        </p>
    )
}
