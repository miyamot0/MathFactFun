/**
 * Firebase document pull
 */

import { useEffect, useState } from "react";
import { StudentDataInterface } from "../models/StudentModel";
import { UserDataInterface } from "../models/UserModel";
import { projectFirestore } from "./config";

const ErrorNoData = "There was not a document at this location";
const ErrorSnapshot = "Unable to get the document";

interface UseFirebaseDocument {
  document: StudentDataInterface | UserDataInterface;
  documentError: string;
}

/** useFirebaseDocument
 *
 * Access a collection
 *
 * @param {string} collectionString collection address
 * @param {string} idString id for student
 * @returns {UseFirebaseDocument}
 */
export function useFirebaseDocument(
  collectionString,
  idString
): UseFirebaseDocument {
  const [document, setDocument] = useState(null);
  const [documentError, setError] = useState(null);

  function pullDocs() {
    const ref = projectFirestore.collection(collectionString).doc(idString);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({
            ...snapshot.data(),
            id: snapshot.id,
          });
          setError(null);
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
  }, [collectionString, idString]);

  return { document, documentError };
}
