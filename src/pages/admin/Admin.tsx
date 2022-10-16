/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import AdminUserTable from './views/AdminUserTable'
import { useFirebaseCollectionTyped } from '../../firebase/hooks/useFirebaseCollection'
import { UserDataInterface } from '../user/types/UserTypes'

// styles
import './styles/Admin.css'
import AnimatedHero from '../landing/views/AnimatedHero'

export default function Admin(): JSX.Element {
    const { documents, error } = useFirebaseCollectionTyped<UserDataInterface>({
        collectionString: 'users',
        queryString: undefined,
        orderString: undefined,
    })

    return (
        <div className="admin-panel">
            <AnimatedHero />

            <AdminUserTable users={documents} error={error} />
        </div>
    )
}
