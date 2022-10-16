/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import PlayIcon from '../../../../assets/play-24.svg'
import { Link } from 'react-router-dom'
import { StudentDataInterface } from '../../../student/interfaces/StudentInterfaces'
import {
    generateRouteBaseOnStrategy,
    warnNoProblemsAssigned,
} from '../helpers/DashboardSubcomponentHelpers'

export interface PracticeFooterLinkedAction {
    student: StudentDataInterface
    practiceIsCurrent: boolean
}

export default function PracticeFooterLinkedAction({
    student,
    practiceIsCurrent,
}: PracticeFooterLinkedAction) {
    const hasProblemsSet =
        student.factsTargeted && student.factsTargeted.length > 0

    const destination = hasProblemsSet
        ? generateRouteBaseOnStrategy(
              student.currentApproach,
              student.currentTarget,
              student.id
          )
        : '#!'

    return (
        <Link
            to={destination}
            key={student.id}
            style={{
                float: 'right',
                width: 30,
                height: 30,
                backgroundColor: practiceIsCurrent ? '#0ebb50' : '#3392eb',
                borderRadius: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={() => {
                if (!hasProblemsSet) {
                    warnNoProblemsAssigned()
                }
            }}
            className="student-list-settings-link"
        >
            <img
                src={PlayIcon}
                style={{
                    marginLeft: '2px',
                    filter: 'invert(100%)',
                }}
                alt="Settings link"
            ></img>
        </Link>
    )
}
