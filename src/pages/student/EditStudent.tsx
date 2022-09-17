/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import { timestamp } from "../../firebase/config";
import { useFirestore } from "../../firebase/hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { useFirebaseDocumentTyped } from "../../firebase/hooks/useFirebaseDocument";
import {
  Grades,
  Operations,
  BenchmarkSets,
  InterventionApproach,
  ErrorCorrection,
  Contingencies,
} from "../../maths/Facts";
import { formatDate } from "../../utilities/LabelHelper";

// components
import Select, { MultiValue } from "react-select";
import { RoutedIdParam } from "../../interfaces/RoutingInterfaces";
import {
  StudentCreateSingleInitialState,
  userCreationReducer,
} from "./functionality/StudentFunctionality";
import {
  checkInputNullOrUndefined,
  streamlinedCheck,
} from "../../utilities/FormHelpers";
import { StudentDataInterface } from "./interfaces/StudentInterfaces";
import { SingleOptionType } from "../../types/SharedComponentTypes";
import { StudentCreatorBehavior } from "./types/StudentTypes";
import {
  onLoadSingleStudentEdit,
  verifySingleStudentEdit,
} from "./helpers/StudentHelpers";
import {
  standardEntryFieldDate,
  standardEntryFieldNumber,
  standardEntryFieldText,
  standardEntryFieldTextArea,
  standardErrorField,
  standardSelectField,
  standardSelectFieldMulti,
} from "../../utilities/FieldHelpers";

export default function EditStudent() {
  const { id } = useParams<RoutedIdParam>();
  const { document, documentError } =
    useFirebaseDocumentTyped<StudentDataInterface>({
      collectionString: "students",
      idString: id,
    });
  const history = useHistory();
  const { updateDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );

  const [state, dispatch] = useReducer(
    userCreationReducer,
    StudentCreateSingleInitialState
  );

  const CoreOperations = Operations.filter((op) => op.value !== "N/A");

  if (document && !state.DidBuild) {
    onLoadSingleStudentEdit(document, dispatch);
  }

  if (documentError) {
    return <div className="error">{documentError}</div>;
  } else if (!document) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div style={{ maxWidth: "600px" }} className="edit-student-page">
        <h2 className="global-page-title">Edit current student</h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            verifySingleStudentEdit(
              id,
              state,
              document,
              history,
              updateDocument,
              response,
              dispatch
            );
          }}
        >
          {standardEntryFieldText(
            "Student ID:",
            state.Name,
            StudentCreatorBehavior.SetName,
            dispatch
          )}

          {standardEntryFieldTextArea(
            "Student Details:",
            state.Details,
            StudentCreatorBehavior.SetDetails,
            dispatch
          )}

          {standardEntryFieldDate(
            "Next Benchmark Date:",
            state.DueDate,
            StudentCreatorBehavior.SetDueDate,
            dispatch
          )}

          {standardSelectField(
            "Current Grade:",
            Grades,
            state.CurrentGrade,
            StudentCreatorBehavior.SetCurrentGrade,
            dispatch
          )}

          {standardSelectFieldMulti(
            "Target For Benchmarking:",
            CoreOperations,
            state.CurrentBenchmarking,
            StudentCreatorBehavior.SetCurrentBenchmarking,
            dispatch
          )}

          {standardSelectField(
            "Benchmark Set:",
            BenchmarkSets,
            state.CurrentProblemSet,
            StudentCreatorBehavior.SetProblemSet,
            dispatch
          )}

          {standardSelectField(
            "Target For Intervention:",
            Operations,
            state.CurrentTarget,
            StudentCreatorBehavior.SetCurrentTarget,
            dispatch
          )}

          {standardSelectField(
            "Intervention Approach:",
            InterventionApproach,
            state.CurrentApproach,
            StudentCreatorBehavior.SetCurrentApproach,
            dispatch
          )}

          {standardSelectField(
            "Error Correction Procedures:",
            ErrorCorrection,
            state.CurrentErrorApproach,
            StudentCreatorBehavior.SetCurrentErrorApproach,
            dispatch
          )}

          {standardSelectField(
            "Reinforcement Procedures:",
            Contingencies,
            state.CurrentSRApproach,
            StudentCreatorBehavior.SetCurrentSRApproach,
            dispatch
          )}

          {standardEntryFieldNumber(
            "Target Aim Line:",
            state.AimLine,
            StudentCreatorBehavior.SetAimLine,
            dispatch
          )}

          {standardEntryFieldNumber(
            "Duration for Task (Minutes; Explicit Timing Only):",
            state.ExplicitTime,
            StudentCreatorBehavior.SetExplicitTime,
            dispatch
          )}

          {standardErrorField(state.FormError)}

          <button className="global-btn" style={{ marginTop: "30px" }}>
            Edit Student
          </button>
        </form>
        <br></br>
      </div>
    );
  }
}
