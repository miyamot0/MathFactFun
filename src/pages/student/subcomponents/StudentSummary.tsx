/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Link } from "react-router-dom";
import { useFirestore } from "../../../firebase/hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { useAuthorizationContext } from "../../../context/hooks/useAuthorizationContext";
import { GetApproachStringFromLabel } from "../../../utilities/LabelHelper";
import { StudentWidgetInterface } from "../interfaces/StudentInterfaces";
import {
  ShowAdministrativeButtons,
  ShowSetCreatorButton,
  ShowSpecificOutcomesButton,
} from "./views/StudentSummaryViews";

// styles
import "./styles/StudentSummary.css";
import StudentSummaryCard from "./views/StudentSummaryCard";
import StudentSettingsCard from "./views/StudentSettingsCard";

export default function StudentSummary({ student }: StudentWidgetInterface) {
  const { deleteDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );
  const { user, adminFlag } = useAuthorizationContext();
  const history = useHistory();

  return (
    <div>
      <h4 className="student-summary-h4">Student Settings: {student.name}</h4>

      <StudentSummaryCard student={student} />

      <div className="student-summary">
        <h2 className="global-page-title">Student Performance</h2>
        <hr />
        <Link to={`/Screening/${student.id}`}>
          <button className="global-btn global-btn-green btn-below">
            Overall Math
          </button>
        </Link>

        <ShowSpecificOutcomesButton student={student} />
      </div>

      <StudentSettingsCard student={student} />

      <ShowAdministrativeButtons user={user}
        adminFlag={adminFlag}
        student={student}
        deleteDocument={deleteDocument}
        response={response}
        history={history} />
    </div>
  );
}
