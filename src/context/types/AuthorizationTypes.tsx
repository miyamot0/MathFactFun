import firebase from "firebase/app";
import { ReactNode } from "react";

export enum AuthorizationStates {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  READY = "READY",
  CLAIMS = "CLAIMS",
}

export interface AuthorizationContextInterface {
  user: firebase.User | null;
  authIsReady: boolean;
  adminFlag: boolean;
  dispatch: any;
}

export interface AuthorizationContextStateInterface {
  user: firebase.User | null;
  authIsReady: boolean;
  adminFlag: boolean;
}

export interface FirebaseLoginAction {
  type: AuthorizationStates;
  payload: firebase.User | null;
  payload2: boolean;
}

export type AuthorizationProviderInterface = {
  children: ReactNode;
};
