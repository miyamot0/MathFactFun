import { ErrorHandling } from "../../../maths/Facts";
import { SingleOptionType } from "../../CommonTypes/CommonPageTypes";
import { UserCreatorBehavior } from "../types/CreateTypes";

export interface StudentCreateState {
  Name: string;
  Details: string;
  FormError: undefined | string;
  DueDate: string;
  CurrentApproach: SingleOptionType;
  CurrentGrade: SingleOptionType;
  CurrentTarget: SingleOptionType;
  CurrentErrorApproach: SingleOptionType;
  CurrentSRApproach: SingleOptionType;
  CurrentBenchmarking: undefined | any;
}

export const UserCreateSingleInitialState: StudentCreateState = {
  Name: "",
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

  CurrentBenchmarking: undefined,
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
  action: any
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

    default:
      throw new Error(action.type);
  }
}
