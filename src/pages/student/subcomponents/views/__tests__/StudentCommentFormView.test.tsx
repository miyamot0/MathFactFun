/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { StudentDataInterface } from "../../../interfaces/StudentInterfaces";
import { FirestoreState } from "../../../../../firebase/interfaces/FirebaseInterfaces";
import { CommentInterface } from "../../types/CommentTypes";
import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import React from "react";
import StudentCommentFormView from "../StudentCommentFormView";

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

describe("StudentCommentFormView", () => {
    it("Should render and sent both, if user is good", async () => {
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
            const updateDocument = jest.fn();
            const dispatch = jest.fn();
            const newComment = "newComment";
            const response = { error: null } as FirestoreState;

            const wrapper = shallow(
                <StudentCommentFormView
                    user={user}
                    newComment={newComment}
                    student={student}
                    updateDocument={updateDocument}
                    dispatch={dispatch}
                    response={response}
                />
            );

            expect(wrapper.find("button").length).toBe(1);

            wrapper.find("button").first().simulate('click');

            await waitFor(() => {
                expect(updateDocument).toBeCalled();
                expect(dispatch).toBeCalled();
            })
        })
    });

    it("Should render and send update alone, if response is bad", async () => {
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
            const updateDocument = jest.fn();
            const dispatch = jest.fn();
            const newComment = "newComment";
            const response = { error: "error" } as FirestoreState;

            const wrapper = shallow(
                <StudentCommentFormView
                    user={user}
                    newComment={newComment}
                    student={student}
                    updateDocument={updateDocument}
                    dispatch={dispatch}
                    response={response}
                />
            );

            expect(wrapper.find("button").length).toBe(1);

            wrapper.find("button").first().simulate('click');

            await waitFor(() => {
                expect(updateDocument).toBeCalled();
                expect(dispatch).toHaveBeenCalledTimes(0);
            })
        })
    });

    it("Should render but send none, if user is bad", async () => {
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

            const user = null as unknown as firebase.User;
            const updateDocument = jest.fn();
            const dispatch = jest.fn();
            const newComment = "newComment";
            const response = { error: "error" } as FirestoreState;

            const wrapper = shallow(
                <StudentCommentFormView
                    user={user}
                    newComment={newComment}
                    student={student}
                    updateDocument={updateDocument}
                    dispatch={dispatch}
                    response={response}
                />
            );

            expect(wrapper.find("button").length).toBe(1);

            wrapper.find("button").first().simulate('click');

            await waitFor(() => {
                expect(updateDocument).toHaveBeenCalledTimes(0);
                expect(dispatch).toHaveBeenCalledTimes(0);
            })
        })
    });
});
