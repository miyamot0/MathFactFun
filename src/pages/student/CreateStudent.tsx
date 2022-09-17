/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Create new student object
 */

import React, { useReducer } from "react";

import { timestamp } from "../../firebase/config";
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
import {
  checkInputNullOrUndefined,
  streamlinedCheck,
} from "../../utilities/FormHelpers";
import { StudentDataInterface } from "./interfaces/StudentInterfaces";
import { SingleOptionType } from "../../types/SharedComponentTypes";
import { StudentCreatorBehavior } from "./types/StudentTypes";
import { studentEntryFieldDate, studentEntryFieldText, studentEntryFieldTextArea, studentErrorField, studentSelectField, studentSelectFieldMulti } from "../../utilities/FieldHelpers";

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

  /** handleCreateStudentSubmit
   *
   * Event for creating a student
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  async function handleCreateStudentSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (user === null || user === undefined) {
      return;
    }

    dispatch({
      type: StudentCreatorBehavior.SetFormError,
      payload: undefined,
    });

    if (checkInputNullOrUndefined(user)) {
      return;
    }

    if (
      streamlinedCheck(
        state.CurrentGrade,
        "Please select current grade",
        dispatch
      )
    ) {
      return;
    }

    if (
      streamlinedCheck(state.CurrentTarget, "Please select a target", dispatch)
    ) {
      return;
    }

    if (
      streamlinedCheck(
        state.CurrentApproach,
        "Please select an intervention approach",
        dispatch
      )
    ) {
      return;
    }

    if (
      streamlinedCheck(
        state.CurrentErrorApproach,
        "Please select an error correct approach",
        dispatch
      )
    ) {
      return;
    }

    if (
      streamlinedCheck(
        state.CurrentSRApproach,
        "Please select a reinforcement strategy",
        dispatch
      )
    ) {
      return;
    }

    if (
      checkInputNullOrUndefined(state.CurrentBenchmarking) ||
      state.CurrentBenchmarking.length < 1
    ) {
      dispatch({
        type: StudentCreatorBehavior.SetFormError,
        payload: "Please select benchmarking options",
      });

      return;
    }

    const laggedDate = new Date();
    laggedDate.setDate(laggedDate.getDate() - 1);

    const studentInformationToAdd: StudentDataInterface = {
      name: state.Name,
      details: state.Details,
      currentGrade: state.CurrentGrade.value,
      currentApproach: state.CurrentApproach.value,
      currentBenchmarking: state.CurrentBenchmarking.map(
        (benchmark: SingleOptionType) => benchmark.label
      ),
      creator: user.uid,
      dueDate: timestamp.fromDate(new Date(state.DueDate)),
      lastActivity: timestamp.fromDate(laggedDate),
      createdAt: timestamp.fromDate(new Date()),

      currentTarget: state.CurrentTarget.value,
      currentErrorApproach: state.CurrentErrorApproach.value,
      currentSRApproach: state.CurrentSRApproach.value,

      // defaults
      id: null,
      aimLine: 0,
      problemSet: "A",
      minForTask: 2,
      comments: [],
      completedBenchmark: [],
      factsMastered: [],
      factsSkipped: [],
      factsTargeted: [],
    };

    await addDocument(studentInformationToAdd);

    if (!response.error || response.success === true) {
      history.push(`/dashboard`);
    } else {
      alert(response.error);
    }
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2 className="global-page-title">Add a new student</h2>

      <form onSubmit={handleCreateStudentSubmit}>
        {studentEntryFieldText("Student ID:",
          state.Name,
          StudentCreatorBehavior.SetName,
          dispatch)}

        {studentEntryFieldTextArea("Student Details:",
          state.Details,
          StudentCreatorBehavior.SetDetails,
          dispatch)}

        {studentEntryFieldDate("Next Benchmark Date:",
          state.DueDate,
          StudentCreatorBehavior.SetDueDate,
          dispatch)}

        {studentSelectField("Current Grade:",
          Grades,
          state.CurrentGrade,
          StudentCreatorBehavior.SetCurrentGrade,
          dispatch
        )}

        {studentSelectFieldMulti("Target For Benchmarking:",
          CoreOperations,
          state.CurrentBenchmarking,
          StudentCreatorBehavior.SetCurrentBenchmarking,
          dispatch
        )}

        {studentSelectField("Target For Intervention:",
          Operations,
          state.CurrentTarget,
          StudentCreatorBehavior.SetCurrentTarget,
          dispatch
        )}

        {studentSelectField("Intervention Approach:",
          InterventionApproach,
          state.CurrentApproach,
          StudentCreatorBehavior.SetCurrentApproach,
          dispatch
        )}

        {studentSelectField("Error Correction Procedures:",
          ErrorCorrection,
          state.CurrentErrorApproach,
          StudentCreatorBehavior.SetCurrentErrorApproach,
          dispatch
        )}

        {studentSelectField("Reinforcement Procedures:",
          Contingencies,
          state.CurrentSRApproach,
          StudentCreatorBehavior.SetCurrentSRApproach,
          dispatch
        )}

        <button className="global-btn global-btn-light-red">
          Create New Student
        </button>

        {studentErrorField(state.FormError)}
      </form>
      <br></br>
    </div>
  );
}
