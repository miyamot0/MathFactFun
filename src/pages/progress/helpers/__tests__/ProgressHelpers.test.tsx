/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { OnlyUnique } from "../../../../utilities/LabelHelper";
import { PerformanceDataInterface } from "../../../intervention/interfaces/InterventionInterfaces";
import { FactDataInterface } from "../../../setcreator/interfaces/SetCreatorInterfaces";
import {
  aggregateItemLevelPerformances,
  aggregatePerformances,
  getMappedColor,
  getMappedMarker,
  getPrimaryProgressChartData,
  getSecondaryProgressChartData,
  modifyDate,
  prepareItemLevelCalculations,
  prepareOverallCalculations,
  remapPerformances,
} from "../ProgressHelpers";

describe("modifyDate", () => {
  it("Should zero out hours", () => {
    const d = new Date();

    const result = modifyDate(d);

    expect(result.getHours()).toBe(0);
  });

  it("Should zero out minutes", () => {
    const d = new Date();

    const result = modifyDate(d);

    expect(result.getMinutes()).toBe(0);
  });
});

describe("getMappedColor", () => {
  it("should return red", () => {
    const accuracy = 0;

    const result = getMappedColor(accuracy);

    expect(result).toBe("red");
  });

  it("should return orange", () => {
    const accuracy = 70;

    const result = getMappedColor(accuracy);

    expect(result).toBe("orange");
  });

  it("should return green", () => {
    const accuracy = 100;

    const result = getMappedColor(accuracy);

    expect(result).toBe("green");
  });
});

describe("getMappedMarker", () => {
  it("should return circle", () => {
    const value = 0;

    const result = getMappedMarker(value);

    expect(result).toBe("circle");
  });

  it("should return triangle", () => {
    const value = 8;

    const result = getMappedMarker(value);

    expect(result).toBe("triangle");
  });

  it("should return diamond", () => {
    const value = 13;

    const result = getMappedMarker(value);

    expect(result).toBe("diamond");
  });

  it("should return square", () => {
    const value = 20;

    const result = getMappedMarker(value);

    expect(result).toBe("square");
  });
});

describe("remapPerformances", () => {
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
  ] as PerformanceDataInterface[];

  it("Check that correct number of values returned", () => {
    const result = remapPerformances(value);

    expect(result.length).toBe(2);
  });
});

describe("aggregatePerformances", () => {
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
  ] as PerformanceDataInterface[];

  it("Check that correct number of values are returned", () => {
    const preresult = remapPerformances(value);
    const result = aggregatePerformances(preresult);

    expect(result.length).toBe(2);
  });
});

describe("aggregateItemLevelPerformances", () => {
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
  ] as PerformanceDataInterface[];

  it("Should summarize the correct fact", () => {
    const mappedDocument = remapPerformances(value);
    const itemSummaries = mappedDocument.map(({ Items }) => Items);
    const flatItemSummaries: FactDataInterface[] = itemSummaries.reduce(
      (accumulator, value) => accumulator.concat(value)
    );

    const target = "Addition";
    // Extract unique problems targeted
    const uniqueMathFacts = flatItemSummaries
      .map((obj) => obj.factString)
      .filter(OnlyUnique)
      .sort();

    // Map properties based on facts in collection
    const uniqueQuants = aggregateItemLevelPerformances(
      uniqueMathFacts,
      flatItemSummaries,
      target
    );

    expect(uniqueQuants).toStrictEqual([
      {
        AverageCorrect: 100,
        Correct: 2,
        FactString: "1+1=2",
        Latency: 1,
        Total: 2,
        X: 1,
        Y: 1,
      },
    ]);
  });

  it("Should summarize the correct fact, despite errors", () => {
    const value2 = [
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
            factCorrect: false,
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

    const mappedDocument = remapPerformances(value2);
    const itemSummaries = mappedDocument.map(({ Items }) => Items);
    const flatItemSummaries: FactDataInterface[] = itemSummaries.reduce(
      (accumulator, value) => accumulator.concat(value)
    );

    const target = "Addition";
    // Extract unique problems targeted
    const uniqueMathFacts = flatItemSummaries
      .map((obj) => obj.factString)
      .filter(OnlyUnique)
      .sort();

    // Map properties based on facts in collection
    const uniqueQuants = aggregateItemLevelPerformances(
      uniqueMathFacts,
      flatItemSummaries,
      target
    );

    expect(uniqueQuants).toStrictEqual([
      {
        AverageCorrect: 50,
        Correct: 1,
        FactString: "1+1=2",
        Latency: 1,
        Total: 2,
        X: 1,
        Y: 1,
      },
    ]);
  });
});

describe("prepareOverallCalculations", () => {
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
  ] as PerformanceDataInterface[];

  it("Check that correct number of values are returned", () => {
    const aim = "20";
    const preresult = prepareOverallCalculations(value, aim);

    expect(preresult.MaxYAxis).toBe(61);
  });

  it("Check that correct number of values are returned, override using aim if necessary", () => {
    const aim = "80";
    const preresult = prepareOverallCalculations(value, aim);

    expect(preresult.MaxYAxis).toBe(81);
  });
});

describe("getPrimaryProgressChartData", () => {
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
          dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
          dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
        },
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
          dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
          dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
        },
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
          dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
          dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
        },
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
          dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
          dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
        },
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
          dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
          dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
        },
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
  ] as PerformanceDataInterface[];

  it("Check that correct number of values are returned", () => {
    const aim = "20";
    const preresult = prepareOverallCalculations(value, aim);

    const primaryChartData = getPrimaryProgressChartData(preresult, aim);

    expect(primaryChartData.title).toStrictEqual({ text: null });
  });
});

describe("getSecondaryProgressChartData", () => {
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

  it("Check that correct number of values are returned", () => {
    const aim = "20";
    const target = "Addition";
    const preresult = prepareOverallCalculations(value, aim);
    const itemLevelCalculations = prepareItemLevelCalculations(
      preresult,
      target
    );
    const secondaryChartData = getSecondaryProgressChartData(
      itemLevelCalculations,
      target
    );

    expect(secondaryChartData.title).toStrictEqual({ text: null });
  });

  it("Check that correct number of values are returned, clamping size", () => {
    const value2 = [
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

    const aim = "20";
    const target = "Addition";
    const preresult = prepareOverallCalculations(value, aim);
    const itemLevelCalculations = prepareItemLevelCalculations(
      preresult,
      target
    );
    const secondaryChartData = getSecondaryProgressChartData(
      itemLevelCalculations,
      target
    );

    expect(secondaryChartData.title).toStrictEqual({ text: null });
  });
});
