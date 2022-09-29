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
import Benchmark from "./../Benchmark";

import * as KeyHandling from "./../helpers/KeyHandlingHelper";
import * as InterventionHelper from "./../helpers/InterventionHelpers";
import * as UseAuthProvider from "../../../context/hooks/useAuthorizationContext";
import * as UseDocumentMethods from "../../../firebase/hooks/useFirebaseDocument";
import * as DispatchHelpers from "../helpers/DispatchingHelpers";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";

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

describe("Benchmark", () => {
  const mockedCommonKeyListener = jest.fn();
  const mockedSubmitPerformancesToFirebase = jest.fn();
  //const mockedSharedButtonActionSequence = jest.fn();
  //const mockedCompleteLoadingDispatch = jest.fn();

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
  const spyDispatchHelpers = jest.spyOn(
    DispatchHelpers,
    "completeLoadingDispatch"
  );
  /*
  const spySharedButtonActionSequence = jest.spyOn(
    InterventionHelper,
    "sharedButtonActionSequence"
  );

  spySharedButtonActionSequence.mockImplementation(
    mockedSharedButtonActionSequence
  );
  spyDispatchHelpers.mockImplementation(mockedCompleteLoadingDispatch);
  */

  spySubmitPerformancesToFirebase.mockImplementation(
    mockedSubmitPerformancesToFirebase
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
        factsTargeted: ["1+1=2"],

        creator: "",
        currentApproach: "NA",
        currentErrorApproach: "NA",
        currentGrade: "K",
        currentSRApproach: "NA",
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

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should render, shallow build", async () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Benchmark></Benchmark>
      </MemoryRouter>
    );

    expect(wrapper.find(Benchmark).length).toBe(1);
  });

  it("should render, mounted build", async () => {
    await act(async () => {
      jest.clearAllMocks();

      const map: any = {};
      window.addEventListener = jest.fn().mockImplementation((event, cb) => {
        map[event] = cb;
      });

      const wrapper = mount(
        <MemoryRouter>
          <Benchmark></Benchmark>
        </MemoryRouter>
      );

      expect(wrapper.find(Benchmark).length).toBe(1);

      const buttons = wrapper.find("button.global-btn");

      await waitFor(() => {
        expect(buttons.length).toBe(1);
        expect(spyDispatchHelpers).toHaveBeenCalled();
      });

      wrapper.instance().forceUpdate();
      wrapper.update();

      map.keydown({ 'key': ' ' });
    });
  });
});
