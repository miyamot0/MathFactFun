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

import React from "react";
import { useState } from "react";
import { useFirebaseLogin } from "../../firebase/useFirebaseLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginError, loginPending } = useFirebaseLogin();

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
    login(email, password);
  }

  return (
    <form
      style={{
        maxWidth: "360px",
        margin: "60px auto",
        padding: "40px",
        border: "1px solid #ddd",
        boxShadow: "3px 3px 5px rgba(0,0,0,0.05)",
        background: "#fff",
      }}
      onSubmit={handleLoginSubmission}
    >
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </label>
      {!loginPending && <button className="global-btn ">Login</button>}
      {loginPending && (
        <button className="global-btn " disabled>
          loading
        </button>
      )}
      {loginError && <div className="error">{loginError}</div>}
    </form>
  );
}
