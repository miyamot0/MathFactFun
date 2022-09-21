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
import TopHeaderTimed from "../TopHeaderTimed";
import { StudentDataInterface } from "../../../../student/interfaces/StudentInterfaces";
import { InitialInterventionState } from "../../../functionality/InterventionBehavior";
import { InterventionFormat } from "../../../../../maths/Facts";

Enzyme.configure({ adapter: new Adapter() });

describe('ModalErrorCorrection', () => {
    it('Should render with basic state and null doc', () => {
        const approach = InterventionFormat.CoverCopyCompare;
        const document = {} as StudentDataInterface;
        const state = InitialInterventionState;
        const callbackToSubmit = jest.fn();

        const wrapper = mount(<TopHeaderTimed approach={approach} document={document} state={state} callbackToSubmit={callbackToSubmit} />);

        expect(wrapper.find('h2').length).toBe(1)
    })

    it('Should render with basic state and valid doc', () => {
        const approach = InterventionFormat.CoverCopyCompare;
        const document = { name: "asdf" } as StudentDataInterface;
        const state = InitialInterventionState;
        const callbackToSubmit = jest.fn();

        const wrapper = mount(<TopHeaderTimed approach={approach} document={document} state={state} callbackToSubmit={callbackToSubmit} />);

        expect(wrapper.find('h2').length).toBe(1)
    })
})