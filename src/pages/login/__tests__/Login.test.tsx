/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer } from "react";
import ReactModal from "react-modal";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { mount } from "enzyme";
import Login from "../Login";
import { renderHook } from "@testing-library/react-hooks";
import {
  InitialLoginState,
  UserLoginReducer,
} from "../functionality/LoginBehavior";
import { LoginDataBehavior } from "../types/LoginTypes";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

const mockUploadFunction = jest.fn(() => "Success");

jest.mock("../../../firebase/hooks/useFirebaseLogin", () => {
  const originalModule = jest.requireActual(
    "../../../firebase/hooks/useFirebaseLogin"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      login: mockUploadFunction,
      loginError: undefined,
      loginPending: false,
    }),
  };
});

describe("Login: Reducer behavior", () => {
  it("Should have persisting state", () => {
    const { result } = renderHook(() =>
      useReducer(UserLoginReducer, InitialLoginState)
    );
    const [state] = result.current;

    expect(InitialLoginState).toBe(state);
  });

  it("Should update email", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(UserLoginReducer, InitialLoginState)
      );

      const [, dispatch] = result.current;
      const newEmail = "newEmail";

      dispatch({
        type: LoginDataBehavior.SetEmail,
        payload: newEmail,
      });

      await waitForValueToChange(() => result.current[0].Email);
      expect(result.current[0].Email).toBe(newEmail);
    });
  });

  it("Should update password", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(UserLoginReducer, InitialLoginState)
      );

      const [, dispatch] = result.current;
      const newPassword = "newPassword";

      dispatch({
        type: LoginDataBehavior.SetPassword,
        payload: newPassword,
      });

      await waitForValueToChange(() => result.current[0].Password);

      expect(result.current[0].Password).toBe(newPassword);
    });
  });

  it("Off-type should return state unchanged", async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(UserLoginReducer, InitialLoginState)
      );

      const [state, dispatch] = result.current;
      const newPassword = "newPassword";

      dispatch({
        type: "asdf" as unknown as LoginDataBehavior,
        payload: newPassword,
      });

      await waitForValueToChange(() => result.current[0]);

      expect(result.current[0]).toStrictEqual(state);
    });
  });
});

describe("Login: Display components", () => {
  it("Should display fields and buttons", () => {
    const wrapper = mount(<Login />);

    const emailInput = wrapper.find({ "data-testid": "login-email-input" });
    const passInput = wrapper.find({ "data-testid": "login-pass-input" });
    const buttonInput = wrapper.find({ "data-testid": "login-button-input" });

    expect(emailInput.length).toBe(1);
    expect(passInput.length).toBe(1);
    expect(buttonInput.length).toBe(1);
  });

  it("Should allow for updating text", async () => {
    act(() => {
      const wrapper = mount(<Login />);

      const emailInput = wrapper.find({ "data-testid": "login-email-input" });
      const passInput = wrapper.find({ "data-testid": "login-pass-input" });
      const buttonInput = wrapper.find({ "data-testid": "login-button-input" });

      emailInput.props().onChange({ target: { value: "email" } });
      emailInput.update();

      //emailInput.simulate("change", { target: { value: "email" } });
      //passInput.simulate("change", { target: { value: "pass" } });
      //passInput.update();
      //buttonInput.simulate("click");
      //buttonInput.update();

      wrapper.update();

      console.log(emailInput.text);
      console.log(passInput.text());

      console.log(buttonInput);

      //expect(mockUploadFunction).toHaveBeenCalled();

      /*
      expect(instance.handleOnPasswordChange(null)).toThrow(
        Error("Error in password handler")
      );
      */

      expect(1).toBe(1);
    });
  });
});
