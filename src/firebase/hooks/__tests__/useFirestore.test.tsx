import { renderHook } from "@testing-library/react-hooks";
import { useReducer } from "react";
import { act } from "react-dom/test-utils";
import { FirestoreAction } from "../../interfaces/FirebaseInterfaces";
import { firestoreReducer, FirestoreStates } from "../useFirestore";

const mockInitialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

describe("useFirestore", () => {
  it("Should have persisting state", () => {
    const { result } = renderHook(() =>
      useReducer(firestoreReducer, mockInitialState)
    );
    const [state] = result.current;

    expect(mockInitialState).toBe(state);
  });

  it("Response: PENDING", () => {
    act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState)
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.PENDING,
        payload: {} as FirestoreAction,
        error: null,
      });

      await waitForValueToChange(() => result.current[0]);

      expect(result.current[0]).toStrictEqual({
        isPending: true,
        document: null,
        success: false,
        error: null,
      });
    });
  });

  it("Response: ADDED", () => {
    act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState)
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.ADDED,
        payload: {} as FirestoreAction,
        error: null,
      });

      await waitForValueToChange(() => result.current[0]);

      expect(result.current[0]).toStrictEqual({
        isPending: false,
        document: {},
        success: true,
        error: null,
      });
    });
  });

  it("Response: DELETED", () => {
    act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState)
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.DELETED,
        payload: {} as FirestoreAction,
        error: null,
      });

      await waitForValueToChange(() => result.current[0]);

      expect(result.current[0]).toStrictEqual({
        isPending: false,
        document: null,
        success: true,
        error: null,
      });
    });
  });

  it("Response: UPDATED", () => {
    act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState)
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.UPDATED,
        payload: {} as FirestoreAction,
        error: null,
      });

      await waitForValueToChange(() => result.current[0]);

      expect(result.current[0]).toStrictEqual({
        isPending: false,
        document: {},
        success: true,
        error: null,
      });
    });
  });

  it("Response: ERROR", () => {
    act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState)
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.ERROR,
        payload: {} as FirestoreAction,
        error: null,
      });

      await waitForValueToChange(() => result.current[0]);

      expect(result.current[0]).toStrictEqual({
        isPending: false,
        document: null,
        success: false,
        error: null,
      });
    });
  });

  /*
  
    it("Should update email", async () => {
      await act(async () => {
        const { result, waitForValueToChange } = renderHook(() =>
          useReducer(UserLoginReducer, InitialLoginState)
        );
  
        const [, dispatch] = result.current;
        const newEmail = "newEmail";
  
        dispatch({
          type: LoginDataBehavior.SetEmail,
          payload: newEmail,
        });
  
        await waitForValueToChange(() => result.current[0].Email);
        expect(result.current[0].Email).toBe(newEmail);
      });
    });
  
    it("Should update password", async () => {
      await act(async () => {
        const { result, waitForValueToChange } = renderHook(() =>
          useReducer(UserLoginReducer, InitialLoginState)
        );
  
        const [, dispatch] = result.current;
        const newPassword = "newPassword";
  
        dispatch({
          type: LoginDataBehavior.SetPassword,
          payload: newPassword,
        });
  
        await waitForValueToChange(() => result.current[0].Password);
  
        expect(result.current[0].Password).toBe(newPassword);
      });
    });
  
    it("Off-type should return state unchanged", async () => {
      await act(async () => {
        const { result, waitForValueToChange } = renderHook(() =>
          useReducer(UserLoginReducer, InitialLoginState)
        );
  
        const [state, dispatch] = result.current;
        const newPassword = "newPassword";
  
        dispatch({
          type: "asdf" as unknown as LoginDataBehavior,
          payload: newPassword,
        });
  
        await waitForValueToChange(() => result.current[0]);
  
        expect(result.current[0]).toStrictEqual(state);
      });
    });
    */
});
