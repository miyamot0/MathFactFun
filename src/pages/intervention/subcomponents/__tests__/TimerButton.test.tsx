/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import TimerButton from "../TimerButton";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("Timer", () => {
  beforeEach(() => jest.resetModules());

  it("should render, valid seconds and callback", () => {
    const secondsTotal = 120;
    const startTimerTime = new Date();
    const callBackFunction = jest.fn();

    const wrapper = mount(
      <TimerButton
        callBackFunction={callBackFunction}
        nProblems={5}
        delta={1}
      />
    );

    wrapper.find("button").simulate("click");

    //setTimeout(() => {
    //  expect(1).toBe(1);
    //}, 5000);

    //setTimeout(() => {
    //  expect(callBackFunction).toBeCalled();
    //}, 9000);

    /*

    const wrapper = mount(
      TimerButton({ callBackFunction, nProblems: 5, delta: 5 })
    );

    waitFor(() => {
      expect(wrapper.find("span").length).toBe(1);
    });
    */
  });
});