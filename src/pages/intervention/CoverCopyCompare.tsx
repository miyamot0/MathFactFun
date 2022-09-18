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

import { ErrorModalCustomStyle } from "./subcomponents/ModalStyles";
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
  commonKeyListener,
  completeLoadingDispatch,
} from "./helpers/DispatchingHelpers";

// styles
import "./styles/CoverCopyCompare.css";

export default function CoverCopyCompare() {
  const { id, target } = useParams<RoutedIdTargetParam>();
  const { user } = useAuthorizationContext();
  const history = useHistory();

  const { document } = useFirebaseDocumentTyped<StudentDataInterface>({
    collectionString: "students",
    idString: id,
  });
  const { addDocument, response } = useFirestore("", target, id);
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
    commonKeyListener(
      key,
      state,
      InterventionFormat.CoverCopyCompare,
      () => null,
      checkLiNullUndefinedBlank,
      captureItemClick,
      user,
      id,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch
    );
  });

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && !state.LoadedData) {
      completeLoadingDispatch({
        intervention: InterventionFormat.CoverCopyCompare,
        workingData: document.factsTargeted,
        operatorSymbol: GetOperatorFromLabel(document.currentTarget),
        dispatch,
      });
    }
  }, [document, state.LoadedData, state.OperatorSymbol]);

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

    dispatch({
      type: InterventionActions.CoverCopyCompareBatchStartBegin,
      payload: {
        uButtonText: "Cover",
        uTrialTime: new Date(),
        uStartTime: state.StartTime === null ? new Date() : state.StartTime,
        uViewRepresentationInternal: listItem.split(":")[0],
        uCoverProblemItem: false,
        uCoverListViewItems: true,
        uWorkingData: updatedList,
        uIsOngoing: true,
        uShowButton: true,
        uNextLiItem: updatedList[0],
        uEntryRepresentationInternal: "",
        uCurrentAction: SharedActionSequence.Answer,
      },
    });

    sharedButtonActionSequence(
      user,
      id,
      InterventionFormat.CoverCopyCompare,
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
            dispatch({
              type: InterventionActions.CoverCopyCompareModalRetry,
              payload: {
                uEntryRepresentationInternal: "",
                uIsOngoing: true,
                uToVerify: false,
                uOnInitialTry: false,
                uCurrentAction: SharedActionSequence.Begin,
                uButtonText: "Cover",
                uCoverProblemItem: true,
                uCoverStimulusItem: false,
                uNumRetries: state.NumRetries + 1,
              },
            });

            closeModal();
          }}
        >
          Close
        </button>
      </Modal>
      <div className="topBox">
        <h2>Cover Copy Compare: ({document ? document.name : <></>})</h2>
      </div>
      <div
        className="box1"
        style={{
          opacity: state.CoverStimulusItem ? 0.5 : 1,
          backgroundColor: state.CoverStimulusItem ? "gray" : "transparent",
        }}
      >
        <h2>Problem to Copy</h2>
        <StimulusFrame
          itemString={state.ViewRepresentationInternal}
          operator={state.OperatorSymbol}
          coverStimulusItem={state.CoverStimulusItem}
        />
      </div>
      <div
        className="box2"
        style={{
          opacity: state.CoverProblemItem ? 0.5 : 1,
          backgroundColor: state.CoverProblemItem ? "gray" : "transparent",
        }}
      >
        <h2>My Answer</h2>
        <ProblemFrame
          entryString={state.EntryRepresentationInternal}
          coverProblemSpace={state.CoverProblemItem}
        />
      </div>
      <div className="box3">
        <section>
          <button
            className="global-btn "
            style={{ visibility: state.ShowButton ? "visible" : "hidden" }}
            onClick={() => {
              sharedButtonActionSequence(
                user,
                id,
                InterventionFormat.CoverCopyCompare,
                document,
                state,
                openModal,
                addDocument,
                updateDocument,
                response,
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
      <div
        className="box5"
        style={{
          opacity: state.CoverProblemItem ? 0.5 : 1,
        }}
      >
        <KeyPad
          callBackFunction={(key: string) => {
            commonKeyHandler(
              InterventionFormat.CoverCopyCompare,
              key,
              state,
              dispatch
            );
          }}
          operatorSymbol={state.OperatorSymbol}
          showEquals={true}
        />
      </div>
    </div>
  );
}
