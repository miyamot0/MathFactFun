/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import AddIcon from '../../assets/add_icon.svg'
import AdminTable from './views/AdminTable'
import { Link } from 'react-router-dom'
import { useFirebaseCollectionTyped } from '../../firebase/hooks/useFirebaseCollection'
import { UserDataInterface } from '../user/types/UserTypes'

// styles
import './styles/Admin.css'

export default function Admin(): JSX.Element {
    const { documents, error } = useFirebaseCollectionTyped<UserDataInterface>({
        collectionString: 'users',
        queryString: undefined,
        orderString: undefined,
    })

    return (
        <div className="admin-panel">
            <div
                className="admin-header-item"
                style={{
                    display: 'inline-block',
                    width: '100%',
                }}
            >
                <p style={{ display: 'inline-block' }}>
                    Administrative User Dashboard
                </p>

                <Link
                    to={`/createUser`}
                    style={{
                        float: 'right',
                        width: 32,
                        height: 32,
                        backgroundColor: 'rgb(15, 175, 79)',
                        borderRadius: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    className="student-list-settings-link"
                >
                    <img
                        src={AddIcon}
                        style={{
                            marginRight: '1px',
                            filter: 'invert(100%)',
                        }}
                        alt="Add user"
                    />
                </Link>
            </div>

            <AdminTable users={documents} error={error} />
        </div>
    )
}
