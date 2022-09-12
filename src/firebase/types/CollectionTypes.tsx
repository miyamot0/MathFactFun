/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PerformanceDataInterface } from "../../pages/intervention/types/InterventionTypes";
import { StudentDataInterface } from "../../pages/student/interfaces/StudentInterfaces";
import { UserDataInterface } from "../../pages/user/types/UserTypes";

export type CurrentObjectTypeArrays =
  | StudentDataInterface[]
  | PerformanceDataInterface[]
  | UserDataInterface[]
  | null;

export type PossibleCollectionType =
  | StudentDataInterface[]
  | PerformanceDataInterface[]
  | UserDataInterface[]
  | null;

