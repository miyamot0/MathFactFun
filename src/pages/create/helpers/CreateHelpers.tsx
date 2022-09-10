import firebase from "firebase/app";
import { MultiValue } from "react-select";
import { SingleOptionType } from "../../CommonTypes/CommonPageTypes";
import { UserCreatorBehavior } from "../types/CreateTypes";

export function checkInputNullOrUndefined(
  value:
    | string
    | SingleOptionType
    | MultiValue<SingleOptionType>
    | firebase.User
    | null
    | undefined
) {
  if (value === null) return true;
  if (value === undefined) return true;
  return false;
}

export function streamlinedCheck(
  value: string | SingleOptionType,
  err: string,
  dispatch: any
): boolean {
  let statusOfCheck = true;

  if (typeof value === "string") {
    statusOfCheck = checkInputNullOrUndefined(value);
  } else if (value as SingleOptionType) {
    statusOfCheck = value.value.trim().length < 1;
  }

  if (statusOfCheck) {
    dispatch({
      type: UserCreatorBehavior.SetFormError,
      payload: { uFormError: err },
    });
  }

  return statusOfCheck;
}
