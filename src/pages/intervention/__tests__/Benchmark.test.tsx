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
import Enzyme, { mount } from "enzyme";
import { CommentInterface } from "../../student/subcomponents/types/CommentTypes";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { MemoryRouter } from "react-router-dom";
import Benchmark from "./../Benchmark";

import * as KeyHandling from "./../helpers/KeyHandlingHelper";
import * as InterventionHelper from "./../helpers/InterventionHelpers";
import * as UseAuthProvider from '../../../context/hooks/useAuthorizationContext'
import * as UseDocumentMethods from '../../../firebase/hooks/useFirebaseDocument'
import { waitFor } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

const mockId = "123";
const mockTarget = "Addition";
const mockComment = {
  content: "string",
  displayName: "string",
  createdAt: "",
  createdBy: "",
  id: 0,
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
    target: mockTarget,
  }),
  useRouteMatch: () => ({ url: `/Screening/${mockId}` }),
}));

describe("Benchmark", () => {
  it("should render", () => {
    const docMock = jest.spyOn(UseAuthProvider, 'useAuthorizationContext');
    docMock.mockImplementationOnce(() => ({
      user: { uid: "456" } as firebase.User,
      adminFlag: true,
      authIsReady: true,
      dispatch: jest.fn(() => true),
    }))

    const docMockCollection = jest.spyOn(UseDocumentMethods, "useFirebaseDocumentTyped")
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
      documentError: undefined
    })

    const wrapper = mount(
      <MemoryRouter>
        <Benchmark></Benchmark>
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
});
