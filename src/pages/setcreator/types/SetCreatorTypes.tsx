import firebase from "firebase/app";

export interface FactDataInterface {
  // Bools
  factCorrect: boolean | null;
  initialTry: boolean | null;

  // Strings
  factType: string | undefined;
  factString: string | undefined;
  factEntry: string | undefined;

  // Numerics
  latencySeconds: number | null;

  // Timestamps
  dateTimeEnd: firebase.firestore.Timestamp;
  dateTimeStart: firebase.firestore.Timestamp;
}

/**
 * Actions for reducer
 */
export enum DragDropActions {
  Load = "Load",
  SetItemHistory = "SetItemHistory",
  SetBaseItems = "SetBaseItems",
  UpdateColumns = "UpdateColumns",
  ToggleLoaded = "ToggleLoaded",
}

export type ColumnVector = {
  name: string;
  items: any[];
};

export type ColumnObject = {
  [key: string]: ColumnVector;
};

export type ColumnsObject = {
  columns: {
    [key: string]: ColumnVector;
  };
  ItemHistory: ItemHistory[] | null;
  BaseItems: SetItem[] | null;
  LoadedData: boolean;
};

export interface FactStructure {
  Answer: string;
  id: string;
}

export interface ItemHistory {
  FactString: string;
  X: number;
  Y: number;
  Latency: number;
  AverageCorrect: number;
  Correct: number;
  Total: number;
}

export interface SetItem {
  Answer: string;
  id: string;
  OTRs: number;
  Accuracy: number;
  Latency: number;
}

export interface DragColumnContents {
  name: string;
  items: SetItem[];
}

export interface DragColumnsInterface {
  [key: string]: DragColumnContents | null;
}

export interface ItemMetrics {
  Items: FactDataInterface[];
  Date: Date;
  ShortDate: string;
  Errors: number;
  DigitsCorrect: number;
  DigitsCorrectInitial: number;
  DigitsTotal: number;
  SessionDuration: number;
}
