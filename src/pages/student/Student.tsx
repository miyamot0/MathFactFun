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
import StudentComments from "./StudentComments";
import { useFirebaseDocument } from "../../firebase/useFirebaseDocument";

import StudentSummary from "./StudentSummary";

import "./Student.css";
import { StudentDataInterface } from "../../models/StudentModel";

interface RoutedStudent {
  id?: string;
};

export default function Student() {
  const { id } = useParams<RoutedStudent>();

  console.log(id)
  const { documentError, document } = useFirebaseDocument("students", id);

  if (documentError) {
    return <div className="error">{documentError}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="student-details-style">
      <StudentSummary student={document as StudentDataInterface} />
      <StudentComments student={document as StudentDataInterface} />
    </div>
  );
}
