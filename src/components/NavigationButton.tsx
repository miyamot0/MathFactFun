/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import './styles/NavigationButton.css'

export interface NavigationButton {
    Icon: any
    Text: string
    BackgroundColor: string
    AltText: string
}

export default function NavigationButton({
    Icon,
    Text,
    BackgroundColor,
    AltText,
}: NavigationButton) {
    return (
        <span
            className="navigation-button"
            style={{ backgroundColor: BackgroundColor }}
        >
            <img src={Icon} alt={AltText} />
            <span>{Text}</span>
        </span>
    )
}
