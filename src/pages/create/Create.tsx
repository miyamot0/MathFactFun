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
import Select, { MultiValue } from "react-select";

import { timestamp } from "../../firebase/config";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";
import { useFirestore } from "../../firebase/useFirestore";
import { useHistory } from "react-router-dom";
import {
  Grades,
  Operations,
  InterventionApproach,
  ErrorCorrection,
  Contingencies,
} from "../../maths/Facts";
import { SingleOptionType } from "../CommonTypes/CommonPageTypes";
import {
  UserCreateSingleInitialState,
  UserCreationReducer,
} from "./functionality/CreateFunctionality";
import { UserCreatorBehavior } from "./types/CreateTypes";
import { StudentDataInterface } from "../../firebase/types/GeneralTypes";
import {
  checkInputNullOrUndefined,
  streamlinedCheck,
} from "./helpers/CreateHelpers";

// Page to create new students
export default function Create() {
  const history = useHistory();
  const { addDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );
  const { user } = useAuthorizationContext();

  const [state, dispatch] = useReducer(
    UserCreationReducer,
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
      type: UserCreatorBehavior.SetFormError,
      payload: { uFormError: undefined },
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
        type: UserCreatorBehavior.SetFormError,
        payload: { uFormError: "Please select benchmarking options" },
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
      creator: user?.uid,
      dueDate: timestamp.fromDate(new Date(state.DueDate)),
      lastActivity: timestamp.fromDate(laggedDate),
      createdAt: timestamp.fromDate(new Date()),

      currentTarget: state.CurrentTarget.value,
      currentErrorApproach: state.CurrentErrorApproach.value,
      currentSRApproach: state.CurrentSRApproach.value,

      // defaults
      id: null,
      aimLine: 0,
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
        <label>
          <span>Student ID:</span>
          <input
            required
            type="text"
            onChange={(e) => {
              dispatch({
                type: UserCreatorBehavior.SetName,
                payload: { uName: e.target.value },
              });
            }}
            value={state.Name}
          ></input>
        </label>
        <label>
          <span>Student Details:</span>
          <textarea
            required
            onChange={(e) => {
              dispatch({
                type: UserCreatorBehavior.SetDetails,
                payload: { uDetails: e.target.value },
              });
            }}
            value={state.Details}
          ></textarea>
        </label>
        <label>
          <span>Next Benchmark Date:</span>
          <input
            required
            type="date"
            onChange={(e) => {
              dispatch({
                type: UserCreatorBehavior.SetDueDate,
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
                type: UserCreatorBehavior.SetCurrentGrade,
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
                type: UserCreatorBehavior.SetCurrentBenchmarking,
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
                type: UserCreatorBehavior.SetCurrentTarget,
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
                type: UserCreatorBehavior.SetCurrentApproach,
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
                type: UserCreatorBehavior.SetCurrentErrorApproach,
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
                type: UserCreatorBehavior.SetCurrentSRApproach,
                payload: { uCurrentSRApproach: option },
              });
            }}
            value={state.CurrentSRApproach}
          />
        </label>

        <button className="global-btn global-btn-light-red">
          Create New Student
        </button>
        {state.FormError && <p className="error">{state.FormError}</p>}
      </form>
      <br></br>
    </div>
  );
}
