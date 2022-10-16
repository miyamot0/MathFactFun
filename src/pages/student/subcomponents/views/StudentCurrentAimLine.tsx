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

export interface StudentSummaryCurrentAimLine {
    student: StudentDataInterface
}

export default function StudentSummaryCurrentAimLine({
    student,
}: StudentSummaryCurrentAimLine) {
    let backgroundColor = '#000000'

    if (student.aimLine >= 40) {
        backgroundColor = '#86ee59'
    } else if (student.aimLine < 40 && student.aimLine >= 30) {
        backgroundColor = '#afed71'
    } else if (student.aimLine < 30 && student.aimLine >= 20) {
        backgroundColor = '#ffd966'
    } else if (student.aimLine < 20 && student.aimLine >= 10) {
        backgroundColor = '#fa9e3e'
    }

    return (
        <>
            <p>
                <b>Current Fluency Aim Line:</b>
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
                    Text={`${student.aimLine} DCPM`}
                    BackgroundColor={backgroundColor}
                    Tooltip={`${student.aimLine} is the current DCPM targeted`}
                />
            </div>
        </>
    )
}
