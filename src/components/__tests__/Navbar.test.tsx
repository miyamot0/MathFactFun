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
import Navbar from "../Navbar";
import { MemoryRouter } from "react-router-dom";
import ReactModal from "react-modal";

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

const mockCallback = jest.fn();

describe("Navbar", () => {
  it("Check render", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    setTimeout(() => {
      expect(Navbar).toBeInTheDocument();
    }, 1000);
  });

  it("Check render and open modal button", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const button1 = wrapper.findWhere((node) => {
      return node.text() === "Licenses" && node.type() === "button";
    });

    button1.simulate("click");

    const button2 = wrapper.findWhere((node) => {
      return node.text() === "Close" && node.type() === "button";
    });

    button2.simulate("click");

    setTimeout(() => {
      expect(Navbar).toBeInTheDocument();
    }, 1000);
  });
});
