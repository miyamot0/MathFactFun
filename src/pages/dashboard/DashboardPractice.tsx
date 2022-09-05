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
import { useFirebaseCollection } from "../../firebase/useFirebaseCollection";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";

import StudentFilter from "./StudentFilter";
import PracticeList from "../../components/PracticeList";
import { StudentDataInterface } from "../../firebase/types/GeneralTypes";

export default function DashboardPractice() {
  const { user, adminFlag } = useAuthorizationContext();

  // Limit scope if not an admin
  const queryString =
    user && !adminFlag ? ["creator", "==", user.uid] : undefined;
  const orderString = undefined;

  const { documents, error } = useFirebaseCollection(
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
    ? (documents as StudentDataInterface[]).filter((document) => {
        switch (filter) {
          case "All":
            return document.currentApproach !== "N/A";
          case "Mine":
            return (
              document.creator === user!.uid &&
              document.currentApproach !== "N/A"
            );
          case "K":
          case "1st":
          case "2nd":
          case "3rd":
          case "4th":
          case "5th":
          case "6th":
            return (
              document.currentGrade === filter &&
              document.currentApproach !== "N/A"
            );
          default:
            return document.currentApproach !== "N/A";
        }
      })
    : null;

  return (
    <div>
      <h2 className="global-page-title">Intervention Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <StudentFilter changeFilter={changeFilter} />}
      {students && <PracticeList students={students} />}
    </div>
  );
}
