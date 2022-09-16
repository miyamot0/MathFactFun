/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { mount } from "enzyme";
import { navbarButtonCloseModal } from "../NavbarButtonCloseModal";

Enzyme.configure({ adapter: new Adapter() });

describe('navbarButtonCloseModal', () => {
    it('Should fire, return TRUE', () => {
        const cb = jest.fn();
        const wrapper = mount(navbarButtonCloseModal(cb));

        wrapper.find('button').simulate('click');

        setTimeout(() => {
            expect(cb).toHaveBeenCalled()
        }, 1000)
    })
})