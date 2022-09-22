/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { act, renderHook } from "@testing-library/react-hooks";
import { useFirebaseCollectionTyped } from "../useFirebaseCollection";
import { FirestoreCollections } from "../useFirestore";
import * as Configs from "./../../config";

//import { FirestoreMock } from "../../../__mocks__";

//const FirestoreMock = require("./../../../../__mocks__/FirestoreMock");

/*
jest.mock("firebase/firestore", () => {
  const mChanges = [{ name: "fake data" }];
  const mSnapshot = {
    docChanges: jest.fn().mockReturnValue(mChanges),
  };
  return jest.fn(() => ({
    collection: jest.fn().mockReturnThis(),
    onSnapshot: jest.fn().mockImplementation((callback) => {
      callback(mSnapshot);
    }),
  }));
});
*/

describe("useFirebaseCollectionTyped", () => {
  it("asdf", () => {
    expect(1).toBe(1);
  });
  /*
  const firestoreMock = new FirestoreMock();
  beforeEach(() => {
    firebase.firestore = firestoreMock;
    firestoreMock.reset();
  });

  it("does something", (done) => {
    firestoreMock.mockAddReturn = { id: "test-id" };
    Configs.projectFirestore
      .collection("foobar")
      .add({ foo: "bar" })
      .then((res) => {
        expect(firestoreMock.mockCollection).toBeCalledWith("foobar");
        expect(firestoreMock.mockAdd).toBeCalledWith({ foo: "bar" });
        expect(res.id).toEqual("test-id");
        done();
      })
      .catch(done);
  });
  */
  /*
  test("should pass", async () => {
    const { result } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: FirestoreCollections.Users,
        queryString: ["uid", "=", "123"],
        orderString: undefined,
      })
    );

    const { documents, error } = result.current;

    expect(1).toBe(1);
  });
  */
  /*
  beforeAll(() => {
    const docMock1 = jest.spyOn(Configs.projectFirestore, "collection");
    docMock1.mockImplementation(mockCollectionMethod);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Should fire, with a query", async () => {
    await act(async () => {
      mockCollectionMethod.mockImplementation(() => ({
        where: () => Promise.resolve(() => true),
      }));

      const { result } = renderHook(() =>
        useFirebaseCollectionTyped({
          collectionString: FirestoreCollections.Users,
          queryString: ["uid", "=", "123"],
          orderString: undefined,
        })
      );

      const { documents, error } = result.current;

      expect(1).toBe(1);
    });
  });

  it("Should fire, with a order by", async () => {
    await act(async () => {
      mockCollectionMethod.mockImplementation(() => ({
        orderBy: () => Promise.resolve(() => true),
      }));

      const { result } = renderHook(() =>
        useFirebaseCollectionTyped({
          collectionString: FirestoreCollections.Users,
          queryString: undefined,
          orderString: ["uid"],
        })
      );

      const { documents, error } = result.current;

      expect(1).toBe(1);
    });
  });

  test("should pass", async () => {


    const { result } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: FirestoreCollections.Users,
        queryString: undefined,
        orderString: ["uid"],
      })
    );

    const { documents, error } = result.current;

    expect(1).toBe(1);

    //const StatisticsService = require('./index');

    //await StatisticsService();
  });

  */
  /*
  it("Should fire, with neither", async () => {
    await act(async () => {
      mockCollectionMethod.mockImplementation(() => ({
        onSnapshot: (snapshot: any) => ({
          docs: [
            {
              id: "123",
            },
          ],
        }),
      }));

      const { result } = renderHook(() =>
        useFirebaseCollectionTyped({
          collectionString: FirestoreCollections.Users,
          queryString: undefined,
          orderString: undefined,
        })
      );

      const { documents, error } = result.current;

      expect(documents).toStrictEqual({});
      expect(error).toStrictEqual(undefined);
    });
  });
  */
  /*

  it("Should fire, with neither, spy snapshot", async () => {
    await act(async () => {
      mockCollectionMethod.mockImplementation(() => ({
        add: () => Promise.resolve(() => true),
      }));

      const { result } = renderHook(() =>
        useFirebaseCollectionTyped({
          collectionString: FirestoreCollections.Users,
          queryString: undefined,
          orderString: undefined,
        })
      );

      const { documents, error } = result.current;

      expect(1).toBe(1);
    });
  });

  it("Should fire, with neither, but performances", async () => {
    await act(async () => {
      mockCollectionMethod.mockImplementation(() => ({
        add: () => Promise.resolve(() => true),
      }));

      const { result } = renderHook(() =>
        useFirebaseCollectionTyped({
          collectionString: `${FirestoreCollections.Performances}/uid/Addition`,
          queryString: undefined,
          orderString: undefined,
        })
      );

      const { documents, error } = result.current;

      expect(1).toBe(1);
    });
  });

  */
});
