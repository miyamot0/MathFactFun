/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect } from "react";
import { projectAuth } from "../config";
import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";
import { FirebaseLogin } from "../interfaces/FirebaseInterfaces";
import { AuthorizationStates } from "../../context/functionality/AuthorizationBehavior";

/** useFirebaseLogin
 *
 * Hook for login
 *
 * @returns {FirebaseLogin}
 */
export function useFirebaseLogin(): FirebaseLogin {
  const [loginCancelled, setLoginCancelled] = useState(false);
  const [loginError, setLoginError] = useState();
  const [loginPending, setPending] = useState(false);

  const { dispatch } = useAuthorizationContext();

  /** login
   *
   * proper login fx
   *
   * @param {string} email email
   * @param {string} password pass
   * @returns {Promise<void>}
   */
  async function login(email: string, password: string): Promise<void> {
    setLoginError(undefined);
    setPending(true);

    try {
      const loginResult = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      dispatch({
        type: AuthorizationStates.LOGIN,
        payload: loginResult.user,
      });

      if (loginCancelled === false) {
        setPending(false);
        setLoginError(undefined);
      }
    } catch (error: any) {
      if (loginCancelled === false) {
        setLoginError(error.message);
        setPending(false);
      } else {
        return;
      }
    }
  }

  useEffect(() => {
    return () => setLoginCancelled(true);
  }, []);

  return { login, loginPending, loginError };
}
