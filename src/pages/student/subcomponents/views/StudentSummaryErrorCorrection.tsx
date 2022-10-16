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

export interface StudentSummaryCurrentErrorCorrection {
    student: StudentDataInterface
}

export default function StudentSummaryCurrentErrorCorrection({
    student,
}: StudentSummaryCurrentErrorCorrection) {
    let backgroundColor = '#000000'

    if (student.currentErrorApproach.includes('Every')) {
        backgroundColor = '#1D8051'
    }
    //else if (student.currentErrorApproach.includes('Never')) {
    //    backgroundColor = '#E3185A'
    //}

    return (
        <>
            <p>
                <b>Current Error Correction Procedure:</b>
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
                    Text={student.currentErrorApproach}
                    BackgroundColor={backgroundColor}
                    Tooltip={`${student.currentErrorApproach} is the current error correction strategy`}
                />
            </div>
        </>
    )
}
