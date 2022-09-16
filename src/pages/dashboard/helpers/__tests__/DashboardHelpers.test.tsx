/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { CommentInterface } from "../../../student/subcomponents/types/CommentTypes";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import { dashboardGenerateError, dashboardLoadingError, practiceFilterMap, studentFilterMap } from "../DashboardHelpers";

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

    creator: mockId,
    currentApproach: '',
    currentErrorApproach: 'ExplicitTiming',
    currentGrade: '',
    currentSRApproach: '',
    currentTarget: '',
    details: '',
    name: '',
    problemSet: '',

    minForTask: 2
} as StudentDataInterface;

function generateGradedObject(grade: string, uid: string): StudentDataInterface {
    return {
        id: uid,
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

        creator: uid,
        currentApproach: 'ExplicitTiming',
        currentErrorApproach: '',
        currentGrade: grade,
        currentSRApproach: '',
        currentTarget: '',
        details: '',
        name: '',
        problemSet: '',

        minForTask: 2
    } as StudentDataInterface;
}

describe('dashboardGenerateError', () => {
    it('Should work well with string', () => {
        const value = 'err';
        expect(() => dashboardGenerateError(value)).not.toThrow(Error("Unexpected undefined"));
    })

    it('Should fail with undefined', () => {
        const value = undefined;
        expect(() => dashboardGenerateError(value)).toThrow(Error("Unexpected undefined"));
    })
})

describe('dashboardLoadingError', () => {
    it('Should fail with string', () => {
        const value = 'err';
        expect(() => dashboardLoadingError(value)).toThrow(Error("Unexpected error found"));
    })

    it('Should work well withundefined', () => {
        const value = undefined;
        expect(() => dashboardLoadingError(value)).not.toThrow(Error("Unexpected error found"));
    })
})

describe('studentFilterMap', () => {

    const docs = [mockData];
    const user = { uid: '123' } as firebase.User;

    it("Test value, All", () => {
        const value = "All"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = studentFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, Mine", () => {
        const value = "Mine"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = studentFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, NOT Mine", () => {
        const value = "K"
        const gradedObj = [generateGradedObject(value, "234")];
        const test = studentFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, K", () => {
        const value = "K"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = studentFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 1st", () => {
        const value = "1st"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = studentFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 2nd", () => {
        const value = "2nd"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = studentFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 3rd", () => {
        const value = "3rd"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = studentFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 4th", () => {
        const value = "4th"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = studentFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 5th", () => {
        const value = "5th"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = studentFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 6th", () => {
        const value = "6th"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = studentFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it('filter: Should work with string', () => {
        const value = 'err';
        expect(() => studentFilterMap(docs, user, value)).not.toThrow(Error("Unexpected undefined filter variable"));
    })
})

describe('practiceFilterMap', () => {

    const docs = [mockData];
    const user = { uid: '123' } as firebase.User;

    it("Test value, All", () => {
        const value = "All"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = practiceFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, Mine", () => {
        const value = "Mine"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = practiceFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, NOT Mine", () => {
        const value = "K"
        const gradedObj = [generateGradedObject(value, "234")];
        const test = practiceFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, K", () => {
        const value = "K"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = practiceFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 1st", () => {
        const value = "1st"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = practiceFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 2nd", () => {
        const value = "2nd"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = practiceFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 3rd", () => {
        const value = "3rd"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = practiceFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 4th", () => {
        const value = "4th"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = practiceFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 5th", () => {
        const value = "5th"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = practiceFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it("Test value, 6th", () => {
        const value = "6th"
        const gradedObj = [generateGradedObject(value, "123")];
        const test = practiceFilterMap(gradedObj, user, value);

        expect(test).toStrictEqual(gradedObj);
    })

    it('filter: Should work with string', () => {
        const value = 'err';
        expect(() => practiceFilterMap(docs, user, value)).not.toThrow(Error("Unexpected undefined filter variable"));
    })
})
