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
import { timestamp } from "../../firebase/config";

// widgets
import KeyPad from "./subcomponents/KeyPad";
import ProblemFrame from "./subcomponents/ProblemFrame";
import StimulusFrame from "./subcomponents/StimulusFrame";

// helpers
import {
  CalculateDigitsCorrect,
  GetOperatorFromLabel,
  CalculateDigitsTotalAnswer,
} from "../../utilities/LabelHelper";
import { InterventionFormat, RelevantKeys } from "../../maths/Facts";

// styles
import "./styles/CoverCopyCompare.css";

import { ErrorModalCustomStyle } from "./subcomponents/ModalStyles";
import {
  InterventionActions,
  DelCode,
  InitialInterventionState,
  InterventionReducer,
  SharedActionSequence,
} from "./functionality/InterventionBehavior";
import { RoutedIdTargetParam } from "../../interfaces/RoutingInterfaces";
import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";
import {
  checkLiNullUndefinedBlank,
  shouldShowFeedback,
  useEventListener,
} from "./helpers/InterventionHelpers";
import { FactDataInterface } from "../setcreator/interfaces/SetCreatorInterfaces";
import {
  DispatchUpdateEntryInternal,
  DispatchUpdatePreLoadContent,
} from "./interfaces/InterventionInterfaces";
import {
  commonKeyHandler,
  completeLoadingDispatch,
} from "./helpers/DispatchingHelpers";

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

  // modal stuff
  const [modalIsOpen, setIsOpen] = useState(false);

  Modal.setAppElement("#root");

  /** keyHandler
   *
   * Handle keyboard input
   *
   * @param {React.KeyboardEvent<HTMLElement>} key keyevent
   */
  function keyHandler(key: React.KeyboardEvent<HTMLElement>): void {
    if (RelevantKeys.includes(key.key)) {
      let modKey = key.key === "Backspace" ? "Del" : key.key;
      modKey = key.key === "Delete" ? "Del" : modKey;

      if (modKey === " ") {
        if (
          state.CurrentAction !== SharedActionSequence.Entry &&
          state.CurrentAction !== SharedActionSequence.Start
        ) {
          captureButtonAction();
          return;
        }

        if (!checkLiNullUndefinedBlank(state.NextLiItem)) {
          captureItemClick(state.NextLiItem);
        }

        return;
      }

      modKey = key.key === "*" ? "x" : modKey;
      modKey = key.key === "Enter" ? "=" : modKey;

      commonKeyHandler(
        InterventionFormat.CoverCopyCompare,
        modKey,
        state,
        dispatch
      );
    }
  }

  // Add event listener to hook
  useEventListener("keydown", keyHandler);

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

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

  /** submitDataToFirebase
   *
   * Push data to server
   *
   * @param {FactDataInterface} finalFactObject final item completed
   */
  async function submitDataToFirebase(
    finalFactObject: FactDataInterface
  ): Promise<void> {
    const finalEntries = state.FactModelList;

    if (!state.StartTime || !user || !document || !id) {
      return;
    }

    if (finalFactObject !== null) {
      finalEntries?.push(finalFactObject);
    }

    const end = new Date();

    const uploadObject = {
      correctDigits: state.TotalDigitsCorrect,
      errCount: state.NumErrors,
      nCorrectInitial: state.NumCorrectInitial,
      nRetries: state.NumRetries,
      sessionDuration: (end.getTime() - state.StartTime.getTime()) / 1000,
      setSize: document.factsTargeted.length,
      totalDigits: state.TotalDigits,
      entries: finalEntries.map((entry) => Object.assign({}, entry)),
      id: document.id,
      creator: user.uid,
      target: document.currentTarget,
      method: InterventionFormat.CoverCopyCompare,
      dateTimeEnd: end.toString(),
      dateTimeStart: state.StartTime.toString(),
      createdAt: timestamp.fromDate(new Date()),
    };

    await addDocument(uploadObject);

    // If added without issue, update timestamp
    if (!response.error) {
      const currentDate = new Date();
      const studentObject = {
        lastActivity: timestamp.fromDate(currentDate),
      };

      // Update field regarding last activity
      await updateDocument(id, studentObject);

      // Push to home
      if (!response.error) {
        history.push(`/practice`);
      }
    }
  }

  /** captureButtonAction
   *
   * Button interactions to fire
   *
   */
  function captureButtonAction(): void {
    if (document === null) {
      return;
    }

    // HACK: need a flag for update w/o waiting for state change
    let quickCheck = false;

    if (
      state.CurrentAction === SharedActionSequence.Entry ||
      state.CurrentAction === SharedActionSequence.Start
    ) {
      dispatch({
        type: InterventionActions.CoverCopyCompareTaskIncrement,
        payload: {
          uAction: SharedActionSequence.Begin,
          uButtonText: "Cover",
          uCoverStimulusItem: false,
          uCoverProblemItem: true,
        },
      });
    } else if (state.CurrentAction === SharedActionSequence.Begin) {
      dispatch({
        type: InterventionActions.CoverCopyCompareTaskIncrement,
        payload: {
          uAction: SharedActionSequence.CoverCopy,
          uButtonText: "Copied",
          uCoverStimulusItem: true,
          uCoverProblemItem: false,
        },
      });
    } else if (state.CurrentAction === SharedActionSequence.CoverCopy) {
      dispatch({
        type: InterventionActions.CoverCopyCompareTaskIncrement,
        payload: {
          uAction: SharedActionSequence.Compare,
          uButtonText: "Compared",
          uCoverStimulusItem: false,
          uCoverProblemItem: false,
        },
      });
    } else {
      dispatch({
        type: InterventionActions.CoverCopyCompareTaskReset,
        payload: {
          uAction: SharedActionSequence.Entry,
          uVerify: true,
        },
      });

      quickCheck = true;
    }

    // Fire if ready to check response
    if (state.ToVerify || quickCheck) {
      dispatch({
        type: InterventionActions.CoverCopyCompareTaskReset,
        payload: {
          uAction: state.CurrentAction,
          uVerify: false,
        },
      });

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
          dateTimeEnd: timestamp.fromDate(new Date(current)),
          dateTimeStart: timestamp.fromDate(new Date(holderPreTime)),
        };

        dispatch({
          type: InterventionActions.CoverCopyCompareBatchIncrement,
          payload: {
            uNumberCorrectInitial,
            uNumberErrors,
            uTotalDigits: state.TotalDigits + totalDigitsShown,
            uTotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
            uNumberTrials: state.NumbTrials + 1,
            uInitialTry: state.OnInitialTry,
            uTrialTime: new Date(),
          },
        });

        dispatch({
          type: InterventionActions.CoverCopyCompareModalPreErrorLog,
          payload: {
            uFactModel: [...state.FactModelList, currentItem2],
          },
        });

        openModal();
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
          dateTimeEnd: timestamp.fromDate(new Date(current)),
          dateTimeStart: timestamp.fromDate(new Date(holderPreTime)),
        };

        dispatch({
          type: InterventionActions.CoverCopyCompareBatchIncrement,
          payload: {
            uNumberCorrectInitial,
            uNumberErrors,
            uTotalDigits: state.TotalDigits + totalDigitsShown,
            uTotalDigitsCorrect: state.TotalDigitsCorrect + totalDigitsCorrect,
            uNumberTrials: state.NumbTrials + 1,
            uInitialTry: state.OnInitialTry,
            uTrialTime: new Date(),
          },
        });

        // Note: isusue where state change not fast enough to catch latest
        if (state.WorkingData.length === 0) {
          // If finished, upload list w/ latest item
          submitDataToFirebase(currentItem2);
        } else {
          dispatch({
            type: InterventionActions.CoverCopyCompareBatchStartIncrementPost,
            payload: {
              uCoverStimulusItem: true,
              uCoverProblemItem: true,
              uEntryRepresentationInternal: "",
              uViewRepresentationInternal: "",
              uButtonText: "Cover",
              uShowButton: false,
              uIsOngoing: false,
              uCoverListViewItems: false,
              uOnInitialTry: true,
              uFactModelList: [...state.FactModelList, currentItem2],
              uCurrentAction: SharedActionSequence.Entry,
            },
          });
        }
      }
    }
  }

  /*
  function captureKeyClick(char: string): void {
    // Rule 1: Exit out if not in Covered/Copying sequence
    if (state.CurrentAction !== SharedActionSequence.CoverCopy) return;

    // Rule 2: Exit out if multiple operators
    if (
      char === state.OperatorSymbol &&
      state.EntryRepresentationInternal.includes(state.OperatorSymbol)
    )
      return;

    // Rule 3: Like #2, but no multiple equals sign
    if (char === "=" && state.EntryRepresentationInternal.includes("=")) return;

    // Rule #4: No '=' before an operator
    if (
      char === "=" &&
      !state.EntryRepresentationInternal.includes(state.OperatorSymbol)
    )
      return;

    // Rule #5/#6: No '=', before an digit AFTER operator
    if (
      char === "=" &&
      state.EntryRepresentationInternal.includes(state.OperatorSymbol)
    ) {
      const problemParts = state.EntryRepresentationInternal.split(
        state.OperatorSymbol
      );

      // Rule #5: If just 1 part, disregard (i.e., no operator)
      if (problemParts.length <= 1) return;

      // Rule #6: If first is just whitespace, disregard (i.e., JUST operator)
      if (problemParts[1].trim().length === 0) return;
    }

    if (char === DelCode) {
      // # Rule #7: Exit out if nothin to delete
      if (state.EntryRepresentationInternal.length === 0) return;

      // Lop off end of string
      dispatch(
        new DispatchUpdateEntryInternal({
          type: InterventionActions.UpdateResponseEntry,
          payload: {
            EntryRepresentationInternal:
              state.EntryRepresentationInternal.slice(0, -1),
          },
        })
      );
    } else {
      // Add to end of string
      dispatch(
        new DispatchUpdateEntryInternal({
          type: InterventionActions.UpdateResponseEntry,
          payload: {
            EntryRepresentationInternal:
              state.EntryRepresentationInternal + char,
          },
        })
      );
    }
  }
  */

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

    captureButtonAction();
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
            onClick={() => captureButtonAction()}
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
