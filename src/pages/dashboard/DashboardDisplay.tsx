/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Dashboard, for practice entry
 */

import React from "react";
import { useState } from "react";
import { useFirebaseCollection2 } from "../../firebase/useFirebaseCollection";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";

// Components
import StudentList from "./subcomponents/StudentList";
import StudentFilter from "./functionality/StudentFilter";
import { StudentDataInterface } from "../../firebase/types/GeneralTypes";

export default function Dashboard() {
  const { user, adminFlag } = useAuthorizationContext();

  // Limit scope if not an admin
  const queryString =
    user && !adminFlag ? ["creator", "==", user.uid] : undefined;
  const orderString = undefined;

  const { documents, error } = useFirebaseCollection2<StudentDataInterface>(
    "students",
    queryString,
    orderString
  );

  const [filter, setFilter] = useState("Mine");

  /** changeFilter
   *
   * Callback to pass to filter widget
   *
   * @param {String} newFilter Filter criteria
   */
  function changeFilter(newFilter: string): void {
    setFilter(newFilter);
  }

  const students = documents
    ? documents.filter((document) => {
        switch (filter) {
          case "All":
            return true;
          case "Mine":
            return document.creator === user!.uid;
          case "K":
          case "1st":
          case "2nd":
          case "3rd":
          case "4th":
          case "5th":
          case "6th":
            return document.currentGrade === filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="global-page-title">Student Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <StudentFilter changeFilter={changeFilter} />}
      {students && <StudentList students={students} />}
    </div>
  );
}
