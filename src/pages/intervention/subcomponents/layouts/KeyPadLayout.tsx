/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { InterventionFormat } from "../../../../maths/Facts";
import { commonKeyHandler } from "../../helpers/DispatchingHelpers";
import { InterventionState } from "../../interfaces/InterventionInterfaces";
import KeyPad from "../KeyPad";

export default function KeyPadLayout({
  className,
  state,
  intervention,
  dispatch,
  showEquals,
}: {
  className: string;
  state: InterventionState;
  intervention: string;
  dispatch: any;
  showEquals: boolean;
}): JSX.Element {
  // Note: this cuts off keys when not relevant
  const operatorScreen =
    intervention === InterventionFormat.CoverCopyCompare
      ? state.OperatorSymbol
      : undefined;

  return (
    <div
      className={className}
      style={{
        opacity: state.CoverProblemItem ? 0.5 : 1,
      }}
    >
      <KeyPad
        callBackFunction={(key: string) => {
          commonKeyHandler(intervention, key, state, dispatch);
        }}
        operatorSymbol={operatorScreen}
        showEquals={showEquals}
      />
    </div>
  );
}
