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

import React from "react";
import { useState } from "react";
import { timestamp } from "../../../firebase/config";
import { useAuthorizationContext } from "../../../context/hooks/useAuthorizationContext";
import { useFirestore } from "../../../firebase/hooks/useFirestore";

import "./styles/StudentComments.css";
import { StudentWidgetInterface } from "../interfaces/StudentInterfaces";
import { CommentInterface } from "./types/CommentTypes";
import { renderCommentForm, renderCommentListView } from "./views/StudentCommentsViews";

export default function StudentComments({ student }: StudentWidgetInterface) {
  const { updateDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );
  const { user, adminFlag } = useAuthorizationContext();

  const [newComment, setNewComment] = useState("");

  /** submitComment
   *
   * Submit comment to firestore
   *
   * @param {React.MouseEvent<HTMLElement>} event Form submit event
   */
  async function submitComment(
    event: React.MouseEvent<HTMLElement>
  ): Promise<void> {
    event.preventDefault();

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
      setNewComment("");
    }
  }

  /** removeComment
   *
   * Remove comment from firestore
   *
   * @param {CommentInterface} currentComment current member of array
   */
  async function removeComment(
    currentComment: CommentInterface
  ): Promise<void> {
    const response = window.confirm("Are you sure you want to delete?");

    if (response) {
      const newCommentObj: CommentInterface[] = student.comments.filter(
        (com: CommentInterface) => com.id !== currentComment.id
      );

      await updateDocument(student.id as string, {
        comments: newCommentObj,
      });
    }
  }

  return (
    <div className="student-comments">
      <h4>Student Notes</h4>

      {renderCommentListView(user, adminFlag, student, removeComment)}

      {renderCommentForm(newComment, setNewComment, submitComment)}

    </div>
  );
}
