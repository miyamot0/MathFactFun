/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** isEmpty
 *
 */
export function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

/** checkIfNullUndefinedOrEmpty
 *
 * @param obj
 * @returns
 */
export function checkIfNullUndefinedOrEmpty(obj: object) {
  return obj === null || obj === undefined || isEmpty(obj);
}
