/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StudentFilter from "../StudentFilter";
import * as StudentFilterHelpers from "./../helpers/StudentFilterHelpers";

Enzyme.configure({ adapter: new Adapter() });

const mockCallback = jest.fn();

describe("StudentFilter", () => {
  it("Check state behavior, trigger event", () => {
    const docMock = jest.spyOn(StudentFilterHelpers, "handleFilterEvent");

    docMock.mockImplementation(mockCallback);

    const wrapper = mount(<StudentFilter changeFilter={() => true} />);
    const button = wrapper.find("button").first();
    button.simulate("click");

    setTimeout(() => {
      expect(mockCallback).toBeCalled();
    }, 1000);
  });

  it("Check state behavior, mocked callback", () => {
    const wrapper = mount(<StudentFilter changeFilter={mockCallback} />);
    const studentFilterTag = wrapper.find({ class: "student-filter" });

    setTimeout(() => {
      expect(studentFilterTag.length).toBe(1);
    }, 1000);
  });
});
