/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useFirebaseLogin } from "../useFirebaseLogin";
import firebase from "firebase";
import { projectAuth } from "./../../../firebase/config";

jest.mock("../../../context/hooks/useAuthorizationContext", () => {
  return {
    useAuthorizationContext: () => ({
      dispatch: jest.fn(),
    }),
  };
});

describe("useFirebaseLogin.test.tsx", () => {
  it("the sign in with email/pass should work", async () => {
    await act(async () => {
      try {
        await projectAuth.signInWithEmailAndPassword(
          "email@email.com",
          "password"
        );

        expect(firebase.auth().signInWithEmailAndPassword).toBeCalled();
      } catch (err: any) {}
    });
  });

  it("mock successful login", async () => {
    await act(async () => {
      const mockJestSignIn = jest.fn();
      mockJestSignIn.mockReturnValueOnce({
        user: { uid: "123" },
      } as firebase.auth.UserCredential);

      const mockSignIn = jest.spyOn(projectAuth, "signInWithEmailAndPassword");
      mockSignIn.mockImplementationOnce(mockJestSignIn);

      const { result, waitFor } = renderHook(() => useFirebaseLogin());

      const { login } = result.current;

      await login("shawnpgilroy@gmail.com", "password");

      await waitFor(() => {
        expect(mockSignIn).toBeCalled();
        expect(result.current.loginPending).toBe(false);
        expect(result.current.loginError).toStrictEqual(undefined);
      });
    });
  });

  it("mock errored login", async () => {
    await act(async () => {
      const mockJestSignIn = jest.fn();
      mockJestSignIn.mockImplementation(() => {
        throw Error("Error");
      });

      const mockSignIn = jest.spyOn(projectAuth, "signInWithEmailAndPassword");
      mockSignIn.mockImplementation(mockJestSignIn);

      const { result } = renderHook(() => useFirebaseLogin());

      const { login } = result.current;

      await login("email@something.com", "pass");

      expect(mockSignIn).toBeCalled();
      expect(result.current.loginPending).toBe(false);
      expect(result.current.loginError).not.toBe(undefined);
    });
  });
});
