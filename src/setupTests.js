/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

//import React from 'react';

const mockSignInWithPhoneNumber = jest.fn();
const mockWhere = jest.fn();
const mockOrderBy = jest.fn();
const mockCollection = jest.fn();
const mockDoc = jest.fn();
const mockSignInWithPopup = jest.fn();
const mockSignInWithEmailAndPassword = jest.fn();
const mockConfirmOtp = jest.fn();
const mockSignOut = jest.fn();
const mockOnSnapshot = jest.fn();

jest.mock('firebase/app', () => {
  const firestoreObj = {
    Timestamp: jest.fn(() => ({
      fromDate: jest.fn(() => ({ seconds: 0, nanoseconds: 0 })),
      new: jest.fn(() => ({ seconds: 0, nanoseconds: 0 })),
    })),
    collection: mockCollection.mockImplementation((collection) => ({
      where: mockWhere.mockReturnThis(),
      orderBy: mockOrderBy.mockReturnThis(),
      onSnapshot: mockOnSnapshot,
      doc: jest.fn()
    })),
    doc: mockDoc.mockImplementation(() => Promise.resolve(true)),
    set: jest.fn(),
    update: jest.fn(),
    onSnapshot: mockOnSnapshot,
    where: mockWhere.mockImplementation(() => Promise.resolve(true)),
    orderBy: mockOrderBy.mockImplementation(() => Promise.resolve(true)),
  };
  const firestore = jest.fn(() => firestoreObj);

  const authObjectMock = {
    createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
    signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    signInWithPopup: mockSignInWithPopup.mockResolvedValue(
      Promise.resolve({
        user: {
          uid: '123',
          getIdTokenResult: () =>
            Promise.resolve({
              claims: {
                permissions: {
                  Recruitment: false,
                  Administration: false,
                  Demographics: false,
                  Submissions: false,
                },
              },
            }),
        },
        providerId: null,
        operationType: undefined,
      }),
    ),
    signInWithPhoneNumber: mockSignInWithPhoneNumber.mockResolvedValue({
        user: {
          uid: '123',
          getIdTokenResult: () =>
            Promise.resolve({
              claims: {
                permissions: {
                  Recruitment: false,
                  Administration: false,
                  Demographics: false,
                  Submissions: false,
                },
              },
            }),
        },
        providerId: null,
        operationType: undefined,
    }),
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword.mockImplementation((email, password) => 
    Promise.resolve(true)),
    fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
    signOut: mockSignOut.mockImplementation(() => {
      Promise.resolve(true);
    }),
    onAuthStateChanged: jest.fn(),
    currentUser: {
      sendEmailVerification: jest.fn(() => Promise.resolve(true)),
    },
  };

  const auth = jest.fn(() => authObjectMock);
  auth.GoogleAuthProvider = jest.fn();
  auth.FacebookAuthProvider = jest.fn();
  auth.RecaptchaVerifier = jest.fn();
  auth.ConfirmationResult = {
    confirm: mockConfirmOtp.mockImplementation(() => Promise.resolve(true)),
  };

  const cloudFunction = jest.fn(() => {
    return Promise.resolve({});
  });
  const httpsCallable = jest.fn(() => cloudFunction);
  const functions = jest.fn(() => ({
    httpsCallable,
  }));

  return {
    initializeApp: jest.fn(),
    firestore,
    auth,
    functions,
  };
});

const mockHighchartsReact = jest.fn();
jest.mock("highcharts-react-official", () => {
  return mockHighchartsReact;
})

module.exports = {
  mockSignInWithPopup,
  mockSignInWithPhoneNumber,
  mockSignInWithEmailAndPassword,
  mockSignOut,
  mockWhere,
  mockOrderBy,
  mockOnSnapshot,
  mockCollection,
  mockDoc,
  mockConfirmOtp,
  //
  mockHighchartsReact
};
