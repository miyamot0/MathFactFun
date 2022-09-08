import { FactDataInterface } from "../../../firebase/types/GeneralTypes";

/**
 * Actions for reducer
 */
export enum BenchmarkActions {
  //GeneralOpenModal = "GeneralOpenModal",
  //GeneralCloseModal = "GeneralCloseModal",
  GeneralUpdateEntry = "GeneralUpdateEntry",

  BenchmarkBatchStartPreflight = "BenchmarkBatchStartPreflight",
  BenchmarkBatchStartBegin = "BenchmarkActionStartOrBegin",
  BenchmarkBatchStartIncrement = "BenchmarkBatchStartIncrement",
  BenchmarkBatchStartIncrementPost = "BenchmarkBatchStartIncrementPost",

  ExplicitTimingBatchStartPreflight = "ExplicitTimingBatchStartPreflight",
  ExplicitTimingBatchIncrement = "ExplicitTimingBatchIncrement",
  ExplicitTimingModalRetry = "ExplicitTimingModalRetry",
}

export interface BenchmarkState {
  ViewRepresentationInternal: string;
  EntryRepresentationInternal: string;
  OperatorSymbol: string;
  ButtonText: string;
  CurrentAction: string;
  WorkingData: string[];
  SecondsLeft: number;
  LoadedData: false;
  CoverProblemItem: false;
  FactModelList: FactDataInterface[];
  StartTime: Date | null;
  PreTrialTime: Date | null;
  OnInitialTry: boolean;
  NumCorrectInitial: number;
  NumErrors: number;
  TotalDigits: number;
  TotalDigitsCorrect: number;
  NumbTrials: number;
  NumRetries: number;
  ModalIsOpen: boolean;
}

export const SharedActionSequence = {
  Start: "ActionSequence.Start",
  Answer: "ActionSequence.Answer",
  Entry: "ActionSequence.Entry",
  Begin: "ActionSequence.Begin",
};
