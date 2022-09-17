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
import {
  UserDataInitialState,
  UserGenerationReducer,
} from "./functionality/UserFunctionality";
import {
  standardEntryFieldText,
  standardEntryFieldTextArea,
  standardErrorField,
} from "../../utilities/FieldHelpers";
import { verifyUserEdit } from "./helpers/UserHelpers";

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

  if (documentError) {
    return <div className="error">{documentError}</div>;
  } else if (!document) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div style={{ maxWidth: "600px" }} className="edit-user-page">
        <h2 className="global-page-title">Edit current teacher</h2>

        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            verifyUserEdit(
              id,
              state,
              history,
              updateDocument,
              response,
              dispatch
            );
          }}
        >
          {standardEntryFieldText(
            "Teacher Name:",
            state.Name,
            UserCreatorBehavior.SetName,
            dispatch
          )}

          {standardEntryFieldTextArea(
            "Teacher School:",
            state.School,
            UserCreatorBehavior.SetSchool,
            dispatch
          )}

          {standardErrorField(state.FormError)}

          <button className="global-btn ">Edit Teacher</button>
        </form>
        <br></br>
      </div>
    );
  }
}
