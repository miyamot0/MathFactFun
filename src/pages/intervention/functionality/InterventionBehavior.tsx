import { BenchmarkState } from "../interfaces/InterventionInterfaces";

export const DelCode = "Del";

export const InitialBenchmarkState: BenchmarkState = {
  ViewRepresentationInternal: "",
  EntryRepresentationInternal: "",
  OperatorSymbol: "",
  ButtonText: "Start",
  CurrentAction: "ActionSequence.Start",
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

export enum BenchmarkActions {
  //GeneralOpenModal = "GeneralOpenModal",
  //GeneralCloseModal = "GeneralCloseModal",
  GeneralUpdateEntry,

  BenchmarkBatchStartPreflight,
  BenchmarkBatchStartBegin,
  BenchmarkBatchStartIncrement,
  BenchmarkBatchStartIncrementPost,

  ExplicitTimingBatchStartPreflight,
  ExplicitTimingBatchIncrement,
  ExplicitTimingModalPreErrorLog,
  ExplicitTimingModalRetry,

  TapedProblemsBatchStartPreflight,

  CoverCopyCompareBatchStartPreflight,
  CoverCopyCompareBatchStartBegin,
  CoverCopyCompareTaskIncrement,
  CoverCopyCompareTaskReset,
  CoverCopyCompareBatchIncrement,
  CoverCopyCompareBatchStartIncrementPost,
  CoverCopyCompareModalPreErrorLog,
  CoverCopyCompareModalRetry,
  CoverCopyCompareItemIncrement,
}

export const SharedActionSequence = {
  Start: "ActionSequence.Start",
  Answer: "ActionSequence.Answer",
  Entry: "ActionSequence.Entry",
  CoverCopy: "ActionSequence.CoverCopy",
  Compare: "ActionSequence.Compare",
  Begin: "ActionSequence.Begin",
};

/**
 * Reducer for submission
 *
 * @param {BenchmarkState} state
 * @param {any} action
 * @returns {BenchmarkState}
 */
export const InterventionReducer = (
  state: BenchmarkState,
  action: any
): BenchmarkState => {
  switch (action.type) {
    case BenchmarkActions.GeneralUpdateEntry:
      return { ...state, EntryRepresentationInternal: action.payload };
    // Benchmarking
    case BenchmarkActions.BenchmarkBatchStartPreflight:
      return {
        ...state,
        CurrentAction: action.payload.uAction,
        WorkingData: action.payload.uWorkingData,
        SecondsLeft: action.payload.uTimer,
        LoadedData: action.payload.uLoadedData,
      };
    case BenchmarkActions.BenchmarkBatchStartBegin:
      return {
        ...state,
        ButtonText: action.payload.ButtonText,
        CoverProblemItem: action.payload.CoverProblem,
        EntryRepresentationInternal: action.payload.UpdateEntry,
        ViewRepresentationInternal: action.payload.UpdateView,
        WorkingData: action.payload.WorkingData,
        StartTime: action.payload.StartTime,
        PreTrialTime: action.payload.TrialTime,
        CurrentAction: action.payload.CurrentAction,
      };
    case BenchmarkActions.BenchmarkBatchStartIncrement:
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
    case BenchmarkActions.BenchmarkBatchStartIncrementPost:
      return {
        ...state,
        FactModelList: action.payload.uFactModel,
        WorkingData: action.payload.uWorkingData,
        ViewRepresentationInternal: action.payload.uView,
        EntryRepresentationInternal: action.payload.uEntry,
      };
    // Explicit Timing
    case BenchmarkActions.ExplicitTimingBatchStartPreflight:
      return {
        ...state,
        WorkingData: action.payload.uWorkingData,
        SecondsLeft: action.payload.uTimer,
        LoadedData: action.payload.uLoadedData,
        CurrentAction: action.payload.uAction,
      };

    case BenchmarkActions.ExplicitTimingModalRetry:
      return {
        ...state,
        EntryRepresentationInternal:
          action.payload.uEntryRepresentationInternal,
        NumRetries: action.payload.uNumRetries,
        ModalIsOpen: false,
        OnInitialTry: action.payload.uOnInitialTry,
      };

    case BenchmarkActions.ExplicitTimingBatchIncrement:
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

    case BenchmarkActions.ExplicitTimingModalPreErrorLog:
      return {
        ...state,
        FactModelList: action.payload.uFactModel,
      };
    // Cover Copy Compare
    case BenchmarkActions.CoverCopyCompareBatchStartPreflight:
      return {
        ...state,
        CurrentAction: action.payload.uAction,
        WorkingData: action.payload.uWorkingData,
        OperatorSymbol: action.payload.uOperator,
        LoadedData: action.payload.uLoadedData,
      };

    case BenchmarkActions.CoverCopyCompareBatchStartBegin:
      return {
        ...state,
        ButtonText: action.payload.uButtonText,
        CoverProblemItem: action.payload.uCoverProblemItem,
        PreTrialTime: action.payload.uTrialTime,
        EntryRepresentationInternal:
          action.payload.uEntryRepresentationInternal,
        ShowButton: action.payload.uShowButton,
        IsOngoing: action.payload.uIsOngoing,
        StartTime: action.payload.uStartTime,
        ViewRepresentationInternal: action.payload.uViewRepresentationInternal,
        CoverListViewItems: action.payload.uCoverListViewItems,
        WorkingData: action.payload.uWorkingData,
        CurrentAction: action.payload.uCurrentAction,
        NextLiItem: action.payload.uNextLiItem,
      };

    case BenchmarkActions.CoverCopyCompareTaskIncrement:
      return {
        ...state,
        CurrentAction: action.payload.uAction,
        ButtonText: action.payload.uButtonText,
        CoverProblemItem: action.payload.uCoverProblemItem,
        CoverStimulusItem: action.payload.uCoverStimulusItem,
      };

    case BenchmarkActions.CoverCopyCompareModalPreErrorLog:
      return {
        ...state,
        FactModelList: action.payload.uFactModel,
      };

    case BenchmarkActions.CoverCopyCompareModalRetry:
      return {
        ...state,
        EntryRepresentationInternal:
          action.payload.uEntryRepresentationInternal,
        IsOngoing: action.payload.uIsOngoing,
        ToVerify: action.payload.uToVerify,
        OnInitialTry: action.payload.uOnInitialTry,
        CurrentAction: action.payload.uCurrentAction,
        ButtonText: action.payload.uButtonText,
        CoverProblemItem: action.payload.uCoverProblemItem,
        CoverStimulusItem: action.payload.uCoverStimulusItem,
        NumRetries: action.payload.uNumRetries,
      };

    case BenchmarkActions.CoverCopyCompareBatchIncrement:
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

    case BenchmarkActions.CoverCopyCompareBatchStartIncrementPost:
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

    /*
              uCoverStimulusItem: true,
              uCoverProblemItem: true,
              uEntryRepresentationInternal: "",
              uViewRepresentationInternal: "",
              uButtonText: "Cover",
              uShowButton: false,
              uIsOngoing: true,
              uCoverListViewItems: false,
              uOnInitialTry: true,
              uFactModelList: [...state.FactModelList, currentItem2],
*/

    case BenchmarkActions.CoverCopyCompareTaskReset:
      return {
        ...state,
        CurrentAction: action.payload.uAction,
        ToVerify: action.payload.uVerify,
      };

    default:
      throw new Error(action.type);
  }
};
