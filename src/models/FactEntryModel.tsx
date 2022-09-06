/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase/app";

export interface FactDataInterface {
  // Bools
  factCorrect?: boolean | null;
  initialTry?: boolean | null;

  // Strings
  factType?: string | undefined;
  factString?: string | undefined;
  factEntry?: string | undefined;

  // Numerics
  latencySeconds?: number | null;

  // Timestamps
  dateTimeEnd?: firebase.firestore.Timestamp;
  dateTimeStart?: firebase.firestore.Timestamp;
}

export interface FactModelInterface {
  data: FactDataInterface;
  CheckObject: () => boolean;
  SubmitObject: () => FactDataInterface;
}

export function FactEntryModel(): FactModelInterface {
  return {
    data: {
      // Bools
      factCorrect: null,
      initialTry: null,

      // Strings
      factType: undefined,
      factString: undefined,
      factEntry: undefined,

      // Numerics
      latencySeconds: null,

      // Timestamps
      dateTimeEnd: undefined,
      dateTimeStart: undefined,
    },
    CheckObject: function (): boolean {
      if (typeof this.data.factCorrect !== "boolean") return false;
      if (typeof this.data.initialTry !== "boolean") return false;

      if (typeof this.data.factType !== "string") return false;
      if (typeof this.data.factString !== "string") return false;
      if (typeof this.data.factEntry !== "string") return false;

      if (typeof this.data.latencySeconds !== "number") return false;

      if (!(this.data.dateTimeStart instanceof firebase.firestore.Timestamp))
        return false;
      if (!(this.data.dateTimeEnd instanceof firebase.firestore.Timestamp))
        return false;

      return true;
    },
    SubmitObject: function (): FactDataInterface {
      return this.data as FactDataInterface;
    },
  };
}
