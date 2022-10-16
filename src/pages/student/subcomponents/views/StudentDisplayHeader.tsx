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
import { StudentDataInterface } from '../../interfaces/StudentInterfaces'
import { handleStudentDelete } from '../helpers/StudentSummaryHelpers'
import { FirestoreState } from '../../../../firebase/interfaces/FirebaseInterfaces'
import IconButton from '../../../../components/IconButton'

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

    /**
<div
    style={{
        float: 'right',
        width: 32,
        height: 32,
        marginLeft: '10px',
        backgroundColor: 'rgb(51, 146, 235)',
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}
>
    <img
        src={SettingsIcon}
        style={{
            marginRight: '0px',
            filter: 'invert(100%)',
        }}
        onClick={() => {
            history.push(`/edit/${student.id}`)
        }}
        alt="Settings link"
    ></img>
</div>

<div
    style={{
        float: 'right',
        width: 32,
        height: 32,
        marginLeft: '10px',
        backgroundColor: 'rgb(51, 146, 235)',
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}
>
    <img
        src={ItemSetsIcon}
        style={{
            marginRight: '0px',
            filter: 'invert(100%)',
        }}
        onClick={() => {
            history.push(
                `/set/${student.currentTarget}/${student.id}`
            )
        }}
        alt="Settings link"
    ></img>
</div>

<div
    style={{
        float: 'right',
        width: 32,
        height: 32,
        marginLeft: '10px',
        backgroundColor: 'red',
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}
>
    <img
        src={DeleteIcon}
        style={{
            marginRight: '0px',
            filter: 'invert(100%)',
        }}
        onClick={() =>
            handleStudentDelete(
                student,
                deleteDocument,
                response,
                history
            )
        }
        alt="Settings link"
    ></img>
</div>

*/

    return (
        <h4
            className="student-summary-h4"
            style={{
                width: '100%',
                display: 'inline-block',
            }}
        >
            Student Settings: {student.name}
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
                    Icon={SettingsIcon}
                    Action={() => {
                        history.push(`/edit/${student.id}`)
                    }}
                    backgroundStyle={'rgb(51, 146, 235)'}
                    altText={'Enter settings'}
                />

                <IconButton
                    Icon={ItemSetsIcon}
                    Action={() => {
                        history.push(
                            `/set/${student.currentTarget}/${student.id}`
                        )
                    }}
                    backgroundStyle={'rgb(51, 146, 235)'}
                    altText={'Enter settings'}
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
                        backgroundStyle={'red'}
                        altText={'Delete student'}
                    />
                )}
            </div>
        </h4>
    )
}
