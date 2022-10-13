/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { StudentDataInterface } from '../../../pages/student/interfaces/StudentInterfaces';
import { useFirebaseDocumentTyped } from '../useFirebaseDocument';

describe('useFirebaseDocumentTyped', () => {
  it('Should fail on bogus query', async () => {
    const { result } = renderHook(() =>
      useFirebaseDocumentTyped<StudentDataInterface>({
        collectionString: 'students',
        idString: '123',
      }),
    );
  });
});