/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FirestoreState } from "../../../../firebase/interfaces/FirebaseInterfaces";
import { StudentDataInterface } from "../../interfaces/StudentInterfaces";

/** confirmDeletion
 *
 * @returns
 */
export function confirmDeletion(): boolean {
  return window.confirm("Are you sure to delete this student?");
}

export async function handleStudentDelete(
  student: StudentDataInterface,
  deleteDocument: (id: string) => Promise<void>,
  response: FirestoreState,
  history: any
) {
  const confirmDelete = confirmDeletion();

  if (confirmDelete && student.id !== undefined && student.id !== null) {
    await deleteDocument(student.id);

    if (!response.error) {
      history.push(`/dashboard`);
    } else {
      return;
    }
  } else {
    return;
  }
}
