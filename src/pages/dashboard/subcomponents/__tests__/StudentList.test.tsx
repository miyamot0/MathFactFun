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
import StudentList from "../../subcomponents/StudentList";
import { MemoryRouter } from "react-router-dom";
import { InterventionFormat } from "../../../../maths/Facts";

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

describe("Student List: Render", () => {
    it("Should render all components if students present", () => {
        act(() => {
            const wrapper = mount(
                <MemoryRouter>
                    <StudentList students={[mockData]} />
                </MemoryRouter>
            );

            setTimeout(() => {
                const serializedOutput = JSON.stringify(wrapper);

                expect(serializedOutput.includes("student-list")).toBe(true);
            }, 1000);
        });
    });

    it("Should render nothing if benchmarks listed", () => {
        act(() => {
            const wrapper = mount(
                <MemoryRouter>
                    <StudentList students={[]} />
                </MemoryRouter>
            );

            setTimeout(() => {
                const serializedOutput = JSON.stringify(wrapper);

                expect(serializedOutput.includes("student-list")).toBe(false);
            }, 1000);
        });
    });
});
