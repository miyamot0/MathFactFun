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
import ProblemFrame from "./subcomponents/ProblemFrame";
import StimulusFrame from "./subcomponents/StimulusFrame";

// helpers
import { GetOperatorFromLabel } from "../../utilities/LabelHelper";
import { InterventionFormat } from "../../maths/Facts";

import { ErrorModalCustomStyle } from "./subcomponents/styles/ModalStyles";
import {
  InterventionActions,
  InitialInterventionState,
  InterventionReducer,
  SharedActionSequence,
} from "./functionality/InterventionBehavior";
import { RoutedIdTargetParam } from "../../interfaces/RoutingInterfaces";
import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";
import {
  checkLiNullUndefinedBlank,
  sharedButtonActionSequence,
  useEventListener,
} from "./helpers/InterventionHelpers";
import {
  commonKeyHandler,
  completeLoadingDispatch,
} from "./helpers/DispatchingHelpers";

// styles
import "./styles/CoverCopyCompare.css";
import { commonKeyListener } from "./helpers/KeyHandlingHelper";
import { DispatchUpdateIntroduceItem } from "./interfaces/InterventionInterfaces";
import KeyPadLayout from "./subcomponents/layouts/KeyPadLayout";
import ButtonLayout from "./subcomponents/layouts/ButtonLayout";
import ProblemItemLayout from "./subcomponents/layouts/ProblemItemLayout";
import StimulusItemLayout from "./subcomponents/layouts/StimulusItemLayout";

export default function CoverCopyCompare() {
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
      currentApproach: InterventionFormat.CoverCopyCompare,
      captureButtonAction: () => null,
      checkLiNullUndefinedBlank,
      captureItemClick,
      user,
      id,
      document,
      openModal,
      addDocument,
      updateDocument,
      response: addResponse,
      history,
      dispatch,
    });
  });

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && state.LoadedData === false) {
      completeLoadingDispatch({
        intervention: InterventionFormat.CoverCopyCompare,
        workingData: document.factsTargeted,
        operatorSymbol: GetOperatorFromLabel(document.currentTarget),
        dispatch,
      });
    }
  }, [document]);

  /** captureItemClick
   *
   * Function to handle input (list item selected)
   *
   * @param {string} listItem li element selected
   */
  function captureItemClick(listItem: string): void {
    // If a problem is loaded, exit out of event
    if (state.IsOngoing) return;

    const updatedList = state.WorkingData.filter(function (item) {
      return item !== listItem;
    });

    dispatch(
      new DispatchUpdateIntroduceItem({
        type: InterventionActions.UpdateIntroduceNewItem,
        payload: {
          ButtonText: "Cover",
          PreTrialTime: new Date(),
          StartTime: state.StartTime === null ? new Date() : state.StartTime,
          ViewRepresentationInternal: listItem.split(":")[0],
          CoverProblemItem: false,
          CoverListViewItems: true,
          WorkingData: updatedList,
          IsOngoing: true,
          ShowButton: true,
          NextLiItem: updatedList[0],
          EntryRepresentationInternal: "",
          CurrentAction: SharedActionSequence.Start,
        },
      })
    );

    sharedButtonActionSequence(
      user,
      id,
      InterventionFormat.CoverCopyCompare,
      document,
      state,
      openModal,
      addDocument,
      updateDocument,
      addResponse,
      history,
      dispatch
    );
  }

  return (
    <div className="wrapper">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        preventScroll={true}
        style={ErrorModalCustomStyle}
        ariaHideApp={!(process.env.NODE_ENV === "test")}
        contentLabel="Example Modal"
      >
        <h2>Double-check your math!</h2>
        <div style={{ marginTop: "5px", marginBottom: "10px" }}>
          Close this window, and then try again.
        </div>
        <button
          className="global-btn "
          style={{ float: "right" }}
          onClick={() => {
            closeModal();
          }}
        >
          Close
        </button>
      </Modal>

      <StimulusItemLayout state={state} />

      <ProblemItemLayout state={state} />

      <ButtonLayout
        className="box3"
        user={user}
        id={id}
        approach={InterventionFormat.CoverCopyCompare}
        document={document}
        state={state}
        openModal={null}
        addDocument={addDocument}
        updateDocument={updateDocument}
        addResponse={addResponse}
        history={history}
        dispatch={dispatch}
      />

      <div
        className="box4"
        style={{
          opacity: state.CoverListViewItems ? 0.5 : 1,
          backgroundColor: state.CoverListViewItems ? "gray" : "transparent",
        }}
      >
        <h2>Items in Stimulus Set</h2>
        <ul className="list-styling">
          {state.WorkingData ? (
            state.WorkingData.map((fact) => {
              return (
                <li
                  className="list-styling"
                  key={fact}
                  onClick={() => captureItemClick(fact)}
                >
                  {fact.split(":")[0]}
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>

      <KeyPadLayout
        className="box5"
        state={state}
        intervention={InterventionFormat.CoverCopyCompare}
        dispatch={dispatch}
        showEquals={true}
      />
    </div>
  );
}
