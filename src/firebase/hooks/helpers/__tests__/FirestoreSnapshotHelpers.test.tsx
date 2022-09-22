/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { waitFor } from '@testing-library/react';
import firebase from 'firebase'
import {
    onSnapshotEventCollection,
    onSnapshotEventCollectionErr,
    onSnapshotEventDocument,
    onSnapshotEventDocumentErr
} from '../FirestoreSnapshotHelpers';

describe('onSnapshotEventCollection', () => {
    it('test event', () => {
        const setDocuments = jest.fn();
        const setError = jest.fn();

        const snapshot = ({
            docs: [{
                id: "234234",
                data: () => ({
                    a: 'a',
                    b: 'b',
                })
            }]
        }) as unknown as firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;

        onSnapshotEventCollection(snapshot, setDocuments, setError)

        waitFor(() => {
            expect(setDocuments).toBeCalled();
            expect(setError).toBeCalled();
        })
    })
})

describe('onSnapshotEventCollectionErr', () => {
    it('test event', () => {
        const setError = jest.fn();

        onSnapshotEventCollectionErr({ message: 'err' }, setError);

        waitFor(() => {
            expect(setError).toBeCalledWith("Collection not found or missing");
        })
    })
})

describe('onSnapshotEventDocument', () => {
    it('test event', () => {
        const setDocuments = jest.fn();
        const setError = jest.fn();

        const snapshot = ({
            id: "234234",
            data: () => ({
                a: 'a',
                b: 'b',
            })
        }) as unknown as firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

        onSnapshotEventDocument(snapshot, setDocuments, setError)

        waitFor(() => {
            expect(setDocuments).toBeCalledWith({
                a: 'a',
                b: 'b',
            })
        })
    })

    it('test event, fails with no data', () => {
        const setDocuments = jest.fn();
        const setError = jest.fn();

        const snapshot = ({
            id: "234234",
            data: () => undefined
        }) as unknown as firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

        onSnapshotEventDocument(snapshot, setDocuments, setError)

        waitFor(() => {
            expect(setError).toBeCalledWith("Document has no data or is the wrong type");
        })
    })
})

describe('onSnapshotEventDocumentErr', () => {
    it('test event', () => {

        const setError = jest.fn();

        onSnapshotEventDocumentErr({ message: 'err' }, setError);

        waitFor(() => {
            expect(setError).toBeCalledWith("Document not found or missing");
        })
    })
})
