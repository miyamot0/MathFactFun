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
  id: null | string | undefined;
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

/** UserDispatchUpdateEmail
 *
 * Class for updating string entry
 *
 */
export class UserDispatchUpdateEmail {
  public type?: number;
  public payload: {
    Email: string;
  };
  public UserDispatchUpdateEmail?: string;

  constructor({
    payload,
  }: {
    type?: number;
    payload: { Email: string };
    UserDispatchUpdateEmail?: string;
  }) {
    this.type = UserCreatorBehavior.SetEmail;
    this.payload = payload;
    this.UserDispatchUpdateEmail = "UserDispatchUpdateEmail";
  }
}

/** UserDispatchUpdateEmail
 *
 * Class for updating string entry
 *
 */
export class UserDispatchUpdatePassword {
  public type?: number;
  public payload: {
    Password: string;
  };
  public UserDispatchUpdatePassword?: string;

  constructor({
    payload,
  }: {
    type?: number;
    payload: { Password: string };
    UserDispatchUpdatePassword?: string;
  }) {
    this.type = UserCreatorBehavior.SetEmail;
    this.payload = payload;
    this.UserDispatchUpdatePassword = "UserDispatchUpdatePassword";
  }
}

/** UserDispatchUpdateEmail
 *
 * Class for updating string entry
 *
 */
export class UserDispatchLoadedUser {
  public type?: number;
  public payload: {
    Name: string;
    Email: string;
    School: string;
    DidBuild: boolean;
    id: string | null | undefined;
  };
  public UserDispatchLoadedUser?: string;

  constructor({
    payload,
  }: {
    type?: number;
    payload: {
      Name: string;
      Email: string;
      School: string;
      DidBuild: boolean;
      id: string | null | undefined;
    };
    UserDispatchLoadedUser?: string;
  }) {
    this.type = UserCreatorBehavior.SetLoadedUser;
    this.payload = payload;
    this.UserDispatchLoadedUser = "UserDispatchLoadedUser";
  }
}

/** UserDispatchUpdateEmail
 *
 * Class for updating string entry
 *
 */
export class UserDispatchUpdateSchool {
  public type?: number;
  public payload: {
    School: string;
  };
  public UserDispatchUpdateSchool?: string;

  constructor({
    payload,
  }: {
    type?: number;
    payload: {
      School: string;
    };
    UserDispatchUpdateSchool?: string;
  }) {
    this.type = UserCreatorBehavior.SetLoadedUser;
    this.payload = payload;
    this.UserDispatchUpdateSchool = "UserDispatchUpdateSchool";
  }
}

/** StudentDispatchUpdateFormError
 *
 * Class for updating string entry
 *
 */
export class UserDispatchUpdateFormError {
  public type?: number;
  public payload: {
    FormError: string | undefined;
  };
  public UserDispatchUpdateFormError?: string;

  constructor({
    payload,
  }: {
    type?: number;
    payload: { FormError: string | undefined };
    UserDispatchUpdateFormError?: string;
  }) {
    this.type = UserCreatorBehavior.SetFormError;
    this.payload = payload;
    this.UserDispatchUpdateFormError = "UserDispatchUpdateFormError";
  }
}

// Type guards

export type UserDataDispatches =
  | UserDispatchUpdateName
  | UserDispatchUpdateEmail
  | UserDispatchLoadedUser
  | UserDispatchUpdateSchool
  | UserDispatchUpdatePassword
  | UserDispatchUpdateFormError

export function isUserDispatchUpdateName(
  object: UserDataDispatches
): object is UserDispatchUpdateName {
  const res_ =
    (object as UserDispatchUpdateName).UserDispatchUpdateName !==
    undefined;
  return res_;
}

export function isUserDispatchUpdateEmail(
  object: UserDataDispatches
): object is UserDispatchUpdateEmail {
  const res_ =
    (object as UserDispatchUpdateEmail).UserDispatchUpdateEmail !==
    undefined;
  return res_;
}

export function isUserDispatchUpdatePassword(
  object: UserDataDispatches
): object is UserDispatchUpdatePassword {
  const res_ =
    (object as UserDispatchUpdatePassword).UserDispatchUpdatePassword !==
    undefined;
  return res_;
}

export function isUserDispatchUpdateSchool(
  object: UserDataDispatches
): object is UserDispatchUpdateSchool {
  const res_ =
    (object as UserDispatchUpdateSchool).UserDispatchUpdateSchool !==
    undefined;
  return res_;
}

export function isUserDispatchLoadedUser(
  object: UserDataDispatches
): object is UserDispatchLoadedUser {
  const res_ =
    (object as UserDispatchLoadedUser).UserDispatchLoadedUser !==
    undefined;
  return res_;
}

export function isUserDispatchUpdateFormError(
  object: UserDataDispatches
): object is UserDispatchUpdateFormError {
  const res_ =
    (object as UserDispatchUpdateFormError).UserDispatchUpdateFormError !==
    undefined;
  return res_;
}