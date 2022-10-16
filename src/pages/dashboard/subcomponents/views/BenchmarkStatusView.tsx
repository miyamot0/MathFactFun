/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import PlayIcon from '../../../../assets/play-24.svg'
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

/**
 * color: rgb(255, 148, 57);
    <span className={'needs-training'} />
    <span style={{ color: '#3392eb' }}>
        {' '}
        Complete Tutorial
    </span>

    <Link
        to={`/tutorial/benchmark/${student.id}/${benchmark}`}
        key={student.id}
        style={{
            float: 'right',
            width: 30,
            height: 30,
            backgroundColor: '#3392eb',
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
            }}
            alt="Settings link"
        ></img>
    </Link>
 */

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

    if (isBenchmarkingCurrent) {
        const formattedDate = formatDate({
            date: student.dueDate.toDate(),
            format: 'display',
        })
        return (
            <p className="student-list-tail-item">
                <span className="benchmark-completed"></span>
                `Benchmarking Starts: ${formattedDate}`
            </p>
        )
    }

    if (isBenchmarkingCompleted) {
        return (
            <>
                <span className="benchmark-completed"></span>
                <span style={{ color: '#0ebb50' }}>Benchmarking Complete</span>

                <Link
                    to={'#!'}
                    key={student.id}
                    style={{
                        float: 'right',
                        width: 30,
                        height: 30,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
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
            </>
        )
    }

    return (
        <>
            <span className={'needs-benchmark'} />
            <span style={{ color: 'rgb(255, 148, 57)' }}>
                {' '}
                Benchmarking is Due
            </span>

            <Link
                to={`/probe/${student.id}`}
                key={student.id}
                style={{
                    float: 'right',
                    width: 30,
                    height: 30,
                    backgroundColor: 'rgb(255, 148, 57)',
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
        </>
    )
}

/**

        <Link to={`/probe/${student.id}`} className="student-list-tail-item">
            <span className="needs-review"></span>
            {''}Benchmarking is Due
        </Link>
 */
