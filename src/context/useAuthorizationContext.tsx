/**
 * Hook for getting Authorization Context
 */

import { AuthorizationContext, AuthorizationContextInterface } from "./AuthorizationContext";
import { useContext } from "react";

/** useAuthorizationContext
 *
 * Hook for authorization context
 *
 * @returns {AuthorizationContext}
 */
export function useAuthorizationContext(): AuthorizationContextInterface {
  const getContext: AuthorizationContextInterface = useContext(AuthorizationContext);

  if (!getContext) {
    throw Error("No Provider detected");
  }

  return getContext;
}
