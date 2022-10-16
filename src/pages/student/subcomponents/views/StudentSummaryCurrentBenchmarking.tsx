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

export interface StudentSummaryCurrentBenchmarking {
    student: StudentDataInterface
}

export default function StudentSummaryCurrentBenchmarking({
    student,
}: StudentSummaryCurrentBenchmarking) {
    return (
        <>
            <p
                style={{
                    paddingBottom: '0px',
                    paddingTop: '10px',
                }}
            >
                <b>Skills Targeted for Benchmarking:</b>
            </p>{' '}
            <div
                style={{
                    display: 'flex',
                    paddingBottom: '10px',
                    paddingTop: '10px',
                    flexWrap: 'wrap',
                }}
            >
                {student.currentBenchmarking.map((benchmark) => {
                    let backgroundColor = '#000000'

                    if (benchmark.includes('Addition')) {
                        backgroundColor = '#0FAF4F'
                    } else if (benchmark.includes('Subtraction')) {
                        backgroundColor = '#5488C2'
                    } else if (benchmark.includes('Multiplication')) {
                        backgroundColor = '#EC921A'
                    } else if (benchmark.includes('Division')) {
                        backgroundColor = '#0071C7'
                    }

                    return (
                        <TextButton
                            Text={benchmark.split('-')[0]}
                            key={benchmark}
                            BackgroundColor={backgroundColor}
                            Tooltip={`${
                                benchmark.split('-')[0]
                            } is currently being benchmarked`}
                        />
                    )
                })}
            </div>
        </>
    )
}
