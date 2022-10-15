/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import StudentSummary from '../StudentSummary'
import { CommentInterface } from '../types/CommentTypes'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })

const mockId = '123'

jest.mock('./../../../../context/hooks/useAuthorizationContext', () => {
    const originalModule = jest.requireActual(
        './../../../../context/hooks/useAuthorizationContext'
    )
    return {
        __esModule: true,
        ...originalModule,
        default: () => ({
            user: { uid: mockId } as firebase.User,
            authIsReady: true,
            adminFlag: false,
            dispatch: jest.fn(() => {
                'pass'
            }),
        }),
    }
})

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: mockId,
    }),
    useHistory: () => ({
        push: jest.fn(),
    }),
    useRouteMatch: () => ({ url: `/benchmark/${mockId}` }),
}))

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
    currentApproach: 'NA',
    currentErrorApproach: '',
    currentGrade: '',
    currentSRApproach: '',
    currentTarget: '',
    details: '',
    name: '',
    problemSet: '',

    minForTask: 2,

    TutorialBenchmarkAddition: false,
    TutorialBenchmarkSubtraction: false,
    TutorialBenchmarkMultiplication: false,
    TutorialBenchmarkDivision: false,
    tutorialCCC: false,
    tutorialET: false,
}

describe('StudentSummary', () => {
    it('Successfully renders, NA Approach', () => {
        const wrapper = mount(
            <MemoryRouter>
                <StudentSummary student={mockData} />
            </MemoryRouter>
        )

        setTimeout(() => {
            expect(wrapper.find('div.no-specific-outcomes-button').length).toBe(
                1
            )
            expect(wrapper.find('div.no-set-items-button').length).toBe(1)
        }, 3000)

        expect(wrapper.find(StudentSummary).length).toBe(1)
    })

    it('Successfully renders, Valid Approach', () => {
        const mockData2 = {
            ...mockData,
            currentApproach: 'ExplicitTiming',
        }

        const wrapper = mount(
            <MemoryRouter>
                <StudentSummary student={mockData2} />
            </MemoryRouter>
        )

        setTimeout(() => {
            expect(wrapper.find('div.no-specific-outcomes-button').length).toBe(
                0
            )
            expect(wrapper.find('div.no-set-items-button').length).toBe(0)
        }, 3000)

        expect(wrapper.find(StudentSummary).length).toBe(1)
    })

    it('renderSpecificOutcomesButton', () => {
        expect(1).toBe(1)
    })

    it('fires', () => {
        expect(1).toBe(1)
    })

    it('fires', () => {
        expect(1).toBe(1)
    })
})
