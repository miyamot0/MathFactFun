/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MultiValue } from "react-select";
import { SingleOptionType } from "../types/SharedComponentTypes";

/** confirmStringType
 * 
 * @param {unknown} value 
 * @returns {string}
 */
export function confirmStringType(value: unknown): string {

    if (!(typeof value === 'string' || value instanceof String)) {
        throw Error("Value not a string type");
    }

    return value as string;
}

/** confirmNumberType
 * 
 * @param {unknown} value 
 * @returns {number}
 */
export function confirmNumberType(value: unknown): number {

    if (!Number.isFinite(value)) {
        throw new Error("Value not a number type");
    }

    return value as number;
}

export function checkIfOptionKeysPresent(value: unknown): boolean {
    const newObject = value as object;

    if (newObject === null) {
        throw new Error("Option is null, cannot check for keys");
    }

    if (newObject === undefined) {
        throw new Error("Option is undefined, cannot check for keys");
    }

    const currentKeys = Object.keys(newObject);

    if (!currentKeys.includes("label") || !currentKeys.includes("value")) {
        return false;
    }

    return true;
}

/** confirmSingleOptionType
 * 
 * @param {unknown} value 
 * @returns {SingleOptionType}
 */
export function confirmSingleOptionType(value: unknown): SingleOptionType {
    if (!checkIfOptionKeysPresent(value)) {
        throw Error("Value not a single option type");
    }

    return value as SingleOptionType;
}

/** confirmMultiSingleOptionType
 * 
 * @param {unknown} value 
 * @returns {MultiValue<SingleOptionType>}
 */
export function confirmMultiSingleOptionType(value: unknown): MultiValue<SingleOptionType> {

    const riskyCast = value as MultiValue<SingleOptionType>;

    if (riskyCast === null || riskyCast === undefined) {
        throw Error("Value not a multiple single option type");
    }

    riskyCast.forEach((singleOptionType: object) => {

        if (!checkIfOptionKeysPresent(singleOptionType)) {
            throw Error("Value not a multiple single option type");
        }
    });

    return value as MultiValue<SingleOptionType>;
}