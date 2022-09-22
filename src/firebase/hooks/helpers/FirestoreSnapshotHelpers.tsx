/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";

/** onSnapshotEventDocument
 * 
 * @param snapshot 
 * @param setDocument 
 * @param setError 
 */
export function onSnapshotEventDocument<T>(snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
    setDocument: (value: React.SetStateAction<T | null>) => void,
    setError: (value: React.SetStateAction<string | undefined>) => void): void {

    if (snapshot.data()) {
        setDocument({
            ...snapshot.data(),
            id: snapshot.id,
        } as unknown as T);
    } else {
        setError("Document has no data or is the wrong type");
    }
}

/** onSnapshotEventDocumentErr
 * 
 * @param err 
 * @param setError 
 */
export function onSnapshotEventDocumentErr(err: unknown,
    setError: (value: React.SetStateAction<string | undefined>) => void): void {
    setError("Document not found or missing");
}

/** onSnapshotEventCollection
 * 
 * @param snapshot 
 * @param setDocuments 
 * @param setError 
 */
export function onSnapshotEventCollection<T>(snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>,
    setDocuments: (value: React.SetStateAction<T[] | null>) => void,
    setError: (value: React.SetStateAction<string | undefined>) => void): void {

    setDocuments(
        snapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            } as unknown as T;
        })
    );
    setError(undefined);
}

/** onSnapshotEventCollectionErr
 * 
 * @param err 
 * @param setError 
 */
export function onSnapshotEventCollectionErr(err: unknown,
    setError: (value: React.SetStateAction<string | undefined>) => void): void {
    setError("Collection not found or missing");
}