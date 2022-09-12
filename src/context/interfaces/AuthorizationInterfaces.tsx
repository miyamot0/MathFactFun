/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase/app";
import { AuthorizationStates } from "../functionality/AuthorizationBehavior";

export interface AuthorizationContextInterface {
    user: firebase.User | null;
    authIsReady: boolean;
    adminFlag: boolean;
    dispatch: any;
}

export interface AuthorizationContextStateInterface {
    user: firebase.User | null;
    authIsReady: boolean;
    adminFlag: boolean;
}

export interface FirebaseLoginAction {
    type: AuthorizationStates;
    payload: firebase.User | null;
    payload2: boolean;
}