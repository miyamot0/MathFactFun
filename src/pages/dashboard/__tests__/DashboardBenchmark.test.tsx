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
import DashboardBenchmark from "../DashboardBenchmark";
import { mount } from "enzyme";
import { CommentInterface } from "../../student/subcomponents/types/CommentTypes";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import * as UseDocumentMethods from "../../../firebase/hooks/useFirebaseDocument";
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

const mockId = "123";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: mockId,
  }),
  useRouteMatch: () => ({ url: `/benchmark/${mockId}` }),
}));

describe("Dashboard Benchmark: Render", () => {
  it("Good load, render ui", async () => {
    await act(async () => {
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
      });

      const wrapper = mount(
        <MemoryRouter>
          <DashboardBenchmark />
        </MemoryRouter>
      );

      await waitFor(() => {
        const errorTag = wrapper.find("div.error");
        const loadingTag = wrapper.find("div.loading");
        const benchmarkListTag = wrapper.find("div.benchmark-list");
        const benchmarkListItemTag = wrapper.find("div.benchmark-list-card");

        expect(errorTag.length).toBe(0);
        expect(loadingTag.length).toBe(0);
        expect(benchmarkListTag.length).toBe(1);
        expect(benchmarkListItemTag.length).toBe(1);
      });
    });
  });

  it("Bad load, output error", async () => {
    await act(async () => {
      const docMockCollection = jest.spyOn(
        UseDocumentMethods,
        "useFirebaseDocumentTyped"
      );
      docMockCollection.mockReturnValue({
        document: null,
        documentError: "Failed to load",
      });

      const wrapper = mount(
        <MemoryRouter>
          <DashboardBenchmark />
        </MemoryRouter>
      );

      await waitFor(() => {
        const errorTag = wrapper.find("div.error");
        const loadingTag = wrapper.find("div.loading");
        const benchmarkListTag = wrapper.find("div.benchmark-list");
        const benchmarkListItemTag = wrapper.find("div.benchmark-list-card");

        expect(errorTag.length).toBe(1);
        expect(loadingTag.length).toBe(0);
        expect(benchmarkListTag.length).toBe(0);
        expect(benchmarkListItemTag.length).toBe(0);
      });
    });
  });

  it("Stalled load, output loading", async () => {
    await act(async () => {
      const docMockCollection = jest.spyOn(
        UseDocumentMethods,
        "useFirebaseDocumentTyped"
      );
      docMockCollection.mockReturnValue({
        document: null,
        documentError: undefined,
      });

      const wrapper = mount(
        <MemoryRouter>
          <DashboardBenchmark />
        </MemoryRouter>
      );

      await waitFor(() => {
        const errorTag = wrapper.find("div.error");
        const loadingTag = wrapper.find("div.loading");
        const benchmarkListTag = wrapper.find("div.benchmark-list");
        const benchmarkListItemTag = wrapper.find("div.benchmark-list-card");

        expect(errorTag.length).toBe(0);
        expect(loadingTag.length).toBe(1);
        expect(benchmarkListTag.length).toBe(0);
        expect(benchmarkListItemTag.length).toBe(0);
      });
    });
  });
});
