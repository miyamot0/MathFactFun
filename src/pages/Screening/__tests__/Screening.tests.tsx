/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from "enzyme";
import firebase from "firebase";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Screening from "../Screening";
import { render, waitFor } from "@testing-library/react";
import * as UseAuthProvider from '../../../context/hooks/useAuthorizationContext'
import * as UseCollectionMethods from '../../../firebase/hooks/useFirebaseCollection'
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";
import { PerformanceDataInterface } from "../../intervention/interfaces/InterventionInterfaces";

Enzyme.configure({ adapter: new Adapter() });

const mockId = "123";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
  }),
  useRouteMatch: () => ({ url: `/Screening/${mockId}` }),
}));

const generateObject = () => {
  return {
    documents: [] as PerformanceDataInterface[],
    error: undefined
  }
}

describe("Screening", () => {
  it("Should render, no admin", () => {
    const docMock = jest.spyOn(UseAuthProvider, 'useAuthorizationContext');
    docMock.mockImplementationOnce(() => ({
      user: { uid: "456" } as firebase.User,
      adminFlag: false,
      authIsReady: true,
      dispatch: jest.fn(() => true),
    }))

    /*

    mockCollection.mockReturnValue({
      correctDigits: 1,
      errCount: 1,
      nCorrectInitial: 1,
      nRetries: 1,
      sessionDuration: 1,
      setSize: 1,
      totalDigits: 1,

      // Arrays
      entries: [
        {
          factCorrect: true,
          initialTry: true,

          // Strings
          factType: "Addition",
          factString: "1+1=2",
          factEntry: "1+1=2",

          // Numerics
          latencySeconds: 1,

          // Timestamps
          dateTimeEnd: firebase.firestore.Timestamp.fromDate(
            new Date("09/14/2022")
          ),
          dateTimeStart: firebase.firestore.Timestamp.fromDate(
            new Date("09/14/2022")
          ),
        },
      ] as FactDataInterface[],

      // Strings
      id: "123",
      creator: "456",
      target: "Addition",
      method: "ExplicitTiming",
      dateTimeEnd: "09/14/2022",
      dateTimeStart: "09/14/2022",
      // Timestamps
      createdAt: null,
    })

    */

    /*
    const docMock2 = jest.spyOn(UseCollectionMethods, 'useFirebaseCollectionTyped');
    docMock2.mockImplementation(() => ({
      documents: [] as PerformanceDataInterface[],
      error: undefined
    }));
    */

    //  .mockImplementationOnce(() => { return generateObject() })
    //  .mockImplementationOnce(() => { return generateObject() })
    //  .mockImplementationOnce(() => { return generateObject() })

    waitFor(() => {
      expect(() => render(
        <MemoryRouter>
          <Screening />
        </MemoryRouter>
      )).not.toThrow()
    })
  })

  it("Should render, with admin", () => {
    const docMock = jest.spyOn(UseAuthProvider, 'useAuthorizationContext');
    docMock.mockImplementationOnce(() => ({
      user: { uid: "456" } as firebase.User,
      adminFlag: true,
      authIsReady: true,
      dispatch: jest.fn(() => true),
    }))

    const docMock2 = jest.spyOn(UseCollectionMethods, "useFirebaseCollectionTyped")
    docMock2.mockReturnValue({
      documents: [],
      error: undefined
    })

    /*

{
      correctDigits: 1,
      errCount: 1,
      nCorrectInitial: 1,
      nRetries: 1,
      sessionDuration: 1,
      setSize: 1,
      totalDigits: 1,

      // Arrays
      entries: [
        {
          factCorrect: true,
          initialTry: true,

          // Strings
          factType: "Addition",
          factString: "1+1=2",
          factEntry: "1+1=2",

          // Numerics
          latencySeconds: 1,

          // Timestamps
          dateTimeEnd: firebase.firestore.Timestamp.fromDate(
            new Date("09/14/2022")
          ),
          dateTimeStart: firebase.firestore.Timestamp.fromDate(
            new Date("09/14/2022")
          ),
        },
      ] as FactDataInterface[],

      // Strings
      id: "123",
      creator: "456",
      target: "Addition",
      method: "ExplicitTiming",
      dateTimeEnd: "09/14/2022",
      dateTimeStart: "09/14/2022",
      // Timestamps
      createdAt: null,
    }

    mockCollection.mockReturnValueOnce({
      correctDigits: 1,
      errCount: 1,
      nCorrectInitial: 1,
      nRetries: 1,
      sessionDuration: 1,
      setSize: 1,
      totalDigits: 1,

      // Arrays
      entries: [
        {
          factCorrect: true,
          initialTry: true,

          // Strings
          factType: "Addition",
          factString: "1+1=2",
          factEntry: "1+1=2",

          // Numerics
          latencySeconds: 1,

          // Timestamps
          dateTimeEnd: firebase.firestore.Timestamp.fromDate(
            new Date("09/14/2022")
          ),
          dateTimeStart: firebase.firestore.Timestamp.fromDate(
            new Date("09/14/2022")
          ),
        },
      ] as FactDataInterface[],

      // Strings
      id: "123",
      creator: "456",
      target: "Addition",
      method: "ExplicitTiming",
      dateTimeEnd: "09/14/2022",
      dateTimeStart: "09/14/2022",
      // Timestamps
      createdAt: null,
    })

    mockCollection.mockReturnValueOnce({
      correctDigits: 1,
      errCount: 1,
      nCorrectInitial: 1,
      nRetries: 1,
      sessionDuration: 1,
      setSize: 1,
      totalDigits: 1,

      // Arrays
      entries: [
        {
          factCorrect: true,
          initialTry: true,

          // Strings
          factType: "Subtraction",
          factString: "2-1=1",
          factEntry: "2-1=1",

          // Numerics
          latencySeconds: 1,

          // Timestamps
          dateTimeEnd: firebase.firestore.Timestamp.fromDate(
            new Date("09/14/2022")
          ),
          dateTimeStart: firebase.firestore.Timestamp.fromDate(
            new Date("09/14/2022")
          ),
        },
      ] as FactDataInterface[],

      // Strings
      id: "123",
      creator: "456",
      target: "Addition",
      method: "ExplicitTiming",
      dateTimeEnd: "09/14/2022",
      dateTimeStart: "09/14/2022",
      // Timestamps
      createdAt: null,
    })

    */
    /*
    const docMock2 = jest.spyOn(UseCollectionMethods, 'useFirebaseCollectionTyped');
    docMock2.mockImplementation(() => ({
      documents: [] as PerformanceDataInterface[],
      error: undefined
    }));
    */

    //  .mockImplementationOnce(() => { return generateObject() })
    //  .mockImplementationOnce(() => { return generateObject() })
    //  .mockImplementationOnce(() => { return generateObject() })

    waitFor(() => {
      expect(() => render(
        <MemoryRouter>
          <Screening />
        </MemoryRouter>
      )).not.toThrow()
    })
  })

  /*
  it("Should render, no user", () => {
    const docMock = jest.spyOn(UseAuthProvider, 'useAuthorizationContext');
    docMock.mockImplementationOnce(() => ({
      user: null as unknown as firebase.User,
      adminFlag: false,
      authIsReady: true,
      dispatch: jest.fn(() => true),
    }))

    waitFor(() => {
      expect(() => render(
        <MemoryRouter>
          <Screening />
        </MemoryRouter>
      )).not.toThrow()
    })
  })
  */

  /*

  it("Should render, no user", () => {

    const mockUseAuthContext = jest.fn();
    //const docMock = jest.mock("../../../context/hooks/useAuthorizationContext", () => mockUseAuthContext);
    mockUseAuthContext.mockImplementation(() => {
      return {
        user: null,
        adminFlag: false,
        authIsReady: true,
        dispatch: jest.fn(() => true),
      }
    })

    waitFor(() => {
      expect(() => render(
        <AuthorizationContextProvider>
          <MemoryRouter>
            <Screening />
          </MemoryRouter>
        </AuthorizationContextProvider>
      )).not.toThrow()
    })
  })


  it("Should render, with admin", () => {

    const mockUseAuthContext = jest.fn();
    //const docMock = jest.mock("../../../context/hooks/useAuthorizationContext", () => mockUseAuthContext);
    mockUseAuthContext.mockImplementation(() => {
      return {
        user: { uid: "456" } as firebase.User,
        adminFlag: true,
        authIsReady: true,
        dispatch: jest.fn(() => true),
      }
    })

    waitFor(() => {
      expect(() => render(
        <MemoryRouter>
          <Screening />
        </MemoryRouter>
      )).not.toThrow()
    })
  })

  */
})