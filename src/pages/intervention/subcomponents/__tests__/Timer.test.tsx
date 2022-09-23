/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { waitFor } from "@testing-library/react";
import Timer from "../Timer";
import React from "react";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

describe("Timer", () => {
  beforeEach(() => jest.resetModules());

  it("should render, valid seconds", () => {
    act(() => {
      const secondsTotal = 60;
      const startTimerTime = new Date();
      const callbackFunction = jest.fn();

      const wrapper = shallow(
        <Timer
          secondsTotal={secondsTotal}
          startTimerTime={startTimerTime}
          callbackFunction={callbackFunction}
        />
      );

      expect(wrapper.find("span").first().text().includes("01:00")).toBe(true);

      wrapper.update();
      wrapper.render();
    });
  });

  it("should render, null start time", () => {
    act(() => {
      const secondsTotal = 60;
      const startTimerTime = null;
      const callbackFunction = jest.fn();

      const wrapper = shallow(
        <Timer
          secondsTotal={secondsTotal}
          startTimerTime={startTimerTime}
          callbackFunction={callbackFunction}
        />
      );

      expect(wrapper.find("span").first().text().includes("01:00")).toBe(true);

      wrapper.update();
      wrapper.render();
    });
  });

  /*

  it("should render, valid seconds and callback", async () => {
    await act(async () => {
      const secondsTotal = 5;
      const startTimerTime = new Date();
      const callbackFunction = jest.fn();

      const wrapper = shallow(
        <Timer
          secondsTotal={secondsTotal}
          startTimerTime={startTimerTime}
          callbackFunction={callbackFunction}
        />
      );

      wrapper.update();
      wrapper.render();

      await waitFor(
        () => {
          expect(wrapper.find("span").first().text().includes("00:00")).toBe(
            true
          );
        },
        { interval: 100, timeout: 10000 }
      );
    });
  });

  */
});
