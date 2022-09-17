/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MultiValue } from "react-select";
import { ErrorHandling } from "../../../maths/Facts";
import { SingleOptionType } from "../../../types/SharedComponentTypes";
import {
  confirmMultiSingleOptionType,
  confirmNumberType,
  confirmSingleOptionType,
  confirmStringType,
} from "../../../utilities/ReducerHelpers";
import { StudentCreateState } from "../interfaces/StudentInterfaces";
import {
  StudentActionObject,
  StudentCreatorBehavior,
} from "../types/StudentTypes";

export const StudentCreateSingleInitialState: StudentCreateState = {
  Name: "",
  Names: [],
  Details: "",
  FormError: undefined,
  DueDate: "",
  CurrentApproach: {
    value: "N/A",
    label: "No Current Intervention",
  } as SingleOptionType,
  CurrentGrade: {
    value: "N/A",
    label: "No Current Intervention",
  } as SingleOptionType,
  CurrentTarget: {
    value: "N/A",
    label: "No Current Target",
  } as SingleOptionType,
  CurrentErrorApproach: {
    value: ErrorHandling.EveryTime,
    label: "Give feedback every time",
  } as SingleOptionType,
  CurrentSRApproach: {
    value: "None",
    label: "No programmed contingencies",
  } as SingleOptionType,
  CurrentBenchmarking: [] as MultiValue<SingleOptionType>,
  DidBuild: false,
  AimLine: 0,
  ExplicitTime: 2,
  CurrentProblemSet: {
    value: "A",
    label: "A",
  } as SingleOptionType,
};

/** userCreationReducer
 *
 * Reducer for creating/editing student
 *
 * @param {StudentCreateState} state
 * @param {StudentActionObject} action
 * @returns {StudentCreateState}
 */
export function userCreationReducer(
  state: StudentCreateState,
  action: StudentActionObject
): StudentCreateState {
  switch (action.type) {
    case StudentCreatorBehavior.SetName:
      return { ...state, Name: confirmStringType(action.payload) };
    case StudentCreatorBehavior.SetDetails:
      return { ...state, Details: confirmStringType(action.payload) };
    case StudentCreatorBehavior.SetFormError:
      return {
        ...state,
        FormError:
          action.payload === undefined || action.payload === null
            ? undefined
            : confirmStringType(action.payload),
      };
    case StudentCreatorBehavior.SetDueDate:
      return { ...state, DueDate: confirmStringType(action.payload) };
    case StudentCreatorBehavior.SetCurrentApproach:
      return {
        ...state,
        CurrentApproach: confirmSingleOptionType(
          action.payload
        ),
      };
    case StudentCreatorBehavior.SetCurrentGrade:
      return {
        ...state,
        CurrentGrade: confirmSingleOptionType(action.payload),
      };
    case StudentCreatorBehavior.SetCurrentTarget:
      return {
        ...state,
        CurrentTarget: confirmSingleOptionType(action.payload),
      };
    case StudentCreatorBehavior.SetCurrentErrorApproach:
      return {
        ...state,
        CurrentErrorApproach: confirmSingleOptionType(
          action.payload
        ),
      };
    case StudentCreatorBehavior.SetCurrentSRApproach:
      return {
        ...state,
        CurrentSRApproach: confirmSingleOptionType(
          action.payload
        ),
      };
    case StudentCreatorBehavior.SetCurrentBenchmarking:
      return {
        ...state,
        CurrentBenchmarking: confirmMultiSingleOptionType(
          action.payload
        ),
      };
    case StudentCreatorBehavior.SetProblemSet:
      return {
        ...state,
        CurrentProblemSet: confirmSingleOptionType(action.payload),
      };
    case StudentCreatorBehavior.SetBuilt:
      return {
        ...state,
        DidBuild: true,
      };
    case StudentCreatorBehavior.SetAimLine:
      return {
        ...state,
        AimLine: confirmNumberType(action.payload),
      };
    case StudentCreatorBehavior.SetExplicitTime:
      return {
        ...state,
        ExplicitTime: confirmNumberType(action.payload),
      };
    case StudentCreatorBehavior.SetLoadedStudent:
      return {
        ...state,
        Name: confirmStringType(action.payload.uName),
        Details: confirmStringType(action.payload.uDetails),
        DueDate: confirmStringType(action.payload.uDueDate),
        AimLine: confirmNumberType(action.payload.uAimLine),
        ExplicitTime: confirmNumberType(action.payload.uExplicitTime),
        CurrentTarget: confirmSingleOptionType(action.payload.uCurrentTarget),
        CurrentGrade: confirmSingleOptionType(action.payload.uCurrentGrade),
        CurrentApproach: confirmSingleOptionType(
          action.payload.uCurrentApproach
        ),
        CurrentErrorApproach: confirmSingleOptionType(
          action.payload.uCurrentErrorApproach
        ),
        CurrentSRApproach: confirmSingleOptionType(
          action.payload.uCurrentSRApproach
        ),
        CurrentBenchmarking: confirmMultiSingleOptionType(
          action.payload.uCurrentBenchmarking
        ),
        CurrentProblemSet: confirmSingleOptionType(action.payload.uProblemSet),
      };

    default:
      return state;
  }
}
