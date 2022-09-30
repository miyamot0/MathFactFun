/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FormEvent } from "react";
import firebase from "firebase";
import { FirestoreState } from "../../../../firebase/interfaces/FirebaseInterfaces";
import { timestamp } from "../../../../firebase/config";
import { StudentDataInterface } from "../../interfaces/StudentInterfaces";
import { CommentTextBehavior } from "../functionality/StudentCommentBehavior";
import { CommentTextInterface } from "../types/CommentTypes";

export interface StudentCommentFormViewInterface {
  state: CommentTextInterface;
  user: firebase.User | null;
  student: StudentDataInterface;
  dispatch: React.Dispatch<any>;
  updateDocument: (id: string, updates: any) => Promise<void>;
  response: FirestoreState;
}

export default function StudentCommentFormView({
  state,
  user,
  student,
  dispatch,
  updateDocument,
  response,
}: StudentCommentFormViewInterface): JSX.Element {

  async function commentSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (user === null) {
      return;
    }

    let nameCheck = user.displayName ?? "";
    nameCheck = nameCheck.trim().length === 0 ? "Unnamed" : nameCheck;

    const usersComment = {
      displayName: nameCheck,
      content: state.Comment,
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
  }

  return (
    <form className="add-comment" onSubmit={commentSubmission}>
      <span>Add a new note:</span>
      <textarea
        required
        onChange={(event) =>
          dispatch({
            type: CommentTextBehavior.UpdateComment,
            payload: event.target.value,
          })
        }
        value={state.Comment}
      ></textarea>
      <button
        className="global-btn button-padding"
        type="submit">
        Add Note
      </button>
    </form>
  );
}
