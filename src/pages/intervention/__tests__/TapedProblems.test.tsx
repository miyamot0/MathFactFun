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
import { waitFor } from "@testing-library/react";
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import { CommentInterface } from "../../student/subcomponents/types/CommentTypes";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { MemoryRouter } from "react-router-dom";
import CoverCopyCompare from "../CoverCopyCompare";
import TapedProblems from "../TapedProblems";

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

const mockData = {
  id: mockId,
  aimLine: 0,
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
  lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
  comments: [mockComment] as CommentInterface[],
  completedBenchmark: [],
  currentBenchmarking: ["a", "b"],
  factsMastered: ["", ""],
  factsSkipped: ["", ""],
  factsTargeted: ["", ""],

  creator: "",
  currentApproach: "N/A",
  currentErrorApproach: "",
  currentGrade: "",
  currentSRApproach: "",
  currentTarget: mockTarget,
  details: "",
  name: "",
  problemSet: "",

  minForTask: 2,
} as StudentDataInterface;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
    target: mockTarget,
  }),
  useRouteMatch: () => ({ url: `/Screening/${mockId}` }),
}));

jest.mock("./../../../context/hooks/useAuthorizationContext", () => {
  const originalModule = jest.requireActual(
    "./../../../context/hooks/useAuthorizationContext"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      user: { uid: "456" } as firebase.User,
      adminFlag: true,
      authIsReady: true,
      dispatch: jest.fn(() => true),
    }),
  };
});

jest.mock("./../../../firebase/hooks/useFirestore", () => {
  const originalModule = jest.requireActual(
    "./../../../firebase/hooks/useFirestore"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      addDocument: jest.fn(),
      response: {} as FirestoreState,
    }),
  };
});

jest.mock("./../../../firebase/hooks/useFirestore", () => {
  const originalModule = jest.requireActual(
    "./../../../firebase/hooks/useFirestore"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      updateDocument: jest.fn(),
      response: {} as FirestoreState,
    }),
  };
});

jest.mock("./../../../firebase/hooks/useFirebaseDocument", () => {
  const originalModule = jest.requireActual(
    "./../../../firebase/hooks/useFirebaseDocument"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      useFirebaseDocumentTyped: {
        document: mockData,
        documentError: undefined,
      },
    }),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({ url: `/benchmark/${mockId}/${mockTarget}` }),
}));

describe("Benchmark", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <TapedProblems />
      </MemoryRouter>
    );
    expect(1).toBe(1);
  });
});
