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
import DashboardDisplay from "../DashboardDisplay";
import { MemoryRouter } from "react-router-dom";
import * as UseCollectionMethods from "../../../firebase/hooks/useFirebaseCollection";
import * as StudentListMethods from "../helpers/DashboardHelpers";
import { waitFor } from "@testing-library/react";

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

describe("Dashboard Display: Render", () => {
  it("Good load, render ui", async () => {
    await act(async () => {
      const docMockCollection = jest.spyOn(
        UseCollectionMethods,
        "useFirebaseCollectionTyped"
      );
      docMockCollection.mockReturnValue({
        documents: [
          {
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
            currentApproach: "NA",
            currentErrorApproach: "NA",
            currentGrade: "K",
            currentSRApproach: "NA",
            currentTarget: "Addition",
            details: "",
            name: "",
            problemSet: "A",

            minForTask: 0.04,
          },
        ] as StudentDataInterface[],
        error: undefined,
      });

      const dockMockFilter = jest.spyOn(StudentListMethods, "studentFilterMap");
      dockMockFilter.mockReturnValue([
        {
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
          currentApproach: "NA",
          currentErrorApproach: "NA",
          currentGrade: "K",
          currentSRApproach: "NA",
          currentTarget: "Addition",
          details: "",
          name: "",
          problemSet: "A",

          minForTask: 0.04,
        },
      ]);

      const wrapper = mount(
        <MemoryRouter>
          <DashboardDisplay />
        </MemoryRouter>
      );

      const btns = wrapper.find(".student-filter-btn");
      const btn = btns.first();
      btn.simulate("click");

      await waitFor(() => {
        const errorTag = wrapper.find("div.error");
        const loadingTag = wrapper.find("div.loading");
        const studentFilterTag = wrapper.find("div.student-filter");

        const studentListTag = wrapper.find("div.student-list");
        const studentListItemTag = wrapper.find("div.student-list-card");

        expect(errorTag.length).toBe(0);
        expect(loadingTag.length).toBe(0);

        expect(studentFilterTag.length).toBe(1);
        expect(studentListTag.length).toBe(1);
        expect(studentListItemTag.length).toBe(1);
      });
    });
  });

  it("Bad load, output error", async () => {
    await act(async () => {
      const docMockCollection = jest.spyOn(
        UseCollectionMethods,
        "useFirebaseCollectionTyped"
      );
      docMockCollection.mockReturnValue({
        documents: null,
        error: "Failed to load",
      });

      const wrapper = mount(
        <MemoryRouter>
          <DashboardDisplay />
        </MemoryRouter>
      );

      await waitFor(() => {
        const errorTag = wrapper.find("div.error");
        const loadingTag = wrapper.find("div.loading");
        const studentFilterTag = wrapper.find("div.student-filter");

        const studentListTag = wrapper.find("div.student-list");
        const studentListItemTag = wrapper.find("div.student-list-card");

        expect(errorTag.length).toBe(1);
        expect(loadingTag.length).toBe(0);

        expect(studentFilterTag.length).toBe(0);
        expect(studentListTag.length).toBe(0);
        expect(studentListItemTag.length).toBe(0);
      });
    });
  });
});
