/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ErrorHandling } from "../../../../maths/Facts";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import {
  checkLiNullUndefinedBlank,
  DetermineErrorCorrection,
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
