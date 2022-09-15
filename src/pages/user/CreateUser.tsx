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

import React, { useReducer } from "react";
import { useFirestore } from "../../firebase/hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { UserCreatorBehavior } from "./types/UserTypes";
import { streamlinedCheck } from "../../utilities/FormHelpers";
import { UserGenerationReducer } from "./functionality/UserFunctionality";
import { UserDataInitialState } from "./interfaces/UserInterfaces";

// Page to create new students
export default function CreateUser() {
  const history = useHistory();
  const { addDocument, response } = useFirestore(
    "tempUsers",
    undefined,
    undefined
  );

  const [state, dispatch] = useReducer(
    UserGenerationReducer,
    UserDataInitialState
  );

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

    dispatch({
      type: UserCreatorBehavior.SetFormError,
      payload: { uFormError: undefined },
    });

    if (streamlinedCheck(state.Name, "Please enter a valid name", dispatch)) {
      return;
    }

    if (
      streamlinedCheck(
        state.Email,
        "Please enter a valid email address",
        dispatch
      )
    ) {
      return;
    }

    if (
      streamlinedCheck(
        state.School,
        "Please enter a valid school name",
        dispatch
      )
    ) {
      return;
    }

    const userObject = {
      displayEmail: state.Email,
      displayName: state.Name,
      displaySchool: state.School,
      password: state.Password,
      id: undefined,
    };

    await addDocument(userObject);

    if (!response.error) {
      history.push("/admin");
    }
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2 className="global-page-title">Add a new user (Teacher)</h2>

      <form onSubmit={handleCreateUserSubmit}>
        <label>
          <span>Teacher Name:</span>
          <input
            required
            type="text"
            onChange={(e) => {
              dispatch({
                type: UserCreatorBehavior.SetName,
                payload: { uName: e.target.value },
              });
            }}
            value={state.Name}
          ></input>
        </label>

        <label>
          <span>Teacher Email:</span>
          <input
            required
            type="email"
            onChange={(e) => {
              dispatch({
                type: UserCreatorBehavior.SetEmail,
                payload: { uEmail: e.target.value },
              });
            }}
            value={state.Email}
          ></input>
        </label>

        <label>
          <span>Teacher Password:</span>
          <input
            required
            type="password"
            onChange={(e) => {
              dispatch({
                type: UserCreatorBehavior.SetPassword,
                payload: { uPassword: e.target.value },
              });
            }}
            value={state.Password}
          ></input>
        </label>

        <label>
          <span>Teacher School:</span>
          <textarea
            required
            onChange={(e) => {
              dispatch({
                type: UserCreatorBehavior.SetSchool,
                payload: { uSchool: e.target.value },
              });
            }}
            value={state.School}
          ></textarea>
        </label>
        <button className="global-btn global-btn-light-red">
          Create New User
        </button>
        {state.FormError && <p className="error">{state.FormError}</p>}
      </form>
      <br></br>
    </div>
  );
}
