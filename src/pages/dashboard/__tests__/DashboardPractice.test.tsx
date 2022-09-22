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
import * as UseCollectionMethods from '../../../firebase/hooks/useFirebaseCollection'
import * as StudentListMethods from '../helpers/DashboardHelpers'
import { waitFor } from "@testing-library/react";
import { InterventionFormat } from "../../../maths/Facts";

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;


const mockComment = {
  content: "string",
  displayName: "string",
  createdAt: "",
  createdBy: "",
  id: 0,
};

const mockId = "456";

const mockData = {
  id: mockId,
  aimLine: 0,
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
  lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
  comments: [mockComment] as CommentInterface[],
  completedBenchmark: [],
  currentBenchmarking: ["Addition-Sums to 18", "Multiplication-Single Digit"],
  factsMastered: ["", ""],
  factsSkipped: ["", ""],
  factsTargeted: ["", ""],

  creator: "",
  currentApproach: InterventionFormat.ExplicitTiming,
  currentErrorApproach: "",
  currentGrade: "K",
  currentSRApproach: "",
  currentTarget: "Addition",
  details: "",
  name: "",
  problemSet: "",

  minForTask: 2,
} as StudentDataInterface;

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

describe("Dashboard Practice: Render", () => {
  it("Good Load: render full ui", () => {
    act(() => {
      const docMockCollection = jest.spyOn(UseCollectionMethods, "useFirebaseCollectionTyped")
      docMockCollection.mockReturnValue({
        documents: [{
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

          creator: "123",
          currentApproach: InterventionFormat.ExplicitTiming,
          currentErrorApproach: "N/A",
          currentGrade: "K",
          currentSRApproach: "N/A",
          currentTarget: "Addition",
          details: "",
          name: "",
          problemSet: "A",

          minForTask: 0.04,
        }] as StudentDataInterface[],
        error: undefined
      })

      const dockMockFilter = jest.spyOn(StudentListMethods, "studentFilterMap")
      dockMockFilter.mockReturnValue([{
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

        creator: "123",
        currentApproach: InterventionFormat.ExplicitTiming,
        currentErrorApproach: "N/A",
        currentGrade: "K",
        currentSRApproach: "N/A",
        currentTarget: "Addition",
        details: "",
        name: "",
        problemSet: "A",

        minForTask: 0.04,
      }])

      const wrapper = mount(<MemoryRouter><DashboardPractice /></MemoryRouter>);

      const btns = wrapper.find('.student-filter-btn')
      const btn = btns.first();
      btn.simulate('click')

      waitFor(() => {
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
      });
    });
  });

  it("Bad load, output error", () => {
    act(() => {
      const docMockCollection = jest.spyOn(UseCollectionMethods, "useFirebaseCollectionTyped")
      docMockCollection.mockReturnValue({
        documents: null,
        error: "Failed to load"
      })

      const dockMockFilter = jest.spyOn(StudentListMethods, "studentFilterMap")
      dockMockFilter.mockReturnValue([{
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

        creator: "123",
        currentApproach: InterventionFormat.ExplicitTiming,
        currentErrorApproach: "N/A",
        currentGrade: "K",
        currentSRApproach: "N/A",
        currentTarget: "Addition",
        details: "",
        name: "",
        problemSet: "A",

        minForTask: 0.04,
      }])

      const wrapper = mount(<MemoryRouter><DashboardPractice /></MemoryRouter>);

      waitFor(() => {
        const errorTag = wrapper.find({ class: "error" });
        const loadingTag = wrapper.find({ class: "loading" });
        const studentFilterTag = wrapper.find({ class: "student-filter" });
        //
        const studentListTag = wrapper.find({ class: "practice-list" });
        const studentListItemTag = wrapper.find({
          class: "practice-list-card",
        });

        expect(errorTag.length).toBe(1);
        expect(loadingTag.length).toBe(0);

        expect(studentFilterTag.length).toBe(1);
        expect(studentListTag.length).toBe(1);
        expect(studentListItemTag.length).toBe(1);
      });
    });
  });

  it("Bad load, output error", () => {
    act(() => {
      const docMockCollection = jest.spyOn(UseCollectionMethods, "useFirebaseCollectionTyped")
      docMockCollection.mockReturnValue({
        documents: null,
        error: "Failed to load"
      })

      const dockMockFilter = jest.spyOn(StudentListMethods, "practiceFilterMap")
      dockMockFilter.mockReturnValue([{
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

        creator: "123",
        currentApproach: InterventionFormat.ExplicitTiming,
        currentErrorApproach: "N/A",
        currentGrade: "K",
        currentSRApproach: "N/A",
        currentTarget: "Addition",
        details: "",
        name: "",
        problemSet: "A",

        minForTask: 0.04,
      }])

      const wrapper = mount(<MemoryRouter><DashboardPractice /></MemoryRouter>);

      waitFor(() => {
        const errorTag = wrapper.find({ class: "error" });
        const loadingTag = wrapper.find({ class: "loading" });
        const studentFilterTag = wrapper.find({ class: "student-filter" });
        //
        const studentListTag = wrapper.find({ class: "practice-list" });
        const studentListItemTag = wrapper.find({
          class: "practice-list-card",
        });

        expect(errorTag.length).toBe(1);
        expect(loadingTag.length).toBe(0);

        expect(studentFilterTag.length).toBe(1);
        expect(studentListTag.length).toBe(1);
        expect(studentListItemTag.length).toBe(1);
      });
    });
  });
});
