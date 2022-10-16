/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MultiValue, SingleValue } from 'react-select'
import { SingleOptionType } from '../../../types/SharedComponentTypes'

export type StudentPayloadObjects = {
    [key: string]:
        | string
        | SingleValue<SingleOptionType>
        | MultiValue<SingleOptionType>
        | number
        | boolean
        | undefined
}

// TODO: restore payload types at end!
//export type StudentActionObject = {
//  type: StudentCreatorBehavior;
//  payload: any;
//};

export enum StudentCreatorBehavior {
    SetName = 1000,
    SetDetails = 1001,
    SetDueDate = 1002,
    SetFormError = 1003,
    SetCurrentApproach = 1004,
    SetCurrentGrade = 1005,
    SetCurrentTarget = 1006,
    SetCurrentErrorApproach = 1007,
    SetCurrentSRApproach = 1008,
    SetCurrentBenchmarking = 1009,
    SetProblemSet = 1010,
    SetAimLine = 1011,
    SetExplicitTime = 1012,
    SetBuilt = 1013,
    SetLoadedStudent = 1014,
    SetThrow = 1015,
    SetLoadedStudents = 1016,
    SetToggleSelectedStudent = 1017,
}
