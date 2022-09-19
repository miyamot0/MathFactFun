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
import { GetOperatorFromLabel } from "../../utilities/LabelHelper";
import { RoutedIdTargetParam } from "../../interfaces/RoutingInterfaces";
import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";
import {
  InitialInterventionState,
  InterventionReducer,
} from "./functionality/InterventionBehavior";

import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";
import {
  loadWorkingDataBenchmark,
  sharedButtonActionSequence,
  useEventListener,
} from "./helpers/InterventionHelpers";
import {
  commonKeyHandler,
  completeLoadingDispatch,
} from "./helpers/DispatchingHelpers";
import { submitPerformancesToFirebase } from "./helpers/InterventionHelpers";

// Styles
import "./styles/ExplicitTiming.css";
import { commonKeyListener } from "./helpers/KeyHandlingHelper";

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

  // Add event listener to hook
  useEventListener("keydown", (key: React.KeyboardEvent<HTMLElement>) => {
    commonKeyListener(
      key,
      state,
      "Benchmark",
      () => null,
      null,
      null,
      user,
      id,
      document,
      () => null,
      addDocument,
      updateDocument,
      updateResponse,
      history,
      dispatch
    );
  });

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
          <button
            className="global-btn "
            onClick={() => {
              sharedButtonActionSequence(
                user,
                id,
                "Benchmark",
                document,
                state,
                null,
                addDocument,
                updateDocument,
                addResponse,
                history,
                dispatch
              );
            }}
          >
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
