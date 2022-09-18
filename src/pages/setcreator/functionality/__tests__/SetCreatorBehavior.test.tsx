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

import { act, renderHook, WaitOptions } from "@testing-library/react-hooks";
import { useReducer } from "react";
import { ColumnObject, DragDropActions } from "../../types/SetCreatorTypes";
import {
  InitialSetCreatorState,
  SetCreatorReducer,
} from "../SetCreatorBehavior";
import { ItemHistory, SetItem } from "../../interfaces/SetCreatorInterfaces";
import { waitFor } from "@testing-library/react";

describe("Set Creator: Reducer", () => {
  it("Should match original state", () => {
    const { result } = renderHook(() =>
      useReducer(SetCreatorReducer, InitialSetCreatorState)
    );
    const [state] = result.current;

    expect(InitialSetCreatorState).toBe(state);
  });

  it("Should match original state, DEFAULT", async () => {
    act(() => {
      const { result } = renderHook(() =>
        useReducer(SetCreatorReducer, InitialSetCreatorState)
      );

      const [, dispatch] = result.current;

      const priorState = result.current;

      dispatch({
        type: DragDropActions.SetThrow,
        payload: {},
      });

      setTimeout(() => {
        expect(result.current[0]).toBe(priorState);
      }, 1000);
    });
  });

  it("Should update: Callback", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(SetCreatorReducer, InitialSetCreatorState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      const newValue = () => true;

      dispatch({
        type: DragDropActions.LoadCallback,
        payload: newValue,
      });

      await waitForValueToChange(() => result.current[0].Callback);

      expect(result.current[0].Callback).toBe(newValue);
    });
  });

  it("Should update: ItemHistory", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(SetCreatorReducer, InitialSetCreatorState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      const newValue = [
        {
          FactString: "string",
          X: 1,
          Y: 1,
          Latency: 0,
          AverageCorrect: 1,
          Correct: 1,
          Total: 1,
        } as ItemHistory,
      ];

      dispatch({
        type: DragDropActions.SetItemHistory,
        payload: newValue,
      });

      await waitForValueToChange(() => result.current[0].ItemHistory);

      expect(result.current[0].ItemHistory).toBe(newValue);
    });
  });

  it("Should update: SetBaseItems", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(SetCreatorReducer, InitialSetCreatorState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      const newValue = [
        {
          Answer: "string",
          id: "string",
          OTRs: 1,
          Accuracy: 1,
          Latency: 1,
        } as SetItem,
      ];

      dispatch({
        type: DragDropActions.SetBaseItems,
        payload: newValue,
      });

      await waitForValueToChange(() => result.current[0].BaseItems);

      expect(result.current[0].BaseItems).toBe(newValue);
    });
  });

  it("Should update: SetColumns", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(SetCreatorReducer, InitialSetCreatorState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      const newColumnValues = {
        Available: {
          name: "Available",
          items: [],
        },
        Targeted: {
          name: "Targeted",
          items: [],
        },
        Mastered: {
          name: "Mastered",
          items: [],
        },
        Skipped: {
          name: "Skipped",
          items: [],
        },
        Sham: {
          name: "Sham",
          items: [],
        },
      } as ColumnObject;

      const newValue = (a: any, b: any) => true;

      dispatch({
        type: DragDropActions.LoadCallback,
        payload: newValue,
      });

      await waitForValueToChange(() => result.current[0].Callback);

      dispatch({
        type: DragDropActions.UpdateColumns,
        payload: newColumnValues,
      });

      await waitFor(() => {
        expect(result.current[0].columns).toBe(newColumnValues);
      });
    });
  });

  it("Should update: ToggleLoaded", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(SetCreatorReducer, InitialSetCreatorState)
      );

      const [state, dispatch] = result.current;

      const newValue = true;

      dispatch({
        type: DragDropActions.ToggleLoaded,
        payload: newValue,
      });

      const waitOptions = {
        interval: false,
        timeout: false,
      } as WaitOptions;

      await waitForValueToChange(
        () => result.current[0].LoadedData,
        waitOptions
      );

      expect(result.current[0].LoadedData).toBe(newValue);
    });
  });

  // TODO: incomplete!
});
