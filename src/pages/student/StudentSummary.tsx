/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Student summary panel
 */

import React from "react";
import { Link } from "react-router-dom";
import { useFirestore } from "../../firebase/useFirestore";
import { useHistory } from "react-router-dom";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";
import { GetApproachStringFromLabel } from "../../utilities/LabelHelper";

import { StudentDataInterface } from "../../models/StudentModel";

// styles
import "./StudentSummary.css";

export default function StudentSummary({ student }: { student: StudentDataInterface }) {
  const { deleteDocument, response } = useFirestore("students");
  const { user, adminFlag } = useAuthorizationContext();
  const history = useHistory();

  /** handleDeleteEvent
   *
   * Remove student from firestore
   *
   * @param {React.MouseEvent<HTMLElement>} event Form submit event
   */
  function handleDeleteEvent(event: React.MouseEvent<HTMLElement>): void {
    event.preventDefault();

    if (window.confirm("Are you sure to delete this student?")) {
      deleteDocument(student.id as string);

      if (!response.error) {
        history.push(`/dashboard`);
      }
    }
  }

  return (
    <div>
      <h4 className="student-summary-h4">Student Settings: {student.name}</h4>

      <div className="student-summary">
        <h2 className="global-page-title">Student Information</h2>
        <hr />
        <p>
          <b>Current Grade:</b> {student.currentGrade}
        </p>
        <p>
          <b>Current Target for Intervention:</b> {student.currentTarget}
        </p>
        <p>
          <b>Current Intervention:</b>{" "}
          {GetApproachStringFromLabel(student.currentApproach as string)}
        </p>
        <p>
          <b>Details</b>: {student.details}
        </p>
        <p className="due-date">
          Next Benchmark Scheduled: {student.dueDate?.toDate().toDateString()}
        </p>
      </div>

      <div className="student-summary">
        <h2 className="global-page-title">Student Performance</h2>
        <hr />

        <Link to={`/Screening/${student.id}`}>
          <button className="global-btn global-btn-green btn-below">
            Overall Math
          </button>
        </Link>

        <Link
          to={`/ProgressMonitor/${student.currentTarget}/${student.id}/${student.currentApproach}/${student.aimLine}`}
        >
          <button className="global-btn global-btn-green btn-below">
            Intervention-specific Targets
          </button>
        </Link>
      </div>

      <div className="student-summary">
        <h2 className="global-page-title">
          Benchmarking and Intervention Settings
        </h2>
        <hr />

        <Link to={`/edit/${student.id}`}>
          <button className="global-btn btn-below">Student Settings</button>
        </Link>

        {student.currentTarget && student.currentTarget !== "N/A" && (
          <Link to={`/set/${student.currentTarget}/${student.id}`}>
            <button className="global-btn btn-below">Targeted Item Sets</button>
          </Link>
        )}
      </div>

      {user && adminFlag && (
        <div className="student-summary">
          <h2 className="global-page-title">
            Advanced and Administrative Options
          </h2>
          <hr />

          <button
            className="global-btn global-btn-red btn-below"
            onClick={handleDeleteEvent}
          >
            Delete Student
          </button>
        </div>
      )}
    </div>
  );
}
