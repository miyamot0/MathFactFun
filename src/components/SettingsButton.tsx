/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import './styles/SettingsButton.css'

export interface SettingsButton {
    Icon: any
    BackgroundColor: string
    AltText: string
}

export default function SettingsButton({
    Icon,
    BackgroundColor,
    AltText,
}: SettingsButton) {
    return (
        <span style={{ display: 'inline-block' }}>
            <span
                className="settings-button"
                style={{ backgroundColor: BackgroundColor }}
            >
                <img src={Icon} alt={AltText} />
            </span>
        </span>
    )
}
