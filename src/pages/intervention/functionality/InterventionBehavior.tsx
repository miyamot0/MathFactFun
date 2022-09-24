/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  DispatchUpdateCompleteItem,
  DispatchUpdateEntryInternal,
  DispatchUpdateField,
  DispatchUpdateIntroduceItem,
  DispatchUpdatePreLoadContent,
  DispatchUpdateRetryItem,
  InterventionDispatches,
  InterventionState,
  isEntryInternalDispatch,
  isItemCompleteDispatch,
  isItemInterfaceUpdateDispatch,
  isItemLoadDispatch,
  isItemRetryDispatch,
  isPreloadDispatch,
} from "../interfaces/InterventionInterfaces";

export const DelCode = "Del";

export enum SharedActionSequence {
  Start = "ActionSequence.Start",
  Answer = "ActionSequence.Answer",
  Entry = "ActionSequence.Entry",
  CoverCopy = "ActionSequence.CoverCopy",
  Compare = "ActionSequence.Compare",
  Begin = "ActionSequence.Begin",
}

export const InitialInterventionState: InterventionState = {
  ViewRepresentationInternal: "",
  EntryRepresentationInternal: "",
  OperatorSymbol: "",
  ButtonText: "Start",
  CurrentAction: SharedActionSequence.Entry,
  WorkingData: [],
  SecondsLeft: 0,
  LoadedData: false,
  CoverProblemItem: true,
  CoverStimulusItem: true,
  CoverListViewItems: false,
  ShowButton: false,
  IsOngoing: false,
  ToVerify: false,
  FactModelList: [],
  NextLiItem: "",
  StartTime: null,
  PreTrialTime: new Date(),
  OnInitialTry: true,
  NumCorrectInitial: 0,
  NumErrors: 0,
  TotalDigits: 0,
  TotalDigitsCorrect: 0,
  NumbTrials: 0,
  NumRetries: 0,
  ModalIsOpen: false,
};

export enum InterventionActions {
  UpdateResponseEntry,
  UpdateWithLoadedData,
  UpdateIntroduceNewItem,
  UpdateRetryCurrentItem,
  UpdateFieldPresenation,
  UpdateAttemptErrorRecords,
  UpdateAttemptSuccessRecords,

  SetThrow,
}

/** overwriteOnlyExisting
 *
 * @param destination
 * @param incoming
 * @returns
 */
export function overwriteOnlyExisting(
  destination: InterventionState,
  incoming: InterventionDispatches
): InterventionState {
  if (isEntryInternalDispatch(incoming)) {
    const local: DispatchUpdateEntryInternal =
      incoming as DispatchUpdateEntryInternal;

    local.payload.EntryRepresentationInternal =
      local.payload.EntryRepresentationInternal === undefined
        ? destination.EntryRepresentationInternal
        : local.payload.EntryRepresentationInternal;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isPreloadDispatch(incoming)) {
    const local: DispatchUpdatePreLoadContent =
      incoming as DispatchUpdatePreLoadContent;

    // Note: these are always to be true and valid

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isItemLoadDispatch(incoming)) {
    const local: DispatchUpdateIntroduceItem =
      incoming as DispatchUpdateIntroduceItem;

    local.payload.ShowButton =
      local.payload.ShowButton === undefined
        ? destination.ShowButton
        : local.payload.ShowButton;
    local.payload.IsOngoing =
      local.payload.IsOngoing === undefined
        ? destination.IsOngoing
        : local.payload.IsOngoing;
    local.payload.CoverListViewItems =
      local.payload.CoverListViewItems === undefined
        ? destination.CoverListViewItems
        : local.payload.CoverListViewItems;
    local.payload.NextLiItem =
      local.payload.NextLiItem === undefined
        ? destination.NextLiItem
        : local.payload.NextLiItem;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isItemRetryDispatch(incoming)) {
    const local: DispatchUpdateRetryItem = incoming as DispatchUpdateRetryItem;

    local.payload.CoverProblemItem =
      local.payload.CoverProblemItem === undefined
        ? destination.CoverProblemItem
        : local.payload.CoverProblemItem;
    local.payload.CoverStimulusItem =
      local.payload.CoverStimulusItem === undefined
        ? destination.CoverStimulusItem
        : local.payload.CoverStimulusItem;
    local.payload.ToVerify =
      local.payload.ToVerify === undefined
        ? destination.ToVerify
        : local.payload.ToVerify;
    local.payload.CurrentAction =
      local.payload.CurrentAction === undefined
        ? destination.CurrentAction
        : local.payload.CurrentAction;
    local.payload.ButtonText =
      local.payload.ButtonText === undefined
        ? destination.ButtonText
        : local.payload.ButtonText;
    local.payload.IsOngoing =
      local.payload.IsOngoing === undefined
        ? destination.IsOngoing
        : local.payload.IsOngoing;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isItemCompleteDispatch(incoming)) {
    const local: DispatchUpdateCompleteItem =
      incoming as DispatchUpdateCompleteItem;

    local.payload.CoverProblemItem =
      local.payload.CoverProblemItem === undefined
        ? destination.CoverProblemItem
        : local.payload.CoverProblemItem;
    local.payload.CoverStimulusItem =
      local.payload.CoverStimulusItem === undefined
        ? destination.CoverStimulusItem
        : local.payload.CoverStimulusItem;
    local.payload.ToVerify =
      local.payload.ToVerify === undefined
        ? destination.ToVerify
        : local.payload.ToVerify;
    local.payload.CurrentAction =
      local.payload.CurrentAction === undefined
        ? destination.CurrentAction
        : local.payload.CurrentAction;
    local.payload.ButtonText =
      local.payload.ButtonText === undefined
        ? destination.ButtonText
        : local.payload.ButtonText;
    local.payload.IsOngoing =
      local.payload.IsOngoing === undefined
        ? destination.IsOngoing
        : local.payload.IsOngoing;

    local.payload.FactModelList =
      local.payload.FactModelList === undefined
        ? destination.FactModelList
        : local.payload.FactModelList;
    local.payload.CoverListViewItems =
      local.payload.CoverListViewItems === undefined
        ? destination.CoverListViewItems
        : local.payload.CoverListViewItems;
    local.payload.ShowButton =
      local.payload.ShowButton === undefined
        ? destination.ShowButton
        : local.payload.ShowButton;
    local.payload.EntryRepresentationInternal =
      local.payload.EntryRepresentationInternal === undefined
        ? destination.EntryRepresentationInternal
        : local.payload.EntryRepresentationInternal;
    local.payload.ViewRepresentationInternal =
      local.payload.ViewRepresentationInternal === undefined
        ? destination.ViewRepresentationInternal
        : local.payload.ViewRepresentationInternal;
    local.payload.WorkingData =
      local.payload.WorkingData === undefined
        ? destination.WorkingData
        : local.payload.WorkingData;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isItemInterfaceUpdateDispatch(incoming)) {
    const local: DispatchUpdateField = incoming as DispatchUpdateField;

    local.payload.ButtonText =
      local.payload.ButtonText === undefined
        ? destination.ButtonText
        : local.payload.ButtonText;
    local.payload.CoverProblemItem =
      local.payload.CoverProblemItem === undefined
        ? destination.CoverProblemItem
        : local.payload.CoverProblemItem;
    local.payload.CoverStimulusItem =
      local.payload.CoverStimulusItem === undefined
        ? destination.CoverStimulusItem
        : local.payload.CoverStimulusItem;
    local.payload.ToVerify =
      local.payload.ToVerify === undefined
        ? destination.ToVerify
        : local.payload.ToVerify;
    local.payload.IsOngoing =
      local.payload.IsOngoing === undefined
        ? destination.IsOngoing
        : local.payload.IsOngoing;

    return {
      ...destination,
      ...local.payload,
    };
  }

  throw Error("Didn't match");
}

/**
 * Reducer for submission
 *
 * @param {InterventionState} state
 * @param {any} action
 * @returns {InterventionState}
 */
export const InterventionReducer = (
  state: InterventionState,
  action: InterventionDispatches | any
): InterventionState => {
  switch (action.type) {
    case InterventionActions.UpdateResponseEntry:
    case InterventionActions.UpdateWithLoadedData:
    case InterventionActions.UpdateIntroduceNewItem:
    case InterventionActions.UpdateRetryCurrentItem:
    case InterventionActions.UpdateFieldPresenation:
    case InterventionActions.UpdateAttemptErrorRecords:
    case InterventionActions.UpdateAttemptSuccessRecords:
      return overwriteOnlyExisting(state, action);

    default:
      throw new Error("Intervention action type error");
  }
};
