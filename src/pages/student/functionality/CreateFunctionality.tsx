import { MultiValue } from "react-select";
import { ErrorHandling } from "../../../maths/Facts";
import { SingleOptionType } from "../../CommonTypes/CommonPageTypes";
import { UserCreatorBehavior } from "../types/StudentTypes";

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
  ProblemSet: string;
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
  ProblemSet: "A",
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
  action: { type: UserCreatorBehavior; payload: any }
): StudentCreateState {
  switch (action.type) {
    case UserCreatorBehavior.SetName:
      return { ...state, Name: action.payload.uName };
    case UserCreatorBehavior.SetDetails:
      return { ...state, Details: action.payload.uDetails };
    case UserCreatorBehavior.SetFormError:
      return { ...state, FormError: action.payload.uFormError };
    case UserCreatorBehavior.SetDueDate:
      return { ...state, DueDate: action.payload.uDueDate };
    case UserCreatorBehavior.SetCurrentApproach:
      return { ...state, CurrentApproach: action.payload.uCurrentApproach };
    case UserCreatorBehavior.SetCurrentGrade:
      return { ...state, CurrentGrade: action.payload.uCurrentGrade };
    case UserCreatorBehavior.SetCurrentTarget:
      return { ...state, CurrentTarget: action.payload.uCurrentTarget };
    case UserCreatorBehavior.SetCurrentErrorApproach:
      return {
        ...state,
        CurrentErrorApproach: action.payload.uCurrentErrorApproach,
      };
    case UserCreatorBehavior.SetCurrentSRApproach:
      return { ...state, CurrentSRApproach: action.payload.uCurrentSRApproach };
    case UserCreatorBehavior.SetCurrentBenchmarking:
      return {
        ...state,
        CurrentBenchmarking: action.payload.uCurrentBenchmarking,
      };
    case UserCreatorBehavior.SetBuilt:
      return {
        ...state,
        DidBuild: true,
      };
    case UserCreatorBehavior.SetAimLine:
      return {
        ...state,
        AimLine: action.payload.uAimLine,
      };
    case UserCreatorBehavior.SetExplicitTime:
      return {
        ...state,
        ExplicitTime: action.payload.uExplicitTime,
      };
    case UserCreatorBehavior.SetLoadedStudent:
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
        ProblemSet: action.payload.uProblemSet,
      };

    default:
      throw new Error();
  }
}
