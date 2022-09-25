/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { InterventionFormat, RelevantKeys } from "../../../maths/Facts";
import { developmentConsoleLog } from "../../../utilities/LoggingTools";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { SharedActionSequence } from "../functionality/InterventionBehavior";
import { InterventionState } from "../interfaces/InterventionInterfaces";
import { commonKeyHandler } from "./DispatchingHelpers";
import { sharedButtonActionSequence } from "./InterventionHelpers";

/** commonKeyListener
 *
 * @param param0
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
  target,
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
  checkLiNullUndefinedBlank?: any;
  captureItemClick?: any;
  user: firebase.User | null;
  id: string;
  target: string;
  document: StudentDataInterface | null;
  openModal?: () => void;
  addDocument: any;
  updateDocument: any;
  response: any;
  history: any;
  dispatch: any;
}) {
  developmentConsoleLog(
    `commonKeyListener(currentApproach: ${currentApproach}, action: ${state.CurrentAction}, key: ${key.key})`
  );

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
              target,
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
        let modKey = key.key;
        modKey = key.key === "Backspace" ? "Del" : key.key;
        modKey = key.key === "Delete" ? "Del" : modKey;

        if (modKey === " ") {
          developmentConsoleLog(
            `In key if: ..${modKey}.., action: ${state.CurrentAction}`
          );
          if (
            state.CurrentAction !== SharedActionSequence.Entry &&
            state.CurrentAction !== SharedActionSequence.Start
          ) {
            sharedButtonActionSequence(
              user,
              id,
              target,
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

        if (modKey === "=") return;

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
              target,
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

        if (modKey === "=") return;

        commonKeyHandler(currentApproach, modKey, state, dispatch);
      }
      return;
    default:
      throw Error("No intervention type specified");
  }
}
