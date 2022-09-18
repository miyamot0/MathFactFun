/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { useEffect, useRef } from "react";
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import {
  ErrorHandling,
  InterventionFormat,
  RelevantKeys,
} from "../../../maths/Facts";
import { FactsOnFire } from "../../../maths/Mind";
import {
  CalculateDigitsCorrect,
  CalculateDigitsCorrectAnswer,
  CalculateDigitsTotalAnswer,
  GetOperatorFromLabel,
} from "../../../utilities/LabelHelper";
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import {
  InterventionActions,
  SharedActionSequence,
} from "../functionality/InterventionBehavior";
import {
  InterventionState,
  PerformanceDataInterface,
} from "../interfaces/InterventionInterfaces";

/** DetermineErrorCorrection
 *
 * Disable sidebar if on practice/intervention screen
 *
 * @param {String} address
 * @returns {Bool} does address fit exclusion
 */
export function DetermineErrorCorrection(
  hasError: boolean,
  setting: string
): boolean {
  // Incorrect, show every time
  if (setting === ErrorHandling.Never) {
    return false;
  }

  // Incorrect, show every time
  if (hasError && setting === ErrorHandling.EveryTime) {
    return true;
  }

  return false;
}

/** shouldShowFeedback
 *
 * Handle branching logic for error message
 *
 * @param {boolean} trialError was there an error?
 * @param {StudentDataInterface} document student doc
 * @returns {boolean}
 */
export function shouldShowFeedback(
  trialError: boolean,
  document: StudentDataInterface
): boolean {
  return DetermineErrorCorrection(trialError, document.currentErrorApproach);
}

/** checkLiNullUndefinedBlank
 *
 * @param {string} str
 * @returns {boolean}
 */
export function checkLiNullUndefinedBlank(str: string): boolean {
  return str === null || str === undefined || str.trim().length === 0;
}

/** getCoreProblemSet
 *
 * Pull to appropriate problem type from MIND
 *
 * @param {string} target target for probes
 * @returns {string[][]}
 */
export function getCoreProblemSet(target: string): string[][] {
  switch (target) {
    case "Addition":
      return FactsOnFire.Addition;
    case "Subtraction":
      return FactsOnFire.Subtraction;
    case "Division":
      return FactsOnFire.Division;
    case "Multiplication":
      return FactsOnFire.Multiplication;
    default:
      throw Error("Target for problem set missing");
  }
}

/** getSetFromArray
 *
 * Pull the appropriate subset of problems from MIND
 *
 * @param {string[][]} array mass array of MIND problem sets
 * @param {string} set set tag
 * @returns {string[]}
 */
export function getSetFromArray(array: string[][], set: string): string[] {
  let start = 0;
  let end = 5;

  if (set === "B") {
    start = 6;
    end = 11;
  }

  if (set === "C") {
    start = 12;
    end = 17;
  }

  const problems: string[][] = array.slice(start, end);

  return problems.reduce(
    (accumulator, value) => accumulator.concat(value),
    [] as string[]
  );
}

/** getUniqueProblems
 *
 * Filter out reciprocals, per BP
 *
 * @param {string[]} arrayProblems array of problems
 * @param {string} operatorSymbol operator symbol, for parsing
 * @returns {string[]}
 */
export function getUniqueProblems(
  arrayProblems: string[],
  operatorSymbol: string
): string[] {
  const firstWave = [...new Set(arrayProblems)];
  let secondWave = [...new Set(arrayProblems)];

  const probsToRemove: string[] = [];

  // First as truth
  firstWave.forEach((problem) => {
    const probA = problem.split("=")[0];

    // Two nums
    const numsA = probA.split(operatorSymbol);

    if (probsToRemove.includes(problem)) return;

    secondWave.forEach((otherProblem) => {
      // Skip matching conditions
      if (problem === otherProblem) return;

      const probB = otherProblem.split("=")[0];
      const numsB = probB.split(operatorSymbol);

      // its a reciprocal
      if (numsA[0] === numsB[1] && numsA[1] === numsB[0]) {
        probsToRemove.push(otherProblem);
      }
    });
  });

  secondWave = secondWave.filter((value) => !probsToRemove.includes(value));

  return secondWave;
}

/** loadWorkingDataBenchmark
 *
 * @param {StudentDataInterface} document
 * @param {string} target
 * @returns {string[]}
 */
export function loadWorkingDataBenchmark(
  document: StudentDataInterface,
  target: string
): string[] {
  const targetTrim = target.split("-")[0];
  const coreItems = getCoreProblemSet(targetTrim);
  const coreSet = getSetFromArray(coreItems, document.problemSet);

  return getUniqueProblems(coreSet, GetOperatorFromLabel(targetTrim));
}

/** useEventListener
 *
 * listener for events
 *
 * @param {string} eventName ...
 * @param {(key: React.KeyboardEvent<HTMLElement>) => void} handler ...
 * @param {Window} element ...
 */
export function useEventListener(
  eventName: string,
  handler: (key: React.KeyboardEvent<HTMLElement>) => void,
  element: Window = window
): void {
  const savedHandler = useRef({});
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = (event: any) => {
        if (typeof savedHandler.current === "function") {
          savedHandler.current(event);
        }
      };

      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

// TODO: remove once getting into TP

/** keyHandler
 *
 * Handle keyboard input
 *
 * @param {React.KeyboardEvent<HTMLElement>} key keyevent
 */
export function keyHandler(
  key: React.KeyboardEvent<HTMLElement>,
  captureKeyClick2: (char: string) => void,
  captureButtonAction2: () => void,
  currentAction: string
): void {
  if (key.key === "Enter") return;

  if (RelevantKeys.includes(key.key)) {
    let modKey = key.key === "Backspace" ? "Del" : key.key;
    modKey = key.key === "Delete" ? "Del" : modKey;

    if (modKey === " ") {
      if (
        currentAction !== SharedActionSequence.Entry &&
        currentAction !== SharedActionSequence.Start
      ) {
        () => captureButtonAction2();
        return;
      }

      return;
    }

    captureKeyClick2(modKey);
  }
}

/** submitPerformancesToFirebase
 *
 * @param param0
 * @returns
 */
export async function submitPerformancesToFirebase({
  user,
  id,
  interventionFormat,
  finalFactObject,
  document,
  state,
  response,
  addDocument,
  updateDocument,
  history,
}: {
  user: firebase.User | null;
  id: string | null;
  interventionFormat: string;
  finalFactObject: FactDataInterface | null;
  document: StudentDataInterface | null;
  state: InterventionState;
  response: FirestoreState;
  addDocument: (doc: PerformanceDataInterface) => Promise<void>;
  updateDocument: (id: string, updates: any) => Promise<void>;
  history: any;
}) {
  const finalEntries = state.FactModelList;

  if (!state.StartTime || !user || !document || !id) {
    return;
  }

  if (finalFactObject !== null) {
    finalEntries?.push(finalFactObject);
  }

  const end = new Date();

  const uploadObject = {
    correctDigits: state.TotalDigitsCorrect,
    errCount: state.NumErrors,
    nCorrectInitial: state.NumCorrectInitial,
    nRetries: state.NumRetries,
    sessionDuration: (end.getTime() - state.StartTime.getTime()) / 1000,
    setSize: document.factsTargeted.length,
    totalDigits: state.TotalDigits,
    entries: finalEntries.map((entry) => Object.assign({}, entry)),
    id: document.id,
    creator: user.uid,
    target: document.currentTarget,
    method: interventionFormat,
    dateTimeEnd: end.toString(),
    dateTimeStart: state.StartTime.toString(),
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  };

  await addDocument(uploadObject);

  // If added without issue, update timestamp
  if (!response.error) {
    const currentDate = new Date();
    const studentObject = {
      lastActivity: firebase.firestore.Timestamp.fromDate(currentDate),
    };

    // Update field regarding last activity
    await updateDocument(id, studentObject);

    // Push to home
    if (!response.error) {
      history.push(`/practice`);
    }
  }
}

export function sharedButtonActionSequence(
  user: firebase.User | null,
  id: string,
  approach: string,
  document: StudentDataInterface | null,
  state: InterventionState,
  openModal: any,
  addDocument: any,
  updateDocument: any,
  response: any,
  history: any,
  dispatch: any
): void {
  if (document === null || user === null) {
    return;
  }

  if (approach === InterventionFormat.CoverCopyCompare) {
    coverCopyCompareSequence(
      user,
      id,
      document,
      state,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch
    );
  } else {
    explicitTimingSequence(
      user,
      id,
      document,
      state,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch
    );
  }
}

function coverCopyCompareSequence(
  user: firebase.User,
  id: string,
  document: StudentDataInterface,
  state: InterventionState,
  openModal: any,
  addDocument: any,
  updateDocument: any,
  response: any,
  history: any,
  dispatch: any
) {
  // HACK: need a flag for update w/o waiting for state change
  let quickCheck = false;

  console.log(`in seq: ${state.CurrentAction}`);

  if (
    state.CurrentAction === SharedActionSequence.Entry ||
    state.CurrentAction === SharedActionSequence.Start
  ) {
    dispatch({
      type: InterventionActions.CoverCopyCompareTaskIncrement,
      payload: {
        uAction: SharedActionSequence.Begin,
        uButtonText: "Cover",
        uCoverStimulusItem: false,
        uCoverProblemItem: true,
      },
    });
  } else if (state.CurrentAction === SharedActionSequence.Begin) {
    dispatch({
      type: InterventionActions.CoverCopyCompareTaskIncrement,
      payload: {
        uAction: SharedActionSequence.CoverCopy,
        uButtonText: "Copied",
        uCoverStimulusItem: true,
        uCoverProblemItem: false,
      },
    });
  } else if (state.CurrentAction === SharedActionSequence.CoverCopy) {
    dispatch({
      type: InterventionActions.CoverCopyCompareTaskIncrement,
      payload: {
        uAction: SharedActionSequence.Compare,
        uButtonText: "Compared",
        uCoverStimulusItem: false,
        uCoverProblemItem: false,
      },
    });
  } else {
    dispatch({
      type: InterventionActions.CoverCopyCompareTaskReset,
      payload: {
        uAction: SharedActionSequence.Entry,
        uVerify: true,
      },
    });

    quickCheck = true;
  }

  // Fire if ready to check response
  if (state.ToVerify || quickCheck) {
    dispatch({
      type: InterventionActions.CoverCopyCompareTaskReset,
      payload: {
        uAction: state.CurrentAction,
        uVerify: false,
      },
    });

    // Compare if internal and inputted string match
    const isMatching =
      state.ViewRepresentationInternal.trim() ===
      state.EntryRepresentationInternal.trim();

    let uNumberCorrectInitial = state.NumCorrectInitial;
    let uNumberErrors = state.NumErrors;

    // Increment initial attempt, if correct
    if (state.OnInitialTry && isMatching) {
      uNumberCorrectInitial = uNumberCorrectInitial + 1;
    }

    // Increment errors, if incorrect
    if (!isMatching) {
      uNumberErrors = state.NumErrors + 1;
    }

    const current = new Date();
    const secs = (current.getTime() - state.PreTrialTime.getTime()) / 1000;

    const holderPreTime = state.PreTrialTime;

    if (shouldShowFeedback(!isMatching, document)) {
      // Error correction prompt

      const totalDigitsShown = CalculateDigitsTotalAnswer(
        state.ViewRepresentationInternal
      );

      const totalDigitsCorrect = CalculateDigitsCorrect(
        state.EntryRepresentationInternal,
        state.ViewRepresentationInternal,
        state.OperatorSymbol
      );

      const currentItem2: FactDataInterface = {
        factCorrect: isMatching,
        initialTry: state.OnInitialTry,
        factType: document.currentTarget,
        factString: state.ViewRepresentationInternal,
        factEntry: state.EntryRepresentationInternal,
        latencySeconds: secs,
        dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date(current)),
        dateTimeStart: firebase.firestore.Timestamp.fromDate(
          new Date(holderPreTime)
        ),
      };

      dispatch({
        type: InterventionActions.CoverCopyCompareBatchIncrement,
        payload: {
          uNumberCorrectInitial,
          uNumberErrors,
          uTotalDigits: state.TotalDigits + totalDigitsShown,
          uTotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
          uNumberTrials: state.NumbTrials + 1,
          uInitialTry: state.OnInitialTry,
          uTrialTime: new Date(),
        },
      });

      dispatch({
        type: InterventionActions.CoverCopyCompareModalPreErrorLog,
        payload: {
          uFactModel: [...state.FactModelList, currentItem2],
        },
      });

      openModal();
    } else {
      const totalDigitsShown = CalculateDigitsTotalAnswer(
        state.ViewRepresentationInternal
      );

      const totalDigitsCorrect = CalculateDigitsCorrect(
        state.EntryRepresentationInternal,
        state.ViewRepresentationInternal,
        state.OperatorSymbol
      );

      const currentItem2: FactDataInterface = {
        factCorrect: isMatching,
        initialTry: state.OnInitialTry,
        factType: document.currentTarget,
        factString: state.ViewRepresentationInternal,
        factEntry: state.EntryRepresentationInternal,
        latencySeconds: secs,
        dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date(current)),
        dateTimeStart: firebase.firestore.Timestamp.fromDate(
          new Date(holderPreTime)
        ),
      };

      dispatch({
        type: InterventionActions.CoverCopyCompareBatchIncrement,
        payload: {
          uNumberCorrectInitial,
          uNumberErrors,
          uTotalDigits: state.TotalDigits + totalDigitsShown,
          uTotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
          uNumberTrials: state.NumbTrials + 1,
          uInitialTry: state.OnInitialTry,
          uTrialTime: new Date(),
        },
      });

      // Note: isusue where state change not fast enough to catch latest
      if (state.WorkingData.length === 0) {
        submitPerformancesToFirebase({
          user,
          id,
          interventionFormat: InterventionFormat.CoverCopyCompare,
          finalFactObject: currentItem2,
          document,

          state,
          response,
          addDocument,
          updateDocument,
          history,
        });
      } else {
        dispatch({
          type: InterventionActions.CoverCopyCompareBatchStartIncrementPost,
          payload: {
            uCoverStimulusItem: true,
            uCoverProblemItem: true,
            uEntryRepresentationInternal: "",
            uViewRepresentationInternal: "",
            uButtonText: "Cover",
            uShowButton: false,
            uIsOngoing: false,
            uCoverListViewItems: false,
            uOnInitialTry: true,
            uFactModelList: [...state.FactModelList, currentItem2],
            uCurrentAction: SharedActionSequence.Entry,
          },
        });
      }
    }
  }
}

function explicitTimingSequence(
  user: firebase.User,
  id: string,
  document: StudentDataInterface,
  state: InterventionState,
  openModal: any,
  addDocument: any,
  updateDocument: any,
  response: any,
  history: any,
  dispatch: any
) {
  if (document === null) {
    return;
  }

  if (
    state.CurrentAction === SharedActionSequence.Start ||
    state.CurrentAction === SharedActionSequence.Begin
  ) {
    const listItem = state.WorkingData[0];

    const updatedList = state.WorkingData.filter(function (item) {
      return item !== listItem;
    });

    dispatch({
      type: InterventionActions.BenchmarkBatchStartBegin,
      payload: {
        ButtonText: "Check",
        CoverProblem: false,
        UpdateEntry: "",
        UpdateView: listItem.split(":")[0],
        WorkingData: updatedList,
        StartTime: state.StartTime === null ? new Date() : state.StartTime,
        TrialTime: new Date(),
        CurrentAction: SharedActionSequence.Answer,
      },
    });

    return;
  }

  const combinedResponse =
    state.ViewRepresentationInternal.split("=")[0] +
    "=" +
    state.EntryRepresentationInternal;

  // Compare if internal and inputted string match
  const isMatching =
    state.ViewRepresentationInternal.trim() === combinedResponse.trim();

  let uNumberCorrectInitial = state.NumCorrectInitial;
  let uNumberErrors = state.NumErrors;

  // Increment initial attempt, if correct
  if (state.OnInitialTry && isMatching) {
    uNumberCorrectInitial = uNumberCorrectInitial + 1;
  }

  // Increment errors, if incorrect
  if (!isMatching) {
    uNumberErrors = state.NumErrors + 1;
  }

  const current = new Date();
  const secs = (current.getTime() - state.PreTrialTime.getTime()) / 1000;

  const holderPreTime = state.PreTrialTime;

  if (shouldShowFeedback(!isMatching, document)) {
    const totalDigitsShown = CalculateDigitsTotalAnswer(
      state.ViewRepresentationInternal
    );

    const totalDigitsCorrect = CalculateDigitsCorrectAnswer(
      combinedResponse,
      state.ViewRepresentationInternal
    );

    const currentItem2: FactDataInterface = {
      factCorrect: isMatching,
      initialTry: state.OnInitialTry,
      factType: document.currentTarget,
      factString: state.ViewRepresentationInternal,
      factEntry: combinedResponse,
      latencySeconds: secs,
      dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date(current)),
      dateTimeStart: firebase.firestore.Timestamp.fromDate(
        new Date(holderPreTime)
      ),
    };

    dispatch({
      type: InterventionActions.ExplicitTimingBatchIncrement,
      payload: {
        uNumberCorrectInitial,
        uNumberErrors,
        uTotalDigits: state.TotalDigits + totalDigitsShown,
        uTotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
        uNumberTrials: state.NumbTrials + 1,
        uInitialTry: state.OnInitialTry,
        uTrialTime: new Date(),
      },
    });

    dispatch({
      type: InterventionActions.ExplicitTimingModalPreErrorLog,
      payload: {
        uFactModel: [...state.FactModelList, currentItem2],
      },
    });

    openModal();
  } else {
    const totalDigitsShown = CalculateDigitsTotalAnswer(
      state.ViewRepresentationInternal
    );

    const totalDigitsCorrect = CalculateDigitsCorrectAnswer(
      combinedResponse,
      state.ViewRepresentationInternal
    );

    const currentItem2: FactDataInterface = {
      factCorrect: isMatching,
      initialTry: state.OnInitialTry,
      factType: document.currentTarget,
      factString: state.ViewRepresentationInternal,
      factEntry: combinedResponse,
      latencySeconds: secs,
      dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date(current)),
      dateTimeStart: firebase.firestore.Timestamp.fromDate(
        new Date(holderPreTime)
      ),
    };

    dispatch({
      type: InterventionActions.ExplicitTimingBatchIncrement,
      payload: {
        uNumberCorrectInitial,
        uNumberErrors,
        uTotalDigits: state.TotalDigits + totalDigitsShown,
        uTotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
        uNumberTrials: state.NumbTrials + 1,
        uInitialTry: state.OnInitialTry,
        uTrialTime: new Date(),
      },
    });

    // Note: issue where state change not fast enough to catch latest
    if (state.WorkingData.length === 0) {
      submitPerformancesToFirebase({
        user,
        id,
        interventionFormat: InterventionFormat.CoverCopyCompare,
        finalFactObject: currentItem2,
        document,

        state,
        response,
        addDocument,
        updateDocument,
        history,
      });
    } else {
      const listItem = state.WorkingData[0];
      const updatedList = state.WorkingData.filter(function (item) {
        return item !== listItem;
      });

      dispatch({
        type: InterventionActions.BenchmarkBatchStartIncrementPost,
        payload: {
          uFactModel: [...state.FactModelList, currentItem2],
          uWorkingData: updatedList,
          uView: listItem.split(":")[0],
          uEntry: "",
        },
      });
    }
  }
}
