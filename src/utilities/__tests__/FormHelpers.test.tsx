/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StudentCreatorBehavior } from "../../pages/student/types/StudentTypes";
import { SingleOptionType } from "../../types/SharedComponentTypes";
import { checkInputNullOrUndefined, streamlinedCheck } from "../FormHelpers";

describe("FormHelpers: checkInputNullOrUndefined", () => {
  it("Blank: Should confirm false", () => {
    const value = "";
    const expected = false;

    const result = checkInputNullOrUndefined(value);

    expect(result).toEqual(expected);
  });

  it("Undefined: Should confirm true", () => {
    const value = undefined;
    const expected = true;

    const result = checkInputNullOrUndefined(value);

    expect(result).toEqual(expected);
  });

  it("Null: Should confirm true", () => {
    const value = null;
    const expected = true;

    const result = checkInputNullOrUndefined(value);

    expect(result).toEqual(expected);
  });
});

describe("FormHelpers: streamlinedCheck", () => {
  it("Blank (string): Should confirm false", () => {
    const value = "";
    const err = "";
    const dispatch = () => true;
    const type = StudentCreatorBehavior.SetFormError;

    const expected = false;

    const result = streamlinedCheck(value, type, err, dispatch);

    expect(result).toEqual(expected);
  });

  it("Blank (SingleOptionType): Should confirm true", () => {
    const value = {
      label: "",
      value: "",
    } as SingleOptionType;

    const err = "";
    const dispatch = () => true;
    const type = StudentCreatorBehavior.SetFormError;

    const expected = true;

    const result = streamlinedCheck(value, type, err, dispatch);

    expect(result).toEqual(expected);
  });

  it("Undefined (SingleOptionType): Should confirm false", () => {
    const value = { phony: "props" };

    const err = "";
    const dispatch = () => true;
    const type = StudentCreatorBehavior.SetFormError;

    expect(() =>
      streamlinedCheck(
        value as unknown as SingleOptionType,
        type,
        err,
        dispatch
      )
    ).toThrow(Error("Value is not a valid option"));
  });

  it("Error: dispatch is null", () => {
    const value = {
      label: "",
      value: "",
    } as SingleOptionType;

    const err = "";
    const dispatch = null;
    const type = StudentCreatorBehavior.SetFormError;

    expect(() => streamlinedCheck(value, type, err, dispatch)).toThrow(
      Error("Dispatch cannot be null or undefined")
    );
  });

  it("Error: dispatch is undefined", () => {
    const value = {} as SingleOptionType;

    const err = "";
    const dispatch = undefined;
    const type = StudentCreatorBehavior.SetFormError;

    expect(() => streamlinedCheck(value, type, err, dispatch)).toThrow(
      Error("Dispatch cannot be null or undefined")
    );
  });
});
