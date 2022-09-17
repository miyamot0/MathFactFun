/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { confirmStringType } from "../../../../utilities/ReducerHelpers";
import { CommentTextInterface } from "../types/CommentTypes";

export enum CommentTextBehavior {
  UpdateComment,
  ThrowError,
}

export const InitialCommentState = {
  Comment: "",
} as CommentTextInterface;

export function commentReducer(state: CommentTextInterface, action: any) {
  switch (action.type) {
    case CommentTextBehavior.UpdateComment:
      return { ...state, Comment: confirmStringType(action.payload) };
    default:
      return state;
  }
}
