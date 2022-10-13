/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../config";
import firebase from "firebase";

import { WhereFilterOp, OrderByDirection } from "@firebase/firestore-types";
import { CollectionInputInterface } from "../interfaces/FirebaseInterfaces";
import {
  onSnapshotEventCollection,
  onSnapshotEventCollectionErr,
} from "./helpers/FirestoreSnapshotHelpers";

/** useFirebaseCollection
 *
 * Access a collection
 *
 * @param {string} collectionString collection address
 * @param {string[]} queryString string array for query
 * @param {string[]} orderString string array for order
 * @returns {documents: T[] | null; error: string | undefined; }
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
    let ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
      projectFirestore.collection(collectionString.trim());
      
    if (query) {
      const [fieldPath, opString, value] = query;

      ref = ref.where(
        fieldPath,
        opString as WhereFilterOp,
        value
      ) as firebase.firestore.CollectionReference;
    }

    if (orderBy) {
      const [fieldPath, direction] = orderBy;

      ref = ref.orderBy(
        fieldPath,
        direction as OrderByDirection
      ) as firebase.firestore.CollectionReference;
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) =>
        onSnapshotEventCollection<T>(snapshot, setDocuments, setError),
      (err) => onSnapshotEventCollectionErr(err, setError)
    );

    return () => unsubscribe();
  }, [collectionString, query, orderBy]);

  return { documents, error };
}
