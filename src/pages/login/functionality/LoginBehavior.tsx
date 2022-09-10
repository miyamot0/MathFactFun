import { LoginDataBehavior, LoginDataInterface } from "../types/LoginTypes";

export const InitialLoginState: LoginDataInterface = {
  Email: "",
  Password: "",
};

export function UserLoginReducer(
  state: LoginDataInterface,
  action: { type: LoginDataBehavior; payload: string }
): LoginDataInterface {
  switch (action.type) {
    case LoginDataBehavior.SetEmail:
      return { ...state, Email: action.payload };
    case LoginDataBehavior.SetPassword:
      return { ...state, Password: action.payload };

    default:
      throw new Error();
  }
}
