/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  CalculateDigitsTotalAnswer,
  calculateDigitsTotalInProblem,
  formatDate,
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

    const totalDigitsInProblem =
      baseValue.toString().length +
      magnitudeChange.toString().length +
      answer.toString().length;

    const input = `${baseValue}${operator}${magnitudeChange}=${answer}`;

    const result = CalculateDigitsTotalAnswer(input);

    expect(result).toEqual(answer.toString().trim().length);
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

    const result = CalculateDigitsTotalAnswer(input);

    expect(result).toEqual(answer.toString().trim().length);
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

    const result = CalculateDigitsTotalAnswer(input);

    expect(result).toEqual(answer.toString().trim().length);
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

    const result = CalculateDigitsTotalAnswer(input);

    expect(result).toEqual(answer.toString().trim().length);
  });

  it("Fail: missing equality sign", () => {
    expect(() => CalculateDigitsTotalAnswer("12-12")).toThrow(
      Error("No equality sign found in fact string")
    );
  });
});

//
