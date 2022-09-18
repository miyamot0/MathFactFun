/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, renderHook } from "@testing-library/react-hooks";
import { useReducer } from "react";
import { UserGenerationReducer } from "../UserFunctionality";
import { UserDataInitialState } from "../../functionality/UserFunctionality";
import { UserCreatorBehavior } from "../../types/UserTypes";

describe("User Functionality: Reducer behavior", () => {
  it("Should have persisting state", () => {
    const { result } = renderHook(() =>
      useReducer(UserGenerationReducer, UserDataInitialState)
    );

    const [state] = result.current;

    expect(UserDataInitialState).toBe(state);
  });

  it("Should match original state, DEFAULT", async () => {
    act(() => {
      const { result } = renderHook(() =>
        useReducer(UserGenerationReducer, UserDataInitialState)
      );

      const [, dispatch] = result.current;

      const priorState = result.current;

      dispatch({
        type: UserCreatorBehavior.SetThrow,
        payload: {},
      });

      setTimeout(() => {
        expect(result.current[0]).toBe(priorState);
      }, 1000);
    });
  });

  it("test dispatch: SetName", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(UserGenerationReducer, UserDataInitialState)
      );

      const [, dispatch] = result.current;

      const newName = "newName";

      dispatch({
        type: UserCreatorBehavior.SetName,
        payload: {
          uName: newName,
        },
      });

      await waitForValueToChange(() => result.current[0].Name);

      expect(result.current[0].Name).toBe(newName);
    });
  });

  it("test dispatch: SetEmail", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(UserGenerationReducer, UserDataInitialState)
      );

      const [, dispatch] = result.current;

      const newEmail = "newEmail";

      dispatch({
        type: UserCreatorBehavior.SetEmail,
        payload: {
          uEmail: newEmail,
        },
      });

      await waitForValueToChange(() => result.current[0].Email);

      expect(result.current[0].Email).toBe(newEmail);
    });
  });

  it("test dispatch: SetPassword", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(UserGenerationReducer, UserDataInitialState)
      );

      const [, dispatch] = result.current;

      const newPassword = "newPassword";

      dispatch({
        type: UserCreatorBehavior.SetPassword,
        payload: {
          uPassword: newPassword,
        },
      });

      await waitForValueToChange(() => result.current[0].Password);

      expect(result.current[0].Password).toBe(newPassword);
    });
  });

  it("test dispatch: SetSchool", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(UserGenerationReducer, UserDataInitialState)
      );

      const [, dispatch] = result.current;

      const newSchool = "newSchool";

      dispatch({
        type: UserCreatorBehavior.SetSchool,
        payload: {
          uSchool: newSchool,
        },
      });

      await waitForValueToChange(() => result.current[0].School);

      expect(result.current[0].School).toBe(newSchool);
    });
  });

  it("test dispatch: SetLoadedUser", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(UserGenerationReducer, UserDataInitialState)
      );

      const [, dispatch] = result.current;

      dispatch({
        type: UserCreatorBehavior.SetLoadedUser,
        payload: {
          uName: "uName",
          uEmail: "uEmail",
          uSchool: "uSchool",
          uid: "uid",
          uDidBuild: true,
        },
      });

      const newState = {
        ...result.current[0],
        Name: "uName",
        Email: "uEmail",
        School: "uSchool",
        id: "uid",
        DidBuild: true,
      };

      await waitForValueToChange(() => result.current[0].School);

      expect(result.current[0]).toStrictEqual(newState);
    });
  });

  it("test dispatch: SetFormError", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(UserGenerationReducer, UserDataInitialState)
      );

      const [, dispatch] = result.current;

      const newError = "newError";

      dispatch({
        type: UserCreatorBehavior.SetFormError,
        payload: {
          uFormError: newError,
        },
      });

      await waitForValueToChange(() => result.current[0].FormError);

      expect(result.current[0].FormError).toBe(newError);
    });
  });
});
