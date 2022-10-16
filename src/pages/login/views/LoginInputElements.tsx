/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

export interface RenderLoginButton {
    loginPending: boolean | undefined
}

export function RenderLoginButton({
    loginPending,
}: RenderLoginButton): JSX.Element {
    if (loginPending === undefined || loginPending) {
        return <></>
    } else {
        return (
            <button className="global-btn" data-testid="login-button-input">
                Login
            </button>
        )
    }
}

export interface RenderLoading {
    loginPending: boolean | undefined | null
}

export function RenderLoading({ loginPending }: RenderLoading): JSX.Element {
    if (
        loginPending === undefined ||
        loginPending === null ||
        loginPending === true
    ) {
        return (
            <button className="global-btn" disabled>
                loading...
            </button>
        )
    } else {
        return <></>
    }
}

export interface RenderError {
    loginError: string | undefined | null
}

export function RenderError({ loginError }: RenderError): JSX.Element {
    if (loginError === null || loginError === undefined) {
        return <></>
    } else {
        return <div className="error"> {loginError} </div>
    }
}
