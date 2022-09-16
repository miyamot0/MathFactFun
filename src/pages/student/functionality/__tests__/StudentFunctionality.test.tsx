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
import { ErrorHandling } from "../../../../maths/Facts";
import { SingleOptionType } from "../../../../types/SharedComponentTypes";
import {
  StudentCreateSingleInitialState,
  userCreationReducer,
} from "../StudentFunctionality";
import {
  StudentActionObject,
  StudentCreatorBehavior,
} from "../../types/StudentTypes";

describe("Create Student Form: Reducer", () => {
  it("Should match original state", () => {
    const { result } = renderHook(() =>
      useReducer(userCreationReducer, StudentCreateSingleInitialState)
    );
    const [state] = result.current;

    expect(StudentCreateSingleInitialState).toBe(state);
  });

  it("Should match original state, DEFAULT", async () => {
    const { result } = renderHook(() =>
      useReducer(userCreationReducer, StudentCreateSingleInitialState)
    );

    const [, dispatch] = result.current;

    const priorState = result.current;

    dispatch({
      type: StudentCreatorBehavior.SetThrow,
      payload: {},
    } as StudentActionObject);

    setTimeout(() => {
      expect(result.current[0]).toBe(priorState);
    }, 1000);
  });

  it("Should adjust to name change", async () => {
    const newName = "newName";

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
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
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
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

  it("Should adjust to form error: string", async () => {
    const newFormError = "newFormError";

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
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

  it("Should adjust to form error: undefined", async () => {
    const newFormError = undefined;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, {
          ...StudentCreateSingleInitialState,
          FormError: "asdf",
        })
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
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
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
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
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
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
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
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
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

  it("Should adjust to changes in due date", async () => {
    const newCurrentValue = "asdf";

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetDueDate,
        payload: { uDueDate: newCurrentValue },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].DueDate);

      expect(result.current[0].DueDate).toBe(newCurrentValue);
    });
  });

  it("Should adjust to changes in Current SR Approach", async () => {
    const newCurrentValue = {
      value: "None",
      label: "No programmed contingencies",
    } as SingleOptionType;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetCurrentSRApproach,
        payload: { uCurrentSRApproach: newCurrentValue },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].CurrentSRApproach);

      expect(result.current[0].CurrentSRApproach).toBe(newCurrentValue);
    });
  });

  it("Should adjust to changes in Current Benchmarking", async () => {
    const newCurrentValue = [
      { value: "N/A", label: "No Current Target" } as SingleOptionType,
    ];

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetCurrentBenchmarking,
        payload: { uCurrentBenchmarking: newCurrentValue },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].CurrentBenchmarking);

      expect(result.current[0].CurrentBenchmarking).toBe(newCurrentValue);
    });
  });

  it("Should adjust to changes in Current Problem Set", async () => {
    const newCurrentValue = { value: "A", label: "A" } as SingleOptionType;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetProblemSet,
        payload: { uProblemSet: newCurrentValue },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].CurrentProblemSet);

      expect(result.current[0].CurrentProblemSet).toBe(newCurrentValue);
    });
  });

  it("Should adjust to changes in Current Set Built", async () => {
    const newCurrentValue = true;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetBuilt,
        payload: { uDidBuild: newCurrentValue },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].DidBuild);

      expect(result.current[0].DidBuild).toBe(newCurrentValue);
    });
  });

  it("Should adjust to changes in Aim Line", async () => {
    const newCurrentValue = 41;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetAimLine,
        payload: { uAimLine: newCurrentValue },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].AimLine);

      expect(result.current[0].AimLine).toBe(newCurrentValue);
    });
  });

  it("Should adjust to changes in Explicit Timing duration", async () => {
    const newCurrentValue = 5;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetExplicitTime,
        payload: { uExplicitTime: newCurrentValue },
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].ExplicitTime);

      expect(result.current[0].ExplicitTime).toBe(newCurrentValue);
    });
  });

  it("Should adjust to changes Set Load Student", async () => {
    const mockStringValue = "asdfasdfasdf";
    const mockNumberValue = 123123123;
    const mockSingleValue = { value: "A", label: "A" } as SingleOptionType;
    const mockMultiValue = [{ value: "A", label: "A" } as SingleOptionType];

    const newCurrentValue = {
      uName: mockStringValue,
      uDetails: mockStringValue,
      uDueDate: mockStringValue,
      uAimLine: mockNumberValue,
      uExplicitTime: mockNumberValue,
      uCurrentTarget: mockSingleValue,
      uCurrentGrade: mockSingleValue,
      uCurrentApproach: mockSingleValue,
      uCurrentErrorApproach: mockSingleValue,
      uCurrentSRApproach: mockSingleValue,
      uCurrentBenchmarking: mockMultiValue,
      uProblemSet: mockSingleValue,
    };

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(userCreationReducer, StudentCreateSingleInitialState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch({
        type: StudentCreatorBehavior.SetLoadedStudent,
        payload: newCurrentValue,
      } as StudentActionObject);

      await waitForValueToChange(() => result.current[0].Name);

      expect(result.current[0].Name).toBe(newCurrentValue.uName);
      expect(result.current[0].Details).toBe(newCurrentValue.uDetails);
      expect(result.current[0].DueDate).toBe(newCurrentValue.uDueDate);
      expect(result.current[0].AimLine).toBe(newCurrentValue.uAimLine);
      expect(result.current[0].ExplicitTime).toBe(
        newCurrentValue.uExplicitTime
      );

      expect(result.current[0].CurrentTarget).toStrictEqual(
        newCurrentValue.uCurrentTarget
      );
      expect(result.current[0].CurrentGrade).toStrictEqual(
        newCurrentValue.uCurrentGrade
      );
      expect(result.current[0].CurrentApproach).toStrictEqual(
        newCurrentValue.uCurrentApproach
      );
      expect(result.current[0].CurrentErrorApproach).toStrictEqual(
        newCurrentValue.uCurrentErrorApproach
      );
      expect(result.current[0].CurrentSRApproach).toStrictEqual(
        newCurrentValue.uCurrentSRApproach
      );
      expect(result.current[0].CurrentBenchmarking).toStrictEqual(
        newCurrentValue.uCurrentBenchmarking
      );
      expect(result.current[0].CurrentProblemSet).toStrictEqual(
        newCurrentValue.uProblemSet
      );
    });
  });

  // TODO: incomplete!
});
