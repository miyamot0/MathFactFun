/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Benchmark list widget
 */

import React from 'react'
import BenchmarkItemStatusView from './views/BenchmarkItemStatusView'
import PlayIcon from '../../../assets/play.svg'
import { BenchmarkInterface } from '../types/DashboardTypes'
import { Link } from 'react-router-dom'
import { checkIfCompletedBenchmark } from './helpers/DashboardSubcomponentHelpers'

import './styles/BenchmarkList.css'

/**

 */

export default function BenchmarkList({
    student,
}: BenchmarkInterface): JSX.Element {
    if (student === null || student.currentBenchmarking.length === 0) {
        return <p className="benchmark-no-targets">No benchmarking targets</p>
    } else {
        return (
            <div className="benchmark-list" key={student.id}>
                {student.currentBenchmarking.map((benchmark: string) => {
                    const benchmarkCompleted = checkIfCompletedBenchmark(
                        student,
                        benchmark
                    )

                    let needsTutorial = false

                    if (
                        benchmark.includes('Addition') &&
                        !student.TutorialBenchmarkAddition
                    ) {
                        needsTutorial = true
                    } else if (
                        benchmark.includes('Subtraction') &&
                        !student.TutorialBenchmarkSubtraction
                    ) {
                        needsTutorial = true
                    } else if (
                        benchmark.includes('Multiplication') &&
                        !student.TutorialBenchmarkMultiplication
                    ) {
                        needsTutorial = true
                    } else if (
                        benchmark.includes('Division') &&
                        !student.TutorialBenchmarkDivision
                    ) {
                        needsTutorial = true
                    }

                    if (needsTutorial) {
                        return (
                            <div
                                className="benchmark-list-card"
                                style={{
                                    opacity: benchmarkCompleted ? 0.5 : 1,
                                }}
                                key={`${student.id}-${benchmark}`}
                            >
                                <div className="benchmark-list-head-item">
                                    <div
                                        className="horizontal-header-benchmark-list-item"
                                        style={{
                                            display: 'inline-block',
                                            width: '100%',
                                        }}
                                    >
                                        <p>{`${benchmark}`}</p>
                                    </div>

                                    <hr />
                                    <p>
                                        <b>Benchmark Period:</b>{' '}
                                        {student.dueDate
                                            .toDate()
                                            .toDateString()}
                                    </p>

                                    <br></br>
                                </div>
                                <div className="benchmark-list-tail-item">
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
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div
                                className="benchmark-list-card"
                                style={{
                                    opacity: benchmarkCompleted ? 0.5 : 1,
                                }}
                                key={`${student.id}-${benchmark}`}
                            >
                                <div className="benchmark-list-head-item">
                                    <div
                                        className="horizontal-header-benchmark-list-item"
                                        style={{
                                            display: 'inline-block',
                                            width: '100%',
                                        }}
                                    >
                                        <p>{`${benchmark}`}</p>
                                    </div>
                                    <hr />
                                    <p>
                                        <b>Benchmark Period:</b>{' '}
                                        {student.dueDate
                                            .toDate()
                                            .toDateString()}
                                    </p>
                                </div>
                                <br />
                                <div className="benchmark-list-tail-item">
                                    <BenchmarkItemStatusView
                                        benchmarkCompleted={benchmarkCompleted}
                                        student={student}
                                        benchmark={benchmark}
                                    />
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}
