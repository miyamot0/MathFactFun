/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import { CommentInterface } from "../../types/CommentTypes";
import { StudentDataInterface } from "../../../interfaces/StudentInterfaces";
import { renderCommentForm, renderCommentListView } from "../StudentCommentsViews";

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

describe('renderCommentListView', () => {
    it('Should render li with comments', () => {
        const mockData2 = {
            ...mockData,
            comments: [{
                id: 123,
                displayName: "display Name",
                createdAt: firebase.firestore.Timestamp.fromDate(new Date())
            } as CommentInterface]
        } as StudentDataInterface;

        const user = {} as firebase.User;
        const cb = () => true;

        const result = renderCommentListView(user, true, mockData2, cb);
        const resultString = JSON.stringify(result);

        expect(resultString.includes('li')).toBe(true);
    })

    it('Should have working callback', () => {
        const mockData2 = {
            ...mockData,
            comments: [{
                id: 123,
                displayName: "display Name",
                createdAt: firebase.firestore.Timestamp.fromDate(new Date())
            } as CommentInterface]
        } as StudentDataInterface;

        const user = {} as firebase.User;
        const cb = () => true;

        const wrapper = mount(renderCommentListView(user, true, mockData2, cb));
        wrapper.find("a").simulate("click");

        setTimeout(() => {
            expect(cb).toHaveBeenCalled();
        }, 1000)
    })

    it('Should render no li with no comments', () => {
        const mockData2 = {
            ...mockData,
        } as StudentDataInterface;

        const user = {} as firebase.User;
        const cb = () => true;

        const result = renderCommentListView(user, true, mockData2, cb);
        const resultString = JSON.stringify(result);

        expect(resultString.includes('li')).toBe(false);
    })
})


describe('renderCommentForm', () => {
    it('Should render', () => {
        const cb = () => jest.fn();
        const cb2 = () => true;
        const newComment = "asdf";

        const result = renderCommentForm(newComment, cb, cb2);
        const resultString = JSON.stringify(result);

        expect(resultString.includes('textarea')).toBe(true);
    })

    it('Should trigger relevant callbacks', () => {
        const cb = () => jest.fn();
        const cb2 = () => true;
        const newComment = "asdf";

        const wrapper = mount(renderCommentForm(newComment, cb, cb2));
        const event = { target: { value: "sometext" } };
        wrapper.find("textarea").simulate("change", event);

        setTimeout(() => {
            expect(cb).toHaveBeenCalled();
        }, 1000)
    })
})