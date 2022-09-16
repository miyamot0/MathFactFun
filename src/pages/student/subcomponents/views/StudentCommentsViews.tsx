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

export function renderCommentListView(user: firebase.User | null, adminFlag: boolean,
    student: StudentDataInterface, removeComment: any): JSX.Element {

    const toShowList = user && student && student.comments.length > 0;

    if (toShowList) {
        return <ul>
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
                                    onClick={() => removeComment(comment)}
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
                                        (w: any) => w[0].toUpperCase() + w.substring(1).toLowerCase()
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
        </ul>;
    } else {
        return <ul></ul>
    }
}

export function renderCommentForm(newComment: string, setNewComment: any, submitComment: any) {
    return <form className="add-comment">
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
}