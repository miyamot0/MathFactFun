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
import Landing from "../Landing";
import { MemoryRouter, Link } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

describe("Landing", () => {
  it("Should render normally", () => {

    const wrapper = shallow(<MemoryRouter><Landing/></MemoryRouter>);
    wrapper.render();
    wrapper.update();

    expect(wrapper.html().toString().includes('Math Facts Fun')).toBe(true);
  });
});
