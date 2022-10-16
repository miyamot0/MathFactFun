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
import { FirestoreState } from '../../../../firebase/interfaces/FirebaseInterfaces'
import { StudentDataInterface } from '../../interfaces/StudentInterfaces'
import { handleStudentDelete } from '../helpers/StudentSummaryHelpers'

export interface ShowButtonInterface {
    student: StudentDataInterface
}

export interface ShowAdminButtonInterface {
    user: firebase.User | null
    adminFlag: boolean
    student: StudentDataInterface
    deleteDocument: (id: string) => Promise<void>
    response: FirestoreState
    history: any
}

/** ShowSpecificOutcomesButton
 *
 * @param {StudentDataInterface} student
 * @returns {JSX.Element}
 */
export function ShowSpecificOutcomesButton({
    student,
}: ShowButtonInterface): JSX.Element {
    const hasATarget = student.currentApproach !== 'NA'

    if (hasATarget) {
        return (
            <Link
                to={`/ProgressMonitor/${student.currentTarget}/${student.id}/${student.currentApproach}/${student.aimLine}`}
            >
                <button className="global-btn global-btn-green btn-below">
                    Intervention-specific Targets
                </button>
            </Link>
        )
    } else {
        return <div className="no-specific-outcomes-button"></div>
    }
}

/** ShowSetCreatorButton
 *
 * @param {StudentDataInterface} student
 * @returns {JSX.Element}
 */
export function ShowSetCreatorButton({
    student,
}: ShowButtonInterface): JSX.Element {
    const hasATarget = student.currentTarget !== 'NA'

    if (hasATarget) {
        return (
            <Link to={`/set/${student.currentTarget}/${student.id}`}>
                <button className="global-btn btn-below">
                    Targeted Item Sets
                </button>
            </Link>
        )
    } else {
        return <div className="no-set-items-button"></div>
    }
}

/** ShowAdministrativeButtons
 *
 * @param user
 * @param adminFlag
 * @param handleDeleteEvent
 * @returns {JSX.Element}
 */
export function ShowAdministrativeButtons({
    user,
    adminFlag,
    student,
    deleteDocument,
    response,
    history,
}: ShowAdminButtonInterface): JSX.Element {
    const shouldShowPanel = user && adminFlag

    if (shouldShowPanel) {
        return (
            <div className="student-summary">
                <h2 className="global-page-title">
                    Advanced and Administrative Options
                </h2>
                <hr />

                <button
                    className="global-btn global-btn-red btn-below"
                    onClick={() =>
                        handleStudentDelete(
                            student,
                            deleteDocument,
                            response,
                            history
                        )
                    }
                >
                    Delete Student
                </button>
            </div>
        )
    } else {
        return <div className="no-admin-panel"></div>
    }
}
