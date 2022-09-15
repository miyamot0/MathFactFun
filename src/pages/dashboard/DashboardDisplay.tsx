/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import StudentFilter, { GradeFilterList } from "./functionality/StudentFilter";
import StudentList from "./subcomponents/StudentList";
import { useState } from "react";
import { useFirebaseCollectionTyped } from "../../firebase/hooks/useFirebaseCollection";
import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";
import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";

import { dashboardGenerateError, studentFilterMap } from "./helpers/DashboardHelpers";

export default function DashboardDisplay() {
  const { user, adminFlag } = useAuthorizationContext();
  const { documents, error } = useFirebaseCollectionTyped<StudentDataInterface>(
    {
      collectionString: "students",
      queryString: user && !adminFlag ? ["creator", "==", user.uid] : undefined,
      orderString: undefined
    }
  );

  const [filter, setFilter] = useState("Mine");

  /** changeFilter
   *
   * Callback to pass to filter widget
   *
   * @param {String} newFilter Filter criteria
   */
  function changeFilter(newFilter: string): void {
    if (GradeFilterList.includes(newFilter)) {
      setFilter(newFilter);
    } else {
      throw Error("Value supplied incompatible")
    }
  }

  const students = studentFilterMap(documents, user, filter);

  return (
    <div>
      <h2 className="global-page-title">Student Dashboard</h2>
      {error && dashboardGenerateError(error)}
      {documents && <StudentFilter changeFilter={changeFilter} />}
      {students && <StudentList students={students} />}
    </div>
  );
}
