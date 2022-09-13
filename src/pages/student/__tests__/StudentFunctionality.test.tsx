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
import { ErrorHandling } from "../../../maths/Facts";
import { SingleOptionType } from "../../../types/SharedComponentTypes";
import {
  StudentActionObject,
  StudentCreatorBehavior,
  UserCreateSingleInitialState,
  userCreationReducer,
} from "../functionality/StudentFunctionality";

describe("Create Student Form: Reducer", () => {
  it("Should match original state", () => {
    const { result } = renderHook(() =>
      useReducer(userCreationReducer, UserCreateSingleInitialState)
    );
    const [state] = result.current;

    expect(UserCreateSingleInitialState).toBe(state);
  });

  it("Should adjust to name change", async () => {
    const newName = "newName";

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, UserCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetName,
        payload: { uName: newName },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].Name);

      expect(result.current[0].Name).toBe(newName);
    });
  });

  it("Should adjust to detail changes", async () => {
    const newDetails = "newDetails";

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, UserCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetDetails,
        payload: { uDetails: newDetails },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].Details);

      expect(result.current[0].Details).toBe(newDetails);
    });
  });

  it("Should adjust to form error", async () => {
    const newFormError = "newFormError";

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, UserCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetFormError,
        payload: { uFormError: newFormError },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].FormError);

      expect(result.current[0].FormError).toBe(newFormError);
    });
  });

  it("Should adjust to changes in intervention approach", async () => {
    const newCurrentApproach = {
      value: "Explicit Timing",
      label: "Explicit Timing",
    } as SingleOptionType;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, UserCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetCurrentApproach,
        payload: { uCurrentApproach: newCurrentApproach },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].CurrentApproach);

      expect(result.current[0].CurrentApproach).toBe(newCurrentApproach);
    });
  });

  it("Should adjust to changes in grade", async () => {
    const newCurrentValue = {
      value: "1st",
      label: "First Grade",
    } as SingleOptionType;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, UserCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetCurrentGrade,
        payload: { uCurrentGrade: newCurrentValue },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].CurrentGrade);

      expect(result.current[0].CurrentGrade).toBe(newCurrentValue);
    });
  });

  it("Should adjust to changes in intervention target", async () => {
    const newCurrentValue = {
      value: "Multiplication",
      label: "Multiplication-Single Digit",
    } as SingleOptionType;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, UserCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetCurrentTarget,
        payload: { uCurrentTarget: newCurrentValue },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].CurrentTarget);

      expect(result.current[0].CurrentTarget).toBe(newCurrentValue);
    });
  });

  it("Should adjust to changes in intervention error correction", async () => {
    const newCurrentValue = {
      value: ErrorHandling.Never,
      label: "Do not give error feedback",
    } as SingleOptionType;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, UserCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetCurrentErrorApproach,
        payload: { uCurrentErrorApproach: newCurrentValue },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].CurrentErrorApproach);

      expect(result.current[0].CurrentErrorApproach).toBe(newCurrentValue);
    });
  });

  // TODO: incomplete!
});
