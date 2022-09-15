/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StudentFilter from "../StudentFilter";

Enzyme.configure({ adapter: new Adapter() });

const mockCallback = jest.fn();

describe('StudentFilter', () => {
    it('Check state behavior, mocked callback', () => {

        const wrapper = mount(<StudentFilter changeFilter={mockCallback} />)

        setTimeout(() => {
            const studentFilterTag = wrapper.find({ 'class': 'student-filter' });
            const buttonTag = wrapper.find({ "data-testid": "student-filter-k" });

            buttonTag.simulate('click');

            expect(studentFilterTag.length).toBe(1);
            expect(buttonTag.length).toBe(1);
            expect(mockCallback.mock.calls.length).toEqual(1)
        }, 1000);
    })

    it('Check state behavior, mocked callback', () => {

        const wrapper = mount(<StudentFilter changeFilter={mockCallback} />)

        setTimeout(() => {
            const studentFilterTag = wrapper.find({ 'class': 'student-filter' });
            const buttonTag = wrapper.find({ "data-testid": "student-filter-k" });

            buttonTag.simulate('click');

            expect(studentFilterTag.length).toBe(1);
            expect(buttonTag.length).toBe(1);
            expect(mockCallback.mock.calls.length).toEqual(1)
        }, 1000);
    })
})