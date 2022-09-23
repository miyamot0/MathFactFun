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
import { FactDataInterface } from "../../setcreator/interfaces/SetCreatorInterfaces";
import { PerformanceDataInterface } from "../../intervention/interfaces/InterventionInterfaces";
import { InterventionFormat } from "../../../maths/Facts";

Enzyme.configure({ adapter: new Adapter() });

const mockId = "123";
const mockTarget = "Addition-Sums to 18";
const mockMethod = InterventionFormat.ExplicitTiming;
const mockAim = "40";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockDoc = [
  {
    correctDigits: 1,
    errCount: 1,
    nCorrectInitial: 1,
    nRetries: 1,
    sessionDuration: 1,
    setSize: 1,
    totalDigits: 1,
    entries: [
      {
        factCorrect: true,
        initialTry: true,

        // Strings
        factType: "Addition",
        factString: "1+1=2",
        factEntry: "1+1=2",

        // Numerics
        latencySeconds: 5,

        // Timestamps
        dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
        dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
      } as FactDataInterface,
    ],
    id: mockId,
    creator: "345",
    target: mockTarget,
    method: mockMethod,
    dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date())
      .toDate()
      .toDateString(),
    dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date())
      .toDate()
      .toDateString(),
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  } as PerformanceDataInterface,
] as PerformanceDataInterface[];

jest.mock("../../../context/hooks/useAuthorizationContext", () => {
  const originalModule = jest.requireActual(
    "../../../context/hooks/useAuthorizationContext"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      user: { uid: "123" } as firebase.User,
      adminFlag: false,
      authIsReady: true,
      dispatch: jest.fn(() => true),
    }),
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: mockId,
    target: mockTarget,
    method: mockMethod,
    aim: mockAim,
  }),
}));

// TODO: try to find workaround for highcharts hating jest

describe("ProgressMonitor", () => {
  it("is a stub", () => {
    expect(1).toBe(1)
  })
  /*
  it("Should render component", () => {
    const docMockCollection = jest.spyOn(UseCollectionMethods, "useFirebaseCollectionTyped")
    docMockCollection.mockReturnValue({
      documents: [mockDoc],
      error: undefined
    })

    const wrapper = mount(<MemoryRouter>
      <ProgressMonitor />
    </MemoryRouter >);

    //id, target, method, aim

    expect(wrapper.find(ProgressMonitor).length).toBe(1);
  });
  */
});

