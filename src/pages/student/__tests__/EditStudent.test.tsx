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
import Enzyme from "enzyme";
import EditStudent from "../EditStudent";
import { mount } from "enzyme";
import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import { StudentDataInterface } from "../interfaces/StudentInterfaces";
import { CommentInterface } from "../subcomponents/types/CommentTypes";
import * as useFirebaseDocumentTyped from "./../../../firebase/hooks/useFirebaseDocument";
import * as StudentHelpers from "./../helpers/StudentHelpers";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("../helpers/StudentHelpers");

const mockComment = {
  content: "string",
  displayName: "string",
  createdAt: "",
  createdBy: "",
  id: 0,
};

const mockId = "123";

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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({ url: `/edit/${mockId}` }),
}));

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

describe("EditStudent", () => {
  it("Will render when data is received", () => {
    const docMock = jest.spyOn(
      useFirebaseDocumentTyped,
      "useFirebaseDocumentTyped"
    );
    docMock.mockImplementation(() => ({
      document: mockData,
      documentError: undefined,
    }));

    const wrapper = mount(<EditStudent />);

    setTimeout(() => {
      expect(wrapper.find(".edit-student-page").length).toBe(1);
    }, 1000);
  });

  it("Will render error upon error", () => {
    const docMock = jest.spyOn(
      useFirebaseDocumentTyped,
      "useFirebaseDocumentTyped"
    );
    docMock.mockImplementation(() => ({
      document: null,
      documentError: "error",
    }));

    const wrapper = mount(<EditStudent />);

    setTimeout(() => {
      expect(wrapper.find(".error").length).toBe(1);
    }, 1000);
  });

  it("Will render loading upon loading", () => {
    const docMock = jest.spyOn(
      useFirebaseDocumentTyped,
      "useFirebaseDocumentTyped"
    );
    docMock.mockImplementation(() => ({
      document: null,
      documentError: undefined,
    }));

    const wrapper = mount(<EditStudent />);

    setTimeout(() => {
      expect(wrapper.find(".loading").length).toBe(1);
    }, 1000);
  });

  it("Will call function as designed", () => {
    const docMock = jest.spyOn(
      useFirebaseDocumentTyped,
      "useFirebaseDocumentTyped"
    );
    docMock.mockImplementation(() => ({
      document: mockData,
      documentError: undefined,
    }));

    const docMock2 = jest.spyOn(StudentHelpers, "verifySingleStudentCreate");
    const mockedFuntion = jest.fn();
    docMock2.mockImplementation(() => mockedFuntion());

    const wrapper = mount(<EditStudent />);
    const form = wrapper.find("form").first();
    form.simulate("submit");

    setTimeout(() => {
      expect(mockedFuntion).toHaveBeenCalled();
    }, 1000);

    setTimeout(() => {
      expect(wrapper.find(".edit-student-page").length).toBe(1);
    }, 1000);
  });
});
