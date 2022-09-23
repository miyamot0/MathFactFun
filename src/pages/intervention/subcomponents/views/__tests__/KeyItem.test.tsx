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
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

describe("KeyPadItem", () => {
  it("should render", async () => {
    await act(async () => {
      const char = "1";
      const callbackFunction = jest.fn();

      const wrapper = shallow(KeyItem(char, callbackFunction));

      wrapper.find(".key-button-section").first().simulate("click");

      await waitFor(() => {
        expect(callbackFunction).toBeCalled();
      });
    })
  });
});
