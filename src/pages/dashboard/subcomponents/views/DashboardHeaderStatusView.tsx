/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import SettingsIcon from '../../../../assets/gear.svg'
import { StudentDataInterface } from '../../../student/interfaces/StudentInterfaces'

export interface DashboardHeaderStatusView {
    student: StudentDataInterface
}

export default function DashboardHeaderStatusView({
    student,
}: DashboardHeaderStatusView) {
    return (
        <div
            className="horizontal-header-student-list-item"
            style={{
                display: 'inline-block',
                width: '100%',
            }}
        >
            <p style={{ display: 'inline-block' }}>
                {student.name} ({student.currentGrade})
            </p>

            <Link
                to={`/student/${student.id}`}
                key={student.id}
                style={{
                    float: 'right',
                    width: 32,
                    height: 32,
                    backgroundColor: '#3392eb',
                    borderRadius: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                className="student-list-settings-link"
            >
                <img
                    src={SettingsIcon}
                    style={{
                        marginRight: '1px',
                        filter: 'invert(100%)',
                    }}
                    alt="Settings link"
                ></img>
            </Link>
        </div>
    )
}
