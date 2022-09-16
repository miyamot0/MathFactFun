/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface UserDataState {
  Name: string;
  School: string;
  Email: string;
  Password: string;
  id: null | string;
  FormError: undefined | string;
  DidBuild: boolean;
}
