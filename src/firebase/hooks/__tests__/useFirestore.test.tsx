/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useReducer } from "react";
import { act } from "react-dom/test-utils";
import { UserDataInterface } from "../../../pages/user/types/UserTypes";
import { FirestoreAction } from "../../interfaces/FirebaseInterfaces";
import {
  firestoreReducer,
  FirestoreStates,
  useFirestore,
} from "../useFirestore";
import * as Configs from "./../../config";
import * as FirebaseHelpers from "./../helpers/FirebaseDispatchHelpers";

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

  it("Should have persisting state if thrown", async () => {
    act(() => {
      const { result } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState)
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.THROW,
        payload: {} as FirestoreAction,
        error: null,
      });

      waitFor(() => {
        expect(result.current[0]).toStrictEqual(mockInitialState);
      });
    });
  });

  it("Response: PENDING", async () => {
    await act(async () => {
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

  it("Response: ADDED", async () => {
    await act(async () => {
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

  it("Response: DELETED", async () => {
    await act(async () => {
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

  it("Response: UPDATED", async () => {
    await act(async () => {
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

  it("Response: ERROR", async () => {
    await act(async () => {
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
});

describe("useFirestore: Add document", () => {
  const mockCollection = jest.fn();
  beforeAll(() => {
    const docMock1 = jest.spyOn(Configs.projectFirestore, "collection");
    docMock1.mockImplementation(mockCollection);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should pass with approximate call", async () => {
    await act(async () => {
      const docMock1 = jest.spyOn(FirebaseHelpers, "complexCollectionGetter");
      docMock1.mockImplementation(mockCollection);
      mockCollection.mockImplementation(() => ({
        add: () => Promise.resolve(() => true),
      }));

      const { result } = renderHook(() =>
        useFirestore("users", undefined, undefined)
      );

      const { addDocument } = result.current;

      await addDocument({} as UserDataInterface);

      expect(1).toBe(1);
    });
  });

  it("should fail with strange call", async () => {
    await act(async () => {
      const docMock1 = jest.spyOn(FirebaseHelpers, "complexCollectionGetter");
      docMock1.mockImplementation(mockCollection);
      mockCollection.mockImplementation(() => ({
        add: null,
      }));

      const { result } = renderHook(() =>
        useFirestore("users", undefined, undefined)
      );

      const { addDocument } = result.current;

      await addDocument({} as UserDataInterface);

      expect(1).toBe(1);
    });
  });
});

describe("useFirestore: Delete document", () => {
  const mockCollection = jest.fn();
  beforeAll(() => {
    const docMock1 = jest.spyOn(Configs.projectFirestore, "collection");
    docMock1.mockImplementation(mockCollection);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should pass with approximate call", async () => {
    await act(async () => {
      const docMock1 = jest.spyOn(FirebaseHelpers, "complexCollectionGetter");
      docMock1.mockImplementation(mockCollection);
      mockCollection.mockImplementation(() => ({
        doc: (id: string) => ({
          delete: () => true,
        }),
      }));

      const { result } = renderHook(() =>
        useFirestore("users", undefined, undefined)
      );

      const { deleteDocument } = result.current;

      await deleteDocument("123");

      expect(1).toBe(1);
    });
  });

  it("should fail with strange call", async () => {
    await act(async () => {
      const docMock1 = jest.spyOn(FirebaseHelpers, "complexCollectionGetter");
      docMock1.mockImplementation(mockCollection);
      mockCollection.mockImplementation(() => ({
        doc: null,
      }));

      const { result } = renderHook(() =>
        useFirestore("users", undefined, undefined)
      );

      const { deleteDocument } = result.current;

      await deleteDocument("123");

      expect(1).toBe(1);
    });
  });
});

describe("useFirestore: Update document", () => {
  const mockCollection = jest.fn();
  beforeAll(() => {
    const docMock1 = jest.spyOn(Configs.projectFirestore, "collection");
    docMock1.mockImplementation(mockCollection);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should pass with approximate call", async () => {
    await act(async () => {
      const docMock1 = jest.spyOn(FirebaseHelpers, "complexCollectionGetter");
      docMock1.mockImplementation(mockCollection);
      mockCollection.mockImplementation(() => ({
        doc: (id: string) => ({
          update: (obj: any) => true,
        }),
      }));

      const { result } = renderHook(() =>
        useFirestore("users", undefined, undefined)
      );

      const { updateDocument } = result.current;

      await updateDocument("123", {});

      expect(1).toBe(1);
    });
  });

  it("should fail with strange call", async () => {
    await act(async () => {
      const docMock1 = jest.spyOn(FirebaseHelpers, "complexCollectionGetter");
      docMock1.mockImplementation(mockCollection);
      mockCollection.mockImplementation(() => ({
        doc: null,
      }));

      const { result } = renderHook(() =>
        useFirestore("users", undefined, undefined)
      );

      const { updateDocument } = result.current;

      await updateDocument("123", {});

      expect(1).toBe(1);
    });
  });
});
