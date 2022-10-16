/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import TextButton from '../../../../components/TextButton'
import { GetApproachStringFromLabel } from '../../../../utilities/LabelHelper'
import { StudentDataInterface } from '../../interfaces/StudentInterfaces'

export interface StudentSummaryCurrentIntervention {
    student: StudentDataInterface
}

export default function StudentSummaryCurrentIntervention({
    student,
}: StudentSummaryCurrentIntervention) {
    const currentApproach = GetApproachStringFromLabel(student.currentApproach)

    let backgroundColor = '#000000'

    if (currentApproach.includes('Explicit')) {
        backgroundColor = '#2596B4'
    } else if (currentApproach.includes('Cover')) {
        backgroundColor = '#5488C2'
    }

    return (
        <>
            <p>
                <b>Current Intervention Approach:</b>
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
                    Text={currentApproach}
                    BackgroundColor={backgroundColor}
                    Tooltip={`${currentApproach} is the current intervention strategy`}
                />
            </div>
        </>
    )
}
