/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow } from "enzyme";
import { CommentInterface } from "../../student/subcomponents/types/CommentTypes";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { MemoryRouter } from "react-router-dom";

import * as KeyHandling from "./../helpers/KeyHandlingHelper";
import * as InterventionHelper from "./../helpers/InterventionHelpers";
import * as UseAuthProvider from "../../../context/hooks/useAuthorizationContext";
import * as UseDocumentMethods from "../../../firebase/hooks/useFirebaseDocument";

import { act } from "@testing-library/react";
import ReactModal from "react-modal";
import ExplicitTiming from "../ExplicitTiming";

Enzyme.configure({ adapter: new Adapter() });

const mockId = "123";
const mockTarget = "Addition";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
    target: mockTarget,
  }),
  useRouteMatch: () => ({ url: `/Screening/${mockId}` }),
}));

ReactModal.setAppElement = () => null;

describe("Benchmark", () => {
  const mockedCommonKeyListener = jest.fn();
  const mockedSubmitPerformancesToFirebase = jest.fn();
  const mockedSharedButtonActionSequence = jest.fn();

  const docMockCollection = jest.spyOn(
    UseDocumentMethods,
    "useFirebaseDocumentTyped"
  );
  const mockAuthProvider = jest.spyOn(
    UseAuthProvider,
    "useAuthorizationContext"
  );
  const spyKeyHandling = jest.spyOn(KeyHandling, "commonKeyListener");
  const spySubmitPerformancesToFirebase = jest.spyOn(
    InterventionHelper,
    "submitPerformancesToFirebase"
  );
  const spySharedButtonActionSequence = jest.spyOn(
    InterventionHelper,
    "sharedButtonActionSequence"
  );

  spySubmitPerformancesToFirebase.mockImplementation(
    mockedSubmitPerformancesToFirebase
  );
  spySharedButtonActionSequence.mockImplementation(
    mockedSharedButtonActionSequence
  );
  spyKeyHandling.mockImplementation(mockedCommonKeyListener);

  const mockComment = {
    content: "string",
    displayName: "string",
    createdAt: "",
    createdBy: "",
    id: 0,
  };

  beforeEach(() => {
    docMockCollection.mockImplementation(() => ({
      document: {
        id: mockId,
        aimLine: 0,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
        lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
        comments: [mockComment] as CommentInterface[],
        completedBenchmark: [],
        currentBenchmarking: ["Addition-Sums to 18"],
        factsMastered: [],
        factsSkipped: [],
        factsTargeted: [],

        creator: "",
        currentApproach: "N/A",
        currentErrorApproach: "N/A",
        currentGrade: "K",
        currentSRApproach: "N/A",
        currentTarget: "Addition",
        details: "",
        name: "",
        problemSet: "A",

        minForTask: 0.04,
      } as StudentDataInterface,
      documentError: undefined,
    }));

    mockAuthProvider.mockImplementation(() => ({
      user: { uid: "456" } as firebase.User,
      adminFlag: true,
      authIsReady: true,
      dispatch: jest.fn(() => true),
    }));
  });

  it("should render, shallow build", async () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ExplicitTiming></ExplicitTiming>
      </MemoryRouter>
    );

    expect(wrapper.find(ExplicitTiming).length).toBe(1);
  });

  it("should render, mounted build", async () => {
    await act(async () => {
      jest.clearAllMocks();

      const wrapper = mount(
        <MemoryRouter>
          <ExplicitTiming></ExplicitTiming>
        </MemoryRouter>
      );

      expect(wrapper.find(ExplicitTiming).length).toBe(1);
      expect(wrapper.find("button.global-btn").length).toBe(1);

      expect(mockedSharedButtonActionSequence).not.toBeCalled();

      /*
       wrapper.find("button").first().simulate("click");
 
       await waitFor(() => {
         expect(mockedSharedButtonActionSequence).toBeCalled();
       });
 
       expect(mockedCommonKeyListener).not.toBeCalled();
 
       const event = new KeyboardEvent("keydown", { keyCode: 37 });
       window.dispatchEvent(event);
       wrapper.simulate("keydown", { keyCode: 37 });
 
       await waitFor(() => {
         expect(mockedCommonKeyListener).toBeCalled();
       });
       */

      /*
       wrapper.find("button").first().simulate("click");
 
       await waitFor(() => {
         expect(mockedSharedButtonActionSequence).toBeCalled();
       });
 
       expect(mockedCommonKeyListener).not.toBeCalled();
 
       const event = new KeyboardEvent("keydown", { keyCode: 37 });
       window.dispatchEvent(event);
       wrapper.simulate("keydown", { keyCode: 37 });
 
       await waitFor(() => {
         expect(mockedCommonKeyListener).toBeCalled();
       });
       */
    });
  });
});

/*

describe("Explicit Timing", () => {
  it("should render in base state", () => {
    const docMock = jest.spyOn(UseAuthProvider, "useAuthorizationContext");
    docMock.mockImplementation(() => ({
      user: { uid: "456" } as firebase.User,
      adminFlag: true,
      authIsReady: true,
      dispatch: jest.fn(() => true),
    }));

    const docMockCollection = jest.spyOn(
      UseDocumentMethods,
      "useFirebaseDocumentTyped"
    );
    docMockCollection.mockReturnValue({
      document: {
        id: mockId,
        aimLine: 0,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
        lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
        comments: [mockComment] as CommentInterface[],
        completedBenchmark: [],
        currentBenchmarking: ["Addition-Sums to 18"],
        factsMastered: [],
        factsSkipped: [],
        factsTargeted: [],

        creator: "",
        currentApproach: "N/A",
        currentErrorApproach: "N/A",
        currentGrade: "K",
        currentSRApproach: "N/A",
        currentTarget: "Addition",
        details: "",
        name: "",
        problemSet: "A",

        minForTask: 0.04,
      } as StudentDataInterface,
      documentError: undefined,
    });

    const wrapper = mount(
      <MemoryRouter>
        <ExplicitTiming />
      </MemoryRouter>
    );

    const docMock1 = jest.spyOn(KeyHandling, "commonKeyListener");
    const mockedCommonKeyListener = jest.fn();
    docMock1.mockImplementation(() => mockedCommonKeyListener());

    const docMock2 = jest.spyOn(
      InterventionHelper,
      "sharedButtonActionSequence"
    );
    const mockedSharedButtonActionSequence = jest.fn();
    docMock2.mockImplementation(() => mockedSharedButtonActionSequence());

    const docMock3 = jest.spyOn(
      InterventionHelper,
      "submitPerformancesToFirebase"
    );
    const mockedSubmitPerformancesToFirebase = jest.fn();
    docMock3.mockImplementation(() => mockedSubmitPerformancesToFirebase());

    jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    wrapper.update();

    expect(mockedSharedButtonActionSequence).not.toBeCalled();

    wrapper.find("button").first().simulate("click");

    waitFor(() => {
      expect(mockedSharedButtonActionSequence).toBeCalled();
    });

    expect(mockedCommonKeyListener).not.toBeCalled();

    const event = new KeyboardEvent("keydown", { keyCode: 37 });
    window.dispatchEvent(event);
    wrapper.simulate("keydown", { keyCode: 37 });

    waitFor(() => {
      expect(mockedCommonKeyListener).toBeCalled();
    });
  });

  it("should react on li click", () => {
    const docMock = jest.spyOn(UseAuthProvider, "useAuthorizationContext");
    docMock.mockImplementation(() => ({
      user: { uid: "456" } as firebase.User,
      adminFlag: true,
      authIsReady: true,
      dispatch: jest.fn(() => true),
    }));

    const docMockCollection = jest.spyOn(
      UseDocumentMethods,
      "useFirebaseDocumentTyped"
    );
    docMockCollection.mockReturnValue({
      document: {
        id: mockId,
        aimLine: 0,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
        lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
        comments: [mockComment] as CommentInterface[],
        completedBenchmark: [],
        currentBenchmarking: ["Addition-Sums to 18"],
        factsMastered: [],
        factsSkipped: [],
        factsTargeted: ["1+1=2:0:1", "1+2=3:0:2"],

        creator: "",
        currentApproach: "N/A",
        currentErrorApproach: ErrorHandling.Never,
        currentGrade: "K",
        currentSRApproach: "N/A",
        currentTarget: "Addition",
        details: "",
        name: "",
        problemSet: "A",

        minForTask: 0.04,
      } as StudentDataInterface,
      documentError: undefined,
    });

    const wrapper = mount(
      <MemoryRouter>
        <ExplicitTiming />
      </MemoryRouter>
    );

    const docMock1 = jest.spyOn(KeyHandling, "commonKeyListener");
    const mockedCommonKeyListener = jest.fn();
    docMock1.mockImplementation(() => mockedCommonKeyListener());

    //const docMock2 = jest.spyOn(
    //  InterventionHelper,
    //  "sharedButtonActionSequence"
    //);
    //const mockedSharedButtonActionSequence = jest.fn();
    //docMock2.mockImplementation(() => mockedSharedButtonActionSequence());

    const docMock3 = jest.spyOn(
      InterventionHelper,
      "submitPerformancesToFirebase"
    );
    const mockedSubmitPerformancesToFirebase = jest.fn();
    docMock3.mockImplementation(() => mockedSubmitPerformancesToFirebase());

    jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    wrapper.update();

    //expect(mockedSharedButtonActionSequence).not.toBeCalled();

    wrapper.find("button").first().simulate("click");

    //waitFor(() => {
    //  expect(mockedSharedButtonActionSequence).toBeCalled();
    //});

    expect(mockedCommonKeyListener).not.toBeCalled();

    const event = new KeyboardEvent("keydown", { keyCode: 37 });
    window.dispatchEvent(event);
    wrapper.simulate("keydown", { keyCode: 37 });

    waitFor(() => {
      expect(mockedCommonKeyListener).toBeCalled();
    });

    wrapper.update();

    wrapper.find("button").first().simulate("click");
    wrapper.find("button").first().simulate("click");
    wrapper.find("button").first().simulate("click");
    wrapper.find("button").first().simulate("click");
    wrapper.find("button").first().simulate("click");
    wrapper.find("button").first().simulate("click");
    wrapper.find("button").first().simulate("click");
  });
});

*/
