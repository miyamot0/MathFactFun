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
  SetId,
  SetName,
  SetSchool,
  SetEmail,
  SetPassword,
  SetLoadedUser,
  SetFormError,
  SetThrow,
}
