/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useReducer } from "react";
import {
  DispatchUpdateEntryInternal,
  DispatchUpdateIntroduceItem,
  DispatchUpdatePreLoadContent,
  DispatchUpdateRetryItem,
} from "../../interfaces/InterventionInterfaces";
import {
  InitialInterventionState,
  InterventionActions,
  InterventionReducer,
  overwriteOnlyExisting,
  SharedActionSequence,
} from "../InterventionBehavior";

describe("overwriteOnlyExisting", () => {
  it("Should Fail if not an authorized type ", () => {
    const state = InitialInterventionState;
    const value = {};

    waitFor(() => {
      expect(() =>
        overwriteOnlyExisting(
          state,
          value as unknown as DispatchUpdateEntryInternal
        )
      ).toThrowError(Error("Didn't match"));
    });
  });

  describe("DispatchUpdatePreLoadContent", () => {
    it("DispatchUpdatePreLoadContent, proper update", () => {
      const state = InitialInterventionState;

      const newAction = SharedActionSequence.Start;
      const newWorkingData: string[] = [];
      const newLoadedData = true;
      const newOperator = "+";
      const newSecondsLeft = 120;

      const value = new DispatchUpdatePreLoadContent({
        payload: {
          CurrentAction: newAction,
          WorkingData: newWorkingData,
          LoadedData: newLoadedData,
          OperatorSymbol: newOperator,
          SecondsLeft: newSecondsLeft,
        },
      });

      const result = overwriteOnlyExisting(state, value);

      waitFor(() => {
        expect(result.CurrentAction).toBe(newAction);
        expect(result.WorkingData).toBe(newWorkingData);
        expect(result.LoadedData).toBe(newLoadedData);
        expect(result.OperatorSymbol).toBe(newOperator);
        expect(result.SecondsLeft).toBe(newSecondsLeft);
      });
    });
  });

  describe("DispatchUpdateEntryInternal ", () => {
    it("DispatchUpdateEntryInternal, proper update", () => {
      const state = InitialInterventionState;

      const newString = "1";

      const value = new DispatchUpdateEntryInternal({
        payload: {
          EntryRepresentationInternal: newString,
        },
      });

      const result = overwriteOnlyExisting(state, value);

      waitFor(() => {
        expect(result.EntryRepresentationInternal).toBe(newString);
      });
    });

    it("DispatchUpdateEntryInternal, undefined update", () => {
      const state = InitialInterventionState;

      const newString = undefined as unknown as string;

      const value = new DispatchUpdateEntryInternal({
        payload: {
          EntryRepresentationInternal: newString,
        },
      });

      const result = overwriteOnlyExisting(state, value);

      waitFor(() => {
        expect(result.EntryRepresentationInternal).toBe(newString);
      });
    });
  });

  describe("DispatchUpdateIntroduceItem ", () => {
    it("DispatchUpdateIntroduceItem, proper update", () => {
      const state = InitialInterventionState;

      const newButtonShowValue = true;
      const newIsOngoingValue = true;
      const newCoverListViewItemsValue = true;
      const newListItemValue = "1+1=2";

      const newCurrentAction = SharedActionSequence.Begin;
      const newWorkingData = ["1+2=3"];
      const newButtonText = "button";

      const newCoverProblemItem = true;
      const newPreTrialTime = new Date();
      const newEntryRepresentationInternal = "";
      const newStartTime = new Date();
      const newViewRepresentationInternal = "123";

      const value = new DispatchUpdateIntroduceItem({
        payload: {
          ShowButton: newButtonShowValue,
          IsOngoing: newIsOngoingValue,
          CoverListViewItems: newCoverListViewItemsValue,
          NextLiItem: newListItemValue,
          CurrentAction: newCurrentAction,
          WorkingData: newWorkingData,
          ButtonText: newButtonText,
          CoverProblemItem: newCoverProblemItem,
          PreTrialTime: newPreTrialTime,
          EntryRepresentationInternal: newEntryRepresentationInternal,
          StartTime: newStartTime,
          ViewRepresentationInternal: newViewRepresentationInternal,
        },
      });

      const result = overwriteOnlyExisting(state, value);

      waitFor(() => {
        expect(result.ShowButton).toBe(newButtonShowValue);
        expect(result.IsOngoing).toBe(newIsOngoingValue);
        expect(result.CoverListViewItems).toBe(newCoverListViewItemsValue);
        expect(result.NextLiItem).toBe(newListItemValue);
        expect(result.CurrentAction).toBe(newCurrentAction);
        expect(result.WorkingData).toBe(newWorkingData);
        expect(result.ButtonText).toBe(newButtonText);
        expect(result.CoverProblemItem).toBe(newCoverProblemItem);
        expect(result.PreTrialTime).toBe(newPreTrialTime);
        expect(result.EntryRepresentationInternal).toBe(
          newEntryRepresentationInternal
        );
        expect(result.StartTime).toBe(newStartTime);
        expect(result.ViewRepresentationInternal).toBe(
          newViewRepresentationInternal
        );
      });
    });

    it("DispatchUpdateIntroduceItem, undefined updates", () => {
      const state = InitialInterventionState;

      const newButtonShowValue = undefined as unknown as boolean;
      const newIsOngoingValue = undefined as unknown as boolean;
      const newCoverListViewItemsValue = undefined as unknown as boolean;
      const newListItemValue = undefined as unknown as string;

      const newCurrentAction = SharedActionSequence.Begin;
      const newWorkingData = ["1+2=3"];
      const newButtonText = "button";

      const newCoverProblemItem = true;
      const newPreTrialTime = new Date();
      const newEntryRepresentationInternal = "";
      const newStartTime = new Date();
      const newViewRepresentationInternal = "123";

      const value = new DispatchUpdateIntroduceItem({
        payload: {
          ShowButton: newButtonShowValue,
          IsOngoing: newIsOngoingValue,
          CoverListViewItems: newCoverListViewItemsValue,
          NextLiItem: newListItemValue,
          CurrentAction: newCurrentAction,
          WorkingData: newWorkingData,
          ButtonText: newButtonText,
          CoverProblemItem: newCoverProblemItem,
          PreTrialTime: newPreTrialTime,
          EntryRepresentationInternal: newEntryRepresentationInternal,
          StartTime: newStartTime,
          ViewRepresentationInternal: newViewRepresentationInternal,
        },
      });

      const result = overwriteOnlyExisting(state, value);

      waitFor(() => {
        expect(result.CurrentAction).toBe(newCurrentAction);
        expect(result.WorkingData).toBe(newWorkingData);
        expect(result.ButtonText).toBe(newButtonText);
        expect(result.CoverProblemItem).toBe(newCoverProblemItem);
        expect(result.PreTrialTime).toBe(newPreTrialTime);
        expect(result.EntryRepresentationInternal).toBe(
          newEntryRepresentationInternal
        );
        expect(result.StartTime).toBe(newStartTime);
        expect(result.ViewRepresentationInternal).toBe(
          newViewRepresentationInternal
        );

        // Optionals
        expect(result.ShowButton).not.toBe(newButtonShowValue);
        expect(result.IsOngoing).not.toBe(newIsOngoingValue);
        expect(result.CoverListViewItems).not.toBe(newCoverListViewItemsValue);
        expect(result.NextLiItem).not.toBe(newListItemValue);

        // Unchanged checks
        expect(result.ShowButton).not.toBe(state.ShowButton);
        expect(result.IsOngoing).not.toBe(state.IsOngoing);
        expect(result.CoverListViewItems).not.toBe(state.CoverListViewItems);
        expect(result.NextLiItem).not.toBe(state.NextLiItem);
      });
    });
  });

  describe("DispatchUpdateRetryItem  ", () => {
    it("DispatchUpdateRetryItem , proper update", () => {
      const state = InitialInterventionState;

      const newCoverProblemItem = true;
      const newCoverStimulusItem = true;
      const newVerify = true;
      const newCurrentAction = SharedActionSequence.Begin;
      const newButtonText = "button";
      const newIsOngoingValue = true;

      const value = new DispatchUpdateRetryItem({
        payload: {
          CoverProblemItem: newCoverProblemItem,
          CoverStimulusItem: newCoverStimulusItem,
          ToVerify: newVerify,
          CurrentAction: newCurrentAction,
          ButtonText: newButtonText,
          IsOngoing: newIsOngoingValue,

          EntryRepresentationInternal: "123",
          NumRetries: 1,
          OnInitialTry: true,
          NumCorrectInitial: 1,
          NumErrors: 1,
          TotalDigits: 1,
          TotalDigitsCorrect: 1,
          NumbTrials: 1,
          PreTrialTime: new Date(),
          FactModelList: [],
        },
      });

      const result = overwriteOnlyExisting(state, value);

      waitFor(() => {
        // optionals
        expect(result.CoverProblemItem).toBe(newCoverProblemItem);
        expect(result.CoverStimulusItem).toBe(newCoverStimulusItem);
        expect(result.ToVerify).toBe(newVerify);
        expect(result.CurrentAction).toBe(newCurrentAction);
        expect(result.ButtonText).toBe(newButtonText);
        expect(result.IsOngoing).toBe(newIsOngoingValue);

        expect(result.EntryRepresentationInternal).toBe(
          state.EntryRepresentationInternal
        );
        expect(result.NumRetries).toBe(state.NumRetries);
        expect(result.OnInitialTry).toBe(state.OnInitialTry);
        expect(result.NumCorrectInitial).toBe(state.NumCorrectInitial);
        expect(result.NumErrors).toBe(state.NumErrors);
        expect(result.TotalDigits).toBe(state.TotalDigits);
        expect(result.TotalDigitsCorrect).toBe(state.TotalDigitsCorrect);
        expect(result.NumbTrials).toBe(state.NumbTrials);
        expect(result.PreTrialTime).toBe(state.PreTrialTime);
        expect(result.FactModelList).toStrictEqual(state.FactModelList);
      });
    });

    it("DispatchUpdateRetryItem , undefined updates", () => {
      const state = InitialInterventionState;

      const newCoverProblemItem = undefined as unknown as boolean;
      const newCoverStimulusItem = undefined as unknown as boolean;
      const newVerify = undefined as unknown as boolean;
      const newCurrentAction = undefined as unknown as SharedActionSequence;
      const newButtonText = undefined as unknown as string;
      const newIsOngoingValue = undefined as unknown as boolean;

      const value = new DispatchUpdateRetryItem({
        payload: {
          CoverProblemItem: newCoverProblemItem,
          CoverStimulusItem: newCoverStimulusItem,
          ToVerify: newVerify,
          CurrentAction: newCurrentAction,
          ButtonText: newButtonText,
          IsOngoing: newIsOngoingValue,

          EntryRepresentationInternal: "123",
          NumRetries: 1,
          OnInitialTry: true,
          NumCorrectInitial: 1,
          NumErrors: 1,
          TotalDigits: 1,
          TotalDigitsCorrect: 1,
          NumbTrials: 1,
          PreTrialTime: new Date(),
          FactModelList: [],
        },
      });

      const result = overwriteOnlyExisting(state, value);

      waitFor(() => {
        // optionals
        expect(result.CoverProblemItem).toBe(state.CoverProblemItem);
        expect(result.CoverStimulusItem).toBe(state.CoverStimulusItem);
        expect(result.ToVerify).toBe(state.ToVerify);
        expect(result.CurrentAction).toBe(state.CurrentAction);
        expect(result.ButtonText).toBe(state.ButtonText);
        expect(result.IsOngoing).toBe(state.IsOngoing);

        expect(result.EntryRepresentationInternal).toBe(
          state.EntryRepresentationInternal
        );
        expect(result.NumRetries).toBe(state.NumRetries);
        expect(result.OnInitialTry).toBe(state.OnInitialTry);
        expect(result.NumCorrectInitial).toBe(state.NumCorrectInitial);
        expect(result.NumErrors).toBe(state.NumErrors);
        expect(result.TotalDigits).toBe(state.TotalDigits);
        expect(result.TotalDigitsCorrect).toBe(state.TotalDigitsCorrect);
        expect(result.NumbTrials).toBe(state.NumbTrials);
        expect(result.PreTrialTime).toBe(state.PreTrialTime);
        expect(result.FactModelList).toStrictEqual(state.FactModelList);
      });
    });
  });
});

describe("Intervention Engine: Reducer", () => {
  it("Should match original state", () => {
    const { result } = renderHook(() =>
      useReducer(InterventionReducer, InitialInterventionState)
    );
    const [state] = result.current;

    expect(InitialInterventionState).toBe(state);
  });

  it("Should match original state, DEFAULT", async () => {
    act(() => {
      const { result } = renderHook(() =>
        useReducer(InterventionReducer, InitialInterventionState)
      );

      const [, dispatch] = result.current;

      const priorState = result.current;

      dispatch({
        type: InterventionActions.SetThrow,
        payload: {},
      });

      setTimeout(() => {
        expect(result.current[0]).toBe(priorState);
      }, 1000);
    });
  });

  it("Should adjust to updates in user entry field", async () => {
    const newName = "newName";

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(InterventionReducer, InitialInterventionState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch(
        new DispatchUpdateEntryInternal({
          type: InterventionActions.UpdateResponseEntry,
          payload: { EntryRepresentationInternal: newName },
        })
      );

      await waitForValueToChange(
        () => result.current[0].EntryRepresentationInternal
      );

      expect(result.current[0].EntryRepresentationInternal).toBe(newName);
    });
  });

  it("Should adjust to updates in loadout", async () => {
    const newAction = SharedActionSequence.CoverCopy;
    const newFacts = ["1+1=2"];
    const newDataLoaded = true;
    const newOperator = "+";
    const newTimer = 120;

    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(InterventionReducer, InitialInterventionState)
      );

      expect(result.current).toBeTruthy();

      const [, dispatch] = result.current;

      dispatch(
        new DispatchUpdatePreLoadContent({
          payload: {
            CurrentAction: newAction,
            WorkingData: newFacts,
            LoadedData: newDataLoaded,
            OperatorSymbol: newOperator,
            SecondsLeft: newTimer,
          },
        })
      );

      await waitForValueToChange(() => result.current[0].CurrentAction);

      expect(result.current[0].CurrentAction).toBe(newAction);
      expect(result.current[0].WorkingData).toBe(newFacts);
      expect(result.current[0].LoadedData).toBe(newDataLoaded);
      expect(result.current[0].OperatorSymbol).toBe(newOperator);
      expect(result.current[0].SecondsLeft).toBe(newTimer);
    });
  });

  /*
  
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
          payload: newDetails,
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
          payload: newFormError,
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
          payload: newFormError,
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
          payload: newCurrentApproach,
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
          payload: newCurrentValue,
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
          payload: newCurrentValue,
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
          payload: newCurrentValue,
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
          payload: newCurrentValue,
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
          payload: newCurrentValue,
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
          payload: newCurrentValue,
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
          payload: newCurrentValue,
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
          payload: newCurrentValue,
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
          payload: newCurrentValue,
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
          payload: newCurrentValue,
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
      */
});
