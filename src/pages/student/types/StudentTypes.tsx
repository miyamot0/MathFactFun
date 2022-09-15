/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MultiValue, SingleValue } from "react-select";
import { SingleOptionType } from "../../../types/SharedComponentTypes";
import { StudentCreatorBehavior } from "../functionality/StudentFunctionality";

export type StudentPayloadObjects = {
    [key: string]:
    | string
    | SingleValue<SingleOptionType>
    | MultiValue<SingleOptionType>
    | number
    | boolean
    | undefined;
};

export type StudentActionObject = {
    type: StudentCreatorBehavior;
    payload: StudentPayloadObjects;
};
