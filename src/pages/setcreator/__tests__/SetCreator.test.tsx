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
import Enzyme, { mount } from "enzyme";
import { CommentInterface } from "../../student/subcomponents/types/CommentTypes";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import { MemoryRouter } from "react-router-dom";

import * as UseAuthProvider from '../../../context/hooks/useAuthorizationContext'
import * as UseDocumentMethods from '../../../firebase/hooks/useFirebaseDocument'
import * as UseCollectionMethods from '../../../firebase/hooks/useFirebaseCollection'
import { waitFor } from "@testing-library/react";
import { FactDataInterface } from "../interfaces/SetCreatorInterfaces";
import { PerformanceDataInterface } from "../../intervention/interfaces/InterventionInterfaces";
import { InterventionFormat } from "../../../maths/Facts";
import SetCreator from "../SetCreator";

Enzyme.configure({ adapter: new Adapter() });

const mockId = "123";
const mockTarget = "Addition";
const mockComment = {
    content: "string",
    displayName: "string",
    createdAt: "",
    createdBy: "",
    id: 0,
};

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: mockId,
        target: mockTarget,
    }),
    useRouteMatch: () => ({ url: `/Screening/${mockId}` }),
}));

describe('SetCreator', () => {
    it('Should render with data', () => {
        const docMockCollection = jest.spyOn(UseCollectionMethods, "useFirebaseCollectionTyped")
        docMockCollection.mockReturnValue({
            documents: [
                {
                    correctDigits: 1,
                    errCount: 1,
                    nCorrectInitial: 1,
                    nRetries: 1,
                    sessionDuration: 1,
                    setSize: 1,
                    totalDigits: 1,
                    entries: [
                        {
                            factCorrect: true,
                            initialTry: true,

                            // Strings
                            factType: "Addition",
                            factString: "1+1=2",
                            factEntry: "1+1=2",

                            // Numerics
                            latencySeconds: 5,

                            // Timestamps
                            dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date()),
                            dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date()),
                        } as FactDataInterface,
                    ],
                    id: mockId,
                    creator: "345",
                    target: mockTarget,
                    method: InterventionFormat.ExplicitTiming,
                    dateTimeEnd: firebase.firestore.Timestamp.fromDate(new Date())
                        .toDate()
                        .toDateString(),
                    dateTimeStart: firebase.firestore.Timestamp.fromDate(new Date())
                        .toDate()
                        .toDateString(),
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                } as PerformanceDataInterface,
            ] as PerformanceDataInterface[],
            error: undefined
        })

        const docMockDocument = jest.spyOn(UseDocumentMethods, "useFirebaseDocumentTyped")
        docMockDocument.mockReturnValue({
            document: {
                id: mockId,
                aimLine: 0,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
                lastActivity: firebase.firestore.Timestamp.fromDate(new Date()),
                comments: [mockComment] as CommentInterface[],
                completedBenchmark: [],
                currentBenchmarking: ["Addition-Sums to 18"],
                factsMastered: [],
                factsSkipped: [],
                factsTargeted: [],

                creator: "",
                currentApproach: "N/A",
                currentErrorApproach: "N/A",
                currentGrade: "K",
                currentSRApproach: "N/A",
                currentTarget: "Addition",
                details: "",
                name: "",
                problemSet: "A",

                minForTask: 0.04,
            } as StudentDataInterface,
            documentError: undefined
        })

        const wrapper = mount(<SetCreator></SetCreator>)

        waitFor(() => {
            expect(wrapper.find('div.set-creator-wrapper').length).toBe(1)
        })
    })
})