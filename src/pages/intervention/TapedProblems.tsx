/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Taped Problems intervention
 */

import React, { useReducer } from "react";

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { timestamp } from "../../firebase/config";
import Modal from "react-modal";

// hooks
import { useFirestore } from "../../firebase/hooks/useFirestore";
import { useFirebaseDocumentTyped } from "../../firebase/hooks/useFirebaseDocument";
import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";

// widgets
import KeyPad from "./subcomponents/KeyPad";
import SimpleProblemFrame from "./subcomponents/SimpleProblemFrame";
import TimerButton from "./subcomponents/TimerButton";

// helpers
import {
  CalculateDigitsTotalAnswer,
  CalculateDigitsCorrectAnswer,
} from "../../utilities/LabelHelper";

import {
  InterventionActions,
  InitialInterventionState,
  InterventionReducer,
  SharedActionSequence,
} from "./functionality/InterventionBehavior";
import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";
import {
  shouldShowFeedback,
  useEventListener,
} from "./helpers/InterventionHelpers"; // styles

import "./styles/TapedProblems.css";
import { FactDataInterface } from "../setcreator/interfaces/SetCreatorInterfaces";

const DelCode = "Del";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface RoutedStudentSet {
  id?: string;
  target?: string;
}

export default function TapedProblems() {
  const { id, target } = useParams<RoutedStudentSet>();
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

  /// modal stuff
  const [modalIsOpen, setIsOpen] = useState(false);

  Modal.setAppElement("#root");

  // Timer Stuff
  const [secondsLeft, setSecondsLeft] = useState(0);

  /*
  TODO: add in common listener
  useEventListener("keydown", (key: any) => { true; } );
  */

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  // Fire once individual data loaded, just once
  useEffect(() => {
    if (document && !state.LoadedData) {
      /*
      TODO: add in common loader
      dispatch({
        type: InterventionActions.TapedProblemsBatchStartPreflight,
        payload: {
          uWorkingData: document.factsTargeted,
          uTimer: document.minForTask! * 60,
          uLoadedData: true,
        },
      });
      */
    }
  }, [document]);

  /** callbackToSubmit
   *
   * Caller, linked to submission to firebase
   *
   */
  function callbackToSubmit() {
    submitDataToFirebase(null);
  }

  const fakeCallback = (arg0: string) => {
    return;
  };

  // TODO: got down to here

  /** submitDataToFirebase
   *
   * Push data to server
   *
   * @param {FactDataInterface} finalFactObject final item completed
   */
  async function submitDataToFirebase(
    finalFactObject: FactDataInterface | null
  ): Promise<void> {
    // TODO: bring in common methods
  }

  function timerCallback(message: string): void {
    console.log(message);
  }

  return (
    <div className="wrapperTP">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        preventScroll={true}
        style={customStyles}
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
            // TODO: common methods
          }}
        >
          Close Window
        </button>
      </Modal>
      <div className="topBoxTP">
        <h2 style={{ display: "inline-block" }}>
          Taped Problems: (
          {document ? (document as StudentDataInterface).name : <></>})
        </h2>
      </div>
      <div
        className="box2TP"
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
      <div className="box1TP">
        <TimerButton callBackFunction={timerCallback} nProblems={5} delta={5} />
      </div>

      <div className="box3TP">
        <section>
          <button className="global-btn" onClick={() => null}>
            {state.ButtonText}
          </button>
        </section>
      </div>

      <div
        className="box5TP"
        style={{
          opacity: state.CoverProblemItem ? 0.5 : 1,
        }}
      >
        <KeyPad
          callBackFunction={fakeCallback}
          operatorSymbol={state.OperatorSymbol}
          showEquals={false}
        />
      </div>
    </div>
  );
}
