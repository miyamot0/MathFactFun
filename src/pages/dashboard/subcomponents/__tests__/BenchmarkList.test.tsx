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
import { CommentInterface } from "../../../student/subcomponents/types/CommentTypes";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import { act } from "react-dom/test-utils";
import BenchmarkList from "../../subcomponents/BenchmarkList";
import { MemoryRouter } from "react-router-dom";
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

const mockData = {
    id: mockId,
    aimLine: 0,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
    lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
    comments: [mockComment] as CommentInterface[],
    completedBenchmark: [],
    currentBenchmarking: [],
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
    useRouteMatch: () => ({ url: `/benchmark/${mockId}` }),
}));

describe("BenchmarkList: Render", () => {
    it("Should render all components if students present", () => {
        act(() => {
            const tag = `Addition ${mockData.dueDate.toDate().toDateString()}`;

            const mockData2 = {
                ...mockData,
                currentBenchmarking: [
                    "Addition",
                    "Multiplication",
                ],
                completedBenchmark: [tag]
            } as StudentDataInterface;

            const wrapper = mount(
                <MemoryRouter>
                    <BenchmarkList student={mockData2} />
                </MemoryRouter>
            );

            waitFor(() => {
                expect(wrapper.find('.benchmark-list').length).toBe(1);
                expect(wrapper.find('.benchmark-list-card').length).toBe(3);
            });
        });
    });

    it("Should render no divs if no benchmarks listed", () => {
        act(() => {
            const wrapper = mount(
                <MemoryRouter>
                    <BenchmarkList student={mockData} />
                </MemoryRouter>
            );

            waitFor(() => {
                const serializedOutput = JSON.stringify(wrapper);

                expect(serializedOutput.includes("benchmark-list")).toBe(false);
                expect(serializedOutput.includes("No benchmarking targets")).toBe(true);
            });
        });
    });

    it("Should render nothing if student is null", () => {
        act(() => {
            const wrapper = mount(
                <MemoryRouter>
                    <BenchmarkList student={null as unknown as StudentDataInterface} />
                </MemoryRouter>
            );

            waitFor(() => {
                const cards = wrapper.find('.benchmark-list-card')
                expect(cards.length).toBe(0);
            });
        });
    });
});