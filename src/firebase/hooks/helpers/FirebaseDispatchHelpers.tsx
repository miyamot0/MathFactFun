/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FirestoreAction } from '../../interfaces/FirebaseInterfaces'

export function complexCollectionGetter(
    collection: string,
    studentId: string | undefined,
    projectFirestore: any,
    targetSkill: string | undefined
) {
    if (collection === '' && studentId !== undefined) {
        return projectFirestore
            .collection('performances')
            .doc(targetSkill)
            .collection(studentId)
    } else if (collection === 'tutorials' && studentId !== undefined) {
        return projectFirestore
            .collection('tutorials')
            .doc(targetSkill)
            .collection(studentId)
    } else {
        return projectFirestore.collection(collection)
    }
}

export function dispatchIfNotCancelledHelper({
    action,
    isCancelled,
    dispatch,
}: {
    action: FirestoreAction
    isCancelled: boolean
    dispatch: any
}) {
    if (!isCancelled) {
        dispatch(action)
    } else {
        return
    }
}
