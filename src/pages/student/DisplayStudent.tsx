/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Student summary page
 */

import React from "react";
import { useParams } from "react-router-dom";
import { useFirebaseDocumentTyped } from "../../firebase/useFirebaseDocument";
import { RoutedIdParam } from "../../utilities/RoutingHelpers";
import StudentSummary from "./subcomponents/StudentSummary";
import StudentComments from "./subcomponents/StudentComments";
import "./styles/DisplayStudent.css";
import { StudentDataInterface } from "./types/StudentTypes";

export default function DisplayStudent() {
  const { id } = useParams<RoutedIdParam>();

  const { document, documentError } =
    useFirebaseDocumentTyped<StudentDataInterface>({
      collectionString: "students",
      idString: id,
    });

  if (documentError) {
    return <div className="error">{documentError}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="student-details-style">
      <StudentSummary student={document} />
      <StudentComments student={document} />
    </div>
  );
}
