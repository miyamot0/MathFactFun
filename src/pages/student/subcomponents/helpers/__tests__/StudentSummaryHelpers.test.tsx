/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { confirmDeletion } from "../StudentSummaryHelpers";

describe('confirmDeletion', () => {
    it('Should fire, return TRUE', () => {
        jest.spyOn(global, 'confirm' as any).mockReturnValueOnce(true);

        const result = confirmDeletion();

        expect(result).toBe(true)
    })

    it('Should fire, return FALSE', () => {
        jest.spyOn(global, 'confirm' as any).mockReturnValueOnce(false);

        const result = confirmDeletion();

        expect(result).toBe(false)
    })
})