/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StudentDataInterface } from "../../pages/student/interfaces/StudentInterfaces";
import { UserDataInterface } from "../../pages/user/types/UserTypes";

export interface UseFirebaseDocument {
    document: StudentDataInterface | UserDataInterface | null | undefined;
    documentError: string | undefined;
}

export interface UseFirebaseCollection {
    documents: any[] | null;
    error: string | undefined;
}

export interface CollectionInputInterface {
    collectionString: string;
    queryString: string[] | undefined;
    orderString: string[] | undefined;
}

export interface DocumentInputInterface {
    collectionString: string;
    idString: string | undefined;
}

export interface FirebaseLogin {
    login: (email: string, password: string) => Promise<void>;
    loginError: string | undefined;
    loginPending: boolean;
}

export interface FirebaseLogout {
    logout: () => Promise<void>;
    logoutError: string | undefined;
    logoutPending: boolean;
}