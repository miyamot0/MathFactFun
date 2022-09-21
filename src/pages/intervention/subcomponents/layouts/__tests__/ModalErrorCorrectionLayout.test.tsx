/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { waitFor } from "@testing-library/react";
import ModalErrorCorrection from "../ModalErrorCorrectionLayout";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe('ModalErrorCorrection', () => {
    it('Should render with default state', () => {
        const modalIsOpen = true;
        const closeModal = jest.fn();

        const wrapper = mount(<ModalErrorCorrection modalIsOpen={modalIsOpen} closeModal={closeModal} />);

        expect(wrapper.find('button').length).toBe(1)
    })

    it('Should render with default state, close as necessary', () => {
        const modalIsOpen = true;
        const closeModal = jest.fn();

        const wrapper = mount(ModalErrorCorrection({
            modalIsOpen,
            closeModal
        }));

        const button = wrapper.find('button');

        button.simulate('click');

        waitFor(() => {
            expect(closeModal).toBeCalled();
        })
    })
})