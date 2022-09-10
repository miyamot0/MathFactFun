import {
  AuthorizationContextStateInterface,
  AuthorizationStates,
  FirebaseLoginAction,
} from "../types/AuthorizationTypes";

export const InitialAuthorizationState = {
  user: null,
  authIsReady: false,
  adminFlag: false,
};

/** Auth reducer
 *
 * Reducer firestore login
 *
 * @param {Enum} state Current state
 * @param {Object} action Action type
 * @returns {AuthorizationContextStateInterface}
 */
export function AuthorizationReducer(
  state: AuthorizationContextStateInterface,
  action: FirebaseLoginAction
): AuthorizationContextStateInterface {
  switch (action.type) {
    case AuthorizationStates.LOGIN:
      return { ...state, user: action.payload };
    case AuthorizationStates.LOGOUT:
      return { ...state, user: null };
    case AuthorizationStates.READY:
      return {
        user: action.payload,
        authIsReady: true,
        adminFlag: action.payload2,
      };
    case AuthorizationStates.CLAIMS:
      return {
        user: action.payload,
        authIsReady: true,
        adminFlag: action.payload2,
      };
    default:
      return state;
  }
}
