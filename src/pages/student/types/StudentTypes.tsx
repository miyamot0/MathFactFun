/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MultiValue, SingleValue } from "react-select";
import { SingleOptionType } from "../../../types/SharedComponentTypes";

export type StudentPayloadObjects = {
  [key: string]:
  | string
  | SingleValue<SingleOptionType>
  | MultiValue<SingleOptionType>
  | number
  | boolean
  | undefined;
};

// TODO: restore payload types at end!
export type StudentActionObject = {
  type: StudentCreatorBehavior;
  payload: any;
};

export enum StudentCreatorBehavior {
  SetName,
  SetDetails,
  SetDueDate,
  SetFormError,
  SetCurrentApproach,
  SetCurrentGrade,
  SetCurrentTarget,
  SetCurrentErrorApproach,
  SetCurrentSRApproach,
  SetCurrentBenchmarking,
  SetProblemSet,
  SetAimLine,
  SetExplicitTime,
  SetBuilt,
  SetLoadedStudent,
  SetThrow,
}
