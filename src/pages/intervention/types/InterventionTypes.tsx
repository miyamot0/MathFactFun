import firebase from "firebase/app";
import { FactDataInterface } from "../../setcreator/types/SetCreatorTypes";

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

  TapedProblemsBatchStartPreflight = "TapedProblemsBatchStartPreflight",

  CoverCopyCompareBatchStartPreflight = "CoverCopyCompareBatchStartPreflight",
  CoverCopyCompareBatchStartBegin = "CoverCopyCompareBatchStartBegin",
  CoverCopyCompareTaskIncrement = "CoverCopyCompareTaskIncrement",
  CoverCopyCompareTaskReset = "CoverCopyCompareTaskReset",
  CoverCopyCompareBatchIncrement = "CoverCopyCompareBatchStartBegin",
  CoverCopyCompareBatchStartIncrementPost = "CoverCopyCompareBatchStartIncrementPost",
  CoverCopyCompareModalRetry = "CoverCopyCompareModalRetry",
  CoverCopyCompareItemIncrement = "CoverCopyCompareItemIncrement",
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
  CoverStimulusItem: false;
  CoverListViewItems: false;
  ShowButton: false;
  IsOngoing: false;
  ToVerify: false;
  FactModelList: FactDataInterface[];
  NextLiItem: string;
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

export interface PerformanceDataInterface {
  correctDigits: number;
  errCount: number;
  nCorrectInitial: number;
  nRetries: number;
  sessionDuration: number;
  setSize: number;
  totalDigits: number;

  // Arrays
  entries: FactDataInterface[];

  // Strings
  id: string | undefined | null;
  creator: string | undefined;
  target: string | undefined;
  method: string | undefined;
  dateTimeEnd: string | undefined;
  dateTimeStart: string | undefined;

  // Timestamps
  createdAt?: firebase.firestore.Timestamp | null;
}

export const SharedActionSequence = {
  Start: "ActionSequence.Start",
  Answer: "ActionSequence.Answer",
  Entry: "ActionSequence.Entry",
  CoverCopy: "ActionSequence.CoverCopy",
  Compare: "ActionSequence.Compare",
  Begin: "ActionSequence.Begin",
};
