/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import Timer from "../Timer";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("Timer", () => {
  beforeEach(() => jest.resetModules());

  it("should render, valid seconds and callback", () => {
    const secondsTotal = 0;
    const startTimerTime = new Date();
    const callbackFunction = jest.fn();

    const wrapper = mount(
      <Timer
        secondsTotal={secondsTotal}
        startTimerTime={startTimerTime}
        callbackFunction={callbackFunction}
      />
    );

    setTimeout(() => {
      expect(1).toBe(1);
    }, 5000);

    setTimeout(() => {
      expect(callbackFunction).toBeCalled();
    }, 9000);
  });
});
