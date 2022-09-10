import { UserCreatorBehavior } from "../types/UserTypes";

export interface UserDataState {
  Name: string;
  School: string;
  Email: string;
  id: null | string;
}

export const UserDataInitialState: UserDataState = {
  Name: "",
  Email: "",
  School: "",
  id: null,
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
    case UserCreatorBehavior.SetSchool:
      return { ...state, School: action.payload.uSchool };
    case UserCreatorBehavior.SetLoadedUser:
      return {
        ...state,
        Name: action.payload.uName,
        Email: action.payload.uEmail,
        School: action.payload.uSchool,
        id: action.payload.uid,
      };

    default:
      throw new Error();
  }
}
