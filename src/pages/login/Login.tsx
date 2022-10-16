/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer } from 'react'
import LoginAnimatedBackground from './views/LoginAnimatedBackground'
import { useFirebaseLogin } from '../../firebase/hooks/useFirebaseLogin'
import { LoginDataBehavior } from './types/LoginTypes'
import {
    InitialLoginState,
    UserLoginReducer,
} from './functionality/LoginBehavior'

import './styles/LoginStyles.css'

export default function Login(): JSX.Element {
    const { login, loginError, loginPending } = useFirebaseLogin()

    const [state, dispatch] = useReducer(UserLoginReducer, InitialLoginState)

    /* istanbul ignore next */
    /** handleLoginSubmission
     *
     * Event to handle a submission
     *
     * @param {React.FormEvent<HTMLFormElement>} event Submission event
     */
    async function handleLoginSubmission(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        /* istanbul ignore next */
        if (event && state.Email && state.Password) {
            event.preventDefault()
            await login(state.Email, state.Password)
        }
    }

    /* istanbul ignore next */
    /** handleOnEmailChange
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e value
     * @returns {void}
     */
    function handleOnEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        /* istanbul ignore next */
        if (!dispatch || !e.target.value) {
            return
        } else {
            dispatch({
                type: LoginDataBehavior.SetEmail,
                payload: e.target.value,
            })
        }
    }

    /* istanbul ignore next */
    /** handleOnPasswordChange
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e value
     * @returns {void}
     */
    function handleOnPasswordChange(
        e: React.ChangeEvent<HTMLInputElement>
    ): void {
        /* istanbul ignore next */
        if (!dispatch || !e.target.value) {
            throw Error('Error in password handler')
        } else {
            dispatch({
                type: LoginDataBehavior.SetPassword,
                payload: e.target.value,
            })
        }
    }

    /** renderLoginButton
     *
     * @returns {JSX.Element}
     */
    function renderLoginButton(): JSX.Element {
        /* istanbul ignore next */
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

    /** renderLoading
     *
     * @returns {JSX.Element}
     */
    function renderLoading(): JSX.Element {
        /* istanbul ignore next */
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

    /** renderError
     *
     * @returns {JSX.Element}
     */
    function renderError(): JSX.Element {
        /* istanbul ignore next */
        if (loginError === null || loginError === undefined) {
            return <></>
        } else {
            return <div className="error"> {loginError} </div>
        }
    }

    return (
        <div>
            <h2 className="centered-title">Math Fact Fun</h2>

            <form className="login-form" onSubmit={handleLoginSubmission}>
                <h2>Login</h2>
                <label>
                    <span>Email:</span>
                    <input
                        required
                        type="email"
                        data-testid="login-email-input"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            /* istanbul ignore next */
                            handleOnEmailChange(e)
                        }}
                        value={state.Email}
                    ></input>
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        required
                        type="password"
                        data-testid="login-pass-input"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            /* istanbul ignore next */
                            handleOnPasswordChange(e)
                        }}
                        value={state.Password}
                    ></input>
                </label>

                {renderLoginButton()}

                {renderLoading()}

                {renderError()}
            </form>
            <LoginAnimatedBackground />
        </div>
    )
}
