/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Hook for getting Authorization Context
 */

import { AuthorizationContext } from "../AuthorizationContext";
import { useContext } from "react";
import { AuthorizationContextInterface } from "../interfaces/AuthorizationInterfaces";

/** useAuthorizationContext
 *
 * Hook for authorization context
 *
 * @returns {AuthorizationContext}
 */
export function useAuthorizationContext(): AuthorizationContextInterface {
  const getContext: AuthorizationContextInterface =
    useContext(AuthorizationContext);

  if (!getContext) {
    throw Error("No Provider detected");
  }

  return getContext;
}
