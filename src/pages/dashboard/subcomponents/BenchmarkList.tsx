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
import { BenchmarkInterface } from '../types/DashboardTypes'
import { Link } from 'react-router-dom'
import {
    checkIfCompletedBenchmark,
    WrapperBenchmarkList,
} from './helpers/DashboardSubcomponentHelpers'

import './styles/BenchmarkList.css'

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
                                    <Link
                                        to={`/tutorial/benchmark/${student.id}/${benchmark}`}
                                        className="student-list-tail-item"
                                    >
                                        <span className="needs-training"></span>
                                        {''}Complete Initial Tutorial
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
                                <WrapperBenchmarkList
                                    student={student}
                                    benchmark={benchmark}
                                    isCompleted={benchmarkCompleted}
                                />
                                <hr />
                                <p>
                                    <b>Benchmark Period:</b>{' '}
                                    {student.dueDate.toDate().toDateString()}
                                </p>
                                <BenchmarkItemStatusView
                                    benchmarkCompleted={benchmarkCompleted}
                                />
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}
