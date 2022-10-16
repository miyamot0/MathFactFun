/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Create multiple new student object
 */

import React, { useReducer } from 'react'
import AnimatedHero from '../landing/views/AnimatedHero'
import { useParams } from 'react-router-dom'
import { useFirestore } from '../../firebase/hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import {
    Grades,
    Operations,
    InterventionApproach,
    ErrorCorrection,
    Contingencies,
} from '../../maths/Facts'
import { RoutedIdParam } from '../../interfaces/RoutingInterfaces'
import {
    StudentCreateSingleInitialState,
    userCreationReducer,
} from './functionality/StudentFunctionality'
import { StudentCreatorBehavior } from './types/StudentTypes'
import {
    StandardEntryFieldDate,
    StandardEntryFieldTextArea,
    StandardErrorField,
    StandardSelectField,
    StandardSelectFieldMulti,
} from '../../utilities/FieldHelpers'
import { verifyBulkStudentCreate } from './helpers/StudentHelpers'
import './styles/DisplayStudent.css'

// Page to create new students
export default function CreateBulkStudents() {
    const history = useHistory()
    const { id } = useParams<RoutedIdParam>()
    const { addDocument, response } = useFirestore(
        'students',
        undefined,
        undefined
    )

    const [state, dispatch] = useReducer(
        userCreationReducer,
        StudentCreateSingleInitialState
    )

    const CoreOperations = Operations.filter((op) => op.value !== 'NA')

    return (
        <div style={{ maxWidth: '600px' }} className="create-bulk-student-page">
            <AnimatedHero />
            <h2 className="global-page-title">
                Add new students to class/group
            </h2>

            <form
                onSubmit={(event) => {
                    event.preventDefault()

                    verifyBulkStudentCreate(
                        id,
                        state,
                        history,
                        addDocument,
                        response,
                        dispatch
                    )
                }}
            >
                <StandardEntryFieldTextArea
                    label={'Student IDs (one on each line):'}
                    currentValue={state.Name}
                    type={StudentCreatorBehavior.SetName}
                    dispatch={dispatch}
                />

                <StandardEntryFieldDate
                    label={'Next Benchmark Date'}
                    currentValue={state.DueDate}
                    type={StudentCreatorBehavior.SetDueDate}
                    dispatch={dispatch}
                />

                <StandardSelectField
                    label={'Current Grade'}
                    options={Grades}
                    currentValue={state.CurrentGrade}
                    type={StudentCreatorBehavior.SetCurrentGrade}
                    dispatch={dispatch}
                />

                <StandardSelectFieldMulti
                    label={'Target For Benchmarking'}
                    options={CoreOperations}
                    currentValue={state.CurrentBenchmarking}
                    type={StudentCreatorBehavior.SetCurrentBenchmarking}
                    dispatch={dispatch}
                />

                <StandardSelectField
                    label={'Target For Intervention'}
                    options={Operations}
                    currentValue={state.CurrentTarget}
                    type={StudentCreatorBehavior.SetCurrentTarget}
                    dispatch={dispatch}
                />

                <StandardSelectField
                    label={'Intervention Approach'}
                    options={InterventionApproach}
                    currentValue={state.CurrentApproach}
                    type={StudentCreatorBehavior.SetCurrentApproach}
                    dispatch={dispatch}
                />

                <StandardSelectField
                    label={'Error Correction Procedures'}
                    options={ErrorCorrection}
                    currentValue={state.CurrentErrorApproach}
                    type={StudentCreatorBehavior.SetCurrentErrorApproach}
                    dispatch={dispatch}
                />

                <StandardSelectField
                    label={'Reinforcement Procedures'}
                    options={Contingencies}
                    currentValue={state.CurrentSRApproach}
                    type={StudentCreatorBehavior.SetCurrentSRApproach}
                    dispatch={dispatch}
                />

                <StandardErrorField formError={state.FormError} />

                <button
                    className="global-btn global-btn-light-red"
                    style={{ marginTop: '30px' }}
                >
                    Create New Student(s)
                </button>
            </form>
            <br></br>
        </div>
    )
}
