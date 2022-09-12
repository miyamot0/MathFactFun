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

import React, { createContext, useReducer, useEffect } from "react";

import { projectAuth } from "../firebase/config";
import { AppInterface } from "../App";
import {
  AuthorizationProviderInterface,
} from "./types/AuthorizationTypes";
import { AuthorizationContextInterface } from "./interfaces/AuthorizationInterfaces";
import {
  authorizationReducer,
  AuthorizationStates,
  InitialAuthorizationState,
} from "./functionality/AuthorizationBehavior";
import { simplifyPrivilegeAccess } from "./helpers/AuthorizationHelpers";

// Context to inherit
export const AuthorizationContext =
  createContext<AuthorizationContextInterface>({
    user: null,
    authIsReady: false,
    adminFlag: false,
    dispatch: undefined,
  });

/** AuthorizationContextProvider
 *
 * Provider for auth state
 *
 * @param {ReactNode} children Current state
 * @returns {AuthorizationContextStateInterface}
 */
export function AuthorizationContextProvider({
  children,
}: AuthorizationProviderInterface): AppInterface {
  const [state, dispatch] = useReducer(
    authorizationReducer,
    InitialAuthorizationState
  );

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
