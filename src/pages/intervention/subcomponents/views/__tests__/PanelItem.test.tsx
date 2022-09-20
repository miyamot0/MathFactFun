/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { KeyItem } from "../KeyItem";
import { waitFor } from "@testing-library/react";
import { PanelItem } from "../PanelItem";

Enzyme.configure({ adapter: new Adapter() });

describe("PanelItem", () => {
  it("should render", () => {
    const char = "1";

    const wrapper = shallow(PanelItem(char));

    waitFor(() => {
      expect(wrapper.find(".stimulus-button-section").length).toBe(1);
    });
  });
});
