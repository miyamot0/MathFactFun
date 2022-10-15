/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import PracticeStatusView from './views/PracticeStatusView'
import { GetApproachStringFromLabel } from '../../../utilities/LabelHelper'
import { PracticeListInterface } from '../types/DashboardTypes'
import './styles/PracticeList.css'
import PracticeHeaderStatusView from './views/PracticeHeaderStatusView'
import PracticeBodyStatusView from './views/PracticeBodyStatusView'

export default function PracticeList({
    students,
}: PracticeListInterface): JSX.Element {
    if (students === null || students.length === 0) {
        return (
            <p className="no-practice-objects">
                No students with intervention programmed.
            </p>
        )
    } else {
        return (
            <div className="practice-list">
                {students.map((student) => {
                    return (
                        <div className="practice-list-card" key={student.id}>
                            <PracticeHeaderStatusView student={student} />

                            <hr />

                            <PracticeBodyStatusView student={student} />

                            <PracticeStatusView student={student} />
                        </div>
                    )
                })}
            </div>
        )
    }
}
