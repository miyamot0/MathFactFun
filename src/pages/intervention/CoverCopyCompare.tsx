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
import { InterventionFormat } from "../../maths/Facts";

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

// styles
import "./styles/CoverCopyCompare.css";
import { commonKeyListener } from "./helpers/KeyHandlingHelper";
import { DispatchUpdateIntroduceItem } from "./interfaces/InterventionInterfaces";
import KeyPadLayout from "./subcomponents/layouts/KeyPadLayout";
import ButtonLayout from "./subcomponents/layouts/ButtonLayout";
import ProblemItemLayout from "./subcomponents/layouts/ProblemItemLayout";
import StimulusItemLayout from "./subcomponents/layouts/StimulusItemLayout";
import ListViewLayout from "./subcomponents/layouts/ListViewLayout";
import ModalErrorCorrection from "./subcomponents/layouts/ModalErrorCorrectionLayout";
import TopHeader from "./subcomponents/layouts/TopHeader";
import { GeneralDataLoader } from "./helpers/LoadingHelpers";

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
  useEventListener("keydown", (key) =>
    commonKeyListener({
      key,
      state,
      currentApproach: InterventionFormat.CoverCopyCompare,
      checkLiNullUndefinedBlank,
      captureItemClick,
      user,
      id,
      target,
      document,
      openModal,
      addDocument,
      updateDocument,
      response,
      history,
      dispatch,
    })
  );

  // Fire once individual data loaded, just once
  useEffect(
    () =>
      GeneralDataLoader({
        intervention: InterventionFormat.CoverCopyCompare,
        state,
        document,
        dispatch,
      }),
    [document]
  );

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
      target,
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
      <ModalErrorCorrection modalIsOpen={modalIsOpen} closeModal={closeModal} />

      <TopHeader
        approach={InterventionFormat.CoverCopyCompare}
        document={document}
      />

      <StimulusItemLayout state={state} />

      <ProblemItemLayout state={state} />

      <ButtonLayout
        className="box3"
        user={user}
        id={id}
        target={target}
        approach={InterventionFormat.CoverCopyCompare}
        document={document}
        state={state}
        openModal={openModal}
        addDocument={addDocument}
        updateDocument={updateDocument}
        addResponse={response}
        history={history}
        dispatch={dispatch}
      />

      <ListViewLayout
        className={"box4"}
        state={state}
        captureItemClick={captureItemClick}
      />

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
