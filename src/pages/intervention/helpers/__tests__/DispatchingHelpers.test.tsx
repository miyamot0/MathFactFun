/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import { FirestoreState } from "../../../../firebase/interfaces/FirebaseInterfaces";
import { InterventionFormat } from "../../../../maths/Facts";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import { InitialInterventionState, SharedActionSequence } from "../../functionality/InterventionBehavior";
import { InterventionState } from "../../interfaces/InterventionInterfaces";
import { commonKeyHandler, completeLoadingDispatch, coverCopyCompareSequence, explicitTimingSequence } from "../DispatchingHelpers";
import * as InteractionHelpers from "./../InteractionHelpers";
import * as InterventionHelpers from "./../InterventionHelpers";

describe("completeLoadingDispatch", () => {
    it("Correct routing based on intervention: CCC", () => {
        const dispatch = jest.fn((submittedObject) => submittedObject);

        completeLoadingDispatch(
            {
                intervention: InterventionFormat.CoverCopyCompare,
                currentAction: undefined,
                workingData: ["1=1=2"],
                operatorSymbol: "+",
                secondsLeft: undefined,
                dispatch
            }
        );

        expect(dispatch).toBeCalled();
    });
    it("Correct routing based on intervention: ET", () => {
        const dispatch = jest.fn((submittedObject) => submittedObject);

        completeLoadingDispatch(
            {
                intervention: InterventionFormat.ExplicitTiming,
                currentAction: undefined,
                workingData: ["1=1=2"],
                operatorSymbol: "+",
                secondsLeft: undefined,
                dispatch
            }
        );

        expect(dispatch).toBeCalled();
    });
    it("Correct routing based on intervention: Benchmark", () => {
        const dispatch = jest.fn((submittedObject) => submittedObject);

        completeLoadingDispatch(
            {
                intervention: "Benchmark",
                currentAction: undefined,
                workingData: ["1=1=2"],
                operatorSymbol: "+",
                secondsLeft: undefined,
                dispatch
            }
        );

        expect(dispatch).toBeCalled();
    });
    it("Default routing based on bad intervention", () => {
        const dispatch = jest.fn((submittedObject) => submittedObject);

        completeLoadingDispatch(
            {
                intervention: "asdf",
                currentAction: undefined,
                workingData: ["1=1=2"],
                operatorSymbol: "+",
                secondsLeft: undefined,
                dispatch
            }
        );

        expect(dispatch).not.toBeCalled();
    });
});

describe('commonKeyHandler', () => {

    const state = InitialInterventionState;

    it('Correct routing based on intervention: CCC', () => {
        const dispatch = jest.fn();
        const docMock1 = jest.spyOn(InteractionHelpers, "commonKeyHandlerCCC");
        const mockedFunctionCC = jest.fn(() => true);
        docMock1.mockImplementation(() => mockedFunctionCC());


        const docMock2 = jest.spyOn(InteractionHelpers, "commonKeyHandlerET");
        const mockedFunctionET = jest.fn(() => true);
        docMock2.mockImplementation(() => mockedFunctionET());

        commonKeyHandler(
            InterventionFormat.CoverCopyCompare,
            "1",
            state,
            dispatch
        );

        expect(mockedFunctionCC).toBeCalled();
        expect(mockedFunctionET).not.toBeCalled();
    })

    it('Correct routing based on intervention: ET', () => {
        const dispatch = jest.fn();
        const docMock1 = jest.spyOn(InteractionHelpers, "commonKeyHandlerCCC");
        const mockedFunctionCC = jest.fn(() => true);
        docMock1.mockImplementation(() => mockedFunctionCC());


        const docMock2 = jest.spyOn(InteractionHelpers, "commonKeyHandlerET");
        const mockedFunctionET = jest.fn(() => true);
        docMock2.mockImplementation(() => mockedFunctionET());

        commonKeyHandler(
            InterventionFormat.ExplicitTiming,
            "1",
            state,
            dispatch
        );

        expect(mockedFunctionCC).not.toBeCalled();
        expect(mockedFunctionET).toBeCalled();
    })

    it('Flawed routing throws error', () => {
        const dispatch = jest.fn();
        const docMock1 = jest.spyOn(InteractionHelpers, "commonKeyHandlerCCC");
        const mockedFunctionCC = jest.fn(() => true);
        docMock1.mockImplementation(() => mockedFunctionCC());


        const docMock2 = jest.spyOn(InteractionHelpers, "commonKeyHandlerET");
        const mockedFunctionET = jest.fn(() => true);
        docMock2.mockImplementation(() => mockedFunctionET());

        expect(() => commonKeyHandler(
            "asdf",
            "1",
            state,
            dispatch
        )).toThrowError(Error("No intervention type specified"))
    })
})

describe('coverCopyCompareSequence', () => {
    const state = InitialInterventionState;

    it('SharedActionSequence.Entry, no verify', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Entry
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        coverCopyCompareSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.Start, no verify', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Start
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        coverCopyCompareSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.Begin, no verify', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Begin
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        coverCopyCompareSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.CoverCopy, no verify', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.CoverCopy
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        coverCopyCompareSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.Compare, verify, and accurate', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Compare,
            ViewRepresentationInternal: "1+1=2",
            EntryRepresentationInternal: "1+1=2",
            OperatorSymbol: "+"
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        coverCopyCompareSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.Compare, verify, and accurate, but on-going', () => {
        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Compare,
            ViewRepresentationInternal: "1+1=2",
            EntryRepresentationInternal: "1+1=2",
            OperatorSymbol: "+",
            WorkingData: ["2+2=4", "3+3=6"]
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        coverCopyCompareSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.Compare, verify, but inaccurate', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Compare,
            ViewRepresentationInternal: "1+1=2",
            EntryRepresentationInternal: "1+1=3",
            OperatorSymbol: "+"
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        const docMock1 = jest.spyOn(InterventionHelpers, "shouldShowFeedback");
        const mockCommonKeyHandler = jest.fn(() => true);
        docMock1.mockImplementation(() => mockCommonKeyHandler());

        coverCopyCompareSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })
})

describe('explicitTimingSequence', () => {
    const state = InitialInterventionState;

    it('SharedActionSequence.Start, no verify', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Start,
            ViewRepresentationInternal: "1+1=2",
            EntryRepresentationInternal: "1+1=2",
            OperatorSymbol: "+",
            WorkingData: ["2+2=4", "3+3=6"]
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        explicitTimingSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.Begin, no verify', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Begin,
            ViewRepresentationInternal: "1+1=2",
            EntryRepresentationInternal: "1+1=2",
            OperatorSymbol: "+",
            WorkingData: ["2+2=4", "3+3=6"]
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        explicitTimingSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.Answer, no verify', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Answer,
            ViewRepresentationInternal: "1+1=2",
            EntryRepresentationInternal: "1+1=2",
            OperatorSymbol: "+",
            WorkingData: ["2+2=4", "3+3=6"]
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        explicitTimingSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.Answer, on initial try', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Answer,
            ViewRepresentationInternal: "1+1=2",
            EntryRepresentationInternal: "2",
            OperatorSymbol: "+",
            WorkingData: ["2+2=4", "3+3=6"],
            OnInitialTry: true
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        explicitTimingSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.Answer, on initial try, final item', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Answer,
            ViewRepresentationInternal: "1+1=2",
            EntryRepresentationInternal: "2",
            OperatorSymbol: "+",
            WorkingData: [],
            OnInitialTry: true
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        explicitTimingSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    it('SharedActionSequence.Answer, verify, inaccurate, with error message', () => {
        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Answer,
            ViewRepresentationInternal: "1+1=2",
            EntryRepresentationInternal: "3",
            OperatorSymbol: "+",
            WorkingData: ["2+2=4", "3+3=6"]
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        const docMock1 = jest.spyOn(InterventionHelpers, "shouldShowFeedback");
        const mockCommonKeyHandler = jest.fn(() => true);
        docMock1.mockImplementation(() => mockCommonKeyHandler());

        explicitTimingSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })

    /*

    it('SharedActionSequence.Compare, verify, but inaccurate', () => {

        const user = { uid: "456" } as firebase.User;
        const id = "123"
        const document = {} as StudentDataInterface;
        const state2 = {
            ...state,
            CurrentAction: SharedActionSequence.Compare,
            ViewRepresentationInternal: "1+1=2",
            EntryRepresentationInternal: "1+1=3",
            OperatorSymbol: "+"
        } as InterventionState;

        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const dispatch = jest.fn();

        const response = {} as FirestoreState;
        const history = { push: jest.fn() };

        const docMock1 = jest.spyOn(InterventionHelpers, "shouldShowFeedback");
        const mockCommonKeyHandler = jest.fn(() => true);
        docMock1.mockImplementation(() => mockCommonKeyHandler());

        explicitTimingSequence(
            user,
            id,
            document,
            state2,
            openModal,
            addDocument,
            updateDocument,
            response,
            history,
            dispatch)

        expect(dispatch).toBeCalled()
    })
    */
})