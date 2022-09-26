/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * checkIfSubmittedViaClick
 */
export function checkIfSubmittedViaClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): boolean {
    if (event && event.detail === 0) {
        return true;
    } else {
        return false;
    }
}