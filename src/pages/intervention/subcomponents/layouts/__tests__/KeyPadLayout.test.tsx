/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { InitialInterventionState } from "../../../functionality/InterventionBehavior";
import KeyPadLayout from "../KeyPadLayout";

import * as DispatchingHelper from "./../../../../intervention/helpers/DispatchingHelpers";
import { InterventionState } from "../../../interfaces/InterventionInterfaces";
import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

describe("KeyPadLayout", () => {
  it("Should render with default state", () => {
    const state = InitialInterventionState;
    const dispatch = jest.fn();
    const className = "box5";

    const wrapper = shallow(
      KeyPadLayout({
        className,
        state,
        intervention: "Benchmark",
        dispatch,
        showEquals: false,
      })
    );

    expect(wrapper.find(`div.${className}`).length).toBe(1);
  });

  it("Should render with covered problem state", () => {
    const state = {
      ...InitialInterventionState,
      CoverProblemItem: false,
    } as InterventionState;
    const dispatch = jest.fn();
    const className = "box5";

    const wrapper = shallow(
      KeyPadLayout({
        className,
        state,
        intervention: "Benchmark",
        dispatch,
        showEquals: false,
      })
    );

    expect(wrapper.find(`div.${className}`).length).toBe(1);
  });

  it("Should render with covered problem state and fire callback", async () => {
    await act(async () => {
      const state = {
        ...InitialInterventionState,
        CoverProblemItem: false,
      } as InterventionState;
      const dispatch = jest.fn();
      const className = "box5";

      const docMock1 = jest.spyOn(DispatchingHelper, "commonKeyHandler");
      const mockCommonKeyHandler = jest.fn(() => true);
      docMock1.mockImplementation(() => mockCommonKeyHandler());

      const wrapper = mount(
        KeyPadLayout({
          className,
          state,
          intervention: "Benchmark",
          dispatch,
          showEquals: false,
        })
      );

      const key = wrapper.find("button").first();
      key.simulate("click");

      await waitFor(() => {
        expect(mockCommonKeyHandler).toBeCalled();
      });
    });
  });
});
