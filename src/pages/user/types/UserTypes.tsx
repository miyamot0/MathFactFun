/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface UserDataInterface {
  id: string | undefined | null;
  displayEmail: string;
  displayName: string;
  displaySchool: string;
}

export interface UserWidgetInterface {
  user: UserDataInterface;
}

export enum UserCreatorBehavior {
  SetId = 2000,
  SetName = 2001,
  SetSchool = 2002,
  SetEmail = 2003,
  SetPassword = 2004,
  SetLoadedUser = 2005,
  SetFormError = 2006,
  SetThrow = 2007,
}
