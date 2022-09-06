import { FactDataInterface } from "../../../firebase/types/GeneralTypes";

/**
 * Actions for reducer
 */
export enum BenchmarkActions {
  UpdateEntry = "UpdateEntry",
  BatchStartPreflight = "BatchStartPreflight",
  BatchStartBegin = "ActionStartOrBegin",
  BatchStartIncrement = "BatchStartIncrement",
  BatchStartIncrementPost = "BatchStartIncrementPost",
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
}
