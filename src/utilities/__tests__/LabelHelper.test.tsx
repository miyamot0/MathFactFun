/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  CalculateDigitsCorrect,
  CalculateDigitsCorrectAnswer,
  CalculateDigitsTotalAnswer,
  calculateDigitsTotalInProblem,
  formatDate,
  GetApproachStringFromLabel,
  GetOperatorFromLabel,
  OnlyUnique,
  Sum,
} from "../LabelHelper";

describe("LabelHelpers: formatDate", () => {
  it("Date: Should confirm accurate-1", () => {
    const value = new Date(2022, 3, 1);
    const expected = "2022-04-01";

    const modifiedValue = formatDate(value);

    expect(modifiedValue).toEqual(expected);
  });

  it("Date: Should confirm accurate-2", () => {
    const value = new Date(2022, 11, 11);
    const expected = "2022-12-11";

    const modifiedValue = formatDate(value);

    expect(modifiedValue).toEqual(expected);
  });

  it("String: Should confirm accurate", () => {
    const value = new Date("4/1/2022");
    const expected = "2022-04-01";

    const modifiedValue = formatDate(value);

    expect(modifiedValue).toEqual(expected);
  });

  it("String: Should confirm accurate", () => {
    const value = new Date("12/11/2022");
    const expected = "2022-12-11";

    const modifiedValue = formatDate(value);

    expect(modifiedValue).toEqual(expected);
  });
});

describe("LabelHelpers: calculateDigitsTotalInProblem", () => {
  it("Subtraction: Should confirm numbers in problem (total)", () => {
    const operator = "-";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue - magnitudeChange;

    const totalDigitsInProblem =
      baseValue.toString().length +
      magnitudeChange.toString().length +
      answer.toString().length;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = calculateDigitsTotalInProblem(input);

    expect(result).toEqual(totalDigitsInProblem);
  });

  it("Addition: Should confirm numbers in problem (total)", () => {
    const operator = "+";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue + magnitudeChange;

    const totalDigitsInProblem =
      baseValue.toString().length +
      magnitudeChange.toString().length +
      answer.toString().length;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = calculateDigitsTotalInProblem(input);

    expect(result).toEqual(totalDigitsInProblem);
  });

  it("Multiplication: Should confirm numbers in problem (total)", () => {
    const operator = "x";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue * magnitudeChange;

    const totalDigitsInProblem =
      baseValue.toString().length +
      magnitudeChange.toString().length +
      answer.toString().length;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = calculateDigitsTotalInProblem(input);

    expect(result).toEqual(totalDigitsInProblem);
  });

  it("Division: Should confirm numbers in problem (total)", () => {
    const operator = "/";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue / magnitudeChange;

    const totalDigitsInProblem =
      baseValue.toString().length +
      magnitudeChange.toString().length +
      answer.toString().length;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = calculateDigitsTotalInProblem(input);

    expect(result).toEqual(totalDigitsInProblem);
  });

  it("Fail: missing operator", () => {
    expect(() => calculateDigitsTotalInProblem("12=12")).toThrow(
      Error("No operator found in fact string")
    );
  });

  it("Fail: missing equality sign", () => {
    expect(() => calculateDigitsTotalInProblem("12+12")).toThrow(
      Error("No equality sign found in fact string")
    );
  });
});

describe("LabelHelpers: CalculateDigitsTotalAnswer", () => {
  it("Subtraction: Should confirm numbers in problem (total)", () => {
    const operator = "-";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue - magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsTotalAnswer(input);

    expect(result).toEqual(answer.toString().trim().length);
  });

  it("Addition: Should confirm numbers in problem (total)", () => {
    const operator = "+";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue + magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsTotalAnswer(input);

    expect(result).toEqual(answer.toString().trim().length);
  });

  it("Multiplication: Should confirm numbers in problem (total)", () => {
    const operator = "x";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue * magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsTotalAnswer(input);

    expect(result).toEqual(answer.toString().trim().length);
  });

  it("Division: Should confirm numbers in problem (total)", () => {
    const operator = "/";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue / magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsTotalAnswer(input);

    expect(result).toEqual(answer.toString().trim().length);
  });

  it("Fail: missing equality sign", () => {
    expect(() => CalculateDigitsTotalAnswer("12-12")).toThrow(
      Error("No equality sign found in fact string")
    );
  });
});

describe("LabelHelpers: CalculateDigitsCorrect", () => {
  it("Subtraction: Should confirm digits correct", () => {
    const operator = "-";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue - magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsCorrect(input, input, operator);

    expect(result).toEqual(5);
  });

  it("Addition: Should confirm digits correct", () => {
    const operator = "+";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue + magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsCorrect(input, input, operator);

    expect(result).toEqual(5);
  });

  it("Multiplication: Should confirm digits correct", () => {
    const operator = "x";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue * magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsCorrect(input, input, operator);

    expect(result).toEqual(5);
  });

  it("Division: Should confirm digits correct", () => {
    const operator = "/";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue / magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsCorrect(input, input, operator);

    expect(result).toEqual(5);
  });

  it("Do not fail: missing equality sign", () => {
    expect(() => CalculateDigitsCorrect("12-12", "12-12=0", '+')).not.toThrow(
      Error("No equality sign found in fact string")
    );
  });

  it("Do not fail: missing equality sign", () => {
    expect(() => CalculateDigitsCorrect("12-", "12-12=0", '+')).not.toThrow(
      Error("No equality sign found in fact string")
    );
  });

  it("Do not fail: missing equality sign", () => {
    expect(() => CalculateDigitsCorrect("12", "12-12=0", '+')).not.toThrow(
      Error("No equality sign found in fact string")
    );
  });

  it("Do not fail: missing equality sign", () => {
    expect(() => CalculateDigitsCorrect("", "12-12=0", '+')).not.toThrow(
      Error("No equality sign found in fact string")
    );
  });
});

describe("LabelHelpers: CalculateDigitsCorrectAnswer", () => {
  it("Subtraction: Should confirm numbers correct in answer", () => {
    const operator = "-";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue - magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsCorrectAnswer(input, input);

    expect(result).toEqual(2);
  });

  it("Addition: Should confirm numbers correct in answer", () => {
    const operator = "+";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue + magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsCorrectAnswer(input, input);

    expect(result).toEqual(2);
  });

  it("Multiplication: Should confirm numbers correct in answer", () => {
    const operator = "x";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue * magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsCorrectAnswer(input, input);

    expect(result).toEqual(2);
  });

  it("Division: Should confirm numbers correct in answer", () => {
    const operator = "/";
    const baseValue = 12;
    const magnitudeChange = 1;
    const answer = baseValue / magnitudeChange;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsCorrectAnswer(input, input);

    expect(result).toEqual(2);
  });

  it("Fail: missing equality sign", () => {
    expect(() => CalculateDigitsCorrectAnswer("12-1", "12-1=11")).toThrow(
      Error("No equality sign found in fact string")
    );
  });
});

describe("LabelHelpers: GetOperatorFromLabel", () => {
  it("Subtraction: Should confirm numbers correct in answer", () => {
    const operator = "-";
    const operation = "Subtraction";

    const result = GetOperatorFromLabel(operation);

    expect(result).toEqual(operator);
  });

  it("Addition: Should confirm numbers correct in answer", () => {
    const operator = "+";
    const operation = "Addition";

    const result = GetOperatorFromLabel(operation);

    expect(result).toEqual(operator);
  });

  it("Multiplication: Should confirm numbers correct in answer", () => {
    const operator = "x";
    const operation = "Multiplication";

    const result = GetOperatorFromLabel(operation);

    expect(result).toEqual(operator);
  });

  it("Division: Should confirm numbers correct in answer", () => {
    const operator = "/";
    const operation = "Division";

    const result = GetOperatorFromLabel(operation);

    expect(result).toEqual(operator);
  });

  it("Fail: no matching operation", () => {
    expect(() => GetOperatorFromLabel("")).toThrow(
      Error("No matching operation")
    );
  });
});

describe("LabelHelpers: GetApproachStringFromLabel", () => {
  it("Should correctly format: CoverCopyCompare", () => {
    const approach = "CoverCopyCompare";
    const formatted = "Cover Copy Compare";

    const result = GetApproachStringFromLabel(approach);

    expect(result).toEqual(formatted);
  });

  it("Should correctly format: Cloze", () => {
    const approach = "Cloze";
    const formatted = "Cloze";

    const result = GetApproachStringFromLabel(approach);

    expect(result).toEqual(formatted);
  });

  it("Should correctly format: TapedProblems", () => {
    const approach = "TapedProblems";
    const formatted = "Taped Problems";

    const result = GetApproachStringFromLabel(approach);

    expect(result).toEqual(formatted);
  });

  it("Should correctly format: ExplicitTiming", () => {
    const approach = "ExplicitTiming";
    const formatted = "Explicit Timing";

    const result = GetApproachStringFromLabel(approach);

    expect(result).toEqual(formatted);
  });

  it("Fail: no matching intervention (blank)", () => {
    expect(() => GetApproachStringFromLabel("")).toThrow(
      Error("No matching approach found")
    );
  });

  it("Fail: no matching intervention (undefined)", () => {
    expect(() => GetApproachStringFromLabel(undefined)).toThrow(
      Error("No matching approach found")
    );
  });
});

describe("LabelHelpers: OnlyUnique", () => {
  it("Should correctly filter facts, dupes", () => {
    const facts = ["12-1=11", "11-1=10", "10-1=9"]
    const factsDoubled = JSON.parse(JSON.stringify(facts)).concat(JSON.parse(JSON.stringify(facts))) as [];

    const result = factsDoubled.filter(OnlyUnique);

    expect(result).toEqual(facts);
  });

  it("Should correctly filter facts, no dupes", () => {
    const facts = ["12-1=11", "11-1=10", "10-1=9"]
    const factsDoubled = JSON.parse(JSON.stringify(facts)) as [];

    const result = factsDoubled.filter(OnlyUnique);

    expect(result).toEqual(facts);
  });

  it("Should correctly filter facts, empty", () => {
    const facts: string[] = []
    const factsDoubled: string[] = [];

    const result = factsDoubled.filter(OnlyUnique);

    expect(result).toEqual(facts);
  });

  it("Fail: Cannot filter badly formed array (undefined)", () => {
    const factsDoubled: undefined[] = [undefined];

    expect(() => factsDoubled.filter(OnlyUnique)).toThrow(
      Error("Value was undefined")
    );
  });
});

describe("LabelHelpers: Sum", () => {
  it("Should correctly sum numbers, multiple numbers", () => {
    const number = [1, 2, 3, 4]

    const result = number.reduce(Sum);

    expect(result).toEqual(10);
  });

  it("Should correctly sum numbers, single number", () => {
    const number = [1]

    const result = number.reduce(Sum);

    expect(result).toEqual(1);
  });

  /*

  // TODO: Matcher for error
  it("Fail: cannot sum empty array", () => {
    const number: number[] = []
    let thrownError;

    try {
      number.reduce(Sum);
    }
    catch (error) {
      thrownError = error;
    }

    expect(number.reduce(Sum)).toEqual(thrownError);
  });
  */

  it("Fail: Cannot filter badly formed array (undefined)", () => {
    const number: any[] = [undefined, 1]

    expect(() => number.reduce(Sum)).toThrow(
      Error("A value was undefined")
    );
  });
});

//
