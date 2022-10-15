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

export interface DashboardBodyStatusView {
    student: StudentDataInterface
}

export default function DashboardBodyStatusView({
    student,
}: DashboardBodyStatusView) {
    return (
        <>
            <p>
                <b>Benchmarking:</b> {student.currentBenchmarking.join(', ')}
            </p>
            <p>
                <b>Intervention:</b>{' '}
                {GetApproachStringFromLabel(student.currentApproach)}
            </p>
            <p>
                <b>Intervention Target:</b> {student.currentTarget}
            </p>
            <p>
                <b>Intervention Set Items:</b> {student.factsTargeted.length}
            </p>
            <br></br>
        </>
    )
}
