/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { CommentInterface } from "../../types/CommentTypes";
import { StudentDataInterface } from "../../../interfaces/StudentInterfaces";
import { renderAdministrativeButtons, renderSetCreatorButton, renderSpecificOutcomesButton } from "../StudentSummaryViews";

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

describe('renderSpecificOutcomesButton', () => {
    it('Should render buttons with a target', () => {
        const mockData2 = {
            ...mockData,
            currentTarget: "ExplicitTiming"
        } as StudentDataInterface;

        const result = renderSpecificOutcomesButton(mockData2);
        const resultString = JSON.stringify(result);

        expect(resultString.includes('Intervention-specific Targets')).toBe(true);
        expect(resultString.includes('no-specific-outcomes-button')).toBe(false);
    })

    it('Should not render buttons without a target', () => {
        const mockData2 = {
            ...mockData,
            currentTarget: "N/A"
        } as StudentDataInterface;

        const result = renderSpecificOutcomesButton(mockData2);
        const resultString = JSON.stringify(result);

        expect(resultString.includes('Intervention-specific Targets')).toBe(false);
        expect(resultString.includes('no-specific-outcomes-button')).toBe(true);
    })
})

describe('renderSetCreatorButton', () => {
    it('Should render buttons with a target', () => {
        const mockData2 = {
            ...mockData,
            currentTarget: "ExplicitTiming"
        } as StudentDataInterface;

        const result = renderSetCreatorButton(mockData2);
        const resultString = JSON.stringify(result);

        expect(resultString.includes('Targeted Item Sets')).toBe(true);
        expect(resultString.includes('no-set-items-button')).toBe(false);
    })

    it('Should not render buttons without a target', () => {
        const mockData2 = {
            ...mockData,
            currentTarget: "N/A"
        } as StudentDataInterface;

        const result = renderSetCreatorButton(mockData2);
        const resultString = JSON.stringify(result);

        expect(resultString.includes('Targeted Item Sets')).toBe(false);
        expect(resultString.includes('no-set-items-button')).toBe(true);
    })
})

describe('renderAdministrativeButtons', () => {
    it('Should render buttons with a target', () => {
        const user = {} as firebase.User;
        const adminFlag = false;
        const handleDeleteEvent = () => { true };

        const result = renderAdministrativeButtons(user, adminFlag, handleDeleteEvent);
        const resultString = JSON.stringify(result);

        expect(resultString.includes('Advanced and Administrative Options')).toBe(false);
        expect(resultString.includes('no-admin-panel')).toBe(true);
    })

    it('Should render buttons with a target', () => {
        const user = {} as firebase.User;
        const adminFlag = true;
        const handleDeleteEvent = () => { true };

        const result = renderAdministrativeButtons(user, adminFlag, handleDeleteEvent);
        const resultString = JSON.stringify(result);

        expect(resultString.includes('Advanced and Administrative Options')).toBe(true);
        expect(resultString.includes('no-admin-panel')).toBe(false);
    })
})