/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * User Edit Page
 */

import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "../../firebase/hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { useFirebaseDocumentTyped } from "../../firebase/hooks/useFirebaseDocument";
import { RoutedIdParam } from "../../interfaces/RoutingInterfaces";
import { UserCreatorBehavior, UserDataInterface } from "./types/UserTypes";
import { streamlinedCheck } from "../../utilities/FormHelpers";
import { UserDataInitialState, UserGenerationReducer } from "./functionality/UserFunctionality";

export default function EditUser() {
  const history = useHistory();
  const { id } = useParams<RoutedIdParam>();

  const { document, documentError } =
    useFirebaseDocumentTyped<UserDataInterface>({
      collectionString: "users",
      idString: id,
    });

  const { updateDocument, response } = useFirestore(
    "users",
    undefined,
    undefined
  );

  const [state, dispatch] = useReducer(
    UserGenerationReducer,
    UserDataInitialState
  );

  if (document && !state.DidBuild) {
    dispatch({
      type: UserCreatorBehavior.SetLoadedUser,
      payload: {
        uName: document.displayName,
        uEmail: document.displayEmail,
        uSchool: document.displaySchool,
        uid: document.id,
      },
    });
  }

  /** handleEditFormSubmit
   *
   * Submission event for student edit form
   *
   * @param {React.FormEvent<HTMLFormElement>} event Submitted event
   */
  async function handleEditFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<any> {
    event.preventDefault();

    if (document === null || id === undefined) {
      return;
    }

    dispatch({
      type: UserCreatorBehavior.SetFormError,
      payload: { uFormError: undefined },
    });

    if (streamlinedCheck(state.Name, "Please enter a valid name", dispatch)) {
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

    const teacherObject = {
      displayName: state.Name,
      displaySchool: state.School,
    };

    await updateDocument(id, teacherObject);

    if (!response.error || response.success === true) {
      history.push(`/admin`);
    } else {
      alert(response.error);
    }

    return null;
  }

  if (documentError) {
    return <div className="error">{documentError}</div>;
  } else if (!document) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div style={{ maxWidth: "600px" }}>
        <h2 className="global-page-title">Edit current teacher</h2>

        <form onSubmit={handleEditFormSubmit}>
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

          <button className="global-btn ">Edit Teacher</button>
          {state.FormError && <p className="error">{state.FormError}</p>}
        </form>
        <br></br>
      </div>
    );
  }
}
