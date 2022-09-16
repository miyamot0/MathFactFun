/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AuthorizationContextStateInterface, FirebaseLoginAction } from "../interfaces/AuthorizationInterfaces";

export const InitialAuthorizationState = {
  user: null,
  authIsReady: false,
  adminFlag: false,
};

export enum AuthorizationStates {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  READY = "READY",
  CLAIMS = "CLAIMS",
  THROWERR = "THROWERR"
}

/** AuthorizationReducer
 *
 * Reducer for firestore login
 *
 * @param {AuthorizationContextStateInterface} state Current state
 * @param {FirebaseLoginAction} action Action type
 * @returns {AuthorizationContextStateInterface}
 */
export function authorizationReducer(
  state: AuthorizationContextStateInterface,
  action: FirebaseLoginAction
): AuthorizationContextStateInterface {
  switch (action.type) {
    case AuthorizationStates.LOGIN:
      return { ...state, user: action.payload };
    case AuthorizationStates.LOGOUT:
      return { ...state, user: null };
    case AuthorizationStates.READY:
      return {
        user: action.payload,
        authIsReady: true,
        adminFlag: action.payload2,
      };
    case AuthorizationStates.CLAIMS:
      return {
        user: action.payload,
        authIsReady: true,
        adminFlag: action.payload2,
      };
    default:
      return state;
  }
}
