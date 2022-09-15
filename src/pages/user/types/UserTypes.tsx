export interface UserDataInterface {
  id: string | undefined | null;
  displayEmail: string;
  displayName: string;
  displaySchool: string;
}

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
  SetThrow,
}
