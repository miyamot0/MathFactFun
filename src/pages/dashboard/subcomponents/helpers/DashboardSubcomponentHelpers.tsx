/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { StudentDataInterface } from '../../../student/interfaces/StudentInterfaces'

/** generateRouteBaseOnStrategy
 *
 * Generate a link to practice screen
 *
 * @param {string} strategy Intervention type
 * @param {string} target Intervention target
 * @param {string} id Personal id
 * @returns {string} path
 */
export function generateRouteBaseOnStrategy(
    strategy: string | undefined,
    target: string | undefined,
    id: string | undefined | null
): string {
    if (strategy === undefined || target === undefined || id === undefined) {
        return '#!'
    }

    return `/${strategy}/${target}/${id}`
}

/** checkIfDateCurrent
 *
 * Check to see if date within a days difference
 *
 * @param {firebase.firestore.Timestamp} date Stored date, to compare with current
 * @returns {Bool}
 */
export function checkIfDateCurrent(
    date: firebase.firestore.Timestamp | null
): boolean {
    if (date === null) {
        return false
    }

    const dateObj = date.toDate()
    dateObj.setHours(0, 0, 0, 0)

    const dateNow = new Date()
    dateNow.setHours(0, 0, 0, 0)

    return dateNow.getTime() <= dateObj.getTime() ? true : false
}

export interface InterventionRoutingLinkInterface {
    student: StudentDataInterface
}

/** InterventionRoutingLink
 *
 * Build out a widget based on whether student has programming
 *
 * @param {StudentDataInterface} student student instance
 * @returns {JSX.Element}
 */
export function InterventionRoutingLink({
    student,
}: InterventionRoutingLinkInterface): JSX.Element {
    if (student.factsTargeted && student.factsTargeted.length > 0) {
        return (
            <Link
                to={generateRouteBaseOnStrategy(
                    student.currentApproach,
                    student.currentTarget,
                    student.id
                )}
                key={student.id}
            >
                {student.name} ({student.currentGrade})
            </Link>
        )
    } else {
        return (
            <Link
                to={'#!'}
                key={student.id}
                onClick={() => {
                    warnNoProblemsAssigned()
                }}
            >
                {student.name} ({student.currentGrade})
            </Link>
        )
    }
}

/**
 *
 */
export function warnNoProblemsAssigned() {
    window.alert('No math problems have been added to the targeted list yet.')
}

/** checkIfCompletedBenchmark
 *
 * Check to see if date within a days difference
 *
 * @param {StudentDataInterface} student student record
 * @param {string} benchmark benchmark
 * @returns {boolean}
 */
export function checkIfCompletedBenchmark(
    student: StudentDataInterface,
    benchmark: string
): boolean {
    if (student.completedBenchmark.length === 0) {
        return false
    }

    const tag = `${benchmark} ${student.dueDate.toDate().toDateString()}`

    if (student.completedBenchmark.includes(tag)) {
        return true
    } else {
        return false
    }
}

/** checkIfProgrammingCurrent
 *
 * Check to confirm if programming is up to date
 *
 * @param {firebase.firestore.Timestamp} date Check if programming is up to date
 * @returns {boolean}
 */
export function checkIfProgrammingCurrent(
    date: firebase.firestore.Timestamp | null
): boolean {
    if (date === null) {
        return false
    }

    // Note: if diff is negative, we're into the benchmark period
    return date.toDate().valueOf() - new Date().valueOf() > 0
}

/** checkIfBenchmarksCompleted
 *
 * Check to see if benchmarks completed
 *
 * @param {StudentDataInterface} student student record
 * @returns {Bool}
 */
export function checkIfBenchmarksCompleted(
    student: StudentDataInterface
): boolean {
    let confirmedCompleted = true

    student.currentBenchmarking.forEach((bm) => {
        if (!confirmedCompleted) return

        const tag = `${bm} ${student.dueDate.toDate().toDateString()}`

        if (!student.completedBenchmark.includes(tag)) {
            confirmedCompleted = false
        }
    })

    return confirmedCompleted
}

/** generatedStyledFeedback
 *
 * Wrap info in a link, if benchmark is due
 *
 * @param {boolean} isCompleted if probe completed
 * @returns {JSX.Element}
 */
export function generatedStyledFeedback(isCompleted: boolean): JSX.Element {
    return isCompleted ? (
        <span style={{ color: 'green' }}> Completed</span>
    ) : (
        <span style={{ color: 'red' }}> Incomplete</span>
    )
}

export interface WrapperBenchmarkList {
    student: StudentDataInterface
    benchmark: string
    isCompleted: boolean
}

/** generateWrapper
 *
 * Wrap info in a link, if benchmark is due
 *
 * @param {StudentDataInterface} student document info
 * @param {string} benchmark benchmark string
 * @param {boolean} isCompleted boolean flag
 * @returns {Link}
 */
export function WrapperBenchmarkList({
    student,
    benchmark,
    isCompleted,
}: WrapperBenchmarkList): JSX.Element {
    if (isCompleted) {
        return <p className="benchmark-list-card-title">{benchmark}</p>
    } else {
        return (
            <Link to={`/benchmark/${student.id}/${benchmark}`} key={student.id}>
                {benchmark}
            </Link>
        )
    }
}
