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
import {
  UserDataInitialState,
  UserGenerationReducer,
} from "./functionality/UserFunctionality";
import {
  StandardEntryFieldText,
  StandardEntryFieldTextArea,
  StandardErrorField,
} from "../../utilities/FieldHelpers";
import { verifyUserEdit } from "./helpers/UserHelpers";
import { UserDispatchLoadedUser } from "./interfaces/UserInterfaces";

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

  if (document && state.DidBuild === false) {
    dispatch(new UserDispatchLoadedUser({
      type: UserCreatorBehavior.SetLoadedUser,
      payload: {
        Name: document.displayName,
        Email: document.displayEmail,
        School: document.displaySchool,
        id: document.id,
        DidBuild: true
      },
    }
    ));
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
          <StandardEntryFieldText
            label={"Teacher Name"}
            currentValue={state.Name}
            type={UserCreatorBehavior.SetName}
            dispatch={dispatch} />

          <StandardEntryFieldTextArea
            label={"Teacher School"}
            currentValue={state.School}
            type={UserCreatorBehavior.SetSchool}
            dispatch={dispatch} />

          <StandardErrorField formError={state.FormError} />

          <button className="global-btn ">Edit Teacher</button>
        </form>
        <br></br>
      </div>
    );
  }
}
