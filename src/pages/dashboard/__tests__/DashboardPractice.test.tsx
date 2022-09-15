/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import firebase from "firebase";
import ReactModal from "react-modal";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { mount } from "enzyme";
import { CommentInterface } from "../../student/subcomponents/types/CommentTypes";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { act } from "react-dom/test-utils";
import DashboardPractice from "../DashboardPractice";
import { MemoryRouter } from "react-router-dom";
import PracticeList from "../subcomponents/PracticeList";

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

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
  currentBenchmarking: ["", ""],
  factsMastered: ["", ""],
  factsSkipped: ["", ""],
  factsTargeted: ["", ""],

  creator: "",
  currentApproach: "ExplicitTiming",
  currentErrorApproach: "",
  currentGrade: "",
  currentSRApproach: "",
  currentTarget: "",
  details: "",
  name: "",
  problemSet: "",

  minForTask: 2,
} as StudentDataInterface;

jest.mock("../../../firebase/hooks/useFirebaseDocument", () => {
  const originalModule = jest.requireActual(
    "../../../firebase/hooks/useFirebaseDocument"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      document: mockData,
      documentError: undefined,
    }),
  };
});

jest.mock("../../../context/hooks/useAuthorizationContext", () => {
  const originalModule = jest.requireActual(
    "../../../context/hooks/useAuthorizationContext"
  );
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      user: { uid: mockId } as firebase.User,
      authIsReady: true,
      adminFlag: false,
      dispatch: jest.fn(() => {
        "pass";
      }),
    }),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
  }),
  useRouteMatch: () => ({ url: `/benchmark/${mockId}` }),
}));

describe("Practice List: Render", () => {
  it("Should render all components if students present", () => {
    act(() => {
      const wrapper = mount(
        <MemoryRouter>
          <PracticeList students={[mockData]} />
        </MemoryRouter>
      );

      setTimeout(() => {
        const serializedOutput = JSON.stringify(wrapper);

        expect(serializedOutput.includes("practice-list")).toBe(true);
      }, 1000);
    });
  });

  it("Should render nothing if benchmarks listed", () => {
    act(() => {
      const wrapper = mount(
        <MemoryRouter>
          <PracticeList students={[]} />
        </MemoryRouter>
      );

      setTimeout(() => {
        const serializedOutput = JSON.stringify(wrapper);

        expect(serializedOutput.includes("practice-list")).toBe(false);
      }, 1000);
    });
  });
});

describe("Dashboard Practice: Render", () => {
  it("Should render all components", () => {
    act(() => {
      const wrapper = mount(<DashboardPractice />);

      setTimeout(() => {
        const errorTag = wrapper.find({ class: "error" });
        const loadingTag = wrapper.find({ class: "loading" });
        const studentFilterTag = wrapper.find({ class: "student-filter" });
        //
        const studentListTag = wrapper.find({ class: "practice-list" });
        const studentListItemTag = wrapper.find({
          class: "practice-list-card",
        });

        expect(errorTag.length).toBe(0);
        expect(loadingTag.length).toBe(0);

        expect(studentFilterTag.length).toBe(1);
        expect(studentListTag.length).toBe(1);
        expect(studentListItemTag.length).toBe(1);
      }, 1000);
    });
  });
});
