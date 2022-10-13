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
  StudentDispatchUpdateDidBuild,
  StudentDispatchUpdateFormError,
  StudentDispatchUpdateStudentLoaded,
} from "../interfaces/StudentInterfaces";
import { StudentActionObject, StudentCreatorBehavior } from "../types/StudentTypes";
import { UserDataInterface } from "../../user/types/UserTypes";
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
import { CommentInterface } from "../subcomponents/types/CommentTypes";
import { PerformanceDataInterface } from "../../intervention/interfaces/InterventionInterfaces";

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

  dispatch(new StudentDispatchUpdateFormError({
    type: StudentCreatorBehavior.SetFormError,
    payload: {
      FormError: undefined
    }
  }));

  if (
    streamlinedCheck(
      state.CurrentGrade,
      StudentCreatorBehavior.SetFormError,
      "Please select current grade",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentTarget,
      StudentCreatorBehavior.SetFormError,
      "Please select a target",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentApproach,
      StudentCreatorBehavior.SetFormError,
      "Please select an intervention approach",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentErrorApproach,
      StudentCreatorBehavior.SetFormError,
      "Please select an error correct approach",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentSRApproach,
      StudentCreatorBehavior.SetFormError,
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
    dispatch(new StudentDispatchUpdateFormError({
      type: StudentCreatorBehavior.SetFormError,
      payload: {
        FormError: "Please select benchmarking options"
      }
    }));

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
    dueDate: firebase.firestore.Timestamp.fromDate(new Date(state.DueDate)),
    lastActivity: firebase.firestore.Timestamp.fromDate(laggedDate),
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),

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

    tutorialBenchmark: state.TutorialBenchmark,
    tutorialCCC: state.TutorialCCC,
    tutorialET: state.TutorialET
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
  if (document === null || id === undefined || id === null) {
    return;
  }

  dispatch(new StudentDispatchUpdateFormError({
    type: StudentCreatorBehavior.SetFormError,
    payload: {
      FormError: undefined
    }
  }));

  if (
    streamlinedCheck(
      state.CurrentGrade,
      StudentCreatorBehavior.SetFormError,
      "Please select current grade",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentTarget,
      StudentCreatorBehavior.SetFormError,
      "Please select a target",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentApproach,
      StudentCreatorBehavior.SetFormError,
      "Please select an intervention approach",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentErrorApproach,
      StudentCreatorBehavior.SetFormError,
      "Please select an error correct approach",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentSRApproach,
      StudentCreatorBehavior.SetFormError,
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
    dispatch(new StudentDispatchUpdateFormError({
      type: StudentCreatorBehavior.SetFormError,
      payload: {
        FormError: "Please select benchmarking options"
      }
    }));

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
    dueDate: firebase.firestore.Timestamp.fromDate(date),
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
  dispatch(new StudentDispatchUpdateDidBuild({
    type: StudentCreatorBehavior.SetBuilt,
    payload: {
      DidBuild: true
    }
  }))

  const CurrentTarget = Operations.find(
    (obj) => obj.value === document.currentTarget
  ) as SingleOptionType;

  const CurrentBenchmarking = Operations.filter((obj) =>
    document.currentBenchmarking.includes(obj.label)
  );

  const CurrentProblemSet = BenchmarkSets.find(
    (obj) => obj.value === document.problemSet
  ) as SingleOptionType;
  const CurrentGrade = Grades.find(
    (obj) => obj.value === document.currentGrade
  ) as SingleOptionType;
  const CurrentApproach = InterventionApproach.find(
    (obj) => obj.value === document.currentApproach
  ) as SingleOptionType;
  const CurrentErrorApproach = ErrorCorrection.find(
    (obj) => obj.value === document.currentErrorApproach
  ) as SingleOptionType;
  const CurrentSRApproach = Contingencies.find(
    (obj) => obj.value === document.currentSRApproach
  ) as SingleOptionType;

  const tutorialBenchmark = document.tutorialBenchmark;
  const tutorialCCC = document.tutorialCCC;
  const tutorialET = document.tutorialET;

  dispatch(new StudentDispatchUpdateStudentLoaded({
    type: StudentCreatorBehavior.SetLoadedStudent,
    payload: {
      Name: document.name,
      Details: document.details,
      DueDate: formatDate({ date: document.dueDate.toDate() }),
      AimLine: document.aimLine,
      ExplicitTime: document.minForTask,
      CurrentTarget,
      CurrentGrade,
      CurrentApproach,
      CurrentErrorApproach,
      CurrentSRApproach,
      CurrentBenchmarking,
      CurrentProblemSet,
      TutorialBenchmark: tutorialBenchmark,
      TutorialCCC: tutorialCCC,
      TutorialET: tutorialET,
    },
  }))
}

/** verifyBulkStudentCreate
 *
 * @param id
 * @param state
 * @param history
 * @param addDocument
 * @param response
 * @param dispatch
 * @returns
 */
export async function verifyBulkStudentCreate(
  id: string,
  state: StudentCreateState,
  history: any,
  addDocument: (
    doc: StudentDataInterface | UserDataInterface | PerformanceDataInterface
  ) => Promise<void>,
  response: FirestoreState,
  dispatch: React.Dispatch<StudentActionObject>
) {
  dispatch({
    type: StudentCreatorBehavior.SetFormError,
    payload: undefined,
  });

  if (
    streamlinedCheck(
      state.CurrentGrade,
      StudentCreatorBehavior.SetFormError,
      "Please select current grade",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentTarget,
      StudentCreatorBehavior.SetFormError,
      "Please select a target",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentApproach,
      StudentCreatorBehavior.SetFormError,
      "Please select an intervention approach",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentErrorApproach,
      StudentCreatorBehavior.SetFormError,
      "Please select an error correct approach",
      dispatch
    )
  ) {
    return;
  }

  if (
    streamlinedCheck(
      state.CurrentSRApproach,
      StudentCreatorBehavior.SetFormError,
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
      dueDate: firebase.firestore.Timestamp.fromDate(new Date(state.DueDate)),
      lastActivity: firebase.firestore.Timestamp.fromDate(laggedDate),
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      comments,
      factsTargeted,
      factsMastered,
      factsSkipped,
      aimLine,
      minForTask,
      problemSet: "A",
      id: null,

      tutorialBenchmark: false,
      tutorialCCC: false,
      tutorialET: false
    } as StudentDataInterface;

    await addDocument(studentObject);
  }

  if (!response.error || response.success === true) {
    history.push(`/dashboard`);
  } else {
    alert(response.error);
  }
}
