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
import { FactDataInterface } from "../../../setcreator/interfaces/SetCreatorInterfaces";
import {
  DispatchUpdateCompleteItem,
  DispatchUpdateEntryInternal,
  DispatchUpdateField,
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
  it("Should Fail if not an authorized type ", async () => {
    await act(async () => {
      const state = InitialInterventionState;
      const value = {};

      await waitFor(() => {
        expect(() =>
          overwriteOnlyExisting(
            state,
            value as unknown as DispatchUpdateEntryInternal
          )
        ).toThrowError(Error("Didn't match"));
      });
    });
  });

  describe("DispatchUpdatePreLoadContent", () => {
    it("DispatchUpdatePreLoadContent, proper update", async () => {
      await act(async () => {
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

        await waitFor(() => {
          expect(result.CurrentAction).toBe(newAction);
          expect(result.WorkingData).toBe(newWorkingData);
          expect(result.LoadedData).toBe(newLoadedData);
          expect(result.OperatorSymbol).toBe(newOperator);
          expect(result.SecondsLeft).toBe(newSecondsLeft);
        });
      });
    });
  });

  describe("DispatchUpdateEntryInternal ", () => {
    it("DispatchUpdateEntryInternal, proper update", async () => {
      await act(async () => {
        const state = InitialInterventionState;

        const newString = "1";

        const value = new DispatchUpdateEntryInternal({
          payload: {
            EntryRepresentationInternal: newString,
          },
        });

        const result = overwriteOnlyExisting(state, value);

        await waitFor(() => {
          expect(result.EntryRepresentationInternal).toBe(newString);
        });
      });
    });

    it("DispatchUpdateEntryInternal, undefined update", async () => {
      await act(async () => {
        const state = InitialInterventionState;

        const newString = undefined as unknown as string;

        const value = new DispatchUpdateEntryInternal({
          payload: {
            EntryRepresentationInternal: newString,
          },
        });

        const result = overwriteOnlyExisting(state, value);

        await waitFor(() => {
          expect(result.EntryRepresentationInternal).toBe(
            value.payload.EntryRepresentationInternal
          );
        });
      });
    });
  });

  describe("DispatchUpdateIntroduceItem ", () => {
    it("DispatchUpdateIntroduceItem, proper update", async () => {
      await act(async () => {
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

        await waitFor(() => {
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
    });

    it("DispatchUpdateIntroduceItem, undefined updates", async () => {
      await act(async () => {
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

        await waitFor(() => {
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
          expect(result.CoverListViewItems).not.toBe(
            newCoverListViewItemsValue
          );
          expect(result.NextLiItem).not.toBe(newListItemValue);

          // Unchanged checks
          expect(result.ShowButton).toBe(value.payload.ShowButton);
          expect(result.IsOngoing).toBe(value.payload.IsOngoing);
          expect(result.CoverListViewItems).toBe(
            value.payload.CoverListViewItems
          );
          expect(result.NextLiItem).toBe(value.payload.NextLiItem);
        });
      });
    });
  });

  describe("DispatchUpdateRetryItem  ", () => {
    it("DispatchUpdateRetryItem , proper update", async () => {
      await act(async () => {
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

        await waitFor(() => {
          // optionals
          expect(result.CoverProblemItem).toBe(newCoverProblemItem);
          expect(result.CoverStimulusItem).toBe(newCoverStimulusItem);
          expect(result.ToVerify).toBe(newVerify);
          expect(result.CurrentAction).toBe(newCurrentAction);
          expect(result.ButtonText).toBe(newButtonText);
          expect(result.IsOngoing).toBe(newIsOngoingValue);

          expect(result.EntryRepresentationInternal).toBe(
            value.payload.EntryRepresentationInternal
          );
          expect(result.NumRetries).toBe(value.payload.NumRetries);
          expect(result.OnInitialTry).toBe(value.payload.OnInitialTry);
          expect(result.NumCorrectInitial).toBe(
            value.payload.NumCorrectInitial
          );
          expect(result.NumErrors).toBe(value.payload.NumErrors);
          expect(result.TotalDigits).toBe(value.payload.TotalDigits);
          expect(result.TotalDigitsCorrect).toBe(
            value.payload.TotalDigitsCorrect
          );
          expect(result.NumbTrials).toBe(value.payload.NumbTrials);
          expect(result.PreTrialTime).toBe(value.payload.PreTrialTime);
          expect(result.FactModelList).toStrictEqual(
            value.payload.FactModelList
          );
        });
      });
    });

    it("DispatchUpdateRetryItem , undefined updates", async () => {
      await act(async () => {
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

        await waitFor(() => {
          // optionals
          expect(result.CoverProblemItem).toBe(state.CoverProblemItem);
          expect(result.CoverStimulusItem).toBe(state.CoverStimulusItem);
          expect(result.ToVerify).toBe(state.ToVerify);
          expect(result.CurrentAction).toBe(state.CurrentAction);
          expect(result.ButtonText).toBe(state.ButtonText);
          expect(result.IsOngoing).toBe(state.IsOngoing);

          expect(result.EntryRepresentationInternal).toBe(
            value.payload.EntryRepresentationInternal
          );
          expect(result.NumRetries).toBe(value.payload.NumRetries);
          expect(result.OnInitialTry).toBe(value.payload.OnInitialTry);
          expect(result.NumCorrectInitial).toBe(
            value.payload.NumCorrectInitial
          );
          expect(result.NumErrors).toBe(value.payload.NumErrors);
          expect(result.TotalDigits).toBe(value.payload.TotalDigits);
          expect(result.TotalDigitsCorrect).toBe(
            value.payload.TotalDigitsCorrect
          );
          expect(result.NumbTrials).toBe(value.payload.NumbTrials);
          expect(result.PreTrialTime).toBe(value.payload.PreTrialTime);
          expect(result.FactModelList).toStrictEqual(
            value.payload.FactModelList
          );
        });
      });
    });
  });

  describe("DispatchUpdateCompleteItem  ", () => {
    it("DispatchUpdateCompleteItem , proper update", async () => {
      await act(async () => {
        const state = InitialInterventionState;

        const newCoverProblemItem = true;
        const newCoverStimulusItem = true;
        const newVerify = true;
        const newFactModelList = [{} as FactDataInterface];
        const newCurrentAction = SharedActionSequence.Begin;
        const newButtonText = "button";
        const newIsOngoingValue = true;

        const newWorkingData = ["1+1=2"];
        const newCoverListViewItems = true;
        const newShowButton = true;
        const newEntryRepresentationInternal = "123";
        const newViewRepresentationInternal = "456";

        const preTrialTime = new Date();

        const value = new DispatchUpdateCompleteItem({
          payload: {
            CoverProblemItem: newCoverProblemItem,
            CoverStimulusItem: newCoverStimulusItem,
            ToVerify: newVerify,
            FactModelList: newFactModelList,
            CurrentAction: newCurrentAction,
            ButtonText: newButtonText,
            IsOngoing: newIsOngoingValue,
            WorkingData: newWorkingData,
            CoverListViewItems: newCoverListViewItems,
            ShowButton: newShowButton,
            EntryRepresentationInternal: newEntryRepresentationInternal,
            ViewRepresentationInternal: newViewRepresentationInternal,

            NumRetries: 1,
            OnInitialTry: true,
            NumCorrectInitial: 1,
            NumErrors: 1,
            TotalDigits: 1,
            TotalDigitsCorrect: 1,
            NumbTrials: 1,
            PreTrialTime: preTrialTime,
          },
        });

        const result = overwriteOnlyExisting(state, value);

        await waitFor(() => {
          // optionals
          expect(result.CoverProblemItem).toBe(newCoverProblemItem);
          expect(result.CoverStimulusItem).toBe(newCoverStimulusItem);
          expect(result.ToVerify).toBe(newVerify);
          expect(result.FactModelList).toStrictEqual(newFactModelList);
          expect(result.CurrentAction).toBe(newCurrentAction);
          expect(result.ButtonText).toBe(newButtonText);
          expect(result.IsOngoing).toBe(newIsOngoingValue);
          expect(result.WorkingData).toBe(newWorkingData);
          expect(result.CoverListViewItems).toBe(newCoverListViewItems);
          expect(result.ShowButton).toBe(newShowButton);
          expect(result.EntryRepresentationInternal).toBe(
            newEntryRepresentationInternal
          );
          expect(result.ViewRepresentationInternal).toBe(
            newViewRepresentationInternal
          );

          expect(result.NumRetries).toBe(1);
          expect(result.OnInitialTry).toBe(true);
          expect(result.NumCorrectInitial).toBe(1);
          expect(result.NumErrors).toBe(1);
          expect(result.TotalDigits).toBe(1);
          expect(result.TotalDigitsCorrect).toBe(1);
          expect(result.NumbTrials).toBe(1);
          expect(result.PreTrialTime).toBe(preTrialTime);
        });
      });
    });

    it("DispatchUpdateCompleteItem , undefined updates", async () => {
      await act(async () => {
        const state = InitialInterventionState;

        const newCoverProblemItem = undefined as unknown as boolean;
        const newCoverStimulusItem = undefined as unknown as boolean;
        const newVerify = undefined as unknown as boolean;
        const newFactModelList = undefined as unknown as FactDataInterface[];
        const newCurrentAction = undefined as unknown as SharedActionSequence;
        const newButtonText = undefined as unknown as string;
        const newIsOngoingValue = undefined as unknown as boolean;

        const newWorkingData = undefined as unknown as string[];
        const newCoverListViewItems = undefined as unknown as boolean;
        const newShowButton = undefined as unknown as boolean;
        const newEntryRepresentationInternal = undefined as unknown as string;
        const newViewRepresentationInternal = undefined as unknown as string;

        const preTrialTime = new Date();

        const value = new DispatchUpdateCompleteItem({
          payload: {
            CoverProblemItem: newCoverProblemItem,
            CoverStimulusItem: newCoverStimulusItem,
            ToVerify: newVerify,
            FactModelList: newFactModelList,
            CurrentAction: newCurrentAction,
            ButtonText: newButtonText,
            IsOngoing: newIsOngoingValue,
            WorkingData: newWorkingData,
            CoverListViewItems: newCoverListViewItems,
            ShowButton: newShowButton,
            EntryRepresentationInternal: newEntryRepresentationInternal,
            ViewRepresentationInternal: newViewRepresentationInternal,

            NumRetries: 1,
            OnInitialTry: true,
            NumCorrectInitial: 1,
            NumErrors: 1,
            TotalDigits: 1,
            TotalDigitsCorrect: 1,
            NumbTrials: 1,
            PreTrialTime: preTrialTime,
          },
        });

        const result = overwriteOnlyExisting(state, value);

        await waitFor(() => {
          // optionals
          expect(result.CoverProblemItem).toBe(state.CoverProblemItem);
          expect(result.CoverStimulusItem).toBe(state.CoverStimulusItem);
          expect(result.ToVerify).toBe(state.ToVerify);
          expect(result.FactModelList).toStrictEqual(state.FactModelList);
          expect(result.CurrentAction).toBe(state.CurrentAction);
          expect(result.ButtonText).toBe(state.ButtonText);
          expect(result.IsOngoing).toBe(state.IsOngoing);
          expect(result.WorkingData).toBe(state.WorkingData);
          expect(result.CoverListViewItems).toBe(state.CoverListViewItems);
          expect(result.ShowButton).toBe(state.ShowButton);
          expect(result.EntryRepresentationInternal).toBe(
            state.EntryRepresentationInternal
          );
          expect(result.ViewRepresentationInternal).toBe(
            state.ViewRepresentationInternal
          );

          expect(result.NumRetries).toBe(1);
          expect(result.OnInitialTry).toBe(true);
          expect(result.NumCorrectInitial).toBe(1);
          expect(result.NumErrors).toBe(1);
          expect(result.TotalDigits).toBe(1);
          expect(result.TotalDigitsCorrect).toBe(1);
          expect(result.NumbTrials).toBe(1);
          expect(result.PreTrialTime).toBe(preTrialTime);
        });
      });
    });
  });

  describe("DispatchUpdateField ", () => {
    it("DispatchUpdateField, proper update", async () => {
      await act(async () => {
        const state = InitialInterventionState;

        const newButtonText = "button";
        const newCoverProblemItem = true;
        const newCoverStimulusItem = true;
        const newToVerify = true;
        const newIsOngoingValue = true;

        const value = new DispatchUpdateField({
          payload: {
            CurrentAction: SharedActionSequence.Begin,
            ButtonText: newButtonText,
            CoverProblemItem: newCoverProblemItem,
            CoverStimulusItem: newCoverStimulusItem,
            ToVerify: newToVerify,
            IsOngoing: newIsOngoingValue,
          },
        });

        const result = overwriteOnlyExisting(state, value);

        await waitFor(() => {
          expect(result.CurrentAction).toBe(SharedActionSequence.Begin);
          expect(result.ButtonText).toBe(newButtonText);
          expect(result.CoverProblemItem).toBe(newCoverProblemItem);
          expect(result.CoverStimulusItem).toBe(newCoverStimulusItem);
          expect(result.ToVerify).toBe(newToVerify);
          expect(result.IsOngoing).toBe(newIsOngoingValue);
        });
      });
    });

    it("DispatchUpdateField, updates with undefined values", async () => {
      await act(async () => {
        const state = InitialInterventionState;

        const newButtonText = undefined as unknown as string;
        const newCoverProblemItem = undefined as unknown as boolean;
        const newCoverStimulusItem = undefined as unknown as boolean;
        const newToVerify = undefined as unknown as boolean;
        const newIsOngoingValue = undefined as unknown as boolean;

        const value = new DispatchUpdateField({
          payload: {
            CurrentAction: SharedActionSequence.Begin,
            ButtonText: newButtonText,
            CoverProblemItem: newCoverProblemItem,
            CoverStimulusItem: newCoverStimulusItem,
            ToVerify: newToVerify,
            IsOngoing: newIsOngoingValue,
          },
        });

        const result = overwriteOnlyExisting(state, value);

        await waitFor(() => {
          expect(result.CurrentAction).toBe(SharedActionSequence.Begin);
          expect(result.ButtonText).toBe(state.ButtonText);
          expect(result.CoverProblemItem).toBe(state.CoverProblemItem);
          expect(result.CoverStimulusItem).toBe(state.CoverStimulusItem);
          expect(result.ToVerify).toBe(state.ToVerify);
          expect(result.IsOngoing).toBe(state.IsOngoing);
        });
      });
    });

    /*
    it("DispatchUpdateField, undefined updates", () => {
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

      await waitFor(() => {
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
    */
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

  it("Should throw an error if type is not appropriate", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(InterventionReducer, InitialInterventionState)
      );

      const [, dispatch] = result.current;

      try {
        dispatch({
          type: InterventionActions.SetThrow,
          payload: {},
        });

        await waitForValueToChange(
          () => result.current[0].EntryRepresentationInternal
        );
      } catch (e: unknown) {
        expect(e).toBeTruthy();

        if (e instanceof Error) {
          expect(e.message).toStrictEqual("Intervention action type error");
        }
      }
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
});
