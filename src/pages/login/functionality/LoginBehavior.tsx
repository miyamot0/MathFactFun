/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LoginDataBehavior, LoginDataInterface } from "../types/LoginTypes";

export const InitialLoginState: LoginDataInterface = {
  Email: "",
  Password: "",
};

/** UserLoginReducer
 *
 * @param {LoginDataInterface} state
 * @param {LoginDataInterface} action
 * @returns {LoginDataInterface}
 */
export function UserLoginReducer(
  state: LoginDataInterface,
  action: { type: LoginDataBehavior; payload: string }
): LoginDataInterface {
  switch (action.type) {
    case LoginDataBehavior.SetEmail:
      return { ...state, Email: action.payload };
    case LoginDataBehavior.SetPassword:
      return { ...state, Password: action.payload };
    default:
      return { ...state };
  }
}
