/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import firebase from "firebase";
import { timestamp } from "../../../../firebase/config";
import { StudentDataInterface } from "../../interfaces/StudentInterfaces";
import { CommentInterface } from "../types/CommentTypes";
import { FirestoreState } from "../../../../firebase/interfaces/FirebaseInterfaces";
import { CommentTextBehavior } from "../functionality/StudentCommentBehavior";

export function renderCommentListView(
  user: firebase.User | null,
  adminFlag: boolean,
  student: StudentDataInterface,
  updateDocument: (id: string, updates: any) => Promise<void>
): JSX.Element {
  const toShowList = user && student && student.comments.length > 0;

  if (toShowList) {
    return (
      <ul>
        {student.comments.length > 0 &&
          student.comments.map((comment: CommentInterface) => (
            <li key={comment.id} style={{ position: "relative" }}>
              {user && adminFlag && (
                <div
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                >
                  <a
                    style={{ textDecoration: "none" }}
                    href="#!"
                    onClick={async () => {
                      const response = window.confirm(
                        "Are you sure you want to delete?"
                      );

                      if (
                        response &&
                        student.id !== null &&
                        student.id !== undefined
                      ) {
                        const newCommentObj: CommentInterface[] =
                          student.comments.filter(
                            (com: CommentInterface) => com.id !== comment.id
                          );

                        await updateDocument(student.id, {
                          comments: newCommentObj,
                        });
                      }
                    }}
                  >
                    X
                  </a>
                </div>
              )}

              <div className="comment-author">
                <p>
                  {comment.displayName
                    ?.split(" ")
                    .map(
                      (w: any) =>
                        w[0].toUpperCase() + w.substring(1).toLowerCase()
                    )
                    .join(" ")}
                </p>
              </div>
              <div className="comment-date">
                <p>{comment.createdAt.toDate().toLocaleDateString("en-US")}</p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
    );
  } else {
    return <ul></ul>;
  }
}

/** renderCommentForm
 *
 * @param newComment
 * @param user
 * @param student
 * @param setNewComment
 * @param updateDocument
 * @param response
 * @returns
 */
export function renderCommentForm(
  newComment: string,
  user: firebase.User | null,
  student: StudentDataInterface,
  dispatch: React.Dispatch<any>,
  updateDocument: (id: string, updates: any) => Promise<void>,
  response: FirestoreState
) {
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
