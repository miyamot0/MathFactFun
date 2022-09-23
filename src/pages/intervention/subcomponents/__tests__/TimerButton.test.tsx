/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import TimerButton from "../TimerButton";
import React from "react";
import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

describe("Timer", () => {
  beforeEach(() => jest.resetModules());

  it("should render, valid seconds and callback", () => {
    const callBackFunction = jest.fn();

    const wrapper = shallow(
      <TimerButton
        callBackFunction={callBackFunction}
        nProblems={5}
        delta={1}
      />
    );

    wrapper.find("button").simulate("click");
  });

  it("should render, valid seconds and callback", async () => {
    await act(async () => {
      const callBackFunction = jest.fn();

      const wrapper = shallow(
        <TimerButton
          callBackFunction={callBackFunction}
          nProblems={1}
          delta={1}
        />
      );

      expect(wrapper.find("button").first().text().includes("Trial")).toBe(
        false
      );

      wrapper.find("button").simulate("click");

      wrapper.update();
      wrapper.render();

      waitFor(() => {
        expect(wrapper.find("button").first().text().includes("Trial")).toBe(
          true
        );
      });

      //wrapper.update();
      //wrapper.render();
    });
  });
});
