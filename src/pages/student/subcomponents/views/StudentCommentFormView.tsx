/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import firebase from "firebase";
import { FirestoreState } from "../../../../firebase/interfaces/FirebaseInterfaces";
import { timestamp } from "../../../../firebase/config";
import { StudentDataInterface } from "../../interfaces/StudentInterfaces";
import { CommentTextBehavior } from "../functionality/StudentCommentBehavior";

export interface StudentCommentFormViewInterface {
  newComment: string;
  user: firebase.User | null;
  student: StudentDataInterface;
  dispatch: React.Dispatch<any>;
  updateDocument: (id: string, updates: any) => Promise<void>;
  response: FirestoreState;
}

export default function StudentCommentFormView({
  newComment,
  user,
  student,
  dispatch,
  updateDocument,
  response,
}: StudentCommentFormViewInterface): JSX.Element {
  return (
    <form className="add-comment">
      <span>Add a new note:</span>
      <textarea
        required
        onChange={(event) =>
          dispatch({
            type: CommentTextBehavior.UpdateComment,
            payload: event.target.value,
          })
        }
        value={newComment}
      ></textarea>
      <button
        className="global-btn button-padding"
        onClick={async () => {
          if (user === null) {
            return;
          }

          const usersComment = {
            displayName: user.displayName,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            createdBy: user.uid,
            id: Math.random(),
          };

          await updateDocument(student.id as string, {
            comments: [...student.comments, usersComment],
          });

          if (!response.error) {
            dispatch({
              type: CommentTextBehavior.UpdateComment,
              payload: "",
            });
          }
        }}
      >
        Add Note
      </button>
    </form>
  );
}
