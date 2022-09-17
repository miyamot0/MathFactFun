/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MultiValue } from "react-select";
import { SingleOptionType } from "../../types/SharedComponentTypes";
import {
  checkIfOptionKeysPresent,
  confirmMultiSingleOptionType,
  confirmNumberType,
  confirmSingleOptionType,
  confirmStringType,
} from "../ReducerHelpers";

describe("ReducerHelper: confirmStringType", () => {
  it("String: should return correct value, no error", () => {
    const value = "asdf";
    const result = confirmStringType(value);

    expect(value).toEqual(result);
  });

  it("Object: should return throw error", () => {
    const value = { asdf: "asdf" };

    expect(() => confirmStringType(value)).toThrow(
      Error("Value not a string type")
    );
  });
});

describe("ReducerHelper: confirmNumberType", () => {
  it("Number: should return correct value, no error", () => {
    const value = 123;
    const result = confirmNumberType(value);

    expect(value).toEqual(result);
  });

  it("Object: should return throw error", () => {
    const value = { asdf: 123 };

    expect(() => confirmNumberType(value)).toThrow(
      Error("Value not a number type")
    );
  });
});

describe("ReducerHelper: confirmSingleOptionType", () => {
  it("SingleOptionType: should return correct value, no error", () => {
    const value = {
      label: "",
      value: "",
    } as SingleOptionType;
    const result = confirmSingleOptionType(value);

    expect(value).toEqual(result);
  });

  it("Object: should return throw error", () => {
    const value = { asdf: 123 };

    expect(() => confirmSingleOptionType(value)).toThrow(
      Error("Value not a single option type")
    );
  });
});

describe("ReducerHelper: confirmMultiSingleOptionType", () => {
  it("MultiValue<SingleOptionType>: should return correct value, no error", () => {
    const value = [
      {
        label: "",
        value: "",
      },
      {
        label: "",
        value: "",
      },
    ] as MultiValue<SingleOptionType>;
    const result = confirmMultiSingleOptionType(value);

    expect(value).toEqual(result);
  });

  it("Object: should return throw error", () => {
    const value = [{ asdf: 123 }, { qwer: 456 }];

    expect(() => confirmMultiSingleOptionType(value)).toThrow(
      Error("Value not a multiple single option type")
    );
  });

  it("Object: should return throw error (null)", () => {
    const value = null;

    expect(() => confirmMultiSingleOptionType(value)).toThrow(
      Error("Value not a multiple single option type")
    );
  });

  it("Object: should return throw error (undefined)", () => {
    const value = undefined;

    expect(() => confirmMultiSingleOptionType(value)).toThrow(
      Error("Value not a multiple single option type")
    );
  });
});

describe("ReducerHelper: checkIfOptionKeysPresent", () => {
  it("Should pass when both keys present", () => {
    const value = {
      label: "",
      value: "",
    };
    const result = checkIfOptionKeysPresent(value);

    expect(result).toEqual(true);
  });

  it("Should fail when one key missing (1)", () => {
    const value = {
      value: "",
    };
    const result = checkIfOptionKeysPresent(value);

    expect(result).toEqual(false);
  });

  it("Should fail when one key missing (2)", () => {
    const value = {
      label: "",
    };
    const result = checkIfOptionKeysPresent(value);

    expect(result).toEqual(false);
  });

  it("Should throw error when null", () => {
    const value = null;

    const result = checkIfOptionKeysPresent(value);

    expect(result).toBe(false);
  });

  it("Should throw error when undefined", () => {
    const value = undefined;

    const result = checkIfOptionKeysPresent(value);

    expect(result).toBe(false);
  });
});
