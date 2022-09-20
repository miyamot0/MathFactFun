/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createVerticalStringProblemFrame, createVerticalStringSimpleProblemFrame, padTimeDigits, setCharAt } from "../ProblemHelpers";

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

    it('Should correctly render without equality but /', () => {
        const input = "1/";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["", "", "1"], ["÷", "", ""], ["", "", ""]]);
    })

    it('Should correctly render without equality but digits alone', () => {
        const input = "100";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["1", "0", "0"], ["", "", ""], ["", "", ""]]);
    })

    it('Should correctly render without equality but /', () => {
        const input = "1/1";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["", "", "1"], ["÷", "", "1"], ["", "", ""]]);
    })

    it('Should correctly render without any text', () => {
        const input = "+=";
        const result = createVerticalStringProblemFrame(input);
        expect(result).toStrictEqual([["", "", ""], ["+", "", ""], ["", "", ""]]);
    })
})

describe('createVerticalStringSimpleProblemFrame', () => {
    it('Should correctly render with +', () => {

        const input = "1+1=2";
        const answer = "2";
        const result = createVerticalStringSimpleProblemFrame(input, answer)
        expect(result).toStrictEqual([["", "", "1"], ["+", "", "1"], ["", "", "2"]])
    })
    it('Should correctly render with +, double digits', () => {

        const input = "1+11=12";
        const answer = "12";
        const result = createVerticalStringSimpleProblemFrame(input, answer)
        expect(result).toStrictEqual([["", "", "1"], ["+", "1", "1"], ["", "1", "2"]])
    })
    it('Should correctly render with -', () => {

        const input = "2-1=1";
        const answer = "1";
        const result = createVerticalStringSimpleProblemFrame(input, answer)
        expect(result).toStrictEqual([["", "", "2"], ["-", "", "1"], ["", "", "1"]])
    })
    it('Should correctly render with /', () => {

        const input = "1/1=1";
        const answer = "1";
        const result = createVerticalStringSimpleProblemFrame(input, answer)
        expect(result).toStrictEqual([["", "", "1"], ["÷", "", "1"], ["", "", "1"]])
    })
    it('Should correctly render with x', () => {

        const input = "1x1=1";
        const answer = "1";
        const result = createVerticalStringSimpleProblemFrame(input, answer)
        expect(result).toStrictEqual([["", "", "1"], ["x", "", "1"], ["", "", "1"]])
    })
    it('Should correctly render with x and 2-digit answer', () => {

        const input = "10x1=10";
        const answer = "10";
        const result = createVerticalStringSimpleProblemFrame(input, answer)
        expect(result).toStrictEqual([["", "1", "0"], ["x", "", "1"], ["", "1", "0"]])
    })
    it('Should correctly render with x and 2-digit answer', () => {

        const input = "10x1=10";
        const answer = "";
        const result = createVerticalStringSimpleProblemFrame(input, answer)
        expect(result).toStrictEqual([["", "1", "0"], ["x", "", "1"], ["", "", ""]])
    })
})

describe('setCharAt', () => {
    it('Should replace char', () => {

        const str = "100";
        const chr = "3";
        const index = 0;

        const result = setCharAt(str, index, chr);

        expect(result).toBe("300");
    })

    it('Should return out if index out of bounds', () => {

        const str = "100";
        const chr = "3";
        const index = 5;

        const result = setCharAt(str, index, chr);

        expect(result).toBe("100");
    })
})

describe('padTimeDigits', () => {
    it('Should pad out digit', () => {
        const result = padTimeDigits(1);
        expect(result).toBe("01");
    })

    it('Should pad out digit', () => {
        const result = padTimeDigits(0);
        expect(result).toBe("00");
    })
})