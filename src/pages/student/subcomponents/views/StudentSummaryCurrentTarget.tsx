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

export interface StudentSummaryCurrentTarget {
    student: StudentDataInterface
}

export default function StudentSummaryCurrentTarget({
    student,
}: StudentSummaryCurrentTarget) {
    let backgroundColor = '#000000'

    if (student.currentTarget.includes('Addition')) {
        backgroundColor = '#0FAF4F'
    } else if (student.currentTarget.includes('Subtraction')) {
        backgroundColor = '#5488C2'
    } else if (student.currentTarget.includes('Multiplication')) {
        backgroundColor = '#EC921A'
    } else if (student.currentTarget.includes('Division')) {
        backgroundColor = '#0071C7'
    }

    return (
        <>
            <p>
                <b>Specific Skill Targeted for Intervention:</b>
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
                    Text={student.currentTarget}
                    BackgroundColor={backgroundColor}
                    Tooltip={`${
                        student.currentTarget.split('-')[0]
                    } is currently targeted for intervention`}
                />
            </div>
        </>
    )
}
