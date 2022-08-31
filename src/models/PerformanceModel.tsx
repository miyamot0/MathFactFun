/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase/app";

import { FactModelInterface } from "./FactEntryModel";

export interface PerformanceDataInterface {
  // Numerics
  correctDigits: number;
  errCount: number;
  nCorrectInitial: number;
  nRetries: number;
  sessionDuration: number;
  setSize: number;
  totalDigits: number;

  // Timestamps
  createdAt?: firebase.firestore.Timestamp;

  // Arrays
  entries: FactModelInterface[];

  // Strings
  id: string;
  creator: string;
  target: string;
  method: string;
  dateTimeEnd: string;
  dateTimeStart: string;
}

export interface PerformanceModelInterface {
  data: PerformanceDataInterface;
  CheckObject: () => boolean;
  SubmitObject: () => PerformanceDataInterface;
}

export const PerformanceModel = () => {
  return {
    data: {
      // Numerics
      correctDigits: null,
      errCount: 0,
      nCorrectInitial: 0,
      nRetries: 0,
      sessionDuration: 0,
      setSize: 0,
      totalDigits: 0,

      // Timestamps
      createdAt: null,
      dateTimeEnd: null,
      dateTimeStart: null,

      // Arrays
      entries: [],

      // Strings
      id: null,
      creator: null,
      target: null,
      method: null,
    },
    CheckObject: function () {
      if (typeof this.data.correctDigits !== "number") return false;
      if (typeof this.data.errCount !== "number") return false;
      if (typeof this.data.nCorrectInitial !== "number") return false;
      if (typeof this.data.nRetries !== "number") return false;
      if (typeof this.data.sessionDuration !== "number") return false;
      if (typeof this.data.setSize !== "number") return false;
      if (typeof this.data.totalDigits !== "number") return false;

      if (typeof this.data.id !== "string") return false;
      if (typeof this.data.creator !== "string") return false;
      if (typeof this.data.target !== "string") return false;
      if (typeof this.data.method !== "string") return false;
      if (typeof this.data.dateTimeEnd !== "string") return false;
      if (typeof this.data.dateTimeStart !== "string") return false;

      if (!(this.data.createdAt !== null))
        return false;

      for (let i = 0; i < this.data.entries.length; i++) {
        if (!this.data.entries[i].CheckObject()) {
          return false;
        }
      }

      return true;
    },
    SubmitObject: function (): PerformanceDataInterface {
      let filteredData = this.data as PerformanceDataInterface;
      filteredData.entries = this.data.entries.map((entry) => entry.data);

      return filteredData;
    },
  };
};
