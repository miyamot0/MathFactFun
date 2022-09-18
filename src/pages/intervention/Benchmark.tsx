/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer } from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

// Hooks
import { useFirestore } from "../../firebase/hooks/useFirestore";
import { useFirebaseDocumentTyped } from "../../firebase/hooks/useFirebaseDocument";

// Widgets
import KeyPad from "./subcomponents/KeyPad";
import Timer from "./subcomponents/Timer";
import SimpleProblemFrame from "./subcomponents/SimpleProblemFrame";

// Helpers
import {
  CalculateDigitsTotalAnswer,
  CalculateDigitsCorrectAnswer,
  GetOperatorFromLabel,
} from "../../utilities/LabelHelper";

import { timestamp } from "../../firebase/config";
import { RoutedIdTargetParam } from "../../interfaces/RoutingInterfaces";
import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";
import {
  InterventionActions,
  InitialInterventionState,
  InterventionReducer,
  SharedActionSequence,
} from "./functionality/InterventionBehavior";

// Styles
import "./styles/ExplicitTiming.css";
import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";
import { FactDataInterface } from "../setcreator/interfaces/SetCreatorInterfaces";
import {
  loadWorkingDataBenchmark,
  useEventListener,
} from "./helpers/InterventionHelpers";
import {
  commonKeyHandler,
  completeLoadingDispatch,
} from "./helpers/DispatchingHelpers";
import { RelevantKeys } from "../../maths/Facts";
import { submitPerformancesToFirebase } from "./helpers/InterventionHelpers";

export default function Benchmark() {
  const { id, target } = useParams<RoutedIdTargetParam>();
  const history = useHistory();
  const { document } = useFirebaseDocumentTyped<StudentDataInterface>({
    collectionString: "students",
    idString: id,
  });
  const { user } = useAuthorizationContext();
  const { addDocument, response: addResponse } = useFirestore(
    "",
    target.split("-")[0],
    id
  );
  const { updateDocument, response: updateResponse } = useFirestore(
    "students",
    undefined,
    undefined
  );

  const [state, dispatch] = useReducer(
    InterventionReducer,
    InitialInterventionState
  );

  /** keyHandler
   *
   * Handle keyboard input
   *
   * @param {React.KeyboardEvent<HTMLElement>} key keyevent
   */
  function keyHandler(key: React.KeyboardEvent<HTMLElement>): void {
    if (key.key === "Enter") return;

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

        return;
      }

      commonKeyHandler("Benchmark", modKey, state, dispatch);
    }
  }

  // Add event listener to hook
  useEventListener("keydown", keyHandler);

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && !state.LoadedData) {
      const coreSetClean = loadWorkingDataBenchmark(document, target);

      completeLoadingDispatch({
        intervention: "Benchmark",
        workingData: coreSetClean,
        operatorSymbol: GetOperatorFromLabel(document.currentTarget),
        dispatch,
      });
    }
  }, [document, state.LoadedData, target]);

  /** callbackToSubmit
   *
   * Caller, linked to submission to firebase
   *
   */
  function callbackToSubmit() {
    submitPerformancesToFirebase({
      user,
      id,
      interventionFormat: "Benchmark",
      finalFactObject: null,
      document,
      state,
      response: addResponse,
      addDocument,
      updateDocument,
      history,
    });
  }

  /** submitDataToFirebase
   *
  async function submitDataToFirebase(
    finalFactObject: FactDataInterface | null
  ): Promise<void> {
    const finalEntries = state.FactModelList;

    if (!state.StartTime || !user || !document || !id) {
      return;
    }

    if (finalFactObject !== null) {
      finalEntries?.push(finalFactObject);
    }

    const end = new Date();
    const currentBenchmarkArea = target.split("-")[0];

    const uploadObject = {
      correctDigits: state.TotalDigitsCorrect,
      errCount: state.NumErrors,
      nCorrectInitial: state.NumCorrectInitial,
      nRetries: 0,
      sessionDuration: (end.getTime() - state.StartTime.getTime()) / 1000,
      setSize: document.factsTargeted.length,
      totalDigits: state.TotalDigits,
      entries: finalEntries.map((entry) => Object.assign({}, entry)),
      id: document.id,
      creator: user.uid,
      target: currentBenchmarkArea,
      method: "Benchmark",
      dateTimeEnd: end.toString(),
      dateTimeStart: state.StartTime.toString(),
      createdAt: timestamp.fromDate(new Date()),
    };

    // Update collection with latest performance
    await addDocument(uploadObject);

    // If added without issue, update timestamp
    if (!addResponse.error) {
      const completedBenchmark = document.completedBenchmark;

      completedBenchmark.push(
        `${target} ${document.dueDate.toDate().toDateString()}`
      );

      // Omit time updates
      const studentObject = {
        completedBenchmark,
      };

      // Update field regarding last activity
      await updateDocument(id, studentObject);

      // Push to home
      if (!updateResponse.error) {
        history.push(`/probe/${id}`);
      }
    }
  }

*/

  /** captureButtonAction
   *
   * Button interactions to fire
   *
   */
  function captureButtonAction(): void {
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

    const uTotalDigits =
      state.TotalDigits +
      CalculateDigitsTotalAnswer(state.ViewRepresentationInternal);

    const uTotalDigitsCorrect =
      state.TotalDigitsCorrect +
      CalculateDigitsCorrectAnswer(
        combinedResponse,
        state.ViewRepresentationInternal
      );

    const uNumberTrials = state.NumbTrials + 1;

    const currentItem = {
      factCorrect: isMatching,
      initialTry: state.OnInitialTry,
      factType: document.currentTarget,
      factString: state.ViewRepresentationInternal,
      factEntry: state.EntryRepresentationInternal,
      latencySeconds: secs,
      dateTimeEnd: timestamp.fromDate(new Date(current)),
      dateTimeStart: timestamp.fromDate(new Date(holderPreTime)),
    } as FactDataInterface;

    const uInitialTry = true;

    dispatch({
      type: InterventionActions.BenchmarkBatchStartIncrement,
      payload: {
        uNumberCorrectInitial,
        uNumberErrors,
        uTotalDigits,
        uTotalDigitsCorrect,
        uNumberTrials,
        uInitialTry,
        uTrialTime: new Date(),
      },
    });

    // Potential issue: state change not fast enough to catch latest
    if (state.WorkingData.length === 0) {
      // If finished, upload list w/ latest item
      submitPerformancesToFirebase({
        user,
        id,
        interventionFormat: "Benchmark",
        finalFactObject: currentItem,
        document,
        state,
        response: addResponse,
        addDocument,
        updateDocument,
        history,
      });
    } else {
      // Otherise, add it to the existing list

      const listItem = state.WorkingData[0];
      const updatedList = state.WorkingData.filter(function (item) {
        return item !== listItem;
      });

      dispatch({
        type: InterventionActions.BenchmarkBatchStartIncrementPost,
        payload: {
          uFactModel: [...state.FactModelList, currentItem],
          uWorkingData: updatedList,
          uView: listItem.split(":")[0],
          uEntry: "",
        },
      });
    }
  }

  return (
    <div className="wrapperET">
      <div className="topBoxET">
        <h2 style={{ display: "inline-block" }}>
          Benchmark: ({document ? document.name : <></>}), Time:{" "}
          {document ? (
            <Timer
              secondsTotal={state.SecondsLeft}
              startTimerTime={state.StartTime}
              callbackFunction={callbackToSubmit}
            />
          ) : (
            <></>
          )}
        </h2>
      </div>
      <div
        className="box2ET"
        style={{
          opacity: state.CoverProblemItem ? 0.5 : 1,
          backgroundColor: state.CoverProblemItem ? "gray" : "transparent",
        }}
      >
        <SimpleProblemFrame
          problemStem={state.ViewRepresentationInternal}
          coverProblemSpace={state.CoverProblemItem}
          entryString={state.EntryRepresentationInternal}
        />
      </div>
      <div className="box3ET">
        <section>
          <button className="global-btn " onClick={() => captureButtonAction()}>
            {state.ButtonText}
          </button>
        </section>
      </div>

      <div
        className="box5ET"
        style={{
          opacity: state.CoverProblemItem ? 0.5 : 1,
        }}
      >
        <KeyPad
          callBackFunction={(key: string) => {
            commonKeyHandler("Benchmark", key, state, dispatch);
          }}
          operatorSymbol={state.OperatorSymbol}
          showEquals={false}
        />
      </div>
    </div>
  );
}
