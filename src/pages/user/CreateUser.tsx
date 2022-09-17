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
import { UserDataInitialState } from "./functionality/UserFunctionality";
import {
  standardEmailFieldText,
  standardEntryFieldText,
  standardEntryFieldTextArea,
  standardErrorField,
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
        {standardEntryFieldText(
          "Teacher Name:",
          state.Name,
          UserCreatorBehavior.SetName,
          dispatch
        )}

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

        {standardEntryFieldTextArea(
          "Teacher School:",
          state.School,
          UserCreatorBehavior.SetSchool,
          dispatch
        )}

        {standardErrorField(state.FormError)}

        <button className="global-btn global-btn-light-red">
          Create New User
        </button>
      </form>
      <br></br>
    </div>
  );
}
