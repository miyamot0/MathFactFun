/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { useParams } from 'react-router-dom'
import { useFirebaseDocumentTyped } from '../../firebase/hooks/useFirebaseDocument'
import { RoutedIdParam } from '../../interfaces/RoutingInterfaces'
import StudentSummary from './subcomponents/StudentSummary'
import StudentComments from './subcomponents/StudentComments'
import './styles/DisplayStudent.css'
import { StudentDataInterface } from './interfaces/StudentInterfaces'

export default function DisplayStudent() {
    const { id } = useParams<RoutedIdParam>()

    const { document, documentError } =
        useFirebaseDocumentTyped<StudentDataInterface>({
            collectionString: 'students',
            idString: id,
        })

    if (documentError) {
        return <div className="error">{documentError}</div>
    } else if (!document) {
        return <div className="loading">Loading...</div>
    } else {
        return (
            <div className="student-details-style">
                <StudentSummary student={document} />
                <StudentComments student={document} />
            </div>
        )
    }
}
