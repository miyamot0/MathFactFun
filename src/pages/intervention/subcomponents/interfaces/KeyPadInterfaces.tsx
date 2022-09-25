/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { KeyPadCallback } from "../types/KeyPadTypes";

export interface KeypadInterface {
  callBackFunction: KeyPadCallback;
  operatorSymbol: string | undefined;
  showEquals: boolean;
}
