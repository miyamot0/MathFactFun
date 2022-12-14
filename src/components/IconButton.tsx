/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import ReactTooltip from 'react-tooltip'

export interface IconButton {
    Icon: any
    Action: any
    BackgroundStyle: string
    AltText: string
    Tooltip: string
}

export default function IconButton({
    Icon,
    Action,
    BackgroundStyle,
    AltText,
    Tooltip,
}: IconButton) {
    return (
        <>
            <div
                data-tip={Tooltip}
                style={{
                    float: 'right',
                    width: 32,
                    height: 32,
                    marginLeft: '10px',
                    backgroundColor: BackgroundStyle,
                    borderRadius: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={Icon}
                    style={{
                        marginRight: '0px',
                        filter: 'invert(100%)',
                    }}
                    onClick={() => Action()}
                    alt={AltText}
                ></img>
            </div>
            <ReactTooltip />
        </>
    )
}
