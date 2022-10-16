/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import ReactTooltip from 'react-tooltip'

export interface TextButton {
    Text: string
    Tooltip: string
    BackgroundColor: string
}

export default function TextButton({
    Text,
    Tooltip,
    BackgroundColor,
}: TextButton) {
    return (
        <>
            <div
                data-tip={Tooltip}
                style={{
                    marginLeft: '10px',
                    marginTop: '5px',
                    backgroundColor: BackgroundColor,
                    borderRadius: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <p
                    style={{
                        margin: '0px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        filter: 'invert(100%)',
                        color: '#000000',
                    }}
                >
                    {Text}
                </p>
            </div>
            <ReactTooltip />
        </>
    )
}
