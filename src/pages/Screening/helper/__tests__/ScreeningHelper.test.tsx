/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { PerformanceDataInterface } from "../../../intervention/interfaces/InterventionInterfaces";
import { FactDataInterface } from "../../../setcreator/interfaces/SetCreatorInterfaces";
import {
  reducerPerOperation,
  remapReducedEntriesToPoint,
} from "../ScreeningHelper";

describe("reducerPerOperation", () => {
  it("Should reduce: Addition", () => {
    const value = [
      {
        correctDigits: 1,
        errCount: 1,
        nCorrectInitial: 1,
        nRetries: 1,
        sessionDuration: 1,
        setSize: 1,
        totalDigits: 1,

        // Arrays
        entries: [
          {
            factCorrect: true,
            initialTry: true,

            // Strings
            factType: "Addition",
            factString: "1+1=2",
            factEntry: "1+1=2",

            // Numerics
            latencySeconds: 1,

            // Timestamps
            dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
            dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
          },
        ] as FactDataInterface[],

        // Strings
        id: "123",
        creator: "456",
        target: "Addition",
        method: "ExplicitTiming",
        dateTimeEnd: "09/15/2022",
        dateTimeStart: "09/15/2022",
        // Timestamps
        createdAt: null,
      },
      {
        correctDigits: 1,
        errCount: 1,
        nCorrectInitial: 1,
        nRetries: 1,
        sessionDuration: 1,
        setSize: 1,
        totalDigits: 1,

        // Arrays
        entries: [
          {
            factCorrect: true,
            initialTry: true,

            // Strings
            factType: "Addition",
            factString: "1+1=2",
            factEntry: "1+1=2",

            // Numerics
            latencySeconds: 1,

            // Timestamps
            dateTimeEnd: firebase.firestore.Timestamp.fromDate(
              new Date("09/14/2022")
            ),
            dateTimeStart: firebase.firestore.Timestamp.fromDate(
              new Date("09/14/2022")
            ),
          },
        ] as FactDataInterface[],

        // Strings
        id: "123",
        creator: "456",
        target: "Addition",
        method: "ExplicitTiming",
        dateTimeEnd: "09/14/2022",
        dateTimeStart: "09/14/2022",
        // Timestamps
        createdAt: null,
      },
      {
        correctDigits: 1,
        errCount: 1,
        nCorrectInitial: 1,
        nRetries: 1,
        sessionDuration: 1,
        setSize: 1,
        totalDigits: 1,

        // Arrays
        entries: [
          {
            factCorrect: true,
            initialTry: true,

            // Strings
            factType: "Addition",
            factString: "1+1=2",
            factEntry: "1+1=2",

            // Numerics
            latencySeconds: 1,

            // Timestamps
            dateTimeEnd: firebase.firestore.Timestamp.fromDate(
              new Date("09/18/2022")
            ),
            dateTimeStart: firebase.firestore.Timestamp.fromDate(
              new Date("09/18/2022")
            ),
          },
        ] as FactDataInterface[],

        // Strings
        id: "123",
        creator: "456",
        target: "Addition",
        method: "ExplicitTiming",
        dateTimeEnd: "09/18/2022",
        dateTimeStart: "09/18/2022",
        // Timestamps
        createdAt: null,
      },
    ] as PerformanceDataInterface[];

    const result = reducerPerOperation(value);

    const trimOutTroublesomeDate = result.map((res) => {
      return {
        Accuracy: res.Accuracy,
        DCPM: res.DCPM,
        Date: res.Date,
      };
    });

    expect(trimOutTroublesomeDate).toStrictEqual([
      {
        Accuracy: 100,
        DCPM: 60,
        Date: "9/14/2022",
      },
      {
        Accuracy: 100,
        DCPM: 60,
        Date: "9/15/2022",
      },
      {
        Accuracy: 100,
        DCPM: 60,
        Date: "9/18/2022",
      },
    ]);
  });
});

describe("remapReducedEntriesToPoint", () => {
  it("Should reduce as expected", () => {
    const value = [
      {
        correctDigits: 1,
        errCount: 1,
        nCorrectInitial: 1,
        nRetries: 1,
        sessionDuration: 1,
        setSize: 1,
        totalDigits: 1,

        // Arrays
        entries: [
          {
            factCorrect: true,
            initialTry: true,

            // Strings
            factType: "Addition",
            factString: "1+1=2",
            factEntry: "1+1=2",

            // Numerics
            latencySeconds: 1,

            // Timestamps
            dateTimeEnd: firebase.firestore.Timestamp.fromDate(
               new Date("09/15/2022")
              ),
            dateTimeStart: firebase.firestore.Timestamp.fromDate(
               new Date("09/15/2022")
              ),
          },
        ] as FactDataInterface[],

        // Strings
        id: "123",
        creator: "456",
        target: "Addition",
        method: "ExplicitTiming",
        dateTimeEnd: "09/15/2022",
        dateTimeStart: "09/15/2022",
        // Timestamps
        createdAt: null,
      },
      {
        correctDigits: 1,
        errCount: 1,
        nCorrectInitial: 1,
        nRetries: 1,
        sessionDuration: 1,
        setSize: 1,
        totalDigits: 1,

        // Arrays
        entries: [
          {
            factCorrect: true,
            initialTry: true,

            // Strings
            factType: "Addition",
            factString: "1+1=2",
            factEntry: "1+1=2",

            // Numerics
            latencySeconds: 1,

            // Timestamps
            dateTimeEnd: firebase.firestore.Timestamp.fromDate(
              new Date("09/14/2022")
            ),
            dateTimeStart: firebase.firestore.Timestamp.fromDate(
              new Date("09/14/2022")
            ),
          },
        ] as FactDataInterface[],

        // Strings
        id: "123",
        creator: "456",
        target: "Addition",
        method: "ExplicitTiming",
        dateTimeEnd: "09/14/2022",
        dateTimeStart: "09/14/2022",
        // Timestamps
        createdAt: null,
      },
    ] as PerformanceDataInterface[];

    const reduced = reducerPerOperation(value);
    const result = remapReducedEntriesToPoint(reduced);

    const d1 = new Date("09/14/2022").getTime();
    const d2 = new Date("09/15/2022").getTime();

    expect(result).toStrictEqual([
      { x: d1, y: 60 },
      { x: d2, y: 60 },
    ]);
  });
});
