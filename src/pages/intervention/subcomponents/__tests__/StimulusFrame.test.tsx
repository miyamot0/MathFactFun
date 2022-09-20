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
import StimulusFrame from "../StimulusFrame";

Enzyme.configure({ adapter: new Adapter() });

describe("StimulusFrame", () => {
  it("should render, valid item string and operator, cover is false", () => {
    const itemString = "1+1=2";
    const operator = "+";
    const coverStimulusItem = false;

    const wrapper = shallow(
      StimulusFrame({ itemString, operator, coverStimulusItem })
    );

    waitFor(() => {
      expect(wrapper.find(".stimulus-block-wrapper").length).toBe(1);
    });
  });

  it("should render, valid item string and operator, cover is true", () => {
    const itemString = "1+1=2";
    const operator = "+";
    const coverStimulusItem = true;

    const wrapper = shallow(
      StimulusFrame({ itemString, operator, coverStimulusItem })
    );

    waitFor(() => {
      expect(wrapper.find(".stimulus-block-wrapper").length).toBe(1);
    });
  });

  it("should render, valid item string and DIVISION operator, cover is true", () => {
    const itemString = "1/1=1";
    const operator = "/";
    const coverStimulusItem = true;

    const wrapper = shallow(
      StimulusFrame({ itemString, operator, coverStimulusItem })
    );

    waitFor(() => {
      expect(wrapper.find(".stimulus-block-wrapper").length).toBe(1);
    });
  });

  it("should render, undefined entry string, cover is false", () => {
    const itemString = undefined as unknown as string;
    const operator = undefined as unknown as string;
    const coverStimulusItem = false;

    const wrapper = shallow(
      StimulusFrame({ itemString, operator, coverStimulusItem })
    );

    waitFor(() => {
      expect(wrapper.find(".stimulus-block-wrapper").length).toBe(1);
    });
  });
});
