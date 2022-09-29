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
import { StudentDataInterface } from "../../../interfaces/StudentInterfaces";
import { FirestoreState } from "../../../../../firebase/interfaces/FirebaseInterfaces";
import { CommentInterface } from "../../types/CommentTypes";
import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { StudentCommentViews } from "../StudentCommentViews";

Enzyme.configure({ adapter: new Adapter() });

const mockData = {
    id: "123",
    aimLine: 40,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
    lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
    comments: [] as CommentInterface[],
    completedBenchmark: [],
    currentBenchmarking: [],
    factsMastered: [],
    factsSkipped: [],
    factsTargeted: [],

    creator: "456",
    currentApproach: "NA",
    currentErrorApproach: "",
    currentGrade: "",
    currentSRApproach: "",
    currentTarget: "",
    details: "",
    name: "",
    problemSet: "",

    minForTask: 2,
};

describe("StudentCommentView", () => {
    it("Should render empty list if no comments", async () => {
        await act(async () => {
            const student = {
                ...mockData,
            } as StudentDataInterface;

            const user = {} as firebase.User;
            const adminFlag = false;
            const updateDocument = jest.fn();

            const wrapper = shallow(
                <StudentCommentViews
                    user={user}
                    adminFlag={adminFlag}
                    student={student}
                    updateDocument={updateDocument}
                />
            );

            expect(wrapper.find("ul").length).toBe(1);
            expect(wrapper.find("a").length).toBe(0);

            //wrapper.find("a").first().simulate('click');

            await waitFor(() => {
                expect(updateDocument).toHaveBeenCalledTimes(0);
            })
        })
    });

    it("Should render no delete button, if not an admin", async () => {
        await act(async () => {
            const student = {
                ...mockData,
                comments: [
                    {
                        id: 123,
                        displayName: "display Name",
                        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                    } as CommentInterface,
                ],
            } as StudentDataInterface;

            const user = {} as firebase.User;
            const adminFlag = false;
            const updateDocument = jest.fn((id: string, updates: any) => Promise.resolve());

            const wrapper = shallow(
                <StudentCommentViews
                    user={user}
                    adminFlag={adminFlag}
                    student={student}
                    updateDocument={updateDocument}
                />
            );

            expect(wrapper.find("ul").length).toBe(1);
            expect(wrapper.find("a").length).toBe(0);

            await waitFor(() => {
                expect(updateDocument).toHaveBeenCalledTimes(0);
            })
        })
    });

    it("Should render working delete button, if an admin", async () => {
        await act(async () => {
            jest.spyOn(global, "confirm" as any).mockReturnValueOnce(true);

            const student = {
                ...mockData,
                comments: [
                    {
                        id: 123,
                        displayName: "display Name",
                        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                    } as CommentInterface,
                ],
            } as StudentDataInterface;

            const user = {} as firebase.User;
            const adminFlag = true;
            const updateDocument = jest.fn((id: string, updates: any) => Promise.resolve());

            const wrapper = shallow(
                <StudentCommentViews
                    user={user}
                    adminFlag={adminFlag}
                    student={student}
                    updateDocument={updateDocument}
                />
            );

            expect(wrapper.find("ul").length).toBe(1);
            expect(wrapper.find("a").length).toBe(1);

            wrapper.find("a").first().simulate('click')

            wrapper.update();
            wrapper.render();

            await waitFor(() => {
                expect(updateDocument).toHaveBeenCalledTimes(1);
            })
        })
    });

    it("Should render working delete button, declining as necessary, if an admin", async () => {
        await act(async () => {
            jest.spyOn(global, "confirm" as any).mockReturnValueOnce(undefined);

            const student = {
                ...mockData,
                comments: [
                    {
                        id: 123,
                        displayName: "display Name",
                        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                    } as CommentInterface,
                ],
            } as StudentDataInterface;

            const user = {} as firebase.User;
            const adminFlag = true;
            const updateDocument = jest.fn((id: string, updates: any) => Promise.resolve());

            const wrapper = shallow(
                <StudentCommentViews
                    user={user}
                    adminFlag={adminFlag}
                    student={student}
                    updateDocument={updateDocument}
                />
            );

            expect(wrapper.find("ul").length).toBe(1);
            expect(wrapper.find("a").length).toBe(1);

            wrapper.find("a").first().simulate('click')

            wrapper.update();
            wrapper.render();

            await waitFor(() => {
                expect(updateDocument).toHaveBeenCalledTimes(0);
            })
        })
    });
});
