/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import { streamlinedCheck } from "../../../utilities/FormHelpers";
import { UserDataState } from "../interfaces/UserInterfaces";
import { UserCreatorBehavior, UserDataInterface } from "../types/UserTypes";

/** verifyUserCreate
 *
 * @param state
 * @param history
 * @param addDocument
 * @param response
 * @param dispatch
 */
export async function verifyUserCreate(
  state: UserDataState,
  history: any,
  addDocument: (doc: UserDataInterface) => Promise<void>,
  response: FirestoreState,
  dispatch: React.Dispatch<{
    type: UserCreatorBehavior;
    payload: any;
  }>
) {
  dispatch({
    type: UserCreatorBehavior.SetFormError,
    payload: undefined,
  });

  if (
    streamlinedCheck(
      state.Name,
      UserCreatorBehavior.SetFormError,
      "Please enter a valid name",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.Email,
      UserCreatorBehavior.SetFormError,
      "Please enter a valid email address",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.School,
      UserCreatorBehavior.SetFormError,
      "Please enter a valid school name",
      dispatch
    )
  ) {
    return;
  }

  const userObject = {
    displayEmail: state.Email,
    displayName: state.Name,
    displaySchool: state.School,
    password: state.Password,
    id: undefined,
  };

  await addDocument(userObject);

  if (!response.error) {
    history.push("/admin");
  }
}

/** verifyUserEdit
 *
 * @param id
 * @param state
 * @param history
 * @param updateDocument
 * @param response
 * @param dispatch
 * @returns
 */
export async function verifyUserEdit(
  id: string,
  state: UserDataState,
  history: any,
  updateDocument: (id: string, updates: any) => Promise<void>,
  response: FirestoreState,
  dispatch: any
) {
  if (id === undefined) {
    return;
  }

  dispatch({
    type: UserCreatorBehavior.SetFormError,
    payload: undefined,
  });

  if (
    streamlinedCheck(
      state.Name,
      UserCreatorBehavior.SetFormError,
      "Please enter a valid name",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.School,
      UserCreatorBehavior.SetFormError,
      "Please enter a valid school name",
      dispatch
    )
  ) {
    return;
  }

  const teacherObject = {
    displayName: state.Name,
    displaySchool: state.School,
  };

  await updateDocument(id, teacherObject);

  if (!response.error || response.success === true) {
    history.push(`/admin`);
  } else {
    alert(response.error);
  }
}
