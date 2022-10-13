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
import Enzyme, { shallow } from "enzyme";
import EditStudent from "../EditStudent";
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import { StudentDataInterface } from "../interfaces/StudentInterfaces";
import { CommentInterface } from "../subcomponents/types/CommentTypes";

Enzyme.configure({ adapter: new Adapter() });

const mockData = {
  id: "123",
  aimLine: 0,
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
  lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
  comments: [{
      content: "string",
      displayName: "string",
      createdAt: "",
      createdBy: "",
      id: 0,
    }] as CommentInterface[],
  completedBenchmark: [],
  currentBenchmarking: ["a", "b"],
  factsMastered: ["", ""],
  factsSkipped: ["", ""],
  factsTargeted: ["", ""],

  creator: "",
  currentApproach: "",
  currentErrorApproach: "",
  currentGrade: "",
  currentSRApproach: "",
  currentTarget: "",
  details: "",
  name: "",
  problemSet: "",

  minForTask: 2,
} as StudentDataInterface;

jest.mock("./../../../firebase/hooks/useFirestore", () => {
  return {
    useFirestore: () => ({
      addDocument: jest.fn(),
      deleteDocument: jest.fn(),
      updateDocument: jest.fn(),
      response: {} as FirestoreState,
    })
  };
});

var mockUseFirebaseDocumentTyped: jest.Mock<any, any>;
jest.mock("./../../../firebase/hooks/useFirebaseDocument", () => {
  mockUseFirebaseDocumentTyped = jest.fn();

  return {
    useFirebaseDocumentTyped: mockUseFirebaseDocumentTyped
}});

var mockVerifySingleStudentCreate: jest.Mock<any, any>;
var mockVerifySingleStudentEdit: jest.Mock<any, any>;
var mockOnLoadSingleStudentEdit: jest.Mock<any, any>;
jest.mock("./../helpers/StudentHelpers", () => {
  mockVerifySingleStudentCreate = jest.fn();
  mockVerifySingleStudentEdit = jest.fn();
  mockOnLoadSingleStudentEdit = jest.fn();

  return {
      verifySingleStudentCreate: () => mockVerifySingleStudentCreate,
      verifySingleStudentEdit: () => mockVerifySingleStudentEdit,
      onLoadSingleStudentEdit: () => mockOnLoadSingleStudentEdit,
  };
});

jest.mock("react-router-dom", () => {
  return {
    useParams: () => ({ id: "123" }),
    useHistory: () => ({
      push: jest.fn(),
    }),
    useRouteMatch: () => jest.fn(),
  };
});

describe("EditStudent", () => {
  beforeEach(() => {
    mockVerifySingleStudentEdit.mockClear();
  })

  it("Will render when data is received", () => {
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: mockData,
      documentError: undefined,
    })

    const wrapper = shallow(<EditStudent />);

    expect(wrapper.find(".edit-student-page").length).toBe(1);
  });

  it("Will render error upon error", () => {
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: "error",
    })
    
    const wrapper = shallow(<EditStudent />);

    expect(wrapper.find(".error").length).toBe(1);
  });

  it("Will render loading upon loading", () => {
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: undefined,
    })

    const wrapper = shallow(<EditStudent />);

    expect(wrapper.find(".loading").length).toBe(1);
  });

  it("Will call function as designed", () => {
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: mockData,
      documentError: undefined,
    })

    const wrapper = shallow(<EditStudent />);
    wrapper.find("form").first().simulate("submit", {preventDefault: jest.fn(() => true)});

    expect(wrapper.find(".edit-student-page").length).toBe(1);
  });
});
