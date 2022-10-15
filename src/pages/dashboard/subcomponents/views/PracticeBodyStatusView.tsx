/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { GetApproachStringFromLabel } from '../../../../utilities/LabelHelper'
import { StudentDataInterface } from '../../../student/interfaces/StudentInterfaces'

export interface PracticeBodyStatusView {
    student: StudentDataInterface
}

export default function PracticeBodyStatusView({
    student,
}: PracticeBodyStatusView) {
    const addedPaddingStyle = {
        marginTop: '5px',
    }

    return (
        <>
            <p style={addedPaddingStyle}>
                <b>Approach:</b>
                {` ${GetApproachStringFromLabel(student.currentApproach)}`}
            </p>

            <p style={addedPaddingStyle}>
                <b>Target:</b> {student.currentTarget}
            </p>

            <p style={addedPaddingStyle}>
                <b>Items in Set:</b> {student.factsTargeted.length}
            </p>

            <br></br>
        </>
    )
}
