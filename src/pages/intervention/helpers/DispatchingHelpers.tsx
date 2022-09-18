/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  DelCode,
  InterventionActions,
  SharedActionSequence,
} from "../functionality/InterventionBehavior";
import {
  DispatchUpdateEntryInternal,
  DispatchUpdatePreLoadContent,
  InterventionState,
} from "../interfaces/InterventionInterfaces";
import { InterventionFormat, RelevantKeys } from "./../../../maths/Facts";

export function completeLoadingDispatch({
  intervention,
  currentAction = SharedActionSequence.Start,
  workingData,
  operatorSymbol,
  secondsLeft = 120,
  dispatch,
}: {
  intervention: string;
  currentAction?: SharedActionSequence;
  workingData: string[];
  operatorSymbol: string;
  secondsLeft?: number;
  dispatch: (value: any) => void;
}) {
  let dispatchObject;

  switch (intervention) {
    case "Benchmark":
      dispatchObject = new DispatchUpdatePreLoadContent({
        type: InterventionActions.UpdateWithLoadedData,
        payload: {
          CurrentAction: currentAction,
          WorkingData: workingData,
          LoadedData: true,
          OperatorSymbol: operatorSymbol,
          SecondsLeft: secondsLeft,
        },
      });

      dispatch(dispatchObject);
      return;

    case InterventionFormat.CoverCopyCompare:
      dispatchObject = new DispatchUpdatePreLoadContent({
        type: InterventionActions.UpdateWithLoadedData,
        payload: {
          CurrentAction: currentAction,
          WorkingData: workingData,
          LoadedData: true,
          OperatorSymbol: operatorSymbol,
          SecondsLeft: secondsLeft,
        },
      });

      dispatch(dispatchObject);
      return;

    case InterventionFormat.ExplicitTiming:
      dispatchObject = new DispatchUpdatePreLoadContent({
        type: InterventionActions.UpdateWithLoadedData,
        payload: {
          CurrentAction: currentAction,
          WorkingData: workingData,
          LoadedData: true,
          OperatorSymbol: operatorSymbol,
          SecondsLeft: secondsLeft,
        },
      });

      dispatch(dispatchObject);
      return;

    default:
      return;
  }
}

export function commonKeyHandler(
  intervention: string,
  char: string,
  state: InterventionState,
  dispatch: any
) {
  if (intervention === InterventionFormat.CoverCopyCompare) {
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
  } else {
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
}

export function commonKeyListener(
  key: React.KeyboardEvent<HTMLElement>,
  state: InterventionState,
  currentApproach: string,
  captureButtonAction: () => void,
  checkLiNullUndefinedBlank: any,
  captureItemClick: any,
  dispatch: any
) {
  if (currentApproach === InterventionFormat.CoverCopyCompare) {
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

      commonKeyHandler(currentApproach, modKey, state, dispatch);
    }

    //return;
  } else {
    if (RelevantKeys.includes(key.key)) {
      let modKey = key.key === "Backspace" ? "Del" : key.key;
      modKey = key.key === "Delete" ? "Del" : modKey;

      if (modKey === " ") {
        if (
          state.CurrentAction !== SharedActionSequence.Entry &&
          state.CurrentAction !== SharedActionSequence.Start
        ) {
          () => captureButtonAction();
          return;
        }

        if (currentApproach === InterventionFormat.CoverCopyCompare) {
          if (!checkLiNullUndefinedBlank(state.NextLiItem)) {
            captureItemClick(state.NextLiItem);
          }
        }

        return;
      }

      modKey = key.key === "*" ? "x" : modKey;
      modKey = key.key === "Enter" ? "=" : modKey;

      commonKeyHandler(currentApproach, modKey, state, dispatch);
    }
  }
}
