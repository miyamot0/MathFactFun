/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import SettingsIcon from '../../../assets/gear.svg'
import AddIcon from '../../../assets/add_icon.svg'
import { Link } from 'react-router-dom'
import { UserDataInterface } from '../../user/types/UserTypes'

export interface AdminTable {
    users: UserDataInterface[] | null
    error: string | undefined
}

export default function AdminTable({ users, error }: AdminTable) {
    if (error) {
        return <p className="error">{error}</p>
    }

    return (
        <table className="adminTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>School</th>
                    <th
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Edit User
                    </th>
                    <th
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Add to Roster
                    </th>
                    <th
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Edit Programming
                    </th>
                </tr>
            </thead>
            <tbody>
                {users &&
                    users.map((user) => (
                        <tr key={`${user.id}-row`}>
                            <td>{user.id}</td>
                            <td>{user.displayEmail}</td>
                            <td>{user.displayName}</td>
                            <td>{user.displaySchool}</td>
                            <td
                                style={{
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                }}
                            >
                                <Link
                                    to={`/editUser/${user.id}`}
                                    key={`${user.id}-link1`}
                                    style={{
                                        width: 32,
                                        height: 32,
                                        margin: 'auto auto auto auto',
                                        backgroundColor: 'rgb(255, 148, 57)',
                                        borderRadius: 100,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={SettingsIcon}
                                        style={{
                                            marginRight: '1px',
                                            filter: 'invert(100%)',
                                        }}
                                        alt="Edit user"
                                    />
                                </Link>
                            </td>
                            <td
                                style={{
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                }}
                            >
                                <Link
                                    to={`/createStudents/${user.id}`}
                                    key={`${user.id}-link2`}
                                    style={{
                                        width: 32,
                                        height: 32,
                                        margin: 'auto auto auto auto',
                                        backgroundColor: 'rgb(51, 146, 235)',
                                        borderRadius: 100,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={AddIcon}
                                        style={{
                                            marginRight: '1px',
                                            filter: 'invert(100%)',
                                        }}
                                        alt=" Add Student(s)"
                                    />
                                </Link>
                            </td>
                            <td
                                style={{
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                }}
                            >
                                ---
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}
