/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer, useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import Modal from "react-modal";

// hooks
import { useFirestore } from "../../firebase/hooks/useFirestore";
import { useFirebaseDocumentTyped } from "../../firebase/hooks/useFirebaseDocument";
import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";

// helpers
import { GetOperatorFromLabel } from "../../utilities/LabelHelper";

import { RoutedIdTargetParam } from "../../interfaces/RoutingInterfaces";
import {
  InitialInterventionState,
  InterventionReducer,
} from "./functionality/InterventionBehavior";

import { InterventionFormat } from "../../maths/Facts";
import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";
import { useEventListener } from "./helpers/InterventionHelpers";
import { completeLoadingDispatch } from "./helpers/DispatchingHelpers";
import { submitPerformancesToFirebase } from "./helpers/InterventionHelpers";
import { commonKeyListener } from "./helpers/KeyHandlingHelper";
import KeyPadLayout from "./subcomponents/layouts/KeyPadLayout";
import ButtonLayout from "./subcomponents/layouts/ButtonLayout";
import SimpleProblemItemLayout from "./subcomponents/layouts/SimpleProblemItemLayout";
import TopHeaderTimed from "./subcomponents/layouts/TopHeaderTimed";
import ModalErrorCorrection from "./subcomponents/layouts/ModalErrorCorrectionLayout";

import { developmentConsoleLog } from "../../utilities/LoggingTools";

// styles
import "./styles/ExplicitTiming.css";

export default function ExplicitTiming() {
  const { id, target } = useParams<RoutedIdTargetParam>();
  const { user } = useAuthorizationContext();
  const history = useHistory();

  const { document } = useFirebaseDocumentTyped<StudentDataInterface>({
    collectionString: "students",
    idString: id,
  });
  const { addDocument, response: addResponse } = useFirestore("", target, id);
  const { updateDocument } = useFirestore("students", undefined, undefined);

  const [state, dispatch] = useReducer(
    InterventionReducer,
    InitialInterventionState
  );

  const [modalIsOpen, setIsOpen] = useState(false);

  Modal.setAppElement("#root");

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  // Add event listener to hook
  useEventListener("keydown", (key: React.KeyboardEvent<HTMLElement>) => {
    developmentConsoleLog(`useEventListener(key: ${key})`);

    if (modalIsOpen) {
      return;
    } else {
      commonKeyListener({
        key,
        state,
        currentApproach: InterventionFormat.ExplicitTiming,
        user,
        id,
        target,
        document,
        openModal,
        addDocument,
        updateDocument,
        response: addResponse,
        history,
        dispatch,
      });
    }
  });

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && !state.LoadedData) {
      completeLoadingDispatch({
        intervention: InterventionFormat.ExplicitTiming,
        workingData: document.factsTargeted,
        operatorSymbol: GetOperatorFromLabel(document.currentTarget),
        secondsLeft: document.minForTask * 60,
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
      target,
      interventionFormat: InterventionFormat.ExplicitTiming,
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
      <ModalErrorCorrection modalIsOpen={modalIsOpen} closeModal={closeModal} />

      <TopHeaderTimed
        approach={"Explicit Timing"}
        document={document}
        state={state}
        callbackToSubmit={callbackToSubmit}
      />

      <SimpleProblemItemLayout state={state} />

      <ButtonLayout
        className="box3ET"
        user={user}
        id={id}
        target={target}
        approach={InterventionFormat.ExplicitTiming}
        document={document}
        state={state}
        openModal={openModal}
        addDocument={addDocument}
        updateDocument={updateDocument}
        addResponse={addResponse}
        history={history}
        dispatch={dispatch}
      />

      <KeyPadLayout
        className="box5ET"
        state={state}
        intervention={InterventionFormat.ExplicitTiming}
        dispatch={dispatch}
        showEquals={false}
      />
    </div>
  );
}
