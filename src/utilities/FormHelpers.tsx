import firebase from "firebase/app";
import { MultiValue } from "react-select";
import { SingleOptionType } from "./RoutingHelpers";
import { StudentCreatorBehavior } from "../pages/student/types/StudentTypes";

export const CommonPanelWidth = {
  minHeight: "600px",
};

export const CommonDisplayHeadingStyle = {
  fontSize: "1.25em",
  color: "var(--heading-style-color)",
  display: "block",
  marginBottom: "6px",
};

export const LoginPanelStyle = {
  maxWidth: "360px",
  margin: "60px auto",
  padding: "40px",
  border: "1px solid #ddd",
  boxShadow: "3px 3px 5px rgba(0,0,0,0.05)",
  background: "#fff",
};

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
