/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StudentFilter from "../StudentFilter";
import * as StudentFilterHelpers from "./../helpers/StudentFilterHelpers";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

const mockCallback = jest.fn();

describe("StudentFilter", () => {
  it("Check state behavior, trigger event", async () => {
    await act(async () => {
      const docMock = jest.spyOn(StudentFilterHelpers, "handleFilterEvent");

      docMock.mockImplementation(mockCallback);

      const wrapper = shallow(<StudentFilter changeFilter={() => true} />);
      const button = wrapper.find("button").first();
      button.simulate("click");

      await waitFor(() => {
        expect(mockCallback).toBeCalled();
      });
    })
  });

  it("Check state behavior, mocked callback", async () => {
    await act(async () => {
      const wrapper = shallow(<StudentFilter changeFilter={mockCallback} />);
      const studentFilterTag = wrapper.find("div.student-filter");

      await waitFor(() => {
        expect(studentFilterTag.length).toBe(1);
      });
    })
  });
});
