/**
 * @jest-environment jsdom
 */

/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from "@testing-library/react-hooks";
import { useReducer } from "react";
import { act } from "react-dom/test-utils";
import {
  commentReducer,
  CommentTextBehavior,
  InitialCommentState,
} from "../StudentCommentBehavior";

describe("Create Student Comment Form: Reducer", () => {
  it("Should match original state", () => {
    const { result } = renderHook(() =>
      useReducer(commentReducer, InitialCommentState)
    );
    const [state] = result.current;

    expect(InitialCommentState).toBe(state);
  });

  it("Should match original state", () => {
    const { result } = renderHook(() =>
      useReducer(commentReducer, InitialCommentState)
    );
    const [state] = result.current;

    expect(InitialCommentState).toBe(state);
  });

  it("Should match original state, DEFAULT", async () => {
    const { result } = renderHook(() =>
      useReducer(commentReducer, InitialCommentState)
    );

    const [, dispatch] = result.current;

    const priorState = result.current;

    dispatch({
      type: CommentTextBehavior.ThrowError,
      payload: {},
    });

    setTimeout(() => {
      expect(result.current[0]).toBe(priorState);
    }, 1000);
  });

  it("Should adjust to comment value change", async () => {
    const newName = "newName";

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(commentReducer, InitialCommentState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: CommentTextBehavior.UpdateComment,
        payload: newName,
      });

      await waitForValueToChange(() => result.current[0].Comment);

      expect(result.current[0].Comment).toBe(newName);
    });
  });
});
