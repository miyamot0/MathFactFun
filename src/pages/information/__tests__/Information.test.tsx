/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import Information from "../Information";
import { MemoryRouter } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

describe("Information", () => {
  it("Should render normally", () => {

    const wrapper = shallow(<MemoryRouter><Information/></MemoryRouter>);
    wrapper.render();
    wrapper.update();

    expect(wrapper.html().toString().includes('Information and Start-up Guide')).toBe(true);
  });
});
