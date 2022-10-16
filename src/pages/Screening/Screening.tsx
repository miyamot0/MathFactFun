/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import AnnotationsModule from 'highcharts/modules/annotations'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext'
import { RoutedIdParam } from '../../interfaces/RoutingInterfaces'
import { useFirebaseCollectionTyped } from '../../firebase/hooks/useFirebaseCollection'
import {
    CommonDisplayHeadingStyle,
    CommonPanelWidth,
} from '../../utilities/FormHelpers'
import {
    reducerPerOperation,
    remapReducedEntriesToPoint,
} from './helper/ScreeningHelper'
import { PerformanceDataInterface } from '../intervention/interfaces/InterventionInterfaces'

require('highcharts/modules/annotations')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

AnnotationsModule(Highcharts)

export default function Screening() {
    const { id } = useParams<RoutedIdParam>()
    const { user, adminFlag } = useAuthorizationContext()
    const [chartOptions, setChartOptions] = useState({})

    const { documents: additionDocuments } =
        useFirebaseCollectionTyped<PerformanceDataInterface>({
            collectionString: `performances/Addition/${id}`,
            queryString:
                user && adminFlag === false
                    ? ['creator', '==', user.uid]
                    : undefined,
            orderString: undefined,
        })

    const { documents: subtractionDocuments } =
        useFirebaseCollectionTyped<PerformanceDataInterface>({
            collectionString: `performances/Subtraction/${id}`,
            queryString:
                user && adminFlag === false
                    ? ['creator', '==', user.uid]
                    : undefined,
            orderString: undefined,
        })

    const { documents: multiplicationDocuments } =
        useFirebaseCollectionTyped<PerformanceDataInterface>({
            collectionString: `performances/Multiplication/${id}`,
            queryString:
                user && adminFlag === false
                    ? ['creator', '==', user.uid]
                    : undefined,
            orderString: undefined,
        })

    const { documents: divisionDocuments } =
        useFirebaseCollectionTyped<PerformanceDataInterface>({
            collectionString: `performances/Division/${id}`,
            queryString:
                user && adminFlag === false
                    ? ['creator', '==', user.uid]
                    : undefined,
            orderString: undefined,
        })

    useEffect(() => {
        if (
            additionDocuments &&
            subtractionDocuments &&
            multiplicationDocuments &&
            divisionDocuments
        ) {
            const additionR = reducerPerOperation(additionDocuments)
            const subtractionR = reducerPerOperation(subtractionDocuments)
            const multiplicationR = reducerPerOperation(multiplicationDocuments)
            const divisionR = reducerPerOperation(divisionDocuments)

            setChartOptions({
                chart: {
                    height: '600px',
                },
                title: {
                    text: null,
                },
                series: [
                    {
                        name: 'Addition (DCPM)',
                        data: remapReducedEntriesToPoint(additionR),
                        type: 'line',
                    },
                    {
                        name: 'Subtraction (DCPM)',
                        data: remapReducedEntriesToPoint(subtractionR),
                        type: 'line',
                    },
                    {
                        name: 'Multiplication (DCPM)',
                        data: remapReducedEntriesToPoint(multiplicationR),
                        type: 'line',
                    },
                    {
                        name: 'Division (DCPM)',
                        data: remapReducedEntriesToPoint(divisionR),
                        type: 'line',
                    },
                ],
                xAxis: {
                    type: 'datetime',
                    minTickInterval: 24 * 3600 * 1000,
                },
                yAxis: {
                    title: {
                        text: 'Digits Correct/Minute (DCPM)',
                    },
                    min: 0,
                },
                annotations: [
                    {
                        draggable: '',
                        shapeOptions: {
                            type: 'path',
                            dashStyle: 'Solid',
                            strokeWidth: 1,
                            stroke: 'red',
                            fill: 'red',
                        },
                    },
                ],
            })
        }
    }, [
        additionDocuments,
        subtractionDocuments,
        multiplicationDocuments,
        divisionDocuments,
    ])

    return (
        <>
            <div style={CommonPanelWidth}>
                <h2 style={CommonDisplayHeadingStyle}>
                    Benchmark Scores (Overall Fluency)
                </h2>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
            <br></br>
        </>
    )
}
