/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import firebase from "firebase";
import { StudentDataInterface } from "../../interfaces/StudentInterfaces";
import { CommentInterface } from "../types/CommentTypes";

export interface StudentCommentViewsInterface {
  user: firebase.User | null;
  adminFlag: boolean;
  student: StudentDataInterface;
  updateDocument: (id: string, updates: any) => Promise<void>;
}

export function StudentCommentViews({ user, adminFlag, student, updateDocument }: StudentCommentViewsInterface): JSX.Element {
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
                      } else {
                        return;
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
