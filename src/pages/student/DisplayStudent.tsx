/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react'
import StudentSummary from './subcomponents/StudentSummary'
import StudentComments from './subcomponents/StudentComments'
import StudentScreening from './subcomponents/StudentScreening'
import Highcharts from 'highcharts'
import AnnotationsModule from 'highcharts/modules/annotations'
import { useParams } from 'react-router-dom'
import { modifyDate } from '../progress/helpers/ProgressHelpers'
import { useFirebaseDocumentTyped } from '../../firebase/hooks/useFirebaseDocument'
import { RoutedIdParam } from '../../interfaces/RoutingInterfaces'
import { StudentDataInterface } from './interfaces/StudentInterfaces'
import { PerformanceDataInterface } from '../intervention/interfaces/InterventionInterfaces'
import { useFirebaseCollectionTyped } from '../../firebase/hooks/useFirebaseCollection'
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext'
import {
    reducerPerOperation,
    remapReducedEntriesToPoint,
} from '../screening/helper/ScreeningHelper'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('highcharts/modules/annotations')(Highcharts)
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('highcharts/modules/accessibility')(Highcharts)
AnnotationsModule(Highcharts)

import './styles/DisplayStudent.css'
import AnimatedHero from '../landing/views/AnimatedHero'

export default function DisplayStudent() {
    const { id } = useParams<RoutedIdParam>()
    const { user, adminFlag } = useAuthorizationContext()
    const { document, documentError } =
        useFirebaseDocumentTyped<StudentDataInterface>({
            collectionString: 'students',
            idString: id,
        })

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
            document &&
            additionDocuments &&
            subtractionDocuments &&
            multiplicationDocuments &&
            divisionDocuments
        ) {
            const additionR = reducerPerOperation(additionDocuments)
            const subtractionR = reducerPerOperation(subtractionDocuments)
            const multiplicationR = reducerPerOperation(multiplicationDocuments)
            const divisionR = reducerPerOperation(divisionDocuments)

            const date1 = additionR.map((d) => d.DateObject)
            const date2 = subtractionR.map((d) => d.DateObject)
            const date3 = multiplicationR.map((d) => d.DateObject)
            const date4 = divisionR.map((d) => d.DateObject)

            const allDates = [...date1, ...date2, ...date3, ...date4]

            const dateArr = allDates.map((d) => d.getTime())
            const maxDate = modifyDate(new Date(Math.max.apply(null, dateArr)))
            const minDate = modifyDate(new Date(Math.min.apply(null, dateArr)))

            setChartOptions({
                chart: {
                    height: '600px',
                },
                title: {
                    text: null,
                },
                series: [
                    {
                        name: 'Addition',
                        data: remapReducedEntriesToPoint(additionR),
                        type: 'line',
                    },
                    {
                        name: 'Subtraction',
                        data: remapReducedEntriesToPoint(subtractionR),
                        type: 'line',
                    },
                    {
                        name: 'Multiplication',
                        data: remapReducedEntriesToPoint(multiplicationR),
                        type: 'line',
                    },
                    {
                        name: 'Division',
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
                    gridLineColor: 'transparent',
                    min: 0,
                },
                annotations: [
                    {
                        draggable: '',
                        shapeOptions: {
                            type: 'path',
                            dashStyle: 'dotted',
                            strokeWidth: 1,
                            stroke: 'red',
                            fill: 'red',
                        },
                        shapes: [
                            {
                                type: 'path',
                                points: [
                                    {
                                        x: minDate.getTime(),
                                        y: document.aimLine,
                                        xAxis: 0,
                                        yAxis: 0,
                                    },
                                    {
                                        x: maxDate.getTime(),
                                        y: document.aimLine,
                                        xAxis: 0,
                                        yAxis: 0,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            })
        }
    }, [
        document,
        additionDocuments,
        subtractionDocuments,
        multiplicationDocuments,
        divisionDocuments,
    ])

    if (documentError) {
        return <div className="error">{documentError}</div>
    } else if (!document) {
        return <div className="loading">Loading...</div>
    } else {
        return (
            <div className="student-details-style">
                <StudentSummary student={document} />

                <div>
                    <StudentScreening chartOptions={chartOptions} />
                    <StudentComments student={document} />
                </div>
            </div>
        )
    }
}
