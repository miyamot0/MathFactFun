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
