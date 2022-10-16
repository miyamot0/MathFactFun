/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import StudentFilter from './functionality/StudentFilter'
import StudentList from './subcomponents/StudentList'
import { useState } from 'react'
import { useFirebaseCollectionTyped } from '../../firebase/hooks/useFirebaseCollection'
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext'
import { StudentDataInterface } from '../student/interfaces/StudentInterfaces'
import {
    DashboardErrorMessage,
    DashboardLoadingMessage,
    studentFilterMap,
} from './helpers/DashboardHelpers'
import AnimatedHero from '../landing/views/AnimatedHero'

export default function DashboardDisplay() {
    const { user, adminFlag } = useAuthorizationContext()
    const { documents, error } =
        useFirebaseCollectionTyped<StudentDataInterface>({
            collectionString: 'students',
            queryString:
                user && !adminFlag ? ['creator', '==', user.uid] : undefined,
            orderString: undefined,
        })

    const [filter, setFilter] = useState('Mine')
    const DataType = 'Student'

    /** changeFilter
     *
     * Callback to pass to filter widget
     *
     * @param {String} newFilter Filter criteria
     */
    function changeFilter(newFilter: string): void {
        setFilter(newFilter)
    }

    const students = studentFilterMap(documents, user, filter)

    if (error) {
        return (
            <DashboardErrorMessage documentError={error} dataType={DataType} />
        )
    } else if (document !== null && error === undefined) {
        return (
            <div className="dashboard-page-width-wrapper">
                <AnimatedHero />
                <h2 className="global-page-title">Student Dashboard</h2>
                <StudentFilter changeFilter={changeFilter} />
                {students && <StudentList students={students} />}
            </div>
        )
    } else {
        return (
            <DashboardLoadingMessage
                documentError={error}
                dataType={DataType}
            />
        )
    }
}
