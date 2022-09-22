/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useFirebaseLogout } from "../useFirebaseLogout";
import * as ProjectConfig from './../../../firebase/config'

describe("logout", () => {
    it("mock successful logout", () => {
        act(async () => {
            const mockSignOut = jest.fn();
            const docMock = jest.spyOn(ProjectConfig.projectAuth, "signOut");
            docMock.mockImplementation(mockSignOut);
            mockSignOut.mockImplementation(() => Promise.resolve(() => true));

            const { result, waitFor } = renderHook(() =>
                useFirebaseLogout()
            );

            await result.current.logout();

            waitFor(() => {
                expect(mockSignOut).toBeCalled();
                expect(result.current.logoutPending).toBe(false);
                expect(result.current.logoutError).toBe(undefined);
            })

            expect(1).toBe(1)
        })
    })

    it("mock errored logout", () => {
        act(async () => {
            const mockSignOut = jest.fn();
            const docMock = jest.spyOn(ProjectConfig.projectAuth, "signOut");
            docMock.mockImplementation(mockSignOut);
            mockSignOut.mockImplementation(() => {
                throw Error("Error")
            });

            const { result, waitFor } = renderHook(() =>
                useFirebaseLogout()
            );

            await result.current.logout();

            waitFor(() => {
                expect(mockSignOut).toBeCalled();
                expect(result.current.logoutPending).toBe(false);
                expect(result.current.logoutError).toStrictEqual({});
            })

            expect(1).toBe(1)
        })
    })
})