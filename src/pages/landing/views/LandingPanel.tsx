/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

export interface LandingPanel {
    Title: string
    Content: string[]
}

interface PrependSpace {
    Content: string[]
    Title: string
    index: number
    content: string
}

function PrependSpace({ Content, Title, index, content }: PrependSpace) {
    if (index === 0) {
        return <p key={`${Title}-${index}`}>{content}</p>
    } else if (index <= Content.length - 1) {
        return (
            <p key={`${Title}-${index}`}>
                <br />
                {content}
            </p>
        )
    } else {
        return <p key={`${Title}-${index}`}>{content}</p>
    }
}

export default function LandingPanel({ Title, Content }: LandingPanel) {
    return (
        <div className="landing-panel">
            <h2 className="global-page-title">{Title}</h2>

            <hr></hr>

            {Content.map((p, index) => {
                return (
                    <PrependSpace
                        key={`${Title}-${index}`}
                        Content={Content}
                        Title={Title}
                        index={index}
                        content={p}
                    />
                )
            })}
        </div>
    )
}
