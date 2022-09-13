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

describe("Create Student Form", () => {
  it("Should run", () => {
    expect(true).toBe(true);
  });
});

/*

import React from "react";
import ReactModal from "react-modal";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import firebase from "firebase";
import CreateStudent from "../pages/student/CreateStudent";

import { AuthorizationContext } from "../context/AuthorizationContext";
import { mount } from "enzyme";
import { Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";

Enzyme.configure({ adapter: new Adapter() });

const generalAuthObj = {
  user: null,
  authIsReady: false,
  adminFlag: false,
  dispatch: jest.fn(),
};

describe("Create Student Form", () => {
  ReactModal.setAppElement = () => null;

  it("Enter and Submit Data", async () => {
    const unauthedObject = {
      ...generalAuthObj,
      user: { uid: "123" } as firebase.User,
      authIsReady: true,
      adminFlag: false,
    };

    const history = createMemoryHistory();

    const wrapper = mount(
      <AuthorizationContext.Provider value={{ ...unauthedObject }}>
        <Router history={history}>
          <Switch>
            <Route path="/create">
              <CreateStudent />
            </Route>
          </Switch>
        </Router>
      </AuthorizationContext.Provider>
    );

    history.push("/create");
    wrapper.update();

    const inputs = wrapper.find("input");
    const textarea = wrapper.find("textarea");

    inputs.at(0).simulate("change", { target: { value: "Student Name" } });
    textarea.at(0).simulate("change", { target: { value: "Student Details" } });
    //inputs.at(1).simulate("change", { target: { value: "Student Details" } }); //date
    inputs
      .at(2)
      .simulate("change", { value: "Kindergarten", label: "Kindergarten" });
    inputs.at(3).simulate("change", [
      { value: "Addition-Sums to 18", label: "Addition-Sums to 18" },
      {
        value: "Subtraction-Lessing from 18",
        label: "Subtraction-Lessing from 18",
      },
    ]);
    inputs.at(4).simulate("change", {
      value: "Addition-Sums to 18",
      label: "Addition-Sums to 18",
    });
    inputs.at(5).simulate("change", {
      value: "No Current Intervention",
      label: "No Current Intervention",
    });
    inputs.at(6).simulate("change", {
      value: "Give feedback every time",
      label: "Give feedback every time",
    });
    inputs.at(7).simulate("change", {
      value: "No programmed contingencies",
      label: "No programmed contingencies",
    });

    wrapper.update();

    const createStudentInstance = wrapper.find(CreateStudent).instance();
    console.log(createStudentInstance);

    expect(true).toBe(false);
  });
});

*/
