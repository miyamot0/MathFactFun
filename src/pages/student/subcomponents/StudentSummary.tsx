/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import StudentSummaryCard from './views/StudentSummaryCard'
import StudentDisplayHeader from './views/StudentDisplayHeader'
import { useFirestore } from '../../../firebase/hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import { useAuthorizationContext } from '../../../context/hooks/useAuthorizationContext'
import { StudentWidgetInterface } from '../interfaces/StudentInterfaces'

// styles
import './styles/StudentSummary.css'

export default function StudentSummary({ student }: StudentWidgetInterface) {
    const { deleteDocument, response } = useFirestore(
        'students',
        undefined,
        undefined
    )
    const { user, adminFlag } = useAuthorizationContext()
    const history = useHistory()

    return (
        <div>
            <StudentDisplayHeader
                student={student}
                user={user}
                adminFlag={adminFlag}
                deleteDocument={deleteDocument}
                response={response}
                history={history}
            />

            <StudentSummaryCard student={student} />
        </div>
    )
}
