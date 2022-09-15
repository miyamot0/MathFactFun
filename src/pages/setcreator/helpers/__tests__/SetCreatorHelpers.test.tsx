/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { checkIfNullUndefinedOrEmpty, isEmpty } from "../SetCreatorHelpers";

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
