/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Firebase document pull
 */

import { useEffect, useState } from "react";
import { projectFirestore } from "./config";
import { studentConverter } from "./converters/GeneralConverters";
import {
  DocumentInputInterface,
} from "./types/GeneralTypes";
import { FirestoreCollections } from "./useFirestore";

const ErrorNoData = "There was not a document at this location";
const ErrorSnapshot = "Unable to get the document";

/** useFirebaseDocument
 *
 * Access a collection
 *
 * @param {string} collectionString collection address
 * @param {string} idString id for student
 * @returns {UseFirebaseDocument}
 */
export function useFirebaseDocumentTyped<T>(
  {
    collectionString,
    idString
  }: DocumentInputInterface
): {
  document: T | null;
  documentError: string | undefined;
} {
  const [document, setDocument] = useState<T | null>(null);
  const [documentError, setError] = useState<string>();

  function pullDocs() {
    const ref = projectFirestore.collection(collectionString).doc(idString);

    if (collectionString === FirestoreCollections.Students) {
      const unsubscribe = ref.withConverter(studentConverter).onSnapshot(
        (snapshot) => {
          if (snapshot.data()) {
            setDocument({
              ...snapshot.data(),
              id: snapshot.id,
            } as unknown as T);
          } else {
            setError(ErrorNoData);
          }
        },
        (error) => {
          setError(ErrorSnapshot);
        }
      );

      return () => unsubscribe();
    }
  }

  useEffect(() => {
    pullDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionString, idString]);

  return { document, documentError };
}
