/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InitialInterventionState, SharedActionSequence } from "../../functionality/InterventionBehavior";
import { InterventionState } from "../../interfaces/InterventionInterfaces";
import { checkForMalformedInput } from "../InputErrorHelpers";

describe('checkForMalformedInput', () => {
    const state = InitialInterventionState;

    it('Should proceed as appropriate, row 1 check', () => {
        const state2 = {
            ...state,
            EntryRepresentationInternal: "",
            CurrentAction: SharedActionSequence.CoverCopy,
            OperatorSymbol: "+",
        } as InterventionState;

        const char = '1';

        const result = checkForMalformedInput(char, state2);

        expect(result).toBe(false)
    })

    it('Should proceed as appropriate, row 2 check (within range)', () => {
        const state2 = {
            ...state,
            EntryRepresentationInternal: "1+1",
            CurrentAction: SharedActionSequence.CoverCopy,
            OperatorSymbol: "+",
        } as InterventionState;

        const char = '1';

        const result = checkForMalformedInput(char, state2);

        expect(result).toBe(false)
    })

    it('Should proceed as appropriate, row 2 check (outside of range)', () => {
        const state2 = {
            ...state,
            EntryRepresentationInternal: "1+11",
            CurrentAction: SharedActionSequence.CoverCopy,
            OperatorSymbol: "+",
        } as InterventionState;

        const char = '1';

        const result = checkForMalformedInput(char, state2);

        expect(result).toBe(true)
    })

    it('Should proceed as appropriate, row 3 check (within range)', () => {
        const state2 = {
            ...state,
            EntryRepresentationInternal: "1+1=1",
            CurrentAction: SharedActionSequence.CoverCopy,
            OperatorSymbol: "+",
        } as InterventionState;

        const char = '1';

        const result = checkForMalformedInput(char, state2);

        expect(result).toBe(false)
    })

    it('Should proceed as appropriate, row 3 check (outside of range)', () => {
        const state2 = {
            ...state,
            EntryRepresentationInternal: "1+1=11",
            CurrentAction: SharedActionSequence.CoverCopy,
            OperatorSymbol: "+",
        } as InterventionState;

        const char = '1';

        const result = checkForMalformedInput(char, state2);

        expect(result).toBe(true)
    })
})