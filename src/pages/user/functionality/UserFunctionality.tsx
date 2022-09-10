import { UserCreatorBehavior } from "../types/UserTypes";

export interface UserDataState {
  Name: string;
  School: string;
  Email: string;
  Password: string;
  id: null | string;
  FormError: undefined | string;
  DidBuild: boolean;
}

export const UserDataInitialState: UserDataState = {
  Name: "",
  Email: "",
  Password: "",
  School: "",
  id: null,
  FormError: undefined,
  DidBuild: false,
};

/**
 * Reducer for create
 *
 * @param {any} state
 * @param {any} action
 * @returns {any}
 */
export function UserGenerationReducer(
  state: UserDataState,
  action: { type: UserCreatorBehavior; payload: any }
): UserDataState {
  switch (action.type) {
    case UserCreatorBehavior.SetName:
      return { ...state, Name: action.payload.uName };
    case UserCreatorBehavior.SetEmail:
      return { ...state, Email: action.payload.uEmail };
    case UserCreatorBehavior.SetPassword:
      return { ...state, Password: action.payload.uPassword };
    case UserCreatorBehavior.SetSchool:
      return { ...state, School: action.payload.uSchool };
    case UserCreatorBehavior.SetLoadedUser:
      return {
        ...state,
        Name: action.payload.uName,
        Email: action.payload.uEmail,
        School: action.payload.uSchool,
        id: action.payload.uid,
        DidBuild: true,
      };
    case UserCreatorBehavior.SetFormError:
      return { ...state, FormError: action.payload.uFormError };

    default:
      throw new Error();
  }
}
