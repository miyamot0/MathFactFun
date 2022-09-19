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
import { InitialInterventionState } from "../../functionality/InterventionBehavior";
import { commonKeyHandler, completeLoadingDispatch } from "../DispatchingHelpers";
import * as InteractionHelpers from "./../InteractionHelpers";

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
