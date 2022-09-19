/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase/app";
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";
import { SharedActionSequence } from "./../functionality/InterventionBehavior";

export interface InterventionState {
  ViewRepresentationInternal: string;
  EntryRepresentationInternal: string;
  OperatorSymbol: string;
  ButtonText: string;
  CurrentAction: SharedActionSequence;
  WorkingData: string[];
  SecondsLeft: number;
  LoadedData: boolean;
  CoverProblemItem: boolean;
  CoverStimulusItem: boolean;
  CoverListViewItems: boolean;
  ShowButton: boolean;
  IsOngoing: boolean;
  ToVerify: boolean;
  FactModelList: FactDataInterface[];
  NextLiItem: string | undefined;
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

/** DispatchUpdateEntryInternal
 * 
 * Class for updating string entry
 * 
 */
export class DispatchUpdateEntryInternal {
  public type: number;
  public payload: {
    EntryRepresentationInternal: string;
  };
  public DispatchUpdateEntryInternal?: string;

  constructor({
    type,
    payload,
  }: {
    type: number;
    payload: { EntryRepresentationInternal: string };
    DispatchUpdateEntryInternal?: string;
  }) {
    this.type = type;
    this.payload = payload;
    this.DispatchUpdateEntryInternal = "DispatchUpdateEntryInternal";
  }
}

/** DispatchUpdatePreLoadContent
 * 
 * Class for loading intervention information
 * 
 */
export class DispatchUpdatePreLoadContent {
  public type: number;
  public payload: {
    CurrentAction: SharedActionSequence;
    WorkingData: string[];
    LoadedData: boolean;
    OperatorSymbol: string;
    SecondsLeft: number;
  };
  public DispatchUpdatePreLoadContent?: string;

  constructor({
    type,
    payload,
  }: {
    type: number;
    payload: {
      CurrentAction: SharedActionSequence;
      WorkingData: string[];
      LoadedData: boolean;
      OperatorSymbol: string;
      SecondsLeft: number;
    };
  }) {
    this.type = type;
    this.payload = payload;
    this.DispatchUpdatePreLoadContent = "DispatchUpdatePreLoadContent";
  }
}

/** DispatchUpdateIntroduceItem
 * 
 * Class for loading intervention information
 * 
 */
export class DispatchUpdateIntroduceItem {
  public type: number;
  public payload: {
    CurrentAction: SharedActionSequence;
    WorkingData: string[];
    ButtonText: string,
    CoverProblemItem: boolean,
    PreTrialTime: Date,
    EntryRepresentationInternal: string,
    ShowButton?: boolean,
    IsOngoing?: boolean,
    StartTime: Date,
    ViewRepresentationInternal: string,
    CoverListViewItems?: boolean,
    NextLiItem?: string | undefined,
  };
  public DispatchUpdateIntroduceItem?: string;

  constructor({
    type,
    payload,
  }: {
    type: number;
    payload: {
      CurrentAction: SharedActionSequence;
      WorkingData: string[];
      ButtonText: string,

      CoverProblemItem: boolean,
      PreTrialTime: Date,
      EntryRepresentationInternal: string,
      StartTime: Date,
      ViewRepresentationInternal: string,

      // Items specific to CCC
      ShowButton?: boolean | undefined,
      IsOngoing?: boolean | undefined,
      CoverListViewItems?: boolean | undefined,
      NextLiItem?: string | undefined,
    };
  }) {
    this.type = type;
    this.payload = payload;
    this.DispatchUpdateIntroduceItem = "DispatchUpdateIntroduceItem";
  }
}

/** DispatchUpdateRetryItem
 * 
 * Class for re-trying an existing item
 * 
 */
export class DispatchUpdateRetryItem {
  public type: number;
  public payload: {
    EntryRepresentationInternal: string,
    NumRetries: number;
    OnInitialTry: boolean;

    CoverStimulusItem?: boolean;
    ToVerify?: boolean;
    CurrentAction?: SharedActionSequence;
    ButtonText?: string;
    IsOngoing?: boolean,
    CoverProblemItem?: boolean,
  };
  public DispatchUpdateRetryItem?: string;

  constructor({
    type,
    payload,
  }: {
    type: number;
    payload: {
      EntryRepresentationInternal: string,
      NumRetries: number;
      OnInitialTry: boolean;

      CoverStimulusItem?: boolean;
      ToVerify?: boolean;
      CurrentAction?: SharedActionSequence;
      ButtonText?: string;
      IsOngoing?: boolean,
      CoverProblemItem?: boolean,
    };
  }) {
    this.type = type;
    this.payload = payload;
    this.DispatchUpdateRetryItem = "DispatchUpdateRetryItem";
  }
}

// Type guards

export type InterventionDispatches =
  | DispatchUpdateEntryInternal
  | DispatchUpdatePreLoadContent
  | DispatchUpdateIntroduceItem
  | DispatchUpdateRetryItem;

export function isEntryInternalDispatch(
  object: InterventionDispatches
): object is DispatchUpdateEntryInternal {
  const res_ =
    (object as DispatchUpdateEntryInternal).DispatchUpdateEntryInternal !==
    undefined;
  return res_;
}

export function isPreloadDispatch(
  object: InterventionDispatches
): object is DispatchUpdatePreLoadContent {
  const res_ =
    (object as DispatchUpdatePreLoadContent).DispatchUpdatePreLoadContent !==
    undefined;
  return res_;
}

export function isItemLoadDispatch(
  object: InterventionDispatches
): object is DispatchUpdateIntroduceItem {
  const res_ =
    (object as DispatchUpdateIntroduceItem).DispatchUpdateIntroduceItem !==
    undefined;
  return res_;
}

export function isItemRetryDispatch(
  object: InterventionDispatches
): object is DispatchUpdateRetryItem {
  const res_ =
    (object as DispatchUpdateRetryItem).DispatchUpdateRetryItem !==
    undefined;
  return res_;
}
