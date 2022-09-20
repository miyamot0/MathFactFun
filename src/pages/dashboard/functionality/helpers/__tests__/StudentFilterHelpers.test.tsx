/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { handleFilterEvent } from "../StudentFilterHelpers";

describe("handleFilterEvent", () => {
  const newString = "asdf";
  it("Should set current filter", () => {
    const setCurrentFilter = jest.fn();
    const changeFilter = jest.fn();

    handleFilterEvent(newString, setCurrentFilter, changeFilter);

    expect(setCurrentFilter).toBeCalled();
  });

  it("Should change current filter", () => {
    const setCurrentFilter = jest.fn();
    const changeFilter = jest.fn();

    handleFilterEvent(newString, setCurrentFilter, changeFilter);

    expect(changeFilter).toBeCalled();
  });
});
