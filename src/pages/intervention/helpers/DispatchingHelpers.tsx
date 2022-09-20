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
  InterventionActions,
  SharedActionSequence,
} from "../functionality/InterventionBehavior";
import {
  DispatchUpdateCompleteItem,
  DispatchUpdateField,
  DispatchUpdateIntroduceItem,
  DispatchUpdatePreLoadContent,
  DispatchUpdateRetryItem,
  InterventionState,
} from "../interfaces/InterventionInterfaces";
import { InterventionFormat } from "./../../../maths/Facts";
import { commonKeyHandlerCCC, commonKeyHandlerET } from "./InteractionHelpers";
import { shouldShowFeedback } from "./InterventionHelpers";
import { submitPerformancesToFirebase } from "./InterventionHelpers";

/** completeLoadingDispatch
 *
 * @param param0
 * @returns
 */
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
      dispatch(
        new DispatchUpdatePreLoadContent({
          type: InterventionActions.UpdateWithLoadedData,
          payload: {
            CurrentAction: currentAction,
            WorkingData: workingData,
            LoadedData: true,
            OperatorSymbol: operatorSymbol,
            SecondsLeft: secondsLeft,
          },
        })
      );
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

/** commonKeyHandler
 *
 * @param intervention
 * @param char
 * @param state
 * @param dispatch
 */
export function commonKeyHandler(
  intervention: string,
  char: string,
  state: InterventionState,
  dispatch: any
) {
  switch (intervention) {
    case InterventionFormat.CoverCopyCompare:
      commonKeyHandlerCCC(char, state, dispatch);
      return;
    case InterventionFormat.ExplicitTiming:
      commonKeyHandlerET(char, state, dispatch);
      return;
    case "Benchmark":
      commonKeyHandlerET(char, state, dispatch);
      return;
    default:
      throw Error("No intervention type specified");
  }
}

/** coverCopyCompareSequence
 *
 * @param user
 * @param id
 * @param document
 * @param state
 * @param openModal
 * @param addDocument
 * @param updateDocument
 * @param response
 * @param history
 * @param dispatch
 */
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

  if (
    state.CurrentAction === SharedActionSequence.Entry ||
    state.CurrentAction === SharedActionSequence.Start
  ) {
    dispatch(
      new DispatchUpdateField({
        type: InterventionActions.UpdateFieldPresenation,
        payload: {
          CurrentAction: SharedActionSequence.Begin,
          ButtonText: "Cover",
          CoverStimulusItem: false,
          CoverProblemItem: true,
        },
      })
    );

    return;
  } else if (state.CurrentAction === SharedActionSequence.Begin) {
    dispatch(
      new DispatchUpdateField({
        type: InterventionActions.UpdateFieldPresenation,
        payload: {
          CurrentAction: SharedActionSequence.CoverCopy,
          ButtonText: "Copied",
          CoverStimulusItem: true,
          CoverProblemItem: false,
        },
      })
    );

    return;
  } else if (state.CurrentAction === SharedActionSequence.CoverCopy) {
    dispatch(
      new DispatchUpdateField({
        type: InterventionActions.UpdateFieldPresenation,
        payload: {
          CurrentAction: SharedActionSequence.Compare,
          ButtonText: "Compared",
          CoverStimulusItem: false,
          CoverProblemItem: false,
        },
      })
    );

    return;
  } else {
    dispatch(
      new DispatchUpdateField({
        type: InterventionActions.UpdateFieldPresenation,
        payload: {
          CurrentAction: SharedActionSequence.Entry,
          ToVerify: true,
        },
      })
    );

    quickCheck = true;
  }

  // Fire if ready to check response
  if (state.ToVerify || quickCheck) {
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

      openModal();

      dispatch(
        new DispatchUpdateRetryItem({
          type: InterventionActions.UpdateAttemptErrorRecords,
          payload: {
            CurrentAction: SharedActionSequence.Begin,
            EntryRepresentationInternal: "",
            NumRetries: state.NumRetries + 1,
            NumCorrectInitial: uNumberCorrectInitial,
            NumErrors: uNumberErrors,
            TotalDigits: state.TotalDigits + totalDigitsShown,
            TotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
            NumbTrials: state.NumbTrials + 1,
            PreTrialTime: new Date(),
            OnInitialTry: false,
            CoverStimulusItem: false,
            ToVerify: false,
            ButtonText: "Cover",
            IsOngoing: true,
            CoverProblemItem: true,
            FactModelList: [...state.FactModelList, currentItem2],
          },
        })
      );
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

      // Note: isusue where state change not fast enough to catch latest
      if (state.WorkingData.length === 0) {
        dispatch(
          new DispatchUpdateCompleteItem({
            type: InterventionActions.UpdateAttemptSuccessRecords,
            payload: {
              NumCorrectInitial: uNumberCorrectInitial,
              NumErrors: uNumberErrors,
              NumbTrials: state.NumbTrials + 1,
              TotalDigits: state.TotalDigits + totalDigitsShown,
              TotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
              PreTrialTime: new Date(),
            },
          })
        );

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
        dispatch(
          new DispatchUpdateCompleteItem({
            type: InterventionActions.UpdateAttemptSuccessRecords,
            payload: {
              CoverStimulusItem: true,
              CoverProblemItem: true,
              EntryRepresentationInternal: "",
              ViewRepresentationInternal: "",
              ButtonText: "Cover",
              ShowButton: false,
              IsOngoing: false,
              CoverListViewItems: false,
              OnInitialTry: true,
              FactModelList: [...state.FactModelList, currentItem2],
              CurrentAction: SharedActionSequence.Entry,
              NumCorrectInitial: uNumberCorrectInitial,
              NumErrors: uNumberErrors,
              NumbTrials: state.NumbTrials + 1,
              TotalDigits: state.TotalDigits + totalDigitsShown,
              TotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
              PreTrialTime: new Date(),
            },
          })
        );
      }
    }
  }
}

/** explicitTimingSequence
 *
 * @param user
 * @param id
 * @param document
 * @param state
 * @param openModal
 * @param addDocument
 * @param updateDocument
 * @param response
 * @param history
 * @param dispatch
 * @returns
 */
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
  if (
    state.CurrentAction === SharedActionSequence.Start ||
    state.CurrentAction === SharedActionSequence.Begin
  ) {
    const listItem = state.WorkingData[0];

    const updatedList = state.WorkingData.filter(function (item) {
      return item !== listItem;
    });

    dispatch(
      new DispatchUpdateIntroduceItem({
        type: InterventionActions.UpdateIntroduceNewItem,
        payload: {
          CurrentAction: SharedActionSequence.Answer,
          WorkingData: updatedList,
          ButtonText: "Check",
          CoverProblemItem: false,
          PreTrialTime: new Date(),
          StartTime: state.StartTime === null ? new Date() : state.StartTime,
          EntryRepresentationInternal: "",
          ViewRepresentationInternal: listItem.split(":")[0],
        },
      })
    );

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

    /*
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
    */

    dispatch(
      new DispatchUpdateRetryItem({
        type: InterventionActions.UpdateAttemptErrorRecords,
        payload: {
          NumCorrectInitial: uNumberCorrectInitial,
          NumErrors: uNumberErrors,
          TotalDigits: state.TotalDigits + totalDigitsShown,
          TotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
          NumbTrials: state.NumbTrials + 1,
          PreTrialTime: new Date(),
          FactModelList: [...state.FactModelList, currentItem2],
          EntryRepresentationInternal: "",
          NumRetries: state.NumRetries + 1,
          OnInitialTry: false,
        },
      })
    );

    openModal();

    /*
            dispatch(new DispatchUpdateRetryItem({
              type: 0,
              payload: {
                EntryRepresentationInternal: "",
                NumRetries: state.NumRetries + 1,
                OnInitialTry: false,
              }
            }));
            */
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

    /*
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
    */

    // Note: issue where state change not fast enough to catch latest
    if (state.WorkingData.length === 0) {
      dispatch(
        new DispatchUpdateCompleteItem({
          type: InterventionActions.UpdateAttemptSuccessRecords,
          payload: {
            NumCorrectInitial: uNumberCorrectInitial,
            NumErrors: uNumberErrors,
            NumbTrials: state.NumbTrials + 1,
            TotalDigits: state.TotalDigits + totalDigitsShown,
            TotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
            PreTrialTime: new Date(),
          },
        })
      );

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

      dispatch(
        new DispatchUpdateCompleteItem({
          type: InterventionActions.UpdateAttemptSuccessRecords,
          payload: {
            //CoverStimulusItem: true,
            //CoverProblemItem: true,
            EntryRepresentationInternal: "",
            ViewRepresentationInternal: listItem.split(":")[0],
            //ButtonText: "Cover",
            //ShowButton: false,
            //IsOngoing: false,
            //CoverListViewItems: false,
            OnInitialTry: true,
            FactModelList: [...state.FactModelList, currentItem2],
            WorkingData: updatedList,
            CurrentAction: SharedActionSequence.Entry,
            NumCorrectInitial: uNumberCorrectInitial,
            NumErrors: uNumberErrors,
            NumbTrials: state.NumbTrials + 1,
            TotalDigits: state.TotalDigits + totalDigitsShown,
            TotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
            PreTrialTime: new Date(),
          },
        })
      );

      /*
      dispatch({
        type: InterventionActions.BenchmarkBatchStartIncrementPost,
        payload: {
          uFactModel: [...state.FactModelList, currentItem2],
          uWorkingData: updatedList,
          uView: listItem.split(":")[0],
          uEntry: "",
        },
      });
      */
    }
  }
}
