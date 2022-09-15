/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { act, renderHook } from "@testing-library/react-hooks";
import { useReducer } from "react";
import {
  authorizationReducer,
  AuthorizationStates,
  InitialAuthorizationState,
} from "../AuthorizationBehavior";

describe("Authorization Behavior: Reducer behavior", () => {
  it("Should have persisting state", () => {
    const { result } = renderHook(() =>
      useReducer(authorizationReducer, InitialAuthorizationState)
    );
    const [state] = result.current;

    expect(InitialAuthorizationState).toBe(state);
  });

  it("test dispatch: LOGIN", async () => {
    act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(authorizationReducer, InitialAuthorizationState)
      );

      const [, dispatch] = result.current;

      const newAuth = { uid: "123" } as firebase.User;

      dispatch({
        type: AuthorizationStates.LOGIN,
        payload: newAuth,
        payload2: false,
      });

      await waitForValueToChange(() => result.current[0].user);

      expect(result.current[0].user).toBe(newAuth);
    });
  });

  it("test dispatch: LOGOUT", async () => {
    act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(authorizationReducer, InitialAuthorizationState)
      );

      const [, dispatch] = result.current;

      dispatch({
        type: AuthorizationStates.LOGOUT,
        payload: null,
        payload2: false,
      });

      await waitForValueToChange(() => result.current[0].user);

      expect(result.current[0].user).toBe(null);
    });
  });

  it("test dispatch: READY", async () => {
    act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(authorizationReducer, InitialAuthorizationState)
      );

      const [, dispatch] = result.current;

      const newAuth = { uid: "123" } as firebase.User;

      dispatch({
        type: AuthorizationStates.READY,
        payload: newAuth,
        payload2: true,
      });

      await waitForValueToChange(() => result.current[0].user);
      await waitForValueToChange(() => result.current[0].adminFlag);

      expect(result.current[0].user).toBe(newAuth);
      expect(result.current[0].adminFlag).toBe(true);
    });
  });

  it("test dispatch: CLAIMS", async () => {
    act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(authorizationReducer, InitialAuthorizationState)
      );

      const [, dispatch] = result.current;

      const newAuth = { uid: "123" } as firebase.User;

      dispatch({
        type: AuthorizationStates.CLAIMS,
        payload: newAuth,
        payload2: true,
      });

      await waitForValueToChange(() => result.current[0].user);
      await waitForValueToChange(() => result.current[0].adminFlag);

      expect(result.current[0].user).toBe(newAuth);
      expect(result.current[0].adminFlag).toBe(true);
    });
  });
});
