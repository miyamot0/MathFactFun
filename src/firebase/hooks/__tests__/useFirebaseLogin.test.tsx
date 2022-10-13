/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import { projectAuth } from "./../../../firebase/config";
import { useFirebaseLogin } from "../useFirebaseLogin";
import { mockSignInWithEmailAndPassword } from "../../../setupTests";
import firebase from "firebase";

jest.mock("../../../context/hooks/useAuthorizationContext", () => {
  return {
    useAuthorizationContext: () => ({
      dispatch: jest.fn(),
    }),
  };
});

describe("useFirebaseLogin", () => {
  beforeEach(() => {
    mockSignInWithEmailAndPassword.mockClear();
  });

  it("the sign in with email/pass should work", async () => {
    await act(async () => {
      try {
        const { result, waitFor } = renderHook(() => useFirebaseLogin());

        const { login } = result.current;

        await login(
          "email@email.com",
          "password"
        );

        await waitFor(() => {
          expect(mockSignInWithEmailAndPassword).toBeCalled();
        })
      } catch (err: any) {
        expect(1).toBe(2);
      }
    });
  });

  it("mock successful login", async () => {
    await act(async () => {
      mockSignInWithEmailAndPassword.mockReturnValueOnce(
        {
          user: {uid: '123'} as firebase.User
        }
      )
      const { result, waitFor } = renderHook(() => useFirebaseLogin());
      const { login } = result.current;

      await login(
        "email@email.com",
        "password"
      );

      await waitFor(() => {
          expect(mockSignInWithEmailAndPassword).toBeCalled();
      })

        expect(mockSignInWithEmailAndPassword).toBeCalled();
        expect(result.current.loginPending).toBe(false);
        expect(result.current.loginError).toStrictEqual(undefined);
    });
  });

  it("mock errored login", async () => {
    await act(async () => {
      mockSignInWithEmailAndPassword.mockImplementationOnce(() => {
        throw Error("Error");
      });

      const { result, waitFor } = renderHook(() => useFirebaseLogin());

      const { login } = result.current;

      await login("email@something.com", "pass");

        expect(mockSignInWithEmailAndPassword).toBeCalled();
        expect(result.current.loginPending).toBe(false);
        expect(result.current.loginError).not.toBe(undefined);
    });
  });
});

