/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { StudentDataInterface } from '../../student/interfaces/StudentInterfaces'

export interface TutorialBenchmarkHeader {
    document: StudentDataInterface | null
}

export default function TutorialBenchmarkHeader({
    document,
}: TutorialBenchmarkHeader): JSX.Element {
    const name = document && document.name ? document.name : ''

    return (
        <div className="topBox-tutorial">
            <h2 style={{ display: 'inline-block' }}>{`${name}`}</h2>
        </div>
    )
}
