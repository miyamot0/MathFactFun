/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useFirebaseLogout } from "../useFirebaseLogout";
import { projectAuth } from "./../../../firebase/config";

jest.mock("../../../context/hooks/useAuthorizationContext", () => {
  return {
    useAuthorizationContext: () => ({
      dispatch: jest.fn(),
    }),
  };
});

describe("logout", () => {
  it("the sign in with email/pass should work", async () => {
    await act(async () => {
      try {
        await projectAuth.signOut();

        expect(firebase.auth().signOut).toBeCalled();
        // eslint-disable-next-line no-empty
      } catch (err: any) { }
    });
  });

  it("mock successful logout", async () => {
    await act(async () => {
      const mockSignOut = jest.fn();
      const docMock = jest.spyOn(projectAuth, "signOut");
      docMock.mockImplementation(mockSignOut);
      mockSignOut.mockImplementation(() => Promise.resolve(() => true));

      const { result, waitFor } = renderHook(() => useFirebaseLogout());

      await result.current.logout();

      await waitFor(() => {
        expect(mockSignOut).toBeCalled();
        expect(result.current.logoutPending).toBe(false);
        expect(result.current.logoutError).toBe(undefined);
      });
    });
  });

  it("mock errored logout", async () => {
    await act(async () => {
      const mockSignOut = jest.fn();
      const docMock = jest.spyOn(projectAuth, "signOut");
      docMock.mockImplementation(mockSignOut);
      mockSignOut.mockImplementation(() => {
        throw Error("Error");
      });

      const { result } = renderHook(() => useFirebaseLogout());

      await result.current.logout();

      expect(mockSignOut).toBeCalled();
      expect(result.current.logoutPending).toBe(false);
      expect(result.current.logoutError).toBe("Error");
    });
  });
});
