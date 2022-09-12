/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Routing when an id is specified
export interface RoutedIdParam {
  id: string;
}

// Routing when an id is specified with intervention target
export interface RoutedIdTargetParam {
  id: string;
  target: string;
}
