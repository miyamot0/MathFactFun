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
import { ShowSetCreatorButton } from "./StudentSummaryViews";

export interface StudentSettingsCardInterface {
    student: StudentDataInterface;
}

export default function StudentSettingsCard({ student }: StudentSettingsCardInterface) {
    return <div className="student-summary">
        <h2 className="global-page-title">
            Benchmarking and Intervention Settings
        </h2>
        <hr />
        <Link to={`/edit/${student.id}`}>
            <button className="global-btn btn-below">Student Settings</button>
        </Link>

        <ShowSetCreatorButton student={student} />

    </div>
}