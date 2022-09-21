/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { StudentDataInterface } from "../../../../student/interfaces/StudentInterfaces";

import React from "react";
import TopHeader from "../TopHeader";
import { InterventionFormat } from "../../../../../maths/Facts";

Enzyme.configure({ adapter: new Adapter() });

describe('ModalErrorCorrection', () => {
    it('Should render with default state', () => {
        const approach = InterventionFormat.CoverCopyCompare;
        const document = {} as StudentDataInterface;

        const wrapper = mount(<TopHeader approach={approach} document={document} />);

        expect(wrapper.find('h2').length).toBe(1)
    })
})