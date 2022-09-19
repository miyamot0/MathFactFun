import {
  DispatchUpdateEntryInternal,
  DispatchUpdateIntroduceItem,
  DispatchUpdatePreLoadContent,
  DispatchUpdateRetryItem,
  InterventionState,
  isEntryInternalDispatch,
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
  CurrentAction: SharedActionSequence.Start,
  WorkingData: [],
  SecondsLeft: 0,
  LoadedData: false,
  CoverProblemItem: false,
  CoverStimulusItem: false,
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


  UpdateFollowingInitialAction,

  //BenchmarkBatchStartBegin,
  BenchmarkBatchStartIncrement,
  BenchmarkBatchStartIncrementPost,

  ExplicitTimingBatchIncrement,
  ExplicitTimingModalPreErrorLog,
  //ExplicitTimingModalRetry,

  TapedProblemsBatchStartPreflight,

  //CoverCopyCompareBatchStartBegin,
  CoverCopyCompareTaskIncrement,
  CoverCopyCompareTaskReset,
  CoverCopyCompareBatchIncrement,
  CoverCopyCompareBatchStartIncrementPost,
  CoverCopyCompareModalPreErrorLog,
  //CoverCopyCompareModalRetry,
  CoverCopyCompareItemIncrement,

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
  incoming: DispatchUpdateEntryInternal | DispatchUpdatePreLoadContent
): InterventionState {
  if (isEntryInternalDispatch(incoming)) {
    const local: DispatchUpdateEntryInternal =
      incoming as DispatchUpdateEntryInternal;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isPreloadDispatch(incoming)) {
    const local: DispatchUpdatePreLoadContent =
      incoming as DispatchUpdatePreLoadContent;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isItemLoadDispatch(incoming)) {
    const local: DispatchUpdateIntroduceItem =
      incoming as DispatchUpdateIntroduceItem;

    local.payload.ShowButton = !local.payload.ShowButton ? destination.ShowButton : local.payload.ShowButton;
    local.payload.IsOngoing = !local.payload.IsOngoing ? destination.IsOngoing : local.payload.IsOngoing;
    local.payload.CoverListViewItems = !local.payload.CoverListViewItems ? destination.CoverListViewItems : local.payload.CoverListViewItems;
    local.payload.NextLiItem = !local.payload.NextLiItem ? destination.NextLiItem : local.payload.NextLiItem;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isItemRetryDispatch(incoming)) {
    const local: DispatchUpdateRetryItem =
      incoming as DispatchUpdateRetryItem;

    local.payload.CoverStimulusItem = !local.payload.CoverStimulusItem ? destination.CoverStimulusItem : local.payload.CoverStimulusItem;
    local.payload.ToVerify = !local.payload.ToVerify ? destination.ToVerify : local.payload.ToVerify;
    local.payload.CurrentAction = !local.payload.CurrentAction ? destination.CurrentAction : local.payload.CurrentAction;
    local.payload.ButtonText = !local.payload.ButtonText ? destination.ButtonText : local.payload.ButtonText;
    local.payload.IsOngoing = !local.payload.IsOngoing ? destination.IsOngoing : local.payload.IsOngoing;
    local.payload.CoverProblemItem = !local.payload.CoverProblemItem ? destination.CoverProblemItem : local.payload.CoverProblemItem;

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
  action: DispatchUpdateEntryInternal | DispatchUpdatePreLoadContent | any
): InterventionState => {
  switch (action.type) {
    case InterventionActions.UpdateResponseEntry:
      return overwriteOnlyExisting(state, action);

    case InterventionActions.UpdateWithLoadedData:
      return overwriteOnlyExisting(state, action);

    case InterventionActions.UpdateIntroduceNewItem:
      return overwriteOnlyExisting(state, action);

    case InterventionActions.UpdateRetryCurrentItem:
      return overwriteOnlyExisting(state, action);

    case InterventionActions.BenchmarkBatchStartIncrement:
      return {
        ...state,
        NumCorrectInitial: action.payload.uNumberCorrectInitial,
        NumErrors: action.payload.uNumberErrors,
        TotalDigits: action.payload.uTotalDigits,
        TotalDigitsCorrect: action.payload.uTotalDigitsCorrect,
        NumbTrials: action.payload.uNumberTrials,
        OnInitialTry: action.payload.uInitialTry,
        PreTrialTime: action.payload.uTrialTime,
      };
    case InterventionActions.BenchmarkBatchStartIncrementPost:
      return {
        ...state,
        FactModelList: action.payload.uFactModel,
        WorkingData: action.payload.uWorkingData,
        ViewRepresentationInternal: action.payload.uView,
        EntryRepresentationInternal: action.payload.uEntry,
      };

    case InterventionActions.ExplicitTimingBatchIncrement:
      return {
        ...state,
        NumCorrectInitial: action.payload.uNumberCorrectInitial,
        NumErrors: action.payload.uNumberErrors,
        TotalDigits: action.payload.uTotalDigits,
        TotalDigitsCorrect: action.payload.uTotalDigitsCorrect,
        NumbTrials: action.payload.uNumberTrials,
        OnInitialTry: action.payload.uInitialTry,
        PreTrialTime: action.payload.uTrialTime,
      };

    case InterventionActions.ExplicitTimingModalPreErrorLog:
      return {
        ...state,
        FactModelList: action.payload.uFactModel,
      };

    case InterventionActions.CoverCopyCompareTaskIncrement:
      return {
        ...state,
        CurrentAction: action.payload.uAction,
        ButtonText: action.payload.uButtonText,
        CoverProblemItem: action.payload.uCoverProblemItem,
        CoverStimulusItem: action.payload.uCoverStimulusItem,
      };

    case InterventionActions.CoverCopyCompareModalPreErrorLog:
      return {
        ...state,
        FactModelList: action.payload.uFactModel,
      };

    case InterventionActions.CoverCopyCompareBatchIncrement:
      return {
        ...state,
        NumCorrectInitial: action.payload.uNumberCorrectInitial,
        NumErrors: action.payload.uNumberErrors,
        TotalDigits: action.payload.uTotalDigits,
        TotalDigitsCorrect: action.payload.uTotalDigitsCorrect,
        NumbTrials: action.payload.uNumberTrials,
        OnInitialTry: action.payload.uInitialTry,
        PreTrialTime: action.payload.uTrialTime,
      };

    case InterventionActions.CoverCopyCompareBatchStartIncrementPost:
      return {
        ...state,
        CoverStimulusItem: action.payload.uCoverStimulusItem,
        CoverProblemItem: action.payload.uCoverProblemItem,
        EntryRepresentationInternal:
          action.payload.uEntryRepresentationInternal,
        ViewRepresentationInternal: action.payload.uViewRepresentationInternal,
        ButtonText: action.payload.uButtonText,
        ShowButton: action.payload.uShowButton,
        IsOngoing: action.payload.uIsOngoing,
        CoverListViewItems: action.payload.uCoverListViewItems,
        OnInitialTry: action.payload.uOnInitialTry,
        FactModelList: action.payload.uFactModelList,
        CurrentAction: action.payload.uCurrentAction,
      };

    case InterventionActions.CoverCopyCompareTaskReset:
      return {
        ...state,
        CurrentAction: action.payload.uAction,
        ToVerify: action.payload.uVerify,
      };

    default:
      throw new Error(action.type);
  }
};
