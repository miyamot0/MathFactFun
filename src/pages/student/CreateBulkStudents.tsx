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
import Select, { MultiValue } from "react-select";
import { timestamp } from "../../firebase/config";
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
  UserCreateSingleInitialState,
  userCreationReducer,
} from "./functionality/StudentFunctionality";
import {
  checkInputNullOrUndefined,
  streamlinedCheck,
} from "../../utilities/FormHelpers";
import { StudentDataInterface } from "./interfaces/StudentInterfaces";
import { SingleOptionType } from "../../types/SharedComponentTypes";
import { CommentInterface } from "./subcomponents/types/CommentTypes";
import { StudentCreatorBehavior } from "./types/StudentTypes";

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
    UserCreateSingleInitialState
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

    dispatch({
      type: StudentCreatorBehavior.SetFormError,
      payload: { uFormError: undefined },
    });

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
        payload: { uFormError: "Please select benchmarking options" },
      });

      return;
    }

    const laggedDate = new Date();
    laggedDate.setDate(laggedDate.getDate() - 1);

    const comments: CommentInterface[] = [];
    const factsTargeted: string[] = [];
    const factsMastered: string[] = [];
    const factsSkipped: string[] = [];
    const aimLine = 0;
    const minForTask = 2;

    const arrayTextAreaLines = state.Name.split("\n");

    for (let i = 0; i < arrayTextAreaLines.length; i++) {
      const currentStudentID = arrayTextAreaLines[i].trim();

      if (currentStudentID.length < 1) continue;

      const studentObject = {
        name: currentStudentID,
        details: "",
        currentGrade: state.CurrentGrade.value,
        currentTarget: state.CurrentTarget.value,
        currentApproach: state.CurrentApproach.value,
        currentErrorApproach: state.CurrentErrorApproach.value,
        currentSRApproach: state.CurrentSRApproach.value,
        currentBenchmarking: state.CurrentBenchmarking.map(
          (benchmark: SingleOptionType) => benchmark.label
        ),
        completedBenchmark: [],
        creator: id,
        dueDate: timestamp.fromDate(new Date(state.DueDate)),
        lastActivity: timestamp.fromDate(laggedDate),
        createdAt: timestamp.fromDate(new Date()),
        comments,
        factsTargeted,
        factsMastered,
        factsSkipped,
        aimLine,
        minForTask,
        problemSet: "A",
        id: null,
      } as StudentDataInterface;

      await addDocument(studentObject);
    }

    if (!response.error || response.success === true) {
      history.push(`/dashboard`);
    } else {
      alert(response.error);
    }
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2 className="global-page-title">Add new students to class/group</h2>

      <form onSubmit={handleCreateStudentSubmit}>
        <label>
          <span>Student IDs (one on each line):</span>
          <textarea
            required
            onChange={(e) => {
              dispatch({
                type: StudentCreatorBehavior.SetName,
                payload: { uName: e.target.value },
              });
            }}
            value={state.Name}
          ></textarea>
        </label>
        <label>
          <span>Next Benchmark Date:</span>
          <input
            required
            type="date"
            onChange={(e) => {
              dispatch({
                type: StudentCreatorBehavior.SetDueDate,
                payload: { uDueDate: e.target.value },
              });
            }}
            value={state.DueDate}
          ></input>
        </label>
        <label>
          <span>Current Grade</span>
          <Select
            options={Grades}
            onChange={(option) => {
              dispatch({
                type: StudentCreatorBehavior.SetCurrentGrade,
                payload: { uCurrentGrade: option },
              });
            }}
          />
        </label>
        <label>
          <span>Target For Benchmarking</span>
          <Select
            options={CoreOperations}
            onChange={(option: MultiValue<SingleOptionType>) => {
              dispatch({
                type: StudentCreatorBehavior.SetCurrentBenchmarking,
                payload: { uCurrentBenchmarking: option },
              });
            }}
            value={state.CurrentBenchmarking}
            isMulti={true}
          />
        </label>
        <label>
          <span>Target For Intervention</span>
          <Select
            options={Operations}
            onChange={(option) => {
              dispatch({
                type: StudentCreatorBehavior.SetCurrentTarget,
                payload: { uCurrentTarget: option },
              });
            }}
            value={state.CurrentTarget}
          />
        </label>
        <label>
          <span>Intervention Approach</span>
          <Select
            options={InterventionApproach}
            onChange={(option) => {
              dispatch({
                type: StudentCreatorBehavior.SetCurrentApproach,
                payload: { uCurrentApproach: option },
              });
            }}
            value={state.CurrentApproach}
          />
        </label>
        <label>
          <span>Error Correction Procedures</span>
          <Select
            options={ErrorCorrection}
            onChange={(option) => {
              dispatch({
                type: StudentCreatorBehavior.SetCurrentErrorApproach,
                payload: { uCurrentErrorApproach: option },
              });
            }}
            value={state.CurrentErrorApproach}
          />
        </label>
        <label>
          <span>Reinforcement Procedures</span>
          <Select
            options={Contingencies}
            onChange={(option) => {
              dispatch({
                type: StudentCreatorBehavior.SetCurrentSRApproach,
                payload: { uCurrentSRApproach: option },
              });
            }}
            value={state.CurrentSRApproach}
          />
        </label>

        <button className="global-btn global-btn-light-red">
          Create New Student(s)
        </button>
        {state.FormError && <p className="error">{state.FormError}</p>}
      </form>
      <br></br>
    </div>
  );
}
