/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import React from "react";
import { Link } from "react-router-dom";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import { CommentInterface } from "../../../student/subcomponents/types/CommentTypes";
import { checkIfBenchmarksCompleted, checkIfCompletedBenchmark, checkIfDateCurrent, checkIfProgrammingCurrent, dynamicallyGenerateLink, generatedStyledFeedback, generateRouteBaseOnStrategy, generateWrapperBenchmarkList, generateWrapperStudentList } from "../helpers/DashboardSubcomponentHelpers";

describe('generateRouteBaseOnStrategy', () => {
    const errorRoute = '#!';

    it('Should return if well formed', () => {
        const strategy = "abc";
        const target = 'def';
        const id = "g";

        const expectedVal = `/${strategy}/${target}/${id}`;
        const calculatedValue = generateRouteBaseOnStrategy(strategy, target, id);

        expect(calculatedValue).toBe(expectedVal);
    })

    it('Should return error on undef: strategy', () => {
        const strategy = undefined;
        const target = 'def';
        const id = "g";

        const expectedVal = `/${strategy}/${target}/${id}`;
        const calculatedValue = generateRouteBaseOnStrategy(strategy, target, id);

        expect(calculatedValue).toBe(errorRoute);
    })

    it('Should return error on undef: target', () => {
        const strategy = 'abc';
        const target = undefined;
        const id = "g";

        const expectedVal = `/${strategy}/${target}/${id}`;
        const calculatedValue = generateRouteBaseOnStrategy(strategy, target, id);

        expect(calculatedValue).toBe(errorRoute);
    })

    it('Should return error on undef: id', () => {
        const strategy = 'abc';
        const target = 'def';
        const id = undefined;

        const expectedVal = `/${strategy}/${target}/${id}`;
        const calculatedValue = generateRouteBaseOnStrategy(strategy, target, id);

        expect(calculatedValue).toBe(errorRoute);
    })

    /*
    export function generateRouteBaseOnStrategy(
        strategy: string | undefined,
        target: string | undefined,
        id: string | undefined | null
    ): string {
        if (strategy === undefined || target === undefined || id === undefined) {
            return "#!";
        }
    
        return `/${strategy}/${target}/${id}`;
    } */

})

describe('checkIfDateCurrent', () => {
    it('Should be true if today', () => {
        const currentDate = firebase.firestore.Timestamp.fromDate(new Date());
        const expected = true;
        const value = checkIfDateCurrent(currentDate);

        expect(value).toBe(expected);
    })

    it('Should be false if earlier than today', () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);

        const currentDate = firebase.firestore.Timestamp.fromDate(date);
        const expected = false;
        const value = checkIfDateCurrent(currentDate);

        expect(value).toBe(expected);
    })

    it('Should be false if null', () => {
        const expected = false;
        const value = checkIfDateCurrent(null);

        expect(value).toBe(expected);
    })
})

describe('dynamicallyGenerateLink', () => {
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
        factsTargeted: ["1+1=2"],

        creator: mockId,
        currentApproach: 'ExplicitTiming',
        currentErrorApproach: '',
        currentGrade: 'K',
        currentSRApproach: '',
        currentTarget: 'Addition',
        details: '',
        name: 'name',
        problemSet: '',

        minForTask: 2
    } as StudentDataInterface;

    it('Should return correct link', () => {
        const expected = <Link
            to={`/${mockData.currentApproach}/${mockData.currentTarget}/${mockData.id}`}
            key={`${mockData.id}`}
        >
            {mockData.name} ({mockData.currentGrade})
        </Link>;

        const value = dynamicallyGenerateLink(mockData);

        expect(value).toStrictEqual(expected);
    })

    // TODO

    /*
    it('Should return bad link, no facts', () => {
        const mockData2 = {
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
            factsTargeted: [],

            creator: mockId,
            currentApproach: 'ExplicitTiming',
            currentErrorApproach: '',
            currentGrade: 'K',
            currentSRApproach: '',
            currentTarget: 'Addition',
            details: '',
            name: 'name',
            problemSet: '',

            minForTask: 2
        } as StudentDataInterface;

        const expected = <Link
            to={'#!'}
            //key={`${mockData.id}`}
            onClick={() =>
                alert("No math problems have been added to the targeted list yet.")
            }
        >
            {mockData2.name} ({mockData2.currentGrade})
        </Link>;

        const value = dynamicallyGenerateLink(mockData2);

        expect(value).toStrictEqual(expected);
    })
    */
})

describe("checkIfCompletedBenchmark", () => {
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
        currentBenchmarking: ['Addition-Sums to 18'],
        factsMastered: ['', ''],
        factsSkipped: ['', ''],
        factsTargeted: ["1+1=2"],

        creator: mockId,
        currentApproach: 'ExplicitTiming',
        currentErrorApproach: '',
        currentGrade: 'K',
        currentSRApproach: '',
        currentTarget: 'Addition',
        details: '',
        name: 'name',
        problemSet: '',

        minForTask: 2
    } as StudentDataInterface;

    it('Should return false if not yet completed', () => {
        const value = checkIfCompletedBenchmark(mockData, mockData.currentBenchmarking[0]);

        expect(value).toBe(false);
    })

    it('Should return false if array is empty', () => {
        const mockData2 = {
            ...mockData,
            completedBenchmark: []
        }

        const value = checkIfCompletedBenchmark(mockData2, mockData.currentBenchmarking[0]);

        expect(value).toBe(false)
    })

    it('Should return true if completed today', () => {
        const tag = `${mockData.currentBenchmarking[0]} ${mockData.dueDate.toDate().toDateString()}`;

        const mockData2 = {
            ...mockData,
            completedBenchmark: [tag]
        }

        const value = checkIfCompletedBenchmark(mockData2, mockData.currentBenchmarking[0]);

        expect(value).toBe(true)
    })
})

describe("checkIfProgrammingCurrent", () => {
    it('Should return false if null', () => {
        const value = checkIfProgrammingCurrent(null);

        // HACK: are these supposed to be reversed?
        expect(value).toBe(false);
    })

    it('Should return false if checked today', () => {
        const date = firebase.firestore.Timestamp.fromDate(new Date());

        const value = checkIfProgrammingCurrent(date);

        // HACK: are these supposed to be reversed?
        expect(value).toBe(false);
    })

    it('Should return true if done two days ago', () => {
        const date1 = new Date();
        date1.setDate(date1.getDate() - 2);

        const date = firebase.firestore.Timestamp.fromDate(date1);

        const value = checkIfProgrammingCurrent(date);

        // HACK: are these supposed to be reversed?
        expect(value).toBe(true);
    })
})

describe("checkIfBenchmarksCompleted", () => {
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
        currentBenchmarking: ['Addition-Sums to 18', 'Multiplication-Single Digit'],
        factsMastered: ['', ''],
        factsSkipped: ['', ''],
        factsTargeted: ["1+1=2"],

        creator: mockId,
        currentApproach: 'ExplicitTiming',
        currentErrorApproach: '',
        currentGrade: 'K',
        currentSRApproach: '',
        currentTarget: 'Addition',
        details: '',
        name: 'name',
        problemSet: '',

        minForTask: 2
    } as StudentDataInterface;

    it('Should return false if benchmarks not all completed', () => {
        const value = checkIfBenchmarksCompleted(mockData);
        expect(value).toBe(false);
    })

    it('Should return false if just 1 benchmarks not all completed', () => {
        const tag = `${mockData.currentBenchmarking[0]} ${mockData.dueDate.toDate().toDateString()}`;

        const mockData2 = {
            ...mockData,
            completedBenchmark: [tag]
        }
        const value = checkIfBenchmarksCompleted(mockData2);

        expect(value).toBe(false);
    })

    it('Should return true if all benchmarks are completed', () => {
        const tag = `${mockData.currentBenchmarking[0]} ${mockData.dueDate.toDate().toDateString()}`;
        const tag2 = `${mockData.currentBenchmarking[1]} ${mockData.dueDate.toDate().toDateString()}`;

        const mockData2 = {
            ...mockData,
            completedBenchmark: [tag, tag2]
        }
        const value = checkIfBenchmarksCompleted(mockData2);

        expect(value).toBe(true);
    })
})

describe("generateWrapperStudentList", () => {
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
        currentBenchmarking: ['Addition-Sums to 18', 'Multiplication-Single Digit'],
        factsMastered: ['', ''],
        factsSkipped: ['', ''],
        factsTargeted: ["1+1=2"],

        creator: mockId,
        currentApproach: 'ExplicitTiming',
        currentErrorApproach: '',
        currentGrade: 'K',
        currentSRApproach: '',
        currentTarget: 'Addition',
        details: '',
        name: 'name',
        problemSet: '',

        minForTask: 2
    } as StudentDataInterface;

    it('Should return benchmarking needed if no benchmarks done', () => {
        const value = generateWrapperStudentList(mockData);

        const returnString = JSON.stringify(value);

        expect(returnString.includes("Needed")).toBe(true);
    })

    it('Should return benchmarking needed if some benchmarks done', () => {
        const tag = `${mockData.currentBenchmarking[0]} ${mockData.dueDate.toDate().toDateString()}`;

        const mockData2 = {
            ...mockData,
            completedBenchmark: [tag]
        }

        const value = generateWrapperStudentList(mockData2);

        const returnString = JSON.stringify(value);

        expect(returnString.includes("Needed")).toBe(true);
    })

    it('Should return benchmarking completed if benchmarks done', () => {
        const tag = `${mockData.currentBenchmarking[0]} ${mockData.dueDate.toDate().toDateString()}`;
        const tag2 = `${mockData.currentBenchmarking[1]} ${mockData.dueDate.toDate().toDateString()}`;

        const mockData2 = {
            ...mockData,
            completedBenchmark: [tag, tag2]
        }

        const value = generateWrapperStudentList(mockData2);

        const returnString = JSON.stringify(value);

        expect(returnString.includes("Needed")).toBe(false);
        expect(returnString.includes("Completed")).toBe(true);
    })

    it('Should grey out benchmarks if the date hasnt arrived yet', () => {

        const date1 = new Date();
        date1.setDate(date1.getDate() - 2);

        const date = firebase.firestore.Timestamp.fromDate(date1);

        const mockData2 = {
            ...mockData,
            dueDate: date
        }

        const value = generateWrapperStudentList(mockData2);

        const returnString = JSON.stringify(value);

        expect(returnString.includes("Needed")).toBe(false);
        expect(returnString.includes("Completed")).toBe(false);
    })
})

describe("generatedStyledFeedback", () => {
    it('Should be green if true', () => {
        const value = generatedStyledFeedback(true);

        const returnString = JSON.stringify(value);

        expect(returnString.includes("red")).toBe(false);
        expect(returnString.includes("green")).toBe(true);
    })

    it('Should be red if false', () => {
        const value = generatedStyledFeedback(false);

        const returnString = JSON.stringify(value);

        expect(returnString.includes("red")).toBe(true);
        expect(returnString.includes("green")).toBe(false);
    })
})

describe("generateWrapperBenchmarkList", () => {
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
        currentBenchmarking: ['Addition-Sums to 18'],
        factsMastered: ['', ''],
        factsSkipped: ['', ''],
        factsTargeted: ["1+1=2"],

        creator: mockId,
        currentApproach: 'ExplicitTiming',
        currentErrorApproach: '',
        currentGrade: 'K',
        currentSRApproach: '',
        currentTarget: 'Addition',
        details: '',
        name: 'name',
        problemSet: '',

        minForTask: 2
    } as StudentDataInterface;

    it('Should return link address if false', () => {
        const value = generateWrapperBenchmarkList(mockData, mockData.currentBenchmarking[0], false);

        const tag = `/benchmark/${mockData.id}/${mockData.currentBenchmarking[0]}`;

        const returnString = JSON.stringify(value);

        expect(returnString.includes(tag)).toBe(true);
        expect(returnString.includes("benchmark-list-card-title")).toBe(false);
    })

    it('Should return p tag if true', () => {
        const value = generateWrapperBenchmarkList(mockData, mockData.currentBenchmarking[0], true);

        const tag = `/benchmark/${mockData.id}/${mockData.currentBenchmarking[0]}`;

        const returnString = JSON.stringify(value);

        expect(returnString.includes(tag)).toBe(false);
        expect(returnString.includes("benchmark-list-card-title")).toBe(true);
    })
})