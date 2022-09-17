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
    case "EditComment":
      return { ...state, Comment: confirmStringType(action.payload) };
    default:
      return state;
  }
}
