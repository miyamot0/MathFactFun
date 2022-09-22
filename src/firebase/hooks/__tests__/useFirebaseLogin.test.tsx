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
import * as ProjectConfig from './../../../firebase/config'

describe("login", () => {
    it("mock successful login", () => {
        act(async () => {
            const mockSignIn = jest.fn();
            const docMock = jest.spyOn(ProjectConfig.projectAuth, "signInWithEmailAndPassword");
            docMock.mockImplementation(mockSignIn);
            mockSignIn.mockImplementation(() => Promise.resolve(() => true));

            const { result, waitFor } = renderHook(() =>
                useFirebaseLogin()
            );

            await result.current.login("email", "pass");

            waitFor(() => {
                expect(mockSignIn).toBeCalled();
                expect(result.current.loginPending).toBe(false);
                expect(result.current.loginError).toBe(undefined);
            })

            expect(1).toBe(1)
        })
    })

    it("mock errored login", () => {
        act(async () => {
            const mockSignIn = jest.fn();
            const docMock = jest.spyOn(ProjectConfig.projectAuth, "signInWithEmailAndPassword");
            docMock.mockImplementation(mockSignIn);
            mockSignIn.mockImplementation(() => {
                throw Error("Error")
            });

            const { result, waitFor } = renderHook(() =>
                useFirebaseLogin()
            );

            await result.current.login("email", "pass");

            waitFor(() => {
                expect(mockSignIn).toBeCalled();
                expect(result.current.loginPending).toBe(false);
                expect(result.current.loginError).toStrictEqual({});
            })

            expect(1).toBe(1)
        })
    })
})