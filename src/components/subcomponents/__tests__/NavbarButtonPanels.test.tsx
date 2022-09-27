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
import { LogoutPanel } from "../NavbarButtonPanels";
import React from "react";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

describe('navbarButtonCloseModal', () => {
    it('Should fire, return TRUE', async () => {
        await act(async () => {
            const user = {} as firebase.User;
            const cb = jest.fn();
            const wrapper = mount(
                <LogoutPanel user={user} logoutPending={true} logout={cb} />
            );

            wrapper.find('button').simulate('click');

            await waitFor(() => {
                expect(cb).toHaveBeenCalled()
            })
        })
    })
})