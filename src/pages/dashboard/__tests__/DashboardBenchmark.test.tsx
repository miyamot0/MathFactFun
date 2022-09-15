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

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

const mockComment = {
    content: 'string',
    displayName: 'string',
    createdAt: '',
    createdBy: '',
    id: 0
}

const mockId = '123';

const mockData = {
    id: mockId,
    aimLine: 0,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
    lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
    comments: [mockComment] as CommentInterface[],
    completedBenchmark: [],
    currentBenchmarking: ['', ''],
    factsMastered: ['', ''],
    factsSkipped: ['', ''],
    factsTargeted: ['', ''],

    creator: '',
    currentApproach: '',
    currentErrorApproach: '',
    currentGrade: '',
    currentSRApproach: '',
    currentTarget: '',
    details: '',
    name: '',
    problemSet: '',

    minForTask: 2
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
            documentError: undefined
        }),
    };
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: mockId,
    }),
    useRouteMatch: () => ({ url: `/benchmark/${mockId}` }),
}));

describe('DashboardPractice: Render', () => {
    it('Should render all components', () => {
        act(() => {
            const wrapper = mount(<DashboardBenchmark />);

            setTimeout(() => {
                const errorTag = wrapper.find({ 'class': 'error' });
                const loadingTag = wrapper.find({ 'class': 'loading' });
                const benchmarkListTag = wrapper.find({ 'class': 'benchmark-list' });
                const benchmarkListItemTag = wrapper.find({ 'class': 'benchmark-list-card' });

                expect(errorTag.length).toBe(0);
                expect(loadingTag.length).toBe(0);
                expect(benchmarkListTag.length).toBe(1);
                expect(benchmarkListItemTag.length).toBe(1);
            }, 1000);
        })
    })
})