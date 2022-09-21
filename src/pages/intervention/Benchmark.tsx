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
import { commonKeyListener } from "./helpers/KeyHandlingHelper";

// Styles
import "./styles/ExplicitTiming.css";
import KeyPadLayout from "./subcomponents/layouts/KeyPadLayout";
import ButtonLayout from "./subcomponents/layouts/ButtonLayout";
import ProblemItemLayout from "./subcomponents/layouts/ProblemItemLayout";
import TopHeaderTimed from "./subcomponents/layouts/TopHeaderTimed";

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
    commonKeyListener({
      key,
      state,
      currentApproach: "Benchmark",
      checkLiNullUndefinedBlank: null,
      captureItemClick: null,
      user,
      id,
      document,
      openModal: null,
      addDocument,
      updateDocument,
      response: updateResponse,
      history,
      dispatch,
    });
  });

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && state.LoadedData === false) {
      const coreSetClean = loadWorkingDataBenchmark(document, target);

      completeLoadingDispatch({
        intervention: "Benchmark",
        workingData: coreSetClean,
        operatorSymbol: GetOperatorFromLabel(document.currentTarget),
        dispatch,
      });
    }
  }, [document]);

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
      <TopHeaderTimed
        approach={"Benchmarking"}
        document={document}
        state={state}
        callbackToSubmit={callbackToSubmit}
      />

      <ProblemItemLayout state={state} />

      <ButtonLayout
        className="box3ET"
        user={user}
        id={id}
        approach={"Benchmark"}
        document={document}
        state={state}
        openModal={null}
        addDocument={addDocument}
        updateDocument={updateDocument}
        addResponse={addResponse}
        history={history}
        dispatch={dispatch}
      />

      <KeyPadLayout
        className="box5ET"
        state={state}
        intervention={"Benchmark"}
        dispatch={dispatch}
        showEquals={false}
      />
    </div>
  );
}
