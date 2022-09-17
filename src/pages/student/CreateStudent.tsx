/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer } from "react";

import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";
import { useFirestore } from "../../firebase/hooks/useFirestore";
import { useHistory } from "react-router-dom";
import {
  Grades,
  Operations,
  InterventionApproach,
  ErrorCorrection,
  Contingencies,
} from "../../maths/Facts";
import {
  StudentCreateSingleInitialState,
  userCreationReducer,
} from "./functionality/StudentFunctionality";
import { StudentCreatorBehavior } from "./types/StudentTypes";
import {
  standardEntryFieldDate,
  standardEntryFieldText,
  standardEntryFieldTextArea,
  standardErrorField,
  standardSelectField,
  standardSelectFieldMulti,
} from "../../utilities/FieldHelpers";
import { verifySingleStudentCreate } from "./helpers/StudentHelpers";

// Page to create new students
export default function CreateStudent() {
  const history = useHistory();
  const { addDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );
  const { user } = useAuthorizationContext();

  const [state, dispatch] = useReducer(
    userCreationReducer,
    StudentCreateSingleInitialState
  );

  const CoreOperations = Operations.filter((op) => op.value !== "N/A");

  return (
    <div style={{ maxWidth: "600px" }} className="create-student-page">
      <h2 className="global-page-title">Add a new student</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          verifySingleStudentCreate(
            user,
            state,
            history,
            addDocument,
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
          Create New Student
        </button>
      </form>
      <br></br>
    </div>
  );
}
