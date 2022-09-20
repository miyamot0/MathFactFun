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
import KeyPad from "../KeyPad";

Enzyme.configure({ adapter: new Adapter() });

describe("KeyPad", () => {
  it("should render, with operator +", () => {
    const operatorSymbol = "+";
    const callBackFunction = jest.fn((arg0: string) => true);
    const showEquals = true;

    const wrapper = shallow(
      KeyPad({ callBackFunction, operatorSymbol, showEquals })
    );

    waitFor(() => {
      expect(wrapper.find("div.key4").first()).to.have.property(
        "visibility",
        "visible"
      );
      expect(wrapper.find("div.key8").first()).to.have.property(
        "visibility",
        "hidden"
      );
      expect(wrapper.find("div.key12").first()).to.have.property(
        "visibility",
        "hidden"
      );
      expect(wrapper.find("div.key16").first()).to.have.property(
        "visibility",
        "hidden"
      );
    });
  });

  it("should render, with operator -", () => {
    const operatorSymbol = "-";
    const callBackFunction = jest.fn((arg0: string) => true);
    const showEquals = true;

    const wrapper = shallow(
      KeyPad({ callBackFunction, operatorSymbol, showEquals })
    );

    waitFor(() => {
      expect(wrapper.find("div.key4").first()).to.have.property(
        "visibility",
        "hidden"
      );
      expect(wrapper.find("div.key8").first()).to.have.property(
        "visibility",
        "visible"
      );
      expect(wrapper.find("div.key12").first()).to.have.property(
        "visibility",
        "hidden"
      );
      expect(wrapper.find("div.key16").first()).to.have.property(
        "visibility",
        "hidden"
      );
    });
  });

  it("should render, with operator x", () => {
    const operatorSymbol = "x";
    const callBackFunction = jest.fn((arg0: string) => true);
    const showEquals = true;

    const wrapper = shallow(
      KeyPad({ callBackFunction, operatorSymbol, showEquals })
    );

    waitFor(() => {
      expect(wrapper.find("div.key4").first()).to.have.property(
        "visibility",
        "hidden"
      );
      expect(wrapper.find("div.key8").first()).to.have.property(
        "visibility",
        "hidden"
      );
      expect(wrapper.find("div.key12").first()).to.have.property(
        "visibility",
        "visible"
      );
      expect(wrapper.find("div.key16").first()).to.have.property(
        "visibility",
        "hidden"
      );
    });
  });

  it("should render, with operator /", () => {
    const operatorSymbol = "/";
    const callBackFunction = jest.fn((arg0: string) => true);
    const showEquals = true;

    const wrapper = shallow(
      KeyPad({ callBackFunction, operatorSymbol, showEquals })
    );

    waitFor(() => {
      expect(wrapper.find("div.key4").first()).to.have.property(
        "visibility",
        "hidden"
      );
      expect(wrapper.find("div.key8").first()).to.have.property(
        "visibility",
        "hidden"
      );
      expect(wrapper.find("div.key12").first()).to.have.property(
        "visibility",
        "hidden"
      );
      expect(wrapper.find("div.key16").first()).to.have.property(
        "visibility",
        "visible"
      );
    });
  });

  it("should render differently, with undefined operator", () => {
    const operatorSymbol = undefined as unknown as string;
    const callBackFunction = jest.fn((arg0: string) => true);
    const showEquals = true;

    const wrapper = shallow(
      KeyPad({ callBackFunction, operatorSymbol, showEquals })
    );

    waitFor(() => {
      expect(wrapper.find("div.key4").first()).toHaveStyle(
        "visibility: hidden"
      );
      expect(wrapper.find("div.key8").first()).toHaveStyle(
        "visibility: hidden"
      );
      expect(wrapper.find("div.key12").first()).toHaveStyle(
        "visibility: hidden"
      );
      expect(wrapper.find("div.key16").first()).toHaveStyle(
        "visibility: hidden"
      );
    });
  });

  it("should render differently, with undefined operator, show equals false", () => {
    const operatorSymbol = undefined as unknown as string;
    const callBackFunction = jest.fn((arg0: string) => true);
    const showEquals = false;

    const wrapper = shallow(
      KeyPad({ callBackFunction, operatorSymbol, showEquals })
    );

    waitFor(() => {
      expect(wrapper.find("div.key4").first()).toHaveStyle(
        "visibility: hidden"
      );
      expect(wrapper.find("div.key8").first()).toHaveStyle(
        "visibility: hidden"
      );
      expect(wrapper.find("div.key12").first()).toHaveStyle(
        "visibility: hidden"
      );
      expect(wrapper.find("div.key16").first()).toHaveStyle(
        "visibility: hidden"
      );

      expect(wrapper.find("div.key15").length).toBe(1);
    });
  });

  it("should render differently, with out equals sign", () => {
    const operatorSymbol = "+";
    const callBackFunction = jest.fn((arg0: string) => true);
    const showEquals = false;

    const wrapper = shallow(
      KeyPad({ callBackFunction, operatorSymbol, showEquals })
    );

    waitFor(() => {
      expect(wrapper.find("div.key15").length).toBe(0);
    });
  });

  it("should render differently, with out equals sign", () => {
    const operatorSymbol = "+";
    const callBackFunction = jest.fn((arg0: string) => true);
    const showEquals = true;

    const wrapper = shallow(
      KeyPad({ callBackFunction, operatorSymbol, showEquals })
    );

    waitFor(() => {
      expect(wrapper.find("div.key15").length).toBe(1);
    });
  });
});
