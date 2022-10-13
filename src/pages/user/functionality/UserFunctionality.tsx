/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isUserDispatchLoadedUser, isUserDispatchUpdateEmail, isUserDispatchUpdateFormError, isUserDispatchUpdateName, isUserDispatchUpdatePassword, isUserDispatchUpdateSchool, UserDataDispatches, UserDataState, UserDispatchLoadedUser, UserDispatchUpdateEmail, UserDispatchUpdateFormError, UserDispatchUpdateName, UserDispatchUpdatePassword, UserDispatchUpdateSchool } from "../interfaces/UserInterfaces";
import { UserCreatorBehavior } from "../types/UserTypes";

export const UserDataInitialState: UserDataState = {
  Name: "",
  Email: "",
  Password: "",
  School: "",
  id: null,
  FormError: undefined,
  DidBuild: false,
};

/** overwriteOnlyExisting
 *
 * @param destination
 * @param incoming
 * @returns
 */
export function overwriteOnlyExistingUser(
  destination: UserDataState,
  incoming: UserDataDispatches
): UserDataState {
  if (isUserDispatchUpdateName(incoming)) {
    const local: UserDispatchUpdateName =
      incoming as UserDispatchUpdateName;

    local.payload.Name =
      local.payload.Name === undefined
        ? destination.Name
        : local.payload.Name;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isUserDispatchUpdateEmail(incoming)) {
    const local: UserDispatchUpdateEmail =
      incoming as UserDispatchUpdateEmail;

    local.payload.Email =
      local.payload.Email === undefined
        ? destination.Email
        : local.payload.Email;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isUserDispatchUpdatePassword(incoming)) {
    const local: UserDispatchUpdatePassword =
      incoming as UserDispatchUpdatePassword;

    local.payload.Password =
      local.payload.Password === undefined
        ? destination.Password
        : local.payload.Password;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isUserDispatchUpdateSchool(incoming)) {
    const local: UserDispatchUpdateSchool =
      incoming as UserDispatchUpdateSchool;

    local.payload.School =
      local.payload.School === undefined
        ? destination.School
        : local.payload.School;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isUserDispatchUpdateFormError(incoming)) {
    const local: UserDispatchUpdateFormError =
      incoming as UserDispatchUpdateFormError;

    local.payload.FormError =
      local.payload.FormError === undefined
        ? destination.FormError
        : local.payload.FormError;

    return {
      ...destination,
      ...local.payload,
    };
  }

  if (isUserDispatchLoadedUser(incoming)) {
    const local: UserDispatchLoadedUser =
      incoming as UserDispatchLoadedUser;

    local.payload.Name =
      local.payload.Name === undefined
        ? destination.Name
        : local.payload.Name;

    local.payload.Email =
      local.payload.Email === undefined
        ? destination.Email
        : local.payload.Email;

    local.payload.School =
      local.payload.School === undefined
        ? destination.School
        : local.payload.School;

    local.payload.id =
      local.payload.id === undefined
        ? destination.id
        : local.payload.id;

    local.payload.DidBuild = true;

    return {
      ...destination,
      ...local.payload,
    };
  }

  throw Error(`Didn't match: ${JSON.stringify(incoming)}`);
}

/**
 * Reducer for create
 *
 * @param {any} state
 * @param {any} action
 * @returns {any}
 */
export function UserGenerationReducer(
  state: UserDataState,
  action: UserDataDispatches
): UserDataState {
  switch (action.type) {
    case UserCreatorBehavior.SetName:
    case UserCreatorBehavior.SetEmail:
    case UserCreatorBehavior.SetPassword:
    case UserCreatorBehavior.SetLoadedUser:
    case UserCreatorBehavior.SetSchool:
    case UserCreatorBehavior.SetFormError:
      return overwriteOnlyExistingUser(state, action);

    default:
      return state;
  }
}
