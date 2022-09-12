/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { checkInputNullOrUndefined, streamlinedCheck } from "../FormHelpers";
import { SingleOptionType } from "../../types/RoutingInterfaces"

describe('FormHelpers: checkInputNullOrUndefined', () => {
    it('Blank: Should confirm false', () => {
        const value = "";
        const expected = false;

        const result = checkInputNullOrUndefined(value);

        expect(result).toEqual(expected)
    })

    it('Undefined: Should confirm true', () => {
        const value = undefined;
        const expected = true;

        const result = checkInputNullOrUndefined(value);

        expect(result).toEqual(expected)
    })

    it('Null: Should confirm true', () => {
        const value = null;
        const expected = true;

        const result = checkInputNullOrUndefined(value);

        expect(result).toEqual(expected)
    })
})

describe('FormHelpers: streamlinedCheck', () => {
    it('Blank (string): Should confirm false', () => {
        const value = "";
        const err = "";
        const dispatch = () => true;

        const expected = false;

        const result = streamlinedCheck(value, err, dispatch);

        expect(result).toEqual(expected)
    })

    it('Blank (SingleOptionType): Should confirm true', () => {
        const value = {
            label: "",
            value: ""
        } as SingleOptionType;

        const err = "";
        const dispatch = () => true;

        const expected = true;

        const result = streamlinedCheck(value, err, dispatch);

        expect(result).toEqual(expected)
    })

    it('Undefined (SingleOptionType): Should confirm false', () => {
        const value = {} as SingleOptionType;

        const err = "";
        const dispatch = () => true;

        const expected = false;

        const result = streamlinedCheck(value, err, dispatch);

        expect(result).toEqual(expected)
    })
})
