/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import firebase from 'firebase'
import DeleteIcon from '../../../../assets/trash3.svg'
import SettingsIcon from '../../../../assets/gear.svg'
import ItemSetsIcon from '../../../../assets/plus-slash-minus.svg'
import ProgressIcon from '../../../../assets/graph-up.svg'
import IconButton from '../../../../components/IconButton'
import { StudentDataInterface } from '../../interfaces/StudentInterfaces'
import { handleStudentDelete } from '../helpers/StudentSummaryHelpers'
import { FirestoreState } from '../../../../firebase/interfaces/FirebaseInterfaces'

export interface StudentDisplayHeader {
    student: StudentDataInterface
    user: firebase.User | null
    adminFlag: boolean
    deleteDocument: any
    response: FirestoreState
    history: any
}

export default function StudentDisplayHeader({
    student,
    user,
    adminFlag,
    deleteDocument,
    response,
    history,
}: StudentDisplayHeader) {
    const shouldShowPanel = user && adminFlag

    return (
        <h4
            className="student-summary-h4"
            style={{
                width: '100%',
                display: 'inline-block',
            }}
        >
            {`Student Settings: ${student.name} (${student.currentGrade} Grade)`}
            <div
                style={{
                    float: 'right',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                className="student-list-settings-link"
            >
                <IconButton
                    Icon={ProgressIcon}
                    Action={() => {
                        history.push(
                            `/ProgressMonitor/${student.currentTarget}/${student.id}/${student.currentApproach}/${student.aimLine}`
                        )
                    }}
                    BackgroundStyle={'rgb(14, 187, 80)'}
                    AltText={'Button to intervention progress'}
                    Tooltip={'Show detailed intervention outcomes'}
                />

                <IconButton
                    Icon={SettingsIcon}
                    Action={() => {
                        history.push(`/edit/${student.id}`)
                    }}
                    BackgroundStyle={'rgb(51, 146, 235)'}
                    AltText={'Button to edit student details'}
                    Tooltip={'Edit current screening and intervention'}
                />

                <IconButton
                    Icon={ItemSetsIcon}
                    Action={() => {
                        history.push(
                            `/set/${student.currentTarget}/${student.id}`
                        )
                    }}
                    BackgroundStyle={'rgb(51, 146, 235)'}
                    AltText={'Button to edit targeted problems'}
                    Tooltip={'Edit items targeted for intervention'}
                />

                {shouldShowPanel && (
                    <IconButton
                        Icon={DeleteIcon}
                        Action={() => {
                            handleStudentDelete(
                                student,
                                deleteDocument,
                                response,
                                history
                            )
                        }}
                        BackgroundStyle={'red'}
                        AltText={'Button to delete student'}
                        Tooltip={
                            'Delete student (Warning: Point of no return!)'
                        }
                    />
                )}
            </div>
        </h4>
    )
}
