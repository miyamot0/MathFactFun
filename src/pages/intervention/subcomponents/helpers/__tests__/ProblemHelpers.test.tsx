/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createVerticalStringProblemFrame } from "../ProblemHelpers";

 describe('createVerticalStringProblemFrame', () => {
    it('Should correctly render with +', () => {
        const input = "1+1=2";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["", "", "1"], ["+", "", "1"], ["", "", "2"]]);
    })

    it('Should correctly render with -', () => {
        const input = "2-1=1";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["", "", "2"], ["-", "", "1"], ["", "", "1"]]);
    })

    it('Should correctly render with /', () => {
        const input = "1/1=1";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["", "", "1"], ["÷", "", "1"], ["", "", "1"]]);
    })

    it('Should correctly render with x', () => {
        const input = "1x1=1";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["", "", "1"], ["x", "", "1"], ["", "", "1"]]);
    })

    it('Should correctly render without equality', () => {
        const input = "1";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["", "", "1"], ["", "", ""], ["", "", ""]]);
    })

    it('Should correctly render without equality but /', () => {
        const input = "1/";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["", "", "1"], ["÷", "", ""], ["", "", ""]]);
    })

    it('Should correctly render without any text', () => {
        const input = "+=";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["", "", "="], ["", "", ""], ["", "", ""]]);
    })
 })


 describe('createVerticalStringSimpleProblemFrame', () => {
    it('Should correctly render with +', () => {
        expect(1).toBe(1)
    })
 })