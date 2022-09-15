/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";

export interface FactDataInterface {
  // Bools
  factCorrect: boolean;
  initialTry: boolean;

  // Strings
  factType: string;
  factString: string;
  factEntry: string;

  // Numerics
  latencySeconds: number;

  // Timestamps
  dateTimeEnd: firebase.firestore.Timestamp;
  dateTimeStart: firebase.firestore.Timestamp;
}

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
  [key: string]: DragColumnContents;
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
