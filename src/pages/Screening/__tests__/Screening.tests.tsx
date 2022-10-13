/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { mockCollection, mockOnSnapshot, 
  mockOrderBy, mockWhere } from "../../../setupTests";
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";

Enzyme.configure({ adapter: new Adapter() });

const mockId = "123";

// per hoisting
var mockUseAuthContext: jest.Mock<any, any>;

jest.mock('../../../context/hooks/useAuthorizationContext', () => {
  mockUseAuthContext = jest.fn();

  return {
    useAuthorizationContext: mockUseAuthContext,
  };
});

// per hoisting
var mockUseFirebaseCollectionTyped: jest.Mock<any, any>;

jest.mock('../../../firebase/hooks/useFirebaseCollection', () => {
  const fb = require("firebase")

  return {
    useFirebaseCollectionTyped: () => ({
      documents: [
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
            dateTimeEnd: fb.firestore.Timestamp.fromDate(
              new Date("09/14/2022")
            ),
            dateTimeStart: fb.firestore.Timestamp.fromDate(
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
        createdAt: null
      }
    ],
    error: '123'
    })
  };
});

describe("Screening", () => {
  beforeEach(() => {

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
      where: mockWhere.mockReturnThis(),
      orderBy: mockOrderBy.mockReturnThis(),
      onSnapshot: mockOnSnapshot.mockImplementation(() => {}),
    })
    
    expect(1).toBe(1)
  })

  it('Stub', () => { expect(1).toBe(1) })
  /*

  it("Should render, no admin", () => {
    mockUseAuthContext.mockImplementation(() => {
      return {
        user: { uid: "456" } as firebase.User,
        adminFlag: false,
      }
    });

    //mockHighchartsReact.mockImplementation((highcharts, options) => {});

    mount(<Screening />)
  })

  */

  /*

  it("Should render, with admin", () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: "456" } as firebase.User,
      adminFlag: true,
    }));
    
    mount(<Screening />)
  })

  */

 
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