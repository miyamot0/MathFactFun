/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { developmentConsoleLog } from "../../../utilities/LoggingTools";
import {
  DelCode,
  InterventionActions,
  SharedActionSequence,
} from "../functionality/InterventionBehavior";
import {
  DispatchUpdateEntryInternal,
  InterventionState,
} from "../interfaces/InterventionInterfaces";

/** commonKeyHandlerCCC
 *
 * @param char
 * @param state
 * @param dispatch
 * @returns
 */
export function commonKeyHandlerCCC(
  char: string,
  state: InterventionState,
  dispatch: any
) {
  developmentConsoleLog(
    `commonKeyHandlerCCC(char: ${char}, state.CurrentAction: ${state.CurrentAction}, dispatch: ${dispatch})`
  );

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
    //if (problemParts.length <= 1) return;

    // Rule #6: If first is just whitespace, disregard (i.e., JUST operator)
    if (problemParts[1].trim().length === 0) return;
  }

  if (char === DelCode) {
    // # Rule #7: Exit out if nothin to delete
    if (state.EntryRepresentationInternal.length === 0) return;

    dispatch(
      new DispatchUpdateEntryInternal({
        type: InterventionActions.UpdateResponseEntry,
        payload: {
          EntryRepresentationInternal: state.EntryRepresentationInternal.slice(
            0,
            -1
          ),
        },
      })
    );
  } else {
    const strCheck = state.EntryRepresentationInternal;

    // Row 1 check
    if (
      !strCheck.includes(state.OperatorSymbol) &&
      char !== state.OperatorSymbol &&
      strCheck.length === 2
    ) {
      console.log("rule 1");
      // Note: maxing out first row
      return;
    }

    // Row 2 check
    if (
      strCheck.includes(state.OperatorSymbol) &&
      !strCheck.includes("=") &&
      char !== "="
    ) {
      const strCheck2 = state.EntryRepresentationInternal.split(
        state.OperatorSymbol
      );

      if (strCheck2.length === 2 && strCheck2[1].length === 2) {
        console.log("rule 2");
        // Note maxing out second row
        return;
      }
    }

    // Row 3 check
    if (strCheck.includes("=")) {
      const strCheck3 = state.EntryRepresentationInternal.split("=");

      if (strCheck3.length === 2 && strCheck3[1].length === 2) {
        console.log("rule 3");
        // Note maxing out third row
        return;
      }
    }

    dispatch(
      new DispatchUpdateEntryInternal({
        type: InterventionActions.UpdateResponseEntry,
        payload: {
          EntryRepresentationInternal: state.EntryRepresentationInternal + char,
        },
      })
    );
  }
}

/** commonKeyHandlerET
 *
 * @param char
 * @param state
 * @param dispatch
 * @returns
 */
export function commonKeyHandlerET(
  char: string,
  state: InterventionState,
  dispatch: any
) {
  if (char === DelCode) {
    // # Rule #7: Exit out if nothin to delete
    if (state.EntryRepresentationInternal.length === 0) return;

    dispatch(
      new DispatchUpdateEntryInternal({
        type: InterventionActions.UpdateResponseEntry,
        payload: {
          EntryRepresentationInternal: state.EntryRepresentationInternal.slice(
            0,
            -1
          ),
        },
      })
    );
  } else {
    if (state.EntryRepresentationInternal.length === 3) return;

    dispatch(
      new DispatchUpdateEntryInternal({
        type: InterventionActions.UpdateResponseEntry,
        payload: {
          EntryRepresentationInternal: state.EntryRepresentationInternal + char,
        },
      })
    );
  }
}
