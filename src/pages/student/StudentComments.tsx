/**
 * Student comment panel
 */

import React from "react";
import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";
import { useFirestore } from "../../firebase/useFirestore";
import { CommentInterface } from "../../models/StudentModel";

import "./StudentComments.css";

export default function StudentComments({ student }) {
  const { updateDocument, response } = useFirestore("students");
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

    const usersComment = {
      displayName: user.displayName,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      createdBy: user.uid,
      id: Math.random(),
    };

    await updateDocument(student.id, {
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
        (com) => com.id !== currentComment.id
      );

      await updateDocument(student.id, {
        comments: newCommentObj,
      });
    }
  }

  return (
    <div className="student-comments">
      <h4>Student Notes</h4>

      <ul>
        {student.comments.length > 0 &&
          student.comments.map((comment) => (
            <li key={comment.id} style={{ position: "relative" }}>
              {user && adminFlag && (
                <div
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                >
                  <a
                    style={{ textDecoration: "none" }}
                    href="#"
                    onClick={() => removeComment(comment)}
                  >
                    X
                  </a>
                </div>
              )}

              <div className="comment-author">
                <p>
                  {comment.displayName
                    .split(" ")
                    .map(
                      (w) => w[0].toUpperCase() + w.substring(1).toLowerCase()
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

      <form className="add-comment">
        <span>Add a new note:</span>
        <textarea
          required
          onChange={(event) => setNewComment(event.target.value)}
          value={newComment}
        ></textarea>
        <button className="global-btn button-padding" onClick={submitComment}>
          Add Note
        </button>
      </form>
    </div>
  );
}
