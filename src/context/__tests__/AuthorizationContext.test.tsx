/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { simplifyPrivilegeAccess } from "../helpers/AuthorizationHelpers";

describe("simplifyPrivilegeAccess", () => {
  it("false, if empty", () => {
    const value = "";
    const result = simplifyPrivilegeAccess(value);

    expect(result).toBe(false);
  });

  it("true, if admin", () => {
    const value = "admin";
    const result = simplifyPrivilegeAccess(value);

    expect(result).toBe(true);
  });

  it("true, if sysadmin", () => {
    const value = "sysadmin";
    const result = simplifyPrivilegeAccess(value);

    expect(result).toBe(true);
  });
});
