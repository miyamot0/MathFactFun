import { MultiValue } from "react-select";
import { ErrorHandling } from "../../../maths/Facts";
import { SingleOptionType } from "../../../types/SharedComponentTypes";
import { StudentCreatorBehavior } from "../Types/StudentTypes";

export interface StudentCreateState {
  Name: string;
  Names: string[];
  Details: string;
  FormError: undefined | string;
  DueDate: string;
  CurrentApproach: SingleOptionType;
  CurrentGrade: SingleOptionType;
  CurrentTarget: SingleOptionType;
  CurrentErrorApproach: SingleOptionType;
  CurrentSRApproach: SingleOptionType;
  CurrentBenchmarking: MultiValue<SingleOptionType>;
  DidBuild: boolean;
  AimLine: number;
  ExplicitTime: number;
  CurrentProblemSet: SingleOptionType;
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

/**
 * Reducer for create
 *
 * @param {any} state
 * @param {any} action
 * @returns {any}
 */
export function UserCreationReducer(
  state: StudentCreateState,
  action: { type: StudentCreatorBehavior; payload: any }
): StudentCreateState {
  switch (action.type) {
    case StudentCreatorBehavior.SetName:
      return { ...state, Name: action.payload.uName };
    case StudentCreatorBehavior.SetDetails:
      return { ...state, Details: action.payload.uDetails };
    case StudentCreatorBehavior.SetFormError:
      return { ...state, FormError: action.payload.uFormError };
    case StudentCreatorBehavior.SetDueDate:
      return { ...state, DueDate: action.payload.uDueDate };
    case StudentCreatorBehavior.SetCurrentApproach:
      return { ...state, CurrentApproach: action.payload.uCurrentApproach };
    case StudentCreatorBehavior.SetCurrentGrade:
      return { ...state, CurrentGrade: action.payload.uCurrentGrade };
    case StudentCreatorBehavior.SetCurrentTarget:
      return { ...state, CurrentTarget: action.payload.uCurrentTarget };
    case StudentCreatorBehavior.SetCurrentErrorApproach:
      return {
        ...state,
        CurrentErrorApproach: action.payload.uCurrentErrorApproach,
      };
    case StudentCreatorBehavior.SetCurrentSRApproach:
      return { ...state, CurrentSRApproach: action.payload.uCurrentSRApproach };
    case StudentCreatorBehavior.SetCurrentBenchmarking:
      return {
        ...state,
        CurrentBenchmarking: action.payload.uCurrentBenchmarking,
      };
    case StudentCreatorBehavior.SetProblemSet:
      return {
        ...state,
        CurrentProblemSet: action.payload.uProblemSet,
      };
    case StudentCreatorBehavior.SetBuilt:
      return {
        ...state,
        DidBuild: true,
      };
    case StudentCreatorBehavior.SetAimLine:
      return {
        ...state,
        AimLine: action.payload.uAimLine,
      };
    case StudentCreatorBehavior.SetExplicitTime:
      return {
        ...state,
        ExplicitTime: action.payload.uExplicitTime,
      };
    case StudentCreatorBehavior.SetLoadedStudent:
      return {
        ...state,
        Name: action.payload.uName,
        Details: action.payload.uDetails,
        DueDate: action.payload.uDueDate,
        AimLine: action.payload.uAimLine,
        ExplicitTime: action.payload.uExplicitTime,
        CurrentTarget: action.payload.uCurrentTarget,
        CurrentGrade: action.payload.uCurrentGrade,
        CurrentApproach: action.payload.uCurrentApproach,
        CurrentErrorApproach: action.payload.uCurrentErrorApproach,
        CurrentSRApproach: action.payload.uCurrentSRApproach,
        CurrentBenchmarking: action.payload.uCurrentBenchmarking,
        CurrentProblemSet: action.payload.uProblemSet,
      };

    default:
      throw new Error();
  }
}
