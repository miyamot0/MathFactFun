/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { SingleOptionType } from "../../../types/SharedComponentTypes";
import {
  checkInputNullOrUndefined,
  streamlinedCheck,
} from "../../../utilities/FormHelpers";
import {
  StudentCreateState,
  StudentDataInterface,
} from "../interfaces/StudentInterfaces";
import { StudentCreatorBehavior } from "../types/StudentTypes";
import { timestamp } from "../../../firebase/config";
import { UserDataInterface } from "../../user/types/UserTypes";
import { PerformanceDataInterface } from "../../intervention/types/InterventionTypes";
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import {
  BenchmarkSets,
  Contingencies,
  ErrorCorrection,
  Grades,
  InterventionApproach,
  Operations,
} from "../../../maths/Facts";
import { formatDate } from "../../../utilities/LabelHelper";

/** verifySingleStudentCreate
 *
 * @param user
 * @param state
 * @param history
 * @param addDocument
 * @param response
 * @param dispatch
 * @returns
 */
export async function verifySingleStudentCreate(
  user: firebase.User | null,
  state: StudentCreateState,
  history: any,
  addDocument: (
    doc: StudentDataInterface | UserDataInterface | PerformanceDataInterface
  ) => Promise<void>,
  response: FirestoreState,
  dispatch: any
) {
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

/** verifySingleStudentEdit
 *
 * @param id
 * @param state
 * @param document
 * @param history
 * @param updateDocument
 * @param response
 * @param dispatch
 * @returns
 */
export async function verifySingleStudentEdit(
  id: string | undefined,
  state: StudentCreateState,
  document: StudentDataInterface,
  history: any,
  updateDocument: (id: string, updates: any) => Promise<void>,
  response: FirestoreState,
  dispatch: any
) {
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
}

/** onLoadSingleStudentEdit
 *
 * @param document
 * @param dispatch
 */
export function onLoadSingleStudentEdit(
  document: StudentDataInterface,
  dispatch: any
) {
  dispatch({
    type: StudentCreatorBehavior.SetBuilt,
    payload: {
      uDidBuild: true,
    },
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
      uDueDate: formatDate(document.dueDate.toDate()),
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
