/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import {
  CalculateDigitsCorrect,
  CalculateDigitsCorrectAnswer,
  CalculateDigitsTotalAnswer,
} from "../../../utilities/LabelHelper";
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import {
  DelCode,
  InterventionActions,
  SharedActionSequence,
} from "../functionality/InterventionBehavior";
import {
  DispatchUpdateEntryInternal,
  DispatchUpdatePreLoadContent,
  InterventionState,
} from "../interfaces/InterventionInterfaces";
import { InterventionFormat, RelevantKeys } from "./../../../maths/Facts";
import {
  sharedButtonActionSequence,
  shouldShowFeedback,
} from "./InterventionHelpers";
import { submitPerformancesToFirebase } from "./InterventionHelpers";

export function completeLoadingDispatch({
  intervention,
  currentAction = SharedActionSequence.Start,
  workingData,
  operatorSymbol,
  secondsLeft = 120,
  dispatch,
}: {
  intervention: string;
  currentAction?: SharedActionSequence;
  workingData: string[];
  operatorSymbol: string;
  secondsLeft?: number;
  dispatch: (value: any) => void;
}) {
  let dispatchObject;

  switch (intervention) {
    case "Benchmark":
      dispatchObject = new DispatchUpdatePreLoadContent({
        type: InterventionActions.UpdateWithLoadedData,
        payload: {
          CurrentAction: currentAction,
          WorkingData: workingData,
          LoadedData: true,
          OperatorSymbol: operatorSymbol,
          SecondsLeft: secondsLeft,
        },
      });

      dispatch(dispatchObject);
      return;

    case InterventionFormat.CoverCopyCompare:
      dispatchObject = new DispatchUpdatePreLoadContent({
        type: InterventionActions.UpdateWithLoadedData,
        payload: {
          CurrentAction: currentAction,
          WorkingData: workingData,
          LoadedData: true,
          OperatorSymbol: operatorSymbol,
          SecondsLeft: secondsLeft,
        },
      });

      dispatch(dispatchObject);
      return;

    case InterventionFormat.ExplicitTiming:
      dispatchObject = new DispatchUpdatePreLoadContent({
        type: InterventionActions.UpdateWithLoadedData,
        payload: {
          CurrentAction: currentAction,
          WorkingData: workingData,
          LoadedData: true,
          OperatorSymbol: operatorSymbol,
          SecondsLeft: secondsLeft,
        },
      });

      dispatch(dispatchObject);
      return;

    default:
      return;
  }
}

export function commonKeyHandler(
  intervention: string,
  char: string,
  state: InterventionState,
  dispatch: any
) {
  if (intervention === InterventionFormat.CoverCopyCompare) {
    commonKeyHandlerCCC(intervention, char, state, dispatch);
  } else {
    commonKeyHandlerET(intervention, char, state, dispatch);
  }
}

function commonKeyHandlerCCC(
  intervention: string,
  char: string,
  state: InterventionState,
  dispatch: any
) {
  // Rule 1: Exit out if not in Covered/Copying sequence
  if (state.CurrentAction !== SharedActionSequence.CoverCopy) return;

  // Rule 2: Exit out if multiple operators
  if (
    char === state.OperatorSymbol &&
    state.EntryRepresentationInternal.includes(state.OperatorSymbol)
  )
    return;

  // Rule 3: Like #2, but no multiple equals sign
  if (char === "=" && state.EntryRepresentationInternal.includes("=")) return;

  // Rule #4: No '=' before an operator
  if (
    char === "=" &&
    !state.EntryRepresentationInternal.includes(state.OperatorSymbol)
  )
    return;

  // Rule #5/#6: No '=', before an digit AFTER operator
  if (
    char === "=" &&
    state.EntryRepresentationInternal.includes(state.OperatorSymbol)
  ) {
    const problemParts = state.EntryRepresentationInternal.split(
      state.OperatorSymbol
    );

    // Rule #5: If just 1 part, disregard (i.e., no operator)
    if (problemParts.length <= 1) return;

    // Rule #6: If first is just whitespace, disregard (i.e., JUST operator)
    if (problemParts[1].trim().length === 0) return;
  }

  if (char === DelCode) {
    // # Rule #7: Exit out if nothin to delete
    if (state.EntryRepresentationInternal.length === 0) return;

    // Lop off end of string
    dispatch(
      new DispatchUpdateEntryInternal({
        type: InterventionActions.UpdateResponseEntry,
        payload: {
          EntryRepresentationInternal: state.EntryRepresentationInternal.slice(
            0,
            -1
          ),
        },
      })
    );
  } else {
    // Add to end of string
    dispatch(
      new DispatchUpdateEntryInternal({
        type: InterventionActions.UpdateResponseEntry,
        payload: {
          EntryRepresentationInternal: state.EntryRepresentationInternal + char,
        },
      })
    );
  }
}

function commonKeyHandlerET(
  intervention: string,
  char: string,
  state: InterventionState,
  dispatch: any
) {
  if (char === DelCode) {
    // # Rule #7: Exit out if nothin to delete
    if (state.EntryRepresentationInternal.length === 0) return;

    // Lop off end of string
    dispatch(
      new DispatchUpdateEntryInternal({
        type: InterventionActions.UpdateResponseEntry,
        payload: {
          EntryRepresentationInternal: state.EntryRepresentationInternal.slice(
            0,
            -1
          ),
        },
      })
    );
  } else {
    // Add to end of string
    dispatch(
      new DispatchUpdateEntryInternal({
        type: InterventionActions.UpdateResponseEntry,
        payload: {
          EntryRepresentationInternal: state.EntryRepresentationInternal + char,
        },
      })
    );
  }
}

export function commonKeyListener(
  key: React.KeyboardEvent<HTMLElement>,
  state: InterventionState,
  currentApproach: string,
  captureButtonAction: () => void | null,
  checkLiNullUndefinedBlank: any,
  captureItemClick: any,
  user: firebase.User | null,
  id: string,
  document: StudentDataInterface | null,
  openModal: any,
  addDocument: any,
  updateDocument: any,
  response: any,
  history: any,
  dispatch: any
) {
  if (currentApproach === InterventionFormat.CoverCopyCompare) {
    if (RelevantKeys.includes(key.key)) {
      let modKey = key.key === "Backspace" ? "Del" : key.key;
      modKey = key.key === "Delete" ? "Del" : modKey;

      if (modKey === " ") {
        if (
          state.CurrentAction !== SharedActionSequence.Entry &&
          state.CurrentAction !== SharedActionSequence.Start
        ) {
          sharedButtonActionSequence(
            user,
            id,
            currentApproach,
            document,
            state,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch
          );

          return;
        }

        if (!checkLiNullUndefinedBlank(state.NextLiItem)) {
          captureItemClick(state.NextLiItem);
        }

        return;
      }

      modKey = key.key === "*" ? "x" : modKey;
      modKey = key.key === "Enter" ? "=" : modKey;

      commonKeyHandler(currentApproach, modKey, state, dispatch);
    }
  } else {
    if (RelevantKeys.includes(key.key)) {
      let modKey = key.key === "Backspace" ? "Del" : key.key;
      modKey = key.key === "Delete" ? "Del" : modKey;

      if (modKey === " ") {
        if (
          state.CurrentAction !== SharedActionSequence.Entry &&
          state.CurrentAction !== SharedActionSequence.Start
        ) {
          () => captureButtonAction();
          return;
        }

        if (currentApproach === InterventionFormat.CoverCopyCompare) {
          if (!checkLiNullUndefinedBlank(state.NextLiItem)) {
            captureItemClick(state.NextLiItem);
          }
        }

        return;
      }

      modKey = key.key === "*" ? "x" : modKey;
      modKey = key.key === "Enter" ? "=" : modKey;

      commonKeyHandler(currentApproach, modKey, state, dispatch);
    }
  }
}

export function coverCopyCompareSequence(
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

export function explicitTimingSequence(
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
  if (document === null || user === null) {
    throw Error("Document or user is null");
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
