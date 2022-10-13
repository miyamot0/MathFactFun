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
import { UserGenerationReducer } from "./functionality/UserFunctionality";
import { UserDataInitialState } from "./functionality/UserFunctionality";
import {
  standardEmailFieldText,
  StandardEntryFieldText,
  StandardEntryFieldTextArea,
  StandardErrorField,
  standardPasswordFieldText,
} from "../../utilities/FieldHelpers";
import { verifyUserCreate } from "./helpers/UserHelpers";

// Page to create new students
export default function CreateUser(): JSX.Element {
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

  return (
    <div style={{ maxWidth: "600px" }} className="create-user-page">
      <h2 className="global-page-title">Add a new user (Teacher)</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          verifyUserCreate(state, history, addDocument, response, dispatch);
        }}
      >
        <StandardEntryFieldText
          label={"Teacher Name"}
          currentValue={state.Name}
          type={UserCreatorBehavior.SetName}
          dispatch={dispatch} />

        {standardEmailFieldText(
          "Teacher Email:",
          state.Email,
          UserCreatorBehavior.SetEmail,
          dispatch
        )}

        {standardPasswordFieldText(
          "Teacher Password:",
          state.Password,
          UserCreatorBehavior.SetPassword,
          dispatch
        )}

        <StandardEntryFieldTextArea
          label={"Teacher School"}
          currentValue={state.School}
          type={UserCreatorBehavior.SetSchool}
          dispatch={dispatch} />

        <StandardErrorField formError={state.FormError} />

        <button className="global-btn global-btn-light-red">
          Create New User
        </button>
      </form>
      <br></br>
    </div>
  );
}
