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
import { useFirestore } from "../../../firebase/hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { useAuthorizationContext } from "../../../context/hooks/useAuthorizationContext";
import { GetApproachStringFromLabel } from "../../../utilities/LabelHelper";
import { StudentWidgetInterface } from "../interfaces/StudentInterfaces";

// styles
import "./styles/StudentSummary.css";
import { confirmDeletion} from "./helpers/StudentSummaryHelpers";
import { renderAdministrativeButtons, renderSetCreatorButton, renderSpecificOutcomesButton } from "./views/StudentSummaryViews";

export default function StudentSummary({ student }: StudentWidgetInterface) {
  const { deleteDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );
  const { user, adminFlag } = useAuthorizationContext();
  const history = useHistory();

  /** handleDeleteEvent
   *
   * Remove student from firestore
   *
   * @param {React.MouseEvent<HTMLElement>} event Form submit event
   */
  async function handleDeleteEvent(event: React.MouseEvent<HTMLElement>): Promise<void> {
    event.preventDefault();

    const confirmDelete = confirmDeletion();

    if (confirmDelete) {
      await deleteDocument(student.id as string);

      if (!response.error) {
        history.push(`/dashboard`);
      } else {
        return;
      }
    } else {
      return;
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

        {renderSpecificOutcomesButton(student)}
      </div>

      <div className="student-summary">
        <h2 className="global-page-title">
          Benchmarking and Intervention Settings
        </h2>
        <hr />
        <Link to={`/edit/${student.id}`}>
          <button className="global-btn btn-below">Student Settings</button>
        </Link>

        {renderSetCreatorButton(student)}
      </div>

      {renderAdministrativeButtons(user, adminFlag, handleDeleteEvent)}
    </div>
  );
}
