/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Authorization context
 */

import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import firebase from "firebase/app"
import { projectAuth } from "../firebase/config";
import { AppInterface } from "../App";

export enum AuthorizationStates {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  READY = "READY",
  CLAIMS = "CLAIMS",
}

// TODO: remove any
export interface AuthorizationContextInterface {
  user: firebase.User;
  authIsReady: boolean;
  adminFlag: boolean;
  dispatch: any;
}

export interface AuthorizationContextStateInterface {
  user: firebase.User;
  authIsReady: boolean;
  adminFlag: boolean;
}

interface FirebaseLoginAction {
  type: AuthorizationStates;
  payload: firebase.User;
  payload2: boolean;
}

export type Props = {
  children: ReactNode;
};

// Context to inherit
export const AuthorizationContext =
  createContext<AuthorizationContextInterface>(undefined);

/** simplifyPrivilegeAccess
 *
 * Simplify access to privilege level
 *
 * @param {string} res level
 * @returns {bool}
 */
function simplifyPrivilegeAccess(res: string): boolean {
  return res === "admin" || res === "sysadmin";
}

/** Auth reducer
 *
 * Reducer firestore login
 *
 * @param {Enum} state Current state
 * @param {Object} action Action type
 * @returns {AuthorizationContextStateInterface}
 */
export function authReducer(
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

/** AuthorizationContextProvider
 *
 * Provider for auth state
 *
 * @param {ReactNode} children Current state
 * @returns {AuthorizationContextStateInterface}
 */
export function AuthorizationContextProvider({ children }): AppInterface {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    adminFlag: null,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((res) => {
          dispatch({
            type: AuthorizationStates.READY,
            payload: user,
            payload2: simplifyPrivilegeAccess(res.claims.level),
          });
        });
      } else {
        dispatch({
          type: AuthorizationStates.READY,
          payload: user,
          payload2: false,
        });
      }

      unsub();
    });
  }, []);

  return (
    <AuthorizationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthorizationContext.Provider>
  );
}
