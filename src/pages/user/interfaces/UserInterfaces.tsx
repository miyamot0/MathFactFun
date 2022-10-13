/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { UserCreatorBehavior } from "../types/UserTypes";

export interface UserDataState {
  Name: string;
  School: string;
  Email: string;
  Password: string;
  id: null | string;
  FormError: undefined | string;
  DidBuild: boolean;
}

/** UserDispatchUpdateName
 *
 * Class for updating string entry
 *
 */
export class UserDispatchUpdateName {
  public type?: number;
  public payload: {
    Name: string;
  };
  public UserDispatchUpdateName?: string;

  constructor({
    payload,
  }: {
    type?: number;
    payload: { Name: string };
    UserDispatchUpdateName?: string;
  }) {
    this.type = UserCreatorBehavior.SetName;
    this.payload = payload;
    this.UserDispatchUpdateName = "UserDispatchUpdateName";
  }
}

// Type guards

export type UserDataDispatches =
  | UserDispatchUpdateName

export function isUserDispatchUpdateName(
  object: UserDataDispatches
): object is UserDispatchUpdateName {
  const res_ =
    (object as UserDispatchUpdateName).UserDispatchUpdateName !==
    undefined;
  return res_;
}
