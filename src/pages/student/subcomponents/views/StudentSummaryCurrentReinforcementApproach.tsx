/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import TextButton from '../../../../components/TextButton'
import { StudentDataInterface } from '../../interfaces/StudentInterfaces'

export interface StudentSummaryCurrentReinforcementApproach {
    student: StudentDataInterface
}

export default function StudentSummaryCurrentReinforcementApproach({
    student,
}: StudentSummaryCurrentReinforcementApproach) {
    const backgroundColor = '#000000'

    //if (student.currentSRApproach.includes('None')) {
    //    backgroundColor = '#69A1A0'
    //}

    return (
        <>
            <p>
                <b>Current Reinforcement Procedure:</b>
            </p>
            <div
                style={{
                    display: 'flex',
                    paddingBottom: '10px',
                    paddingTop: '10px',
                    flexWrap: 'wrap',
                }}
            >
                <TextButton
                    Text={student.currentSRApproach}
                    BackgroundColor={backgroundColor}
                    Tooltip={`${student.currentSRApproach} is the current reinforcement strategy`}
                />
            </div>
        </>
    )
}
