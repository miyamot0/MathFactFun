/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

export interface InformationPanels {
    Title: string
    Content: any[]
}

export default function InformationPanels({
    Title,
    Content,
}: InformationPanels) {
    return (
        <div className="info-panel">
            <h2 className="global-page-title">{Title}</h2>

            <hr></hr>

            {Content.map((content, index) => {
                return <div key={`${Title}-${index}`}>{content}</div>
            })}
        </div>
    )
}
