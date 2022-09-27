/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase"
import React from "react"

/** LogoutPanel
 * 
 * @param user 
 * @param logoutPending 
 * @param logout 
 * @returns 
 */
export function LogoutPanel({ user, logoutPending, logout }: { user: firebase.User | null; logoutPending: boolean; logout: any; }) {
    if (user) {
        if (logoutPending) {
            return <li><button className="global-btn" onClick={logout}>
                Logging out...
            </button></li>
        } else {
            return <li><button className="global-btn global-btn-red logout" onClick={logout}>
                Logout
            </button></li>
        }
    } else {
        return <></>;
    }
}