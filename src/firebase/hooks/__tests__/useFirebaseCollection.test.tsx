/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from '@testing-library/react-hooks';
import { mockCollection, mockOnSnapshot, mockOrderBy, mockWhere } from '../../../setupTests';
import { useFirebaseCollectionTyped } from '../useFirebaseCollection';

describe('useFirebaseCollectionTyped', () => {
  beforeEach(() => {
    mockOrderBy.mockClear();
    mockWhere.mockClear();
  });

  it('Should fail on bogus query', () => {
    mockCollection.mockImplementationOnce((collection) => {
      throw new Error('Error')
    });

    const { result } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'blerg',
        queryString: undefined,
        orderString: undefined,
      }),
    );

    expect(result.error).not.toBe(undefined);
  });

  it('Should query against firestore, users, no args', () => {
    mockCollection.mockImplementationOnce((collection) => ({
    onSnapshot: mockOnSnapshot.mockImplementation(() => {}),
    where: mockWhere.mockResolvedValue(this),
    orderBy: mockOrderBy.mockResolvedValue(this),
    }));

    const {result} = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'users',
        queryString: undefined,
        orderString: undefined,
      }),
    );

    expect(mockWhere).toBeCalledTimes(0);
    expect(mockOrderBy).toBeCalledTimes(0);
    expect(mockOnSnapshot).toBeCalledTimes(1);
    expect(result.current.error).toBe(undefined)
  });

  it('Should query against firestore, users', () => {
    mockCollection.mockImplementationOnce((collection) => ({
      where: mockWhere.mockReturnThis(),
      orderBy: mockOrderBy.mockReturnThis(),
      onSnapshot: mockOnSnapshot
    }));

    const mockInput = ['uid', '=', '123'];

    const { result } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'users',
        queryString: mockInput,
        orderString: undefined,
      }),
    );

    expect(mockWhere).toBeCalledTimes(1);
    expect(mockOrderBy).toBeCalledTimes(0);
    expect(mockOnSnapshot).toBeCalledTimes(1);
    expect(result.current.error).toBe(undefined)
  });


  it('Should orderby against firestore, users', () => {
    mockCollection.mockImplementationOnce((collection) => ({
      where: mockWhere.mockReturnThis(),
      orderBy: mockOrderBy.mockReturnThis(),
      onSnapshot: mockOnSnapshot
    }));

    const mockInput = ['id', 'asc'];

    const { result } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'users',
        queryString: undefined,
        orderString: mockInput,
      }),
    );

    expect(mockWhere).toBeCalledTimes(0);
    expect(mockOrderBy).toBeCalledTimes(1);
    expect(mockOnSnapshot).toBeCalledTimes(1);
    expect(result.current.error).toBe(undefined)
  });
});