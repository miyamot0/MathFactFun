/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import './styles/Sticker.css'

export default function StickerTitle() {
    return (
        <div style={{ paddingBottom: '30px' }}>
            <span className="sticker" data-text="Math Fact Fun">
                <span>Math Fact Fun</span>
            </span>
        </div>
    )
}
