/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Enzyme from "enzyme";
import ReactModal from "react-modal";
import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import { render, screen } from "@testing-library/react";
import { App } from "../App";
import { AuthorizationContext } from "../context/AuthorizationContext";

Enzyme.configure({ adapter: new Adapter() });

describe("AuthorizationContext", () => {
  ReactModal.setAppElement = () => null;
  const dispatch = jest.fn();

  it("(Auth Not Ready, Null User) Should render nothing", () => {
    render(
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

    const appElement = screen.getByTestId("App-id");

    expect(appElement.childNodes.length).toBe(0);
  });

  it("(Auth Ready, Null User) Should render login only", () => {
    render(
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

    const appElement = screen.getByTestId("App-id");

    // Has browser router
    expect(appElement.childNodes.length).toBe(1);
  });

  it("(Auth Ready, Valid User) Should allow free navigation", () => {
    render(
      <AuthorizationContext.Provider
        value={{
          user: { uid: "123" } as firebase.User,
          authIsReady: true,
          adminFlag: false,
          dispatch,
        }}
      >
        <App />
      </AuthorizationContext.Provider>
    );

    const appElement = screen.getByTestId("App-id");

    // Has browser router + Navbar
    expect(appElement.childNodes.length).toBe(2);
  });
});
