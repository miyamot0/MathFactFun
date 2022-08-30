/**
 * Dashboard, for practice entry
 */

import React from "react";
import { useState } from "react";
import { useFirebaseCollection } from "../../firebase/useFirebaseCollection";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";

import StudentFilter from "./StudentFilter";
import PracticeList from "../../components/PracticeList";
import { StudentDataInterface } from "../../models/StudentModel";

export default function DashboardPractice() {
  const { user, adminFlag } = useAuthorizationContext();

  // Limit scope if not an admin
  const queryString = user && !adminFlag ? ["creator", "==", user.uid] : null;
  const orderString = null;

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
  function changeFilter(newFilter): void {
    setFilter(newFilter);
  }

  const students = documents
    ? (documents as StudentDataInterface[]).filter((document) => {
      switch (filter) {
        case "All":
          return document.currentApproach !== "N/A";
        case "Mine":
          return (
            document.creator === user.uid &&
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
