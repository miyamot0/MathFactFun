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

Enzyme.configure({ adapter: new Adapter() });

describe("Timer", () => {
  it("should render, valid seconds and callback", () => {
    const secondsTotal = 120;
    const startTimerTime = new Date();
    const callbackFunction = jest.fn();

    const wrapper = mount(
      Timer({ secondsTotal, startTimerTime, callbackFunction })
    );

    waitFor(() => {
      expect(wrapper.find("span").length).toBe(1);
    });
  });
});
