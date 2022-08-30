/**
 * Student summary page
 */

import React from "react";
import { useParams } from "react-router-dom";
import StudentComments from "./StudentComments";
import { useFirebaseDocument } from "../../firebase/useFirebaseDocument";

import StudentSummary from "./StudentSummary";

import "./Student.css";

export default function Student() {
  const { id } = useParams();
  const { documentError, document } = useFirebaseDocument("students", id);

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
