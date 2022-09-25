/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { InterventionFormat, RelevantKeys } from "../../../maths/Facts";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { SharedActionSequence } from "../functionality/InterventionBehavior";
import { InterventionState } from "../interfaces/InterventionInterfaces";
import { commonKeyHandler } from "./DispatchingHelpers";
import { sharedButtonActionSequence } from "./InterventionHelpers";

/** commonKeyListener
 *
 * @param key
 * @param state
 * @param currentApproach
 * @param captureButtonAction
 * @param checkLiNullUndefinedBlank
 * @param captureItemClick
 * @param user
 * @param id
 * @param document
 * @param openModal
 * @param addDocument
 * @param updateDocument
 * @param response
 * @param history
 * @param dispatch
 * @returns
 */
export function commonKeyListener({
  key,
  state,
  currentApproach,
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
  dispatch,
}: {
  key: React.KeyboardEvent<HTMLElement>;
  state: InterventionState;
  currentApproach: string;
  checkLiNullUndefinedBlank: any;
  captureItemClick: any;
  user: firebase.User | null;
  id: string;
  document: StudentDataInterface | null;
  openModal: any;
  addDocument: any;
  updateDocument: any;
  response: any;
  history: any;
  dispatch: any;
}) {
  switch (currentApproach) {
    case InterventionFormat.CoverCopyCompare:
      if (RelevantKeys.includes(key.key)) {
        let modKey = key.key === "Backspace" ? "Del" : key.key;
        modKey = key.key === "Delete" ? "Del" : modKey;

        if (modKey === " ") {
          if (
            state.CurrentAction !== SharedActionSequence.Entry &&
            state.CurrentAction !== SharedActionSequence.Start
          ) {
            sharedButtonActionSequence(
              user,
              id,
              currentApproach,
              document,
              state,
              openModal,
              addDocument,
              updateDocument,
              response,
              history,
              dispatch
            );

            return;
          }

          if (!checkLiNullUndefinedBlank(state.NextLiItem)) {
            captureItemClick(state.NextLiItem);
          }

          return;
        }

        modKey = key.key === "*" ? "x" : modKey;
        modKey = key.key === "Enter" ? "=" : modKey;

        commonKeyHandler(currentApproach, modKey, state, dispatch);
      }
      return;
    case InterventionFormat.ExplicitTiming:
      if (RelevantKeys.includes(key.key)) {
        let modKey = key.key === "Backspace" ? "Del" : key.key;
        modKey = key.key === "Delete" ? "Del" : modKey;

        if (modKey === " ") {
          if (
            state.CurrentAction !== SharedActionSequence.Entry &&
            state.CurrentAction !== SharedActionSequence.Start
          ) {
            sharedButtonActionSequence(
              user,
              id,
              currentApproach,
              document,
              state,
              openModal,
              addDocument,
              updateDocument,
              response,
              history,
              dispatch
            );

            return;
          }

          return;
        }

        modKey = key.key === "*" ? "x" : modKey;
        modKey = key.key === "Enter" ? "=" : modKey;

        commonKeyHandler(currentApproach, modKey, state, dispatch);
      }
      return;
    case "Benchmark":
      if (RelevantKeys.includes(key.key)) {
        let modKey = key.key === "Backspace" ? "Del" : key.key;
        modKey = key.key === "Delete" ? "Del" : modKey;

        if (modKey === " ") {
          if (
            state.CurrentAction !== SharedActionSequence.Entry &&
            state.CurrentAction !== SharedActionSequence.Start
          ) {
            sharedButtonActionSequence(
              user,
              id,
              currentApproach,
              document,
              state,
              openModal,
              addDocument,
              updateDocument,
              response,
              history,
              dispatch
            );

            return;
          }

          return;
        }

        modKey = key.key === "*" ? "x" : modKey;
        modKey = key.key === "Enter" ? "=" : modKey;

        commonKeyHandler(currentApproach, modKey, state, dispatch);
      }
      return;
    default:
      throw Error("No intervention type specified");
  }
}
