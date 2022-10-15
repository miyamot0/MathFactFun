/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { formatDate } from '../../../../utilities/LabelHelper'
import { StudentDataInterface } from '../../../student/interfaces/StudentInterfaces'

export interface PracticeFooterLinkedSummary {
    practiceIsCurrent: boolean
    student: StudentDataInterface
}

export default function PracticeFooterLinkedSummary({
    practiceIsCurrent,
    student,
}: PracticeFooterLinkedSummary) {
    const statusBadge = practiceIsCurrent ? 'practiced-today' : 'needs-training'

    return (
        <div className="p-needs-training" style={{ display: 'inline-block' }}>
            <span className={statusBadge}> </span>
            <span
                style={{
                    color: practiceIsCurrent ? '#0ebb50' : 'rgb(51, 146, 235)',
                }}
            >
                Last Practice:{' '}
                {formatDate({
                    date: student.lastActivity.toDate(),
                    format: 'display',
                })}
            </span>
        </div>
    )
}
