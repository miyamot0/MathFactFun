import { UserDataInterface } from "../../../models/UserModel";

export interface UserWidgetInterface {
  user: UserDataInterface;
}

export enum UserCreatorBehavior {
  SetId,
  SetName,
  SetSchool,
  SetEmail,
  SetPassword,
  SetLoadedUser,
  SetFormError,
}
