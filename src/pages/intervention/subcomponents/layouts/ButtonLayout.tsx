/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import firebase from "firebase";
import { sharedButtonActionSequence } from "../../helpers/InterventionHelpers";
import { InterventionState } from "../../interfaces/InterventionInterfaces";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";

export default function ButtonLayout({
  user,
  id,
  approach,
  document,
  state,
  openModal,
  addDocument,
  updateDocument,
  addResponse,
  history,
  dispatch,
  className,
}: {
  user: firebase.User | null;
  id: string;
  approach: string;
  document: StudentDataInterface | null;
  state: InterventionState;
  openModal: any;
  addDocument: any;
  updateDocument: any;
  addResponse: any;
  history: any;
  dispatch: any;
  className: string;
}): JSX.Element {
  return (
    <div className={className}>
      <section>
        <button
          className="global-btn"
          onClick={() => {
            sharedButtonActionSequence(
              user,
              id,
              approach,
              document,
              state,
              openModal,
              addDocument,
              updateDocument,
              addResponse,
              history,
              dispatch
            );
          }}
        >
          {state.ButtonText}
        </button>
      </section>
    </div>
  );
}
