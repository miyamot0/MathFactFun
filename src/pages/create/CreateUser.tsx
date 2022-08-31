/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Create new student object
 */

import React from "react";
import { useState } from "react";
import { useFirestore } from "../../firebase/useFirestore";
import { useHistory } from "react-router-dom";

const CreateFormStyle = {
  maxWidth: "600px",
};

// Page to create new students
export default function CreateUser() {
  const history = useHistory();
  const { addDocument, response } = useFirestore("tempUsers");

  // field values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [formError, setFormError] = useState(null);

  /** handleCreateStudentSubmit
   *
   * Event for creating a student
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  async function handleCreateUserSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setFormError(null);

    if (!name) {
      setFormError("Please enter a name");
      return;
    }

    if (!email) {
      setFormError("Please enter a valid email");
      return;
    }

    if (!school) {
      setFormError("Please enter a school code");
      return;
    }

    const userObject = {
      displayEmail: email,
      displayName: name,
      displaySchool: school,
      password: password,
      id: undefined
    };

    await addDocument(userObject);

    if (!response.error) {
      history.push("/admin");
    }
  }

  return (
    <div style={CreateFormStyle}>
      <h2 className="global-page-title">Add a new user (Teacher)</h2>

      <form onSubmit={handleCreateUserSubmit}>
        <label>
          <span>Teacher Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </label>

        <label>
          <span>Teacher Email:</span>
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

        <label>
          <span>School Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setSchool(e.target.value)}
            value={school}
          ></input>
        </label>
        <button className="global-btn global-btn-light-red">
          Create New User
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>
      <br></br>
    </div>
  );
}
