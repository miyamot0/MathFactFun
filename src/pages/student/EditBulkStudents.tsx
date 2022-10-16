/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useReducer } from 'react'
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
    StudentSelectState,
    userCreationReducer,
} from './functionality/StudentFunctionality'
import { StudentCreatorBehavior } from './types/StudentTypes'
import {
    StandardEntryFieldDate,
    StandardErrorField,
    StandardSelectField,
    StandardSelectFieldMulti,
} from '../../utilities/FieldHelpers'
import {
    onLoadBulkStudentEdit,
    verifyBulkStudentEdit,
} from './helpers/StudentHelpers'
import {
    StudentDataInterface,
    StudentDispatchUpdateBulkStudentsToggled,
} from './interfaces/StudentInterfaces'
import { useFirebaseCollectionTyped } from '../../firebase/hooks/useFirebaseCollection'
import { SingleOptionType } from '../../types/SharedComponentTypes'

import './styles/DisplayStudent.css'

// Page to create new students
export default function EditBulkStudents() {
    const { id } = useParams<RoutedIdParam>()
    const history = useHistory()
    const { updateDocument, response } = useFirestore(
        'students',
        undefined,
        undefined
    )

    const { documents } = useFirebaseCollectionTyped<StudentDataInterface>({
        collectionString: 'students',
        queryString: ['creator', '==', id],
        orderString: undefined,
    })

    const [state, dispatch] = useReducer(userCreationReducer, {
        ...StudentCreateSingleInitialState,
        CurrentApproach: {
            value: 'Ignore',
            label: 'Ignore',
        } as SingleOptionType,
        CurrentGrade: { value: 'Ignore', label: 'Ignore' } as SingleOptionType,
        CurrentTarget: { value: 'Ignore', label: 'Ignore' } as SingleOptionType,
        CurrentErrorApproach: {
            value: 'Ignore',
            label: 'Ignore',
        } as SingleOptionType,
        CurrentSRApproach: {
            value: 'Ignore',
            label: 'Ignore',
        } as SingleOptionType,
        CurrentBenchmarking: [
            { value: 'Ignore', label: 'Ignore' } as SingleOptionType,
        ],
    })

    const CoreOperations = Operations.filter((op) => op.value !== 'NA')

    useEffect(() => {
        if (documents && state.DidBuild === false) {
            onLoadBulkStudentEdit(documents, id, dispatch)
        }
    })

    const numberInRoster =
        documents === null || documents.length === 0 ? 0 : documents.length

    return (
        <div style={{ maxWidth: '600px' }} className="create-bulk-student-page">
            <AnimatedHero />
            <h2 className="global-page-title">Bulk Edit Student Programming</h2>

            <form
                onSubmit={(event) => {
                    event.preventDefault()

                    if (
                        state.BulkStudentLoad === null ||
                        state.BulkStudentLoad.length < 1
                    ) {
                        alert('No students found in roster')
                    }

                    verifyBulkStudentEdit(
                        state,
                        history,
                        updateDocument,
                        response,
                        dispatch
                    )
                }}
            >
                <label>
                    {`Students to Edit (n = ${numberInRoster} Students):`}
                    {state.BulkStudentLoad &&
                        state.BulkStudentLoad.map(
                            (student: StudentSelectState) => {
                                return (
                                    <div
                                        className="cb-wrapper"
                                        key={`div-${student.docId}`}
                                    >
                                        <label
                                            htmlFor={student.docId}
                                            key={`label-${student.docId}`}
                                            className="bulk-check-style"
                                        >
                                            <input
                                                type="checkbox"
                                                key={`input-${student.docId}`}
                                                id={student.docId}
                                                name="selectStudentBox"
                                                checked={student.Checked}
                                                onChange={() => {
                                                    dispatch(
                                                        new StudentDispatchUpdateBulkStudentsToggled(
                                                            {
                                                                payload: {
                                                                    ModifiedState:
                                                                        student,
                                                                },
                                                            }
                                                        )
                                                    )
                                                }}
                                            />
                                            <span>{student.Student.name}</span>
                                        </label>
                                    </div>
                                )
                            }
                        )}{' '}
                </label>

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
                    Update Selected Student(s)
                </button>
            </form>
            <br></br>
        </div>
    )
}
