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

export interface StudentSummaryCurrentSet {
    student: StudentDataInterface
}

export default function StudentSummaryCurrentSet({
    student,
}: StudentSummaryCurrentSet) {
    let backgroundColor = '#000000'

    if (student.problemSet.includes('A')) {
        backgroundColor = '#3D4EBA'
    } else if (student.problemSet.includes('B')) {
        backgroundColor = '#83C71A'
    } else if (student.problemSet.includes('C')) {
        backgroundColor = '#ECFFD0'
    }

    return (
        <>
            <p>
                <b>Current Benchmarking Set:</b>
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
                    Text={`Facts on Fire: Set ${student.problemSet}`}
                    BackgroundColor={backgroundColor}
                    Tooltip={`${student.problemSet} is the item set where benchmarking is pulled from.`}
                />
            </div>
        </>
    )
}
