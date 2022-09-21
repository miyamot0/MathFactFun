/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import SimpleProblemItemLayout from "../SimpleProblemItemLayout";
import { InitialInterventionState } from "../../../functionality/InterventionBehavior";
import { InterventionState } from "../../../interfaces/InterventionInterfaces";

Enzyme.configure({ adapter: new Adapter() });

describe('ProblemItemLayout', () => {
    it('Should render with basic state', () => {
        const state = InitialInterventionState;

        const wrapper = mount(<SimpleProblemItemLayout state={state} />);

        expect(wrapper.find('div.block-wrapper').length).toBe(1)
    })

    it('Should render with uncovered state', () => {
        const state = {
            ...InitialInterventionState,
            CoverProblemItem: false
        } as InterventionState;

        const wrapper = mount(<SimpleProblemItemLayout state={state} />);

        expect(wrapper.find('div.block-wrapper').length).toBe(1)
    })

    // TODO: checks for opacity
})