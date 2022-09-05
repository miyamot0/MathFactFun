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
import { UserDataInterface } from "../models/UserModel";
import { projectFirestore } from "./config";
import {
  StudentDataInterface,
  UseFirebaseDocument,
} from "./types/GeneralTypes";

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
export function useFirebaseDocument(
  collectionString: string,
  idString: string | undefined
): UseFirebaseDocument {
  const [document, setDocument] = useState<
    null | StudentDataInterface | UserDataInterface
  >(null);
  const [documentError, setError] = useState<string>();

  function pullDocs() {
    const ref = projectFirestore.collection(collectionString).doc(idString);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          let id = snapshot.id as string;

          if (snapshot.data() as StudentDataInterface) {
            let object = snapshot.data() as StudentDataInterface;
            object.id = id;

            setDocument(object);
          }

          if (snapshot.data() as UserDataInterface) {
            let object = snapshot.data() as UserDataInterface;
            object.id = id;

            setDocument(object);
          }

          setError(undefined);
        } else {
          setError(ErrorNoData);
        }
      },
      (err) => {
        setError(ErrorSnapshot);
      }
    );

    return () => unsubscribe;
  }

  useEffect(() => {
    pullDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionString, idString]);

  return { document, documentError };
}
