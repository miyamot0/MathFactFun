/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { useFirestore } from '../../firebase/hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import { useFirebaseDocumentTyped } from '../../firebase/hooks/useFirebaseDocument'
import {
    Grades,
    Operations,
    BenchmarkSets,
    InterventionApproach,
    ErrorCorrection,
    Contingencies,
} from '../../maths/Facts'

// components
import { RoutedIdParam } from '../../interfaces/RoutingInterfaces'
import {
    StudentCreateSingleInitialState,
    userCreationReducer,
} from './functionality/StudentFunctionality'
import { StudentDataInterface } from './interfaces/StudentInterfaces'
import { StudentCreatorBehavior } from './types/StudentTypes'
import {
    onLoadSingleStudentEdit,
    verifySingleStudentEdit,
} from './helpers/StudentHelpers'
import {
    StandardEntryFieldDate,
    StandardEntryFieldNumber,
    StandardEntryFieldText,
    StandardEntryFieldTextArea,
    StandardErrorField,
    StandardSelectField,
    StandardSelectFieldMulti,
} from '../../utilities/FieldHelpers'

import './styles/DisplayStudent.css'
import AnimatedHero from '../landing/views/AnimatedHero'

export default function EditStudent() {
    const { id } = useParams<RoutedIdParam>()
    const { document, documentError } =
        useFirebaseDocumentTyped<StudentDataInterface>({
            collectionString: 'students',
            idString: id,
        })
    const history = useHistory()
    const { updateDocument, response } = useFirestore(
        'students',
        undefined,
        undefined
    )

    const [state, dispatch] = useReducer(
        userCreationReducer,
        StudentCreateSingleInitialState
    )

    const CoreOperations = Operations.filter((op) => op.value !== 'NA')

    if (document && !state.DidBuild) {
        onLoadSingleStudentEdit(document, dispatch)
    }

    if (documentError) {
        return <div className="error">{documentError}</div>
    } else if (!document) {
        return <div className="loading">Loading...</div>
    } else {
        return (
            <div style={{ maxWidth: '600px' }} className="edit-student-page">
                <h2 className="global-page-title">Edit current student</h2>
                <AnimatedHero />

                <form
                    onSubmit={(event) => {
                        event.preventDefault()

                        verifySingleStudentEdit(
                            id,
                            state,
                            document,
                            history,
                            updateDocument,
                            response,
                            dispatch
                        )
                    }}
                >
                    <StandardEntryFieldText
                        label={'Student ID'}
                        currentValue={state.Name}
                        type={StudentCreatorBehavior.SetName}
                        dispatch={dispatch}
                    />

                    <StandardEntryFieldTextArea
                        label={'Student Details'}
                        currentValue={state.Details}
                        type={StudentCreatorBehavior.SetDetails}
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
                        label={'Benchmark Set'}
                        options={BenchmarkSets}
                        currentValue={state.CurrentProblemSet}
                        type={StudentCreatorBehavior.SetProblemSet}
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

                    <StandardEntryFieldNumber
                        label={'Target Aim Line'}
                        currentValue={state.AimLine}
                        type={StudentCreatorBehavior.SetAimLine}
                        dispatch={dispatch}
                    />

                    <StandardEntryFieldNumber
                        label={
                            'Duration for Task (Minutes; Explicit Timing Only)'
                        }
                        currentValue={state.ExplicitTime}
                        type={StudentCreatorBehavior.SetExplicitTime}
                        dispatch={dispatch}
                    />

                    <StandardErrorField formError={state.FormError} />

                    <button
                        className="global-btn"
                        style={{ marginTop: '30px' }}
                    >
                        Edit Student
                    </button>
                </form>
                <br></br>
            </div>
        )
    }
}
