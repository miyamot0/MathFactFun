/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  checkIfNullUndefinedOrEmpty,
  formatBackgroundColor,
  formatTextBox,
  generateItemHistory,
  getRelevantCCCSet,
  isEmpty,
  loadMathFacts,
  populateColumnMetrics,
} from "../SetCreatorHelpers";
import firebase from "firebase";
import { DropResult } from "react-beautiful-dnd";
import { ColumnObject } from "../../types/SetCreatorTypes";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import {
  GetOperatorFromLabel,
  OnlyUnique,
} from "../../../../utilities/LabelHelper";
import {
  FactDataInterface,
  ItemHistory,
  SetItem,
} from "../../interfaces/SetCreatorInterfaces";
import { remapPerformances } from "../../../progress/helpers/ProgressHelpers";
import { FactsOnFire } from "../../../../maths/Mind";
import { onDragEnd } from "../DragDropHelpers";
import { PerformanceDataInterface } from "../../../intervention/interfaces/InterventionInterfaces";

describe("isEmpty", () => {
  it("Should return false, if empty", () => {
    const val = {};
    const res = isEmpty(val);

    expect(res).toBe(true);
  });

  it("Should return true, if has keys", () => {
    const val = { key: "123" };
    const res = isEmpty(val);

    expect(res).toBe(false);
  });
});

describe("checkIfNullUndefinedOrEmpty", () => {
  it("Should return true, if empty", () => {
    const val = {};
    const res = checkIfNullUndefinedOrEmpty(val);

    expect(res).toBe(true);
  });

  it("Should return true, if undefined", () => {
    const val = undefined;
    const res = checkIfNullUndefinedOrEmpty(val as unknown as object);

    expect(res).toBe(true);
  });

  it("Should return true, if has null", () => {
    const val = null;
    const res = checkIfNullUndefinedOrEmpty(val as unknown as object);

    expect(res).toBe(true);
  });
});

describe("onDragEnd", () => {
  it("Should return true, if empty", () => {
    const result = [
      {
        draggableId: "123",
        destination: "456",
        droppableId: "789",
      },
      {
        draggableId: "9123",
        destination: "9456",
        droppableId: "9789",
      },
    ] as unknown as DropResult;
    const columns = {
      Available: {
        name: "Available",
        items: [],
      },
      Targeted: {
        name: "Targeted",
        items: [],
      },
      Mastered: {
        name: "Mastered",
        items: [],
      },
      Skipped: {
        name: "Skipped",
        items: [],
      },
    } as ColumnObject;
    const dispatch = jest.fn();

    expect(() => onDragEnd(result, columns, dispatch)).not.toThrow();
  });

  // TODO
});

describe("loadMathFacts", () => {
  it("Addition check", () => {
    const value = "Addition";
    const operator = GetOperatorFromLabel(value);

    const valueObj = { currentTarget: value } as StudentDataInterface;
    const result = loadMathFacts(valueObj);

    expect(result[0][0].Answer.includes(operator)).toBe(true);
  });

  it("Subtraction check", () => {
    const value = "Subtraction";
    const operator = GetOperatorFromLabel(value);

    const valueObj = { currentTarget: value } as StudentDataInterface;
    const result = loadMathFacts(valueObj);

    expect(result[0][0].Answer.includes(operator)).toBe(true);
  });

  it("Multiplication check", () => {
    const value = "Multiplication";
    const operator = GetOperatorFromLabel(value);

    const valueObj = { currentTarget: value } as StudentDataInterface;
    const result = loadMathFacts(valueObj);

    expect(result[0][0].Answer.includes(operator)).toBe(true);
  });

  it("Division check", () => {
    const value = "Division";
    const operator = GetOperatorFromLabel(value);

    const valueObj = { currentTarget: value } as StudentDataInterface;
    const result = loadMathFacts(valueObj);

    expect(result[0][0].Answer.includes(operator)).toBe(true);
  });

  it("default check", () => {
    const value = "asdf";

    const valueObj = { currentTarget: value } as StudentDataInterface;
    const result = loadMathFacts(valueObj);

    expect(result[0][0].Answer.includes("+")).toBe(true);
  });
});

describe("formatTextBox", () => {
  it("Formats a number correctly", () => {
    const value = 1.23456;
    const result = formatTextBox(value, 2);

    expect(result).toBe("1.23");
  });

  it("Returns a string if undefined", () => {
    const value = undefined;
    const result = formatTextBox(value as unknown as number, 2);

    expect(result).toBe("---");
  });
});

describe("formatBackgroundColor", () => {
  it("formats to color one, if undefined", () => {
    const entry = {
      OTRs: undefined,
      Accuracy: undefined,
      Latency: undefined,
    } as unknown as SetItem;

    const result = formatBackgroundColor(entry);

    expect(result).toBe("#456C86");
  });

  it("formats to color two, all metrics are good", () => {
    const entry = {
      OTRs: 10,
      Accuracy: 100,
      Latency: 5,
    } as unknown as SetItem;

    const result = formatBackgroundColor(entry);

    expect(result).toBe("#42c966");
  });

  it("formats to color three, if in the middle", () => {
    const entry = {
      OTRs: 4,
      Accuracy: 70,
      Latency: 15,
    } as unknown as SetItem;

    const result = formatBackgroundColor(entry);

    expect(result).toBe("#456C86");
  });
});

describe("generateItemHistory", () => {
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

  it("Should render summaries correctly", () => {
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

    const uniqueProblems: string[] = flatItemSummaries
      .map((obj) => obj.factString)
      .filter(OnlyUnique)
      .sort();

    const uniqueQuants = generateItemHistory(
      uniqueProblems,
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
});

describe("populateColumnMetrics", () => {
  it("Should ...", () => {
    const mathFacts = ["1+1=2:0123", "1+2=3:2345"];
    const itemHistory = [
      {
        FactString: "1+1=2",
        Total: 1,
        AverageCorrect: 80,
        Latency: 5,
      },
    ] as ItemHistory[];

    const result = populateColumnMetrics(mathFacts, itemHistory);

    expect(result).toStrictEqual([
      { Accuracy: 80, Answer: "1+1=2", Latency: 5, OTRs: 1, id: "1+1=2:0123" },
      { Accuracy: 0, Answer: "1+2=3", Latency: 0, OTRs: 0, id: "1+2=3:2345" },
    ]);
  });
});

describe("getRelevantCCCSet", () => {
  it("Addition check", () => {
    const value = "Addition";
    const result = getRelevantCCCSet(value);

    expect(result).toStrictEqual(FactsOnFire.Addition);
  });

  it("Subtraction check", () => {
    const value = "Subtraction";
    const result = getRelevantCCCSet(value);

    expect(result).toStrictEqual(FactsOnFire.Subtraction);
  });

  it("Multiplication check", () => {
    const value = "Multiplication";
    const result = getRelevantCCCSet(value);

    expect(result).toStrictEqual(FactsOnFire.Multiplication);
  });

  it("Division check", () => {
    const value = "Division";
    const result = getRelevantCCCSet(value);

    expect(result).toStrictEqual(FactsOnFire.Division);
  });

  it("default check", () => {
    const value = "asdf";
    const result = getRelevantCCCSet(value);

    expect(result).toStrictEqual(FactsOnFire.Addition);
  });
});
