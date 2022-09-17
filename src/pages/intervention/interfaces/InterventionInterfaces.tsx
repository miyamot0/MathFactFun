/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase/app";
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";

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
  PreTrialTime: Date;
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
  creator: string;
  target: string;
  method: string;
  dateTimeEnd: string;
  dateTimeStart: string;

  // Timestamps
  createdAt: firebase.firestore.Timestamp | null;
}
