/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Student Edit Page
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
import { FormatDate } from "../../utilities/LabelHelper";

// components
import Select, { MultiValue } from "react-select";
import {
  RoutedIdParam,
  SingleOptionType,
} from "../../utilities/RoutingHelpers";
import {
  UserCreateSingleInitialState,
  UserCreationReducer,
} from "./functionality/StudentFunctionality";
import {
  checkInputNullOrUndefined,
  streamlinedCheck,
} from "../../utilities/FormHelpers";
import {
  StudentCreatorBehavior,
  StudentDataInterface,
} from "./Types/StudentTypes";

// TODO: reducer

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
    UserCreationReducer,
    UserCreateSingleInitialState
  );

  const CoreOperations = Operations.filter((op) => op.value !== "N/A");

  if (document && !state.DidBuild) {
    dispatch({
      type: StudentCreatorBehavior.SetBuilt,
      payload: null,
    });

    const uCurrentTarget = Operations.find(
      (obj) => obj.value === document.currentTarget
    );

    const uCurrentBenchmarking = Operations.filter((obj) =>
      document.currentBenchmarking.includes(obj.label)
    );

    const uProblemSet = BenchmarkSets.find(
      (obj) => obj.value === document.problemSet
    );
    const uCurrentGrade = Grades.find(
      (obj) => obj.value === document.currentGrade
    );
    const uCurrentApproach = InterventionApproach.find(
      (obj) => obj.value === document.currentApproach
    );
    const uCurrentErrorApproach = ErrorCorrection.find(
      (obj) => obj.value === document.currentErrorApproach
    );
    const uCurrentSRApproach = Contingencies.find(
      (obj) => obj.value === document.currentSRApproach
    );

    dispatch({
      type: StudentCreatorBehavior.SetLoadedStudent,
      payload: {
        uName: document.name,
        uDetails: document.details,
        uDueDate: FormatDate(document.dueDate.toDate()),
        uAimLine: document.aimLine,
        uExplicitTime: document.minForTask,
        uCurrentTarget,
        uCurrentGrade,
        uCurrentApproach,
        uCurrentErrorApproach,
        uCurrentSRApproach,
        uCurrentBenchmarking,
        uProblemSet,
      },
    });
  }

  /** handleEditFormSubmit
   *
   * Submission event for student edit form
   *
   * @param {React.FormEvent<HTMLFormElement>} event Submitted event
   */
  async function handleEditFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<any> {
    event.preventDefault();

    if (document === null || id === undefined) {
      return;
    }

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

    const date = new Date(state.DueDate);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const targetedList =
      state.CurrentTarget.value === document.currentTarget
        ? document.factsTargeted
        : [];

    const studentInformationToAdd = {
      name: state.Name,
      details: state.Details,
      currentGrade: state.CurrentGrade.value,
      currentTarget: state.CurrentTarget.value,
      currentApproach: state.CurrentApproach.value,
      currentBenchmarking: state.CurrentBenchmarking.map(
        (benchmark: SingleOptionType) => benchmark.label
      ),
      currentErrorApproach: state.CurrentErrorApproach.value,
      currentSRApproach: state.CurrentSRApproach.value,
      dueDate: timestamp.fromDate(date),
      aimLine: state.AimLine,
      minForTask: state.ExplicitTime,
      problemSet: state.CurrentProblemSet.value,
      factsTargeted: targetedList,
    };

    await updateDocument(id, studentInformationToAdd);

    if (!response.error || response.success === true) {
      history.push(`/dashboard`);
    } else {
      alert(response.error);
    }

    return null;
  }

  if (documentError) {
    return <div className="error">{documentError}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2 className="global-page-title">Edit current student</h2>

      <form onSubmit={handleEditFormSubmit}>
        <label>
          <span>Student ID:</span>
          <input
            required
            type="text"
            onChange={(e) => {
              dispatch({
                type: StudentCreatorBehavior.SetName,
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
                type: StudentCreatorBehavior.SetDetails,
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
            value={state.CurrentGrade}
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
          <span>Benchmark Set:</span>
          <Select
            options={BenchmarkSets}
            onChange={(option) => {
              dispatch({
                type: StudentCreatorBehavior.SetProblemSet,
                payload: { uProblemSet: option },
              });
            }}
            value={state.CurrentProblemSet}
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
        <label>
          <span>Target Aim Line</span>
          <input
            type="number"
            min="0"
            max="80"
            value={state.AimLine}
            onChange={(e) => {
              const value: number | null | undefined = parseInt(e.target.value);
              if (!checkInputNullOrUndefined(value)) {
                dispatch({
                  type: StudentCreatorBehavior.SetAimLine,
                  payload: { uAimLine: e.target.value },
                });
              }
            }}
          />
        </label>
        <label>
          <span>Duration for Task (Minutes; Explicit Timing Only)</span>
          <input
            type="number"
            min="1"
            max="10"
            value={state.ExplicitTime}
            onChange={(e) => {
              const value: number | null | undefined = parseInt(e.target.value);
              if (!checkInputNullOrUndefined(value)) {
                dispatch({
                  type: StudentCreatorBehavior.SetExplicitTime,
                  payload: { uExplicitTime: e.target.value },
                });
              }
            }}
          />
        </label>

        <button className="global-btn ">Edit Student</button>
        {state.FormError && <p className="error">{state.FormError}</p>}
      </form>
      <br></br>
    </div>
  );
}
