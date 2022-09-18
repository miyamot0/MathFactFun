/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ErrorHandling } from "../../../../maths/Facts";
import { FactsOnFire } from "../../../../maths/Mind";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import { SharedActionSequence } from "../../functionality/InterventionBehavior";
import {
  checkLiNullUndefinedBlank,
  DetermineErrorCorrection,
  getCoreProblemSet,
  getSetFromArray,
  getUniqueProblems,
  keyHandler,
  loadWorkingDataBenchmark,
  shouldShowFeedback,
} from "../InterventionHelpers";

describe("DetermineErrorCorrection", () => {
  it("ErrorHandling.Never should return false", () => {
    const errorDetected = true;
    const setting = ErrorHandling.Never;

    const result = DetermineErrorCorrection(errorDetected, setting);

    expect(result).toBe(false);
  });

  it("ErrorHandling.EveryTime should return true", () => {
    const errorDetected = true;
    const setting = ErrorHandling.EveryTime;

    const result = DetermineErrorCorrection(errorDetected, setting);

    expect(result).toBe(true);
  });

  it("ErrorHandling.ThrowError should return false", () => {
    const errorDetected = true;
    const setting = ErrorHandling.ThrowError;

    const result = DetermineErrorCorrection(errorDetected, setting);

    expect(result).toBe(false);
  });
});

describe("shouldShowFeedback", () => {
  it("ErrorHandling.Never should return false", () => {
    const errorDetected = true;

    const setting = ErrorHandling.Never;

    const document = {
      currentErrorApproach: setting,
    } as StudentDataInterface;

    const result = shouldShowFeedback(errorDetected, document);

    expect(result).toBe(false);
  });

  it("ErrorHandling.EveryTime should return true", () => {
    const errorDetected = true;
    const setting = ErrorHandling.EveryTime;

    const document = {
      currentErrorApproach: setting,
    } as StudentDataInterface;

    const result = shouldShowFeedback(errorDetected, document);

    expect(result).toBe(true);
  });

  it("ErrorHandling.ThrowError should return false", () => {
    const errorDetected = true;
    const setting = ErrorHandling.ThrowError;

    const document = {
      currentErrorApproach: setting,
    } as StudentDataInterface;

    const result = shouldShowFeedback(errorDetected, document);

    expect(result).toBe(false);
  });
});

describe("checkLiNullUndefinedBlank", () => {
  it("Should return true: null", () => {
    const value = null;
    const result = checkLiNullUndefinedBlank(value as unknown as string);
    expect(result).toBe(true);
  });

  it("Should return true: undefined", () => {
    const value = undefined;
    const result = checkLiNullUndefinedBlank(value as unknown as string);
    expect(result).toBe(true);
  });

  it("Should return true: empty", () => {
    const value = "";
    const result = checkLiNullUndefinedBlank(value);
    expect(result).toBe(true);
  });

  it("Should return false: valid string", () => {
    const value = "string";
    const result = checkLiNullUndefinedBlank(value);
    expect(result).toBe(false);
  });
});

describe("getCoreProblemSet", () => {
  it("Should return accurate set: Addition", () => {
    const value = "Addition";
    const result = getCoreProblemSet(value);
    expect(result).toStrictEqual(FactsOnFire.Addition);
  });
  it("Should return accurate set: Subtraction", () => {
    const value = "Subtraction";
    const result = getCoreProblemSet(value);
    expect(result).toStrictEqual(FactsOnFire.Subtraction);
  });
  it("Should return accurate set: Division", () => {
    const value = "Division";
    const result = getCoreProblemSet(value);
    expect(result).toStrictEqual(FactsOnFire.Division);
  });
  it("Should return accurate set: Multiplication", () => {
    const value = "Multiplication";
    const result = getCoreProblemSet(value);
    expect(result).toStrictEqual(FactsOnFire.Multiplication);
  });

  it("Should throw error: bad target", () => {
    const value = "asdf";

    expect(() => getCoreProblemSet(value)).toThrow(
      Error("Target for problem set missing")
    );
  });
});

describe("getSetFromArray", () => {
  const target = "Addition";
  const coreItems = getCoreProblemSet(target);
  const problemSet = "A";
  const coreSet = getSetFromArray(coreItems, problemSet);

  it("Should return accurate set: A", () => {
    const start = 0,
      end = 5;
    const problems: string[][] = coreItems.slice(start, end);

    const result = problems.reduce(
      (accumulator, value) => accumulator.concat(value),
      [] as string[]
    );

    expect(getSetFromArray(coreItems, "A")).toStrictEqual(result);
  });
  it("Should return accurate set: B", () => {
    const start = 6,
      end = 11;
    const problems: string[][] = coreItems.slice(start, end);

    const result = problems.reduce(
      (accumulator, value) => accumulator.concat(value),
      [] as string[]
    );

    expect(getSetFromArray(coreItems, "B")).toStrictEqual(result);
  });
  it("Should return accurate set: C", () => {
    const start = 12,
      end = 17;
    const problems: string[][] = coreItems.slice(start, end);

    const result = problems.reduce(
      (accumulator, value) => accumulator.concat(value),
      [] as string[]
    );

    expect(getSetFromArray(coreItems, "C")).toStrictEqual(result);
  });
});

describe("getUniqueProblems", () => {
  it("Should return unique sets: Addition", () => {
    const problems = ["1+2=3", "2+1=3", "2+2=4"];
    const result = getUniqueProblems(problems, "+");

    expect(result).toStrictEqual(["1+2=3", "2+2=4"]);
  });

  it("Should return unique sets: Subtraction", () => {
    const problems = ["3-1=2", "2-1=1", "3-1=2"];
    const result = getUniqueProblems(problems, "-");

    expect(result).toStrictEqual(["3-1=2", "2-1=1"]);
  });

  // TODO: add in division/multiplication
});

describe("loadWorkingDataBenchmark", () => {
  it("Should return unique sets: Addition", () => {
    const student = { problemSet: "A" } as StudentDataInterface;
    const target = "Addition";

    const result = loadWorkingDataBenchmark(student, target);

    expect(result).toStrictEqual([
      "9+8=17",
      "5+3=8",
      "6+9=15",
      "3+3=6",
      "6+7=13",
      "9+4=13",
      "5+2=7",
      "3+8=11",
      "7+7=14",
      "6+5=11",
      "4+4=8",
      "2+8=10",
    ]);
  });

  // TODO: add for other operations as well
});

/*
TODO Remove once TP is updated
describe("keyHandler", () => {
  it("Number key: trigger key cb but not button callback", () => {
    const currentAction = SharedActionSequence.Start;
    const mockKeyCallback = jest.fn((char: string) => {});
    const mockButtonCallback = jest.fn(() => {});

    const key = {
      key: "1",
    } as React.KeyboardEvent<HTMLElement>;

    keyHandler(key, mockKeyCallback, mockButtonCallback, currentAction);

    expect(mockKeyCallback).toBeCalledTimes(1);
    expect(mockButtonCallback).toBeCalledTimes(0);
  });

  it("Space key: trigger button cb but not key callback", () => {
    const currentAction = SharedActionSequence.CoverCopy;
    const mockKeyCallback = jest.fn((char: string) => {});
    const mockButtonCallback = jest.fn(() => {});

    const key = {
      key: "1",
    } as React.KeyboardEvent<HTMLElement>;

    keyHandler(key, mockKeyCallback, mockButtonCallback, currentAction);

    expect(mockKeyCallback).toBeCalledTimes(0);
    expect(mockButtonCallback).toBeCalledTimes(1);
  });

  it("Unrelated key: trigger neither callback", () => {
    const currentAction = SharedActionSequence.Start;
    const mockKeyCallback = jest.fn((char: string) => {});
    const mockButtonCallback = jest.fn(() => {});

    const key = {
      key: "t",
    } as React.KeyboardEvent<HTMLElement>;

    keyHandler(key, mockKeyCallback, mockButtonCallback, currentAction);

    expect(mockKeyCallback).toBeCalledTimes(0);
    expect(mockButtonCallback).toBeCalledTimes(0);
  });
});
*/
