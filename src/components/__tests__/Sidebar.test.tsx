/**
 * @jest-environment jsdom
 */

/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Enzyme, { mount } from "enzyme";
import ReactModal from "react-modal";
import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import { App } from "../../App";
import { AuthorizationContext } from "../../context/AuthorizationContext";
import Sidebar from "../Sidebar";

Enzyme.configure({ adapter: new Adapter() });

describe("Sidebar Display", () => {
  ReactModal.setAppElement = () => null;
  const dispatch = jest.fn();

  it("(Auth Ready, Has User) Should Render", () => {
    const wrapper = mount(
      <AuthorizationContext.Provider
        value={{
          user: { uid: "1234", email: "asdf@asdf.com" } as firebase.User,
          authIsReady: true,
          adminFlag: false,
          dispatch,
        }}
      >
        <App />
      </AuthorizationContext.Provider>
    );

    expect(wrapper.find(App).length).toBe(1);
    expect(wrapper.find(Sidebar).length).toBe(1);
  });

  it("(Auth Not Ready, No User) Shouldn't Render", () => {
    const wrapper = mount(
      <AuthorizationContext.Provider
        value={{
          user: null,
          authIsReady: false,
          adminFlag: false,
          dispatch,
        }}
      >
        <App />
      </AuthorizationContext.Provider>
    );

    expect(wrapper.find(App).length).toBe(1);
    expect(wrapper.find(Sidebar).length).toBe(0);
  });

  it("(Auth Ready, No User) Shouldn't Render", () => {
    const wrapper = mount(
      <AuthorizationContext.Provider
        value={{
          user: null,
          authIsReady: true,
          adminFlag: false,
          dispatch,
        }}
      >
        <App />
      </AuthorizationContext.Provider>
    );

    expect(wrapper.find(App).length).toBe(1);
    expect(wrapper.find(Sidebar).length).toBe(0);
  });
});
