/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Login Page
 */

import React, { useReducer } from "react";
import { useFirebaseLogin } from "../../firebase/hooks/useFirebaseLogin";
import { LoginPanelStyle } from "../../utilities/FormHelpers";
import {
  InitialLoginState,
  UserLoginReducer,
} from "./functionality/LoginBehavior";
import { LoginDataBehavior } from "./types/LoginTypes";

export default function Login() {
  const { login, loginError, loginPending } = useFirebaseLogin();

  const [state, dispatch] = useReducer(UserLoginReducer, InitialLoginState);

  /** handleLoginSubmission
   *
   * Event to handle a submission
   *
   * @param {React.FormEvent<HTMLFormElement>} event Submission event
   */
  function handleLoginSubmission(
    event: React.FormEvent<HTMLFormElement>
  ): void {
    event.preventDefault();
    login(state.Email, state.Password);
  }

  return (
    <form style={LoginPanelStyle} onSubmit={handleLoginSubmission}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          required
          type="email"
          onChange={(e) => {
            dispatch({
              type: LoginDataBehavior.SetEmail,
              payload: e.target.value,
            });
          }}
          value={state.Email}
        ></input>
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type="password"
          onChange={(e) => {
            dispatch({
              type: LoginDataBehavior.SetPassword,
              payload: e.target.value,
            });
          }}
          value={state.Password}
        ></input>
      </label>
      {!loginPending && <button className="global-btn ">Login</button>}
      {loginPending && (
        <button className="global-btn " disabled>
          loading...
        </button>
      )}
      {loginError && <div className="error">{loginError}</div>}
    </form>
  );
}
