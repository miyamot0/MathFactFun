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
import { developmentConsoleLog } from "../../../utilities/LoggingTools";
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
        payload: {
          CurrentAction: currentAction,
          WorkingData: workingData,
          LoadedData: true,
          OperatorSymbol: operatorSymbol,
          SecondsLeft: secondsLeft,
          ShowButton: true,
        },
      });

      dispatch(dispatchObject);
      return;

    case InterventionFormat.CoverCopyCompare:
      dispatch(
        new DispatchUpdatePreLoadContent({
          payload: {
            CurrentAction: currentAction,
            WorkingData: workingData,
            LoadedData: true,
            OperatorSymbol: operatorSymbol,
            SecondsLeft: secondsLeft,
            ShowButton: false,
          },
        })
      );
      return;

    case InterventionFormat.ExplicitTiming:
      dispatchObject = new DispatchUpdatePreLoadContent({
        payload: {
          CurrentAction: currentAction,
          WorkingData: workingData,
          LoadedData: true,
          OperatorSymbol: operatorSymbol,
          SecondsLeft: secondsLeft,
          ShowButton: true,
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
  developmentConsoleLog(
    `commonKeyHandler(intervention: ${intervention}, char: ${char}, state: ${state}, dispatch: ${dispatch})`
  );

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
 * @param target
 * @param document
 * @param state
 * @param approach
 * @param openModal
 * @param addDocument
 * @param updateDocument
 * @param response
 * @param history
 * @param dispatch
 * @returns
 */
export function coverCopyCompareSequence(
  user: firebase.User,
  id: string,
  target: string,
  document: StudentDataInterface,
  state: InterventionState,
  approach: string,
  openModal: any,
  addDocument: any,
  updateDocument: any,
  response: any,
  history: any,
  dispatch: any
) {
  if (
    state.CurrentAction === SharedActionSequence.Entry ||
    state.CurrentAction === SharedActionSequence.Start
  ) {
    dispatch(
      new DispatchUpdateField({
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
        payload: {
          CurrentAction: SharedActionSequence.Entry,
          ToVerify: true,
        },
      })
    );

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
            payload: {
              NumCorrectInitial: uNumberCorrectInitial,
              NumErrors: uNumberErrors,
              NumbTrials: state.NumbTrials + 1,
              NumRetries: state.NumRetries,
              TotalDigits: state.TotalDigits + totalDigitsShown,
              TotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
              PreTrialTime: new Date(),
              OnInitialTry: true,
            },
          })
        );

        submitPerformancesToFirebase({
          user,
          id,
          target,
          interventionFormat: approach,
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
              NumRetries: state.NumRetries,
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
  target: string,
  document: StudentDataInterface,
  state: InterventionState,
  approach: string,
  openModal: any,
  addDocument: any,
  updateDocument: any,
  response: any,
  history: any,
  dispatch: any
) {
  developmentConsoleLog(
    `sharedButtonActionSequence(CurrentAction: ${state.CurrentAction})`
  );

  if (
    state.CurrentAction === SharedActionSequence.Start ||
    state.CurrentAction === SharedActionSequence.Begin
  ) {
    developmentConsoleLog(`In the entry point`);

    // This is an entry point

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

  developmentConsoleLog(
    `shouldShowFeedback: ${shouldShowFeedback(!isMatching, document)}`
  );

  if (shouldShowFeedback(!isMatching, document) && approach != "Benchmark") {
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

    dispatch(
      new DispatchUpdateRetryItem({
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

    if (typeof openModal === "function") {
      openModal();
    } else {
      return;
    }
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

    // Note: issue where state change not fast enough to catch latest
    if (state.WorkingData.length === 0) {
      dispatch(
        new DispatchUpdateCompleteItem({
          payload: {
            NumCorrectInitial: uNumberCorrectInitial,
            NumErrors: uNumberErrors,
            NumbTrials: state.NumbTrials + 1,
            TotalDigits: state.TotalDigits + totalDigitsShown,
            NumRetries: state.NumRetries,
            TotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
            PreTrialTime: new Date(),
            OnInitialTry: true,
          },
        })
      );

      submitPerformancesToFirebase({
        user,
        id,
        target,
        interventionFormat: approach,
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
          payload: {
            EntryRepresentationInternal: "",
            ViewRepresentationInternal: listItem.split(":")[0],
            OnInitialTry: true,
            FactModelList: [...state.FactModelList, currentItem2],
            WorkingData: updatedList,
            NumCorrectInitial: uNumberCorrectInitial,
            NumErrors: uNumberErrors,
            NumbTrials: state.NumbTrials + 1,
            TotalDigits: state.TotalDigits + totalDigitsShown,
            TotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
            PreTrialTime: new Date(),
            NumRetries: state.NumRetries,
          },
        })
      );
    }
  }
}
