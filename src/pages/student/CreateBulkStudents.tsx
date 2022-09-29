/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Create multiple new student object
 */

import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "../../firebase/hooks/useFirestore";
import { useHistory } from "react-router-dom";
import {
  Grades,
  Operations,
  InterventionApproach,
  ErrorCorrection,
  Contingencies,
} from "../../maths/Facts";
import { RoutedIdParam } from "../../interfaces/RoutingInterfaces";
import {
  StudentCreateSingleInitialState,
  userCreationReducer,
} from "./functionality/StudentFunctionality";
import { StudentCreatorBehavior } from "./types/StudentTypes";
import {
  standardEntryFieldDate,
  standardEntryFieldTextArea,
  standardErrorField,
  standardSelectField,
  standardSelectFieldMulti,
} from "../../utilities/FieldHelpers";
import { verifyBulkStudentCreate } from "./helpers/StudentHelpers";

// Page to create new students
export default function CreateBulkStudents() {
  const history = useHistory();
  const { id } = useParams<RoutedIdParam>();
  const { addDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );

  const [state, dispatch] = useReducer(
    userCreationReducer,
    StudentCreateSingleInitialState
  );

  const CoreOperations = Operations.filter((op) => op.value !== "NA");

  return (
    <div style={{ maxWidth: "600px" }} className="create-bulk-student-page">
      <h2 className="global-page-title">Add new students to class/group</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          verifyBulkStudentCreate(
            id,
            state,
            history,
            addDocument,
            response,
            dispatch
          );
        }}
      >
        {standardEntryFieldTextArea(
          "Student IDs (one on each line):",
          state.Name,
          StudentCreatorBehavior.SetName,
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

        {standardErrorField(state.FormError)}

        <button
          className="global-btn global-btn-light-red"
          style={{ marginTop: "30px" }}
        >
          Create New Student(s)
        </button>
      </form>
      <br></br>
    </div>
  );
}
