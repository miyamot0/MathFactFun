/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import AnnotationsModule from 'highcharts/modules/annotations'
import React from 'react'
import { CommonPanelWidth } from '../../../utilities/FormHelpers'

require('highcharts/modules/annotations')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

AnnotationsModule(Highcharts)

export interface StudentScreening {
    chartOptions: any
}

export default function StudentScreening({ chartOptions }: StudentScreening) {
    return (
        <div style={CommonPanelWidth}>
            <h4
                className="student-summary-h4"
                style={{
                    width: '100%',
                    display: 'inline-block',
                    height: '32px',
                }}
            >
                Benchmarking Scores (Overall Fluency)
            </h4>

            <div className="student-summary">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        </div>
    )
}
