/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** simplifyPrivilegeAccess
 *
 * Simplify access to privilege level
 *
 * @param {string} res level
 * @returns {bool}
 */
export function simplifyPrivilegeAccess(res: string): boolean {
  return res === "admin" || res === "sysadmin";
}
