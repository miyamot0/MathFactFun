/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { mount } from "enzyme";
import { exportLogoutPanel } from "../NavbarButtonPanels";


Enzyme.configure({ adapter: new Adapter() });

describe('navbarButtonCloseModal', () => {
    it('Should fire, return TRUE', () => {
        const user = {} as firebase.User;
        const cb = jest.fn();
        const wrapper = mount(exportLogoutPanel(user, true, cb));

        wrapper.find('button').simulate('click');

        setTimeout(() => {
            expect(cb).toHaveBeenCalled()
        }, 1000)
    })
})