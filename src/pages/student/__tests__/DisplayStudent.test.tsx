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
import { mount } from "enzyme";
import { StudentDataInterface } from "../interfaces/StudentInterfaces";
import { CommentInterface } from "../subcomponents/types/CommentTypes";
import DisplayStudent from "../DisplayStudent";
import * as useFirebaseDocumentTyped from "./../../../firebase/hooks/useFirebaseDocument";
import { MemoryRouter } from "react-router-dom";

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
  currentApproach: "NA",
  currentErrorApproach: "",
  currentGrade: "",
  currentSRApproach: "",
  currentTarget: "",
  details: "",
  name: "",
  problemSet: "",

  minForTask: 2,
} as StudentDataInterface;

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
  useRouteMatch: () => ({ url: `/create/${mockId}` }),
}));

describe("DisplayStudent", () => {
  it("Will render when data is received", () => {
    const docMock = jest.spyOn(
      useFirebaseDocumentTyped,
      "useFirebaseDocumentTyped"
    );
    docMock.mockImplementation(() => ({
      document: mockData,
      documentError: undefined,
    }));

    const wrapper = mount(
      <MemoryRouter>
        <DisplayStudent />
      </MemoryRouter>
    );

    setTimeout(() => {
      expect(wrapper.find(".student-details-style").length).toBe(1);
    }, 1000);
  });

  it("Will render error upon error", () => {
    const docMock = jest.spyOn(
      useFirebaseDocumentTyped,
      "useFirebaseDocumentTyped"
    );
    docMock.mockImplementation(() => ({
      document: null,
      documentError: "No data received",
    }));

    const wrapper = mount(
      <MemoryRouter>
        <DisplayStudent />
      </MemoryRouter>
    );

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

    const wrapper = mount(
      <MemoryRouter>
        <DisplayStudent />
      </MemoryRouter>
    );

    setTimeout(() => {
      expect(wrapper.find(".loading").length).toBe(1);
    }, 1000);
  });
});
