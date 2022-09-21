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

// widgets
import KeyPad from "./subcomponents/KeyPad";
import Timer from "./subcomponents/Timer";
import SimpleProblemFrame from "./subcomponents/SimpleProblemFrame";

// helpers
import { GetOperatorFromLabel } from "../../utilities/LabelHelper";

import { RoutedIdTargetParam } from "../../interfaces/RoutingInterfaces";
import {
  InitialInterventionState,
  InterventionReducer,
} from "./functionality/InterventionBehavior";

// styles
import "./styles/ExplicitTiming.css";
import { ErrorModalCustomStyle } from "./subcomponents/styles/ModalStyles";
import { InterventionFormat } from "../../maths/Facts";
import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";
import {
  sharedButtonActionSequence,
  useEventListener,
} from "./helpers/InterventionHelpers";
import {
  commonKeyHandler,
  completeLoadingDispatch,
} from "./helpers/DispatchingHelpers";
import { submitPerformancesToFirebase } from "./helpers/InterventionHelpers";
import { commonKeyListener } from "./helpers/KeyHandlingHelper";
import KeyPadLayout from "./subcomponents/layouts/KeyPadLayout";
import ButtonLayout from "./subcomponents/layouts/ButtonLayout";
import ProblemItemLayout from "./subcomponents/layouts/ProblemItemLayout";
import TopHeaderTimed from "./subcomponents/layouts/TopHeaderTimed";

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
    commonKeyListener({
      key,
      state,
      currentApproach: InterventionFormat.ExplicitTiming,
      captureButtonAction: () => null,
      checkLiNullUndefinedBlank: null,
      captureItemClick: null,
      user,
      id,
      document,
      openModal: () => null,
      addDocument,
      updateDocument,
      response: addResponse,
      history,
      dispatch,
    });
  });

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && !state.LoadedData) {
      completeLoadingDispatch({
        intervention: InterventionFormat.CoverCopyCompare,
        workingData: document.factsTargeted,
        operatorSymbol: GetOperatorFromLabel(document.currentTarget),
        secondsLeft: document.minForTask * 60,
        dispatch,
      });
    }
  }, [document, state.LoadedData, state.OperatorSymbol]);

  /** callbackToSubmit
   *
   * Caller, linked to submission to firebase
   *
   */
  function callbackToSubmit() {
    submitPerformancesToFirebase({
      user,
      id,
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        preventScroll={true}
        style={ErrorModalCustomStyle}
        ariaHideApp={!(process.env.NODE_ENV === "test")}
        contentLabel="Example Modal"
      >
        <h2 style={{ color: "#5F686D" }}>Double-check your math!</h2>
        <div
          style={{ marginTop: "25px", marginBottom: "25px", color: "#939391" }}
        >
          Close this window, and then try again.
        </div>
        <button
          className="global-btn "
          style={{ float: "right" }}
          onClick={() => {
            closeModal();
          }}
        >
          Close Window
        </button>
      </Modal>

      <TopHeaderTimed
        approach={"Explicit Timing"}
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
        intervention={InterventionFormat.ExplicitTiming}
        dispatch={dispatch}
        showEquals={false}
      />
    </div>
  );
}
