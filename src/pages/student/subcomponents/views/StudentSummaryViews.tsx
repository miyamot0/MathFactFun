/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Link } from "react-router-dom";
import { StudentDataInterface } from "../../interfaces/StudentInterfaces";

/** renderCurrentTargetButton
 * 
 * @param {StudentDataInterface} student 
 * @returns {JSX.Element}
 */
export function renderSpecificOutcomesButton(student: StudentDataInterface): JSX.Element {

  const hasATarget = student.currentTarget !== "N/A";

  if (hasATarget) {
    return <Link
      to={`/ProgressMonitor/${student.currentTarget}/${student.id}/${student.currentApproach}/${student.aimLine}`}
    >
      <button className="global-btn global-btn-green btn-below">
        Intervention-specific Targets
      </button>
    </Link>;
  } else {
    return <div className="no-specific-outcomes-button"></div>
  }
}

/** renderCurrentTargetButton
 * 
 * @param {StudentDataInterface} student 
 * @returns {JSX.Element}
 */
export function renderSetCreatorButton(student: StudentDataInterface): JSX.Element {

  const hasATarget = student.currentTarget !== "N/A";

  if (hasATarget) {
    return <Link to={`/set/${student.currentTarget}/${student.id}`}>
      <button className="global-btn btn-below">Targeted Item Sets</button>
    </Link>;
  } else {
    return <div className="no-set-items-button"></div>
  }
}

/** renderAdministrativeButtons
 * 
 * @param user 
 * @param adminFlag 
 * @param handleDeleteEvent 
 * @returns {JSX.Element}
 */
export function renderAdministrativeButtons(user: any, adminFlag: boolean, handleDeleteEvent: any): JSX.Element {

  const shouldShowPanel = user && adminFlag;

  if (shouldShowPanel) {
    return <div className="student-summary">
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
    </div>;
  } else {
    return <div className="no-admin-panel"></div>
  }
}