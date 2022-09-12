/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { confirmIfInterventionScreen, InterventionPaths } from "../PathHelper";

/**
export function confirmIfInterventionScreen(address: string): boolean {
  const screens = [
    "CoverCopyCompare",
    "ExplicitTiming",
    "Cloze",
    "TapedProblems",
    "benchmark",
  ];

  let valueToReturn = false;

  screens.forEach((screen) => {
    if (address.includes(screen) && !address.includes("Progress")) {
      valueToReturn = true;
    }
  });

  return valueToReturn;
}

 */

describe('PathHelper: confirmIfInterventionScreen', () => {
    it('Benchmark: Should register as an intervention (testing) interface', () => {
        const page = InterventionPaths.Benchmark;
        const path = `/${page}/Addition/123`;
        const result = confirmIfInterventionScreen(path);
        const expected = true;

        expect(result).toEqual(expected);
    })

    it('CoverCopyCompare: Should register as an intervention (testing) interface', () => {
        const page = InterventionPaths.CoverCopyCompare;
        const path = `/${page}/Addition/123`;
        const result = confirmIfInterventionScreen(path);
        const expected = true;

        expect(result).toEqual(expected);
    })

    it('ExplicitTiming: Should register as an intervention (testing) interface', () => {
        const page = InterventionPaths.ExplicitTiming;
        const path = `/${page}/Addition/123`;
        const result = confirmIfInterventionScreen(path);
        const expected = true;

        expect(result).toEqual(expected);
    })

    it('TapedProblems: Should register as an intervention (testing) interface', () => {
        const page = InterventionPaths.TapedProblems;
        const path = `/${page}/Addition/123`;
        const result = confirmIfInterventionScreen(path);
        const expected = true;

        expect(result).toEqual(expected);
    })

    it('Cloze: Should register as an intervention (testing) interface', () => {
        const page = InterventionPaths.Cloze;
        const path = `/${page}/Addition/123`;
        const result = confirmIfInterventionScreen(path);
        const expected = true;

        expect(result).toEqual(expected);
    })

    it('Dashboard/Student: Should NOT register as an intervention (testing) interface', () => {
        const path = `/dashboard`;
        const result = confirmIfInterventionScreen(path);
        const expected = false;

        expect(result).toEqual(expected);
    })

    it('Dashboard/Practice: Should NOT register as an intervention (testing) interface', () => {
        const path = `/practice`;
        const result = confirmIfInterventionScreen(path);
        const expected = false;

        expect(result).toEqual(expected);
    })

    it('Student/Id: Should NOT register as an intervention (testing) interface', () => {
        const path = `/student/123`;
        const result = confirmIfInterventionScreen(path);
        const expected = false;

        expect(result).toEqual(expected);
    })
})
