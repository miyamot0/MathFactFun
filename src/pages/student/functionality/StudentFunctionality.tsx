import { MultiValue, SingleValue } from "react-select";
import { ErrorHandling } from "../../../maths/Facts";
import { SingleOptionType } from "../../../types/SharedComponentTypes";
import {
  confirmMultiSingleOptionType,
  confirmNumberType,
  confirmSingleOptionType,
  confirmStringType,
} from "../../../utilities/ReducerHelpers";
import { StudentCreateState } from "../interfaces/StudentInterfaces";

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
}

export const UserCreateSingleInitialState: StudentCreateState = {
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
      return { ...state, Name: confirmStringType(action.payload.uName) };
    case StudentCreatorBehavior.SetDetails:
      return { ...state, Details: confirmStringType(action.payload.uDetails) };
    case StudentCreatorBehavior.SetFormError:
      return {
        ...state,
        FormError:
          action.payload.uFormError === undefined
            ? undefined
            : confirmStringType(action.payload.uFormError),
      };
    case StudentCreatorBehavior.SetDueDate:
      return { ...state, DueDate: confirmStringType(action.payload.uDueDate) };
    case StudentCreatorBehavior.SetCurrentApproach:
      return {
        ...state,
        CurrentApproach: confirmSingleOptionType(
          action.payload.uCurrentApproach
        ),
      };
    case StudentCreatorBehavior.SetCurrentGrade:
      return {
        ...state,
        CurrentGrade: confirmSingleOptionType(action.payload.uCurrentGrade),
      };
    case StudentCreatorBehavior.SetCurrentTarget:
      return {
        ...state,
        CurrentTarget: confirmSingleOptionType(action.payload.uCurrentTarget),
      };
    case StudentCreatorBehavior.SetCurrentErrorApproach:
      return {
        ...state,
        CurrentErrorApproach: confirmSingleOptionType(
          action.payload.uCurrentErrorApproach
        ),
      };
    case StudentCreatorBehavior.SetCurrentSRApproach:
      return {
        ...state,
        CurrentSRApproach: confirmSingleOptionType(
          action.payload.uCurrentSRApproach
        ),
      };
    case StudentCreatorBehavior.SetCurrentBenchmarking:
      return {
        ...state,
        CurrentBenchmarking: confirmMultiSingleOptionType(
          action.payload.uCurrentBenchmarking
        ),
      };
    case StudentCreatorBehavior.SetProblemSet:
      return {
        ...state,
        CurrentProblemSet: confirmSingleOptionType(action.payload.uProblemSet),
      };
    case StudentCreatorBehavior.SetBuilt:
      return {
        ...state,
        DidBuild: true,
      };
    case StudentCreatorBehavior.SetAimLine:
      return {
        ...state,
        AimLine: confirmNumberType(action.payload.uAimLine),
      };
    case StudentCreatorBehavior.SetExplicitTime:
      return {
        ...state,
        ExplicitTime: confirmNumberType(action.payload.uExplicitTime),
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
      throw new Error();
  }
}
