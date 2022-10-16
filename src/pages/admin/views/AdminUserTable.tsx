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
import EditIcon from '../../../assets/pencil-fill.svg'
import { Link } from 'react-router-dom'
import { UserDataInterface } from '../../user/types/UserTypes'

export interface AdminUserTable {
    users: UserDataInterface[] | null
    error: string | undefined
}

export default function AdminUserTable({ users, error }: AdminUserTable) {
    if (error) {
        return <p className="error">{error}</p>
    }

    return (
        <div>
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
                            User (Edit)
                        </th>
                        <th
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            Roster (Add)
                        </th>
                        <th
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            Roster (Edit)
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
                                            backgroundColor:
                                                'rgb(255, 148, 57)',
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
                                            backgroundColor:
                                                'rgb(51, 146, 235)',
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
                                    <Link
                                        to={`/editStudents/${user.id}`}
                                        key={`${user.id}-link3`}
                                        style={{
                                            width: 32,
                                            height: 32,
                                            margin: 'auto auto auto auto',
                                            backgroundColor:
                                                'rgb(37, 150, 180)',
                                            borderRadius: 100,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img
                                            src={EditIcon}
                                            style={{
                                                marginRight: '1px',
                                                filter: 'invert(100%)',
                                            }}
                                            alt=" Add Student(s)"
                                        />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
