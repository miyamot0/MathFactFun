/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase/app";
import { MultiValue } from "react-select";
import { StudentDispatchUpdateFormError } from "../pages/student/interfaces/StudentInterfaces";
import { StudentCreatorBehavior } from "../pages/student/types/StudentTypes";
import { UserDispatchUpdateFormError } from "../pages/user/interfaces/UserInterfaces";
import { UserCreatorBehavior } from "../pages/user/types/UserTypes";
import { SingleOptionType } from "../types/SharedComponentTypes";
import { checkIfOptionKeysPresent } from "./ReducerHelpers";

export const CommonPanelWidth = {
  minHeight: "600px",
};

export const CommonDisplayHeadingStyle = {
  fontSize: "1.25em",
  color: "var(--heading-style-color)",
  display: "block",
  marginBottom: "6px",
};

export const LoginPanelStyle = {
  maxWidth: "360px",
  margin: "60px auto",
  padding: "40px",
  border: "1px solid #ddd",
  boxShadow: "3px 3px 5px rgba(0,0,0,0.05)",
  background: "#fff",
};

/** checkInputNullOrUndefined
 *
 * General check to confirm common values are null safe
 *
 * @param {string | number | SingleOptionType | MultiValue<SingleOptionType> | firebase.User | null | undefined} value
 * @returns {boolean}
 */
export function checkInputNullOrUndefined(
  value:
    | string
    | number
    | SingleOptionType
    | MultiValue<SingleOptionType>
    | firebase.User
    | null
    | undefined
): boolean {
  if (value === null) return true;
  if (value === undefined) return true;
  return false;
}

/** streamlinedCheck
 *
 * Streamline quick checking for common option selections
 *
 * @param {string | SingleOptionType} value
 * @param {string} err
 * @param {Function} dispatch
 * @returns {boolean}
 */
export function streamlinedCheck(
  value: string | SingleOptionType,
  type: UserCreatorBehavior | StudentCreatorBehavior,
  err: string,
  dispatch: any
): boolean {
  if (dispatch === null || dispatch === undefined) {
    return true;
  }

  if (value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    const statusOfCheck = checkInputNullOrUndefined(value);

    if (statusOfCheck) {

      switch (type) {
        case UserCreatorBehavior.SetFormError:
          dispatch(new UserDispatchUpdateFormError({
            type,
            payload: {
              FormError: err
            }
          }));
          break;
        case StudentCreatorBehavior.SetFormError:
          dispatch(new StudentDispatchUpdateFormError({
            type,
            payload: {
              FormError: err
            }
          }));
          break;
      }
    }
    return statusOfCheck;
  }

  const valueToCheck: SingleOptionType = value as SingleOptionType;

  if (
    valueToCheck !== null &&
    valueToCheck !== undefined &&
    checkIfOptionKeysPresent(valueToCheck)
  ) {
    return false;
  } else {
    dispatch({
      type: type,
      payload: err,
    });

    return true;
  }
}
