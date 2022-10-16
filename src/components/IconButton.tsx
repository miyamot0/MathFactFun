/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

export interface IconButton {
    Icon: any
    Action: any
    backgroundStyle: string
    altText: string
}

export default function IconButton({
    Icon,
    Action,
    backgroundStyle,
    altText,
}: IconButton) {
    return (
        <div
            style={{
                float: 'right',
                width: 32,
                height: 32,
                marginLeft: '10px',
                backgroundColor: backgroundStyle,
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
                alt={altText}
            ></img>
        </div>
    )
}
