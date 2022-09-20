/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import SimpleProblemFrame from "../SimpleProblemFrame";
import { waitFor } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

describe("ProblemFrame", () => {
  it("should render, valid entry string, cover is false", () => {
    const problemStem = "1+1";
    const entryString = "2";
    const coverProblemSpace = false;

    const wrapper = shallow(
      SimpleProblemFrame({ problemStem, coverProblemSpace, entryString })
    );

    waitFor(() => {
      expect(wrapper.find(".block1")).to.have.property(
        "backgroundColor",
        "transparent"
      );
    });
  });

  it("should render, valid entry string, cover is true", () => {
    const problemStem = "1+1";
    const entryString = "2";
    const coverProblemSpace = true;

    const wrapper = shallow(
      SimpleProblemFrame({ problemStem, coverProblemSpace, entryString })
    );

    waitFor(() => {
      expect(wrapper.find(".block1")).to.have.property(
        "backgroundColor",
        "gray"
      );
    });
  });

  it("should render, undefined entry string, cover is false", () => {
    const problemStem = undefined as unknown as string;
    const entryString = "";
    const coverProblemSpace = false;

    const wrapper = shallow(
      SimpleProblemFrame({ problemStem, coverProblemSpace, entryString })
    );

    waitFor(() => {
      expect(wrapper.find(".block1")).to.have.property(
        "backgroundColor",
        "transparent"
      );
    });
  });
});
