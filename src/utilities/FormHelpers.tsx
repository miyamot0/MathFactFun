import firebase from "firebase/app";
import { MultiValue } from "react-select";
import { SingleOptionType } from "../pages/CommonTypes/CommonPageTypes";
import { StudentCreatorBehavior } from "../pages/student/types/StudentTypes";

export function checkInputNullOrUndefined(
  value:
    | string
    | number
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
      type: StudentCreatorBehavior.SetFormError,
      payload: { uFormError: err },
    });
  }

  return statusOfCheck;
}
