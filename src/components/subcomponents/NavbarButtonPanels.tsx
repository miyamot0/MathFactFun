/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase"
import React from "react"

/** exportLogoutPanel
 * 
 * @param user 
 * @param logoutPending 
 * @param logout 
 * @returns 
 */
export function exportLogoutPanel(user: firebase.User | null, logoutPending: boolean, logout: any) {
    if (user) {
        if (logoutPending) {
            return <button className="global-btn" onClick={logout}>
                Logging out...
            </button>
        } else {
            return <button className="global-btn global-btn-red" onClick={logout}>
                Logout
            </button>
        }
    } else {
        return <></>;
    }
}