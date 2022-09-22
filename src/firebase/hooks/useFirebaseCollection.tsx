/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../config";

import {
  Query,
  WhereFilterOp,
  OrderByDirection,
} from "@firebase/firestore-types";
import { FirestoreCollections } from "./useFirestore";
import { FirebaseError } from "@firebase/util";
import { CollectionInputInterface } from "../interfaces/FirebaseInterfaces";

const CollectionError = "Unable to retrieve data";

/** useFirebaseCollection
 *
 * Access a collection
 *
 * @param {string} collectionString collection address
 * @param {string[]} queryString string array for query
 * @param {string[]} orderString string array for order
 * @returns {useFirebaseCollectionTyped}
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export function useFirebaseCollectionTyped<T>({
  collectionString,
  queryString,
  orderString,
}: CollectionInputInterface): {
  documents: T[] | null;
  error: string | undefined;
} {
  const [documents, setDocuments] = useState<T[] | null>(null);
  const [error, setError] = useState<string>();

  const query = useRef(queryString).current;
  const orderBy = useRef(orderString).current;

  useEffect(() => {
    let ref: Query = projectFirestore.collection(collectionString);

    if (query) {
      const [fieldPath, opString, value] = query;

      ref = ref.where(fieldPath, opString as WhereFilterOp, value);
    }
    if (orderBy) {
      const [fieldPath, direction] = orderBy;

      ref = ref.orderBy(fieldPath, direction as OrderByDirection);
    }

    if (
      collectionString === FirestoreCollections.Students ||
      collectionString === FirestoreCollections.Users
    ) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          setDocuments(
            snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              } as unknown as T;
            })
          );
          setError(undefined);
        },
        (err: unknown) => {
          if (err instanceof FirebaseError) {
            setError(err.message);
          } else {
            setError(CollectionError);
          }
        }
      );

      return () => unsubscribe();
    }

    const stringSplit: string[] = collectionString.split("/");

    if (
      stringSplit.length > 0 &&
      stringSplit[0] === FirestoreCollections.Performances
    ) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          setDocuments(
            snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              } as unknown as T;
            })
          );
          setError(undefined);
        },
        (err: unknown) => {
          if (err instanceof FirebaseError) {
            setError(err.message);
          } else {
            setError(CollectionError);
          }
        }
      );

      return () => unsubscribe();
    }
  }, [collectionString, query, orderBy]);

  return { documents, error };
}
