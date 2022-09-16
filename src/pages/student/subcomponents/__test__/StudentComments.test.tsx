/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { CommentInterface } from "../types/CommentTypes";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import StudentComments from "../StudentComments";

Enzyme.configure({ adapter: new Adapter() });

const mockId = "123";

const mockData = {
    id: mockId,
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

    creator: '456',
    currentApproach: 'N/A',
    currentErrorApproach: '',
    currentGrade: '',
    currentSRApproach: '',
    currentTarget: '',
    details: '',
    name: '',
    problemSet: '',

    minForTask: 2,
};

jest.mock("./../../../../context/hooks/useAuthorizationContext", () => {
    const originalModule = jest.requireActual(
        "./../../../../context/hooks/useAuthorizationContext"
    );
    return {
        __esModule: true,
        ...originalModule,
        default: () => ({
            user: { uid: mockId, } as firebase.User,
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
    useHistory: () => ({
        push: jest.fn()
    }),
    useRouteMatch: () => ({ url: `/benchmark/${mockId}` }),
}));

describe('StudentComments', () => {
    it("Successfully renders, NA Approach", () => {

        const wrapper = mount(
            <MemoryRouter>
                <StudentComments student={mockData} />
            </MemoryRouter>
        );

        expect(wrapper.find(StudentComments).length).toBe(1)
    });
})