/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Student comment panel
 */

import React, { useReducer } from "react";
import { useAuthorizationContext } from "../../../context/hooks/useAuthorizationContext";
import { useFirestore } from "../../../firebase/hooks/useFirestore";
import { StudentWidgetInterface } from "../interfaces/StudentInterfaces";
import { renderCommentListView } from "./views/StudentCommentsViews";
import {
  commentReducer,
  InitialCommentState,
} from "./functionality/StudentCommentBehavior";
import "./styles/StudentComments.css";
import StudentCommentFormView from "./views/StudentCommentFormView";

export default function StudentComments({ student }: StudentWidgetInterface) {
  const { updateDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );
  const { user, adminFlag } = useAuthorizationContext();
  const [state, dispatch] = useReducer(commentReducer, InitialCommentState);

  return (
    <div className="student-comments">
      <h4>Student Notes</h4>

      {renderCommentListView(user, adminFlag, student, updateDocument)}

      <StudentCommentFormView
        newComment={state.Comment}
        user={user}
        student={student}
        dispatch={dispatch}
        updateDocument={updateDocument}
        response={response}
      />
    </div>
  );
}
