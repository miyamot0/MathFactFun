/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MultiValue } from 'react-select'
import { ErrorHandling } from '../../../maths/Facts'
import { SingleOptionType } from '../../../types/SharedComponentTypes'
import {
    isStudentDispatchUpdateAimLine,
    isStudentDispatchUpdateBulkStudentsLoaded,
    isStudentDispatchUpdateBulkStudentsToggled,
    isStudentDispatchUpdateCurrentApproach,
    isStudentDispatchUpdateCurrentBenchmarking,
    isStudentDispatchUpdateCurrentErrorApproach,
    isStudentDispatchUpdateCurrentGrade,
    isStudentDispatchUpdateCurrentProblemSet,
    isStudentDispatchUpdateCurrentSRApproach,
    isStudentDispatchUpdateCurrentTarget,
    isStudentDispatchUpdateDetails,
    isStudentDispatchUpdateDidBuild,
    isStudentDispatchUpdateDueDate,
    isStudentDispatchUpdateExplicitTime,
    isStudentDispatchUpdateFormError,
    isStudentDispatchUpdateName,
    isStudentDispatchUpdateStudentLoaded,
    StudentCreateState,
    StudentDataDispatches,
    StudentDataInterface,
    StudentDispatchUpdateAimLine,
    StudentDispatchUpdateBulkStudentsLoaded,
    StudentDispatchUpdateBulkStudentsToggled,
    StudentDispatchUpdateCurrentApproach,
    StudentDispatchUpdateCurrentBenchmarking,
    StudentDispatchUpdateCurrentErrorApproach,
    StudentDispatchUpdateCurrentGrade,
    StudentDispatchUpdateCurrentProblemSet,
    StudentDispatchUpdateCurrentSRApproach,
    StudentDispatchUpdateCurrentTarget,
    StudentDispatchUpdateDetails,
    StudentDispatchUpdateDidBuild,
    StudentDispatchUpdateDueDate,
    StudentDispatchUpdateExplicitTime,
    StudentDispatchUpdateFormError,
    StudentDispatchUpdateName,
    StudentDispatchUpdateStudentLoaded,
} from '../interfaces/StudentInterfaces'
import { StudentCreatorBehavior } from '../types/StudentTypes'

export interface StudentSelectState {
    docId: string
    usrId: string
    Student: StudentDataInterface
    Checked: boolean
}

export const StudentCreateSingleInitialState: StudentCreateState = {
    Name: '',
    Names: [],
    Details: '',
    FormError: undefined,
    DueDate: '',
    CurrentApproach: {
        value: 'NA',
        label: 'No Current Intervention',
    } as SingleOptionType,
    CurrentGrade: {
        value: 'K',
        label: 'Kindergarten',
    } as SingleOptionType,
    CurrentTarget: {
        value: 'NA',
        label: 'No Current Target',
    } as SingleOptionType,
    CurrentErrorApproach: {
        value: ErrorHandling.EveryTime,
        label: 'Give feedback every time',
    } as SingleOptionType,
    CurrentSRApproach: {
        value: 'None',
        label: 'No programmed contingencies',
    } as SingleOptionType,
    CurrentBenchmarking: [] as MultiValue<SingleOptionType>,
    DidBuild: false,
    AimLine: 0,
    ExplicitTime: 2,
    CurrentProblemSet: {
        value: 'A',
        label: 'A',
    } as SingleOptionType,
    TutorialBenchmarkAddition: false,
    TutorialBenchmarkSubtraction: false,
    TutorialBenchmarkMultiplication: false,
    TutorialBenchmarkDivision: false,
    TutorialCCC: false,
    TutorialET: false,
    BulkStudentLoad: [],
}

/** overwriteOnlyExisting
 *
 * @param destination
 * @param incoming
 * @returns
 */
export function overwriteOnlyExistingStudent(
    destination: StudentCreateState,
    incoming: StudentDataDispatches
): StudentCreateState {
    if (isStudentDispatchUpdateName(incoming)) {
        const local: StudentDispatchUpdateName =
            incoming as StudentDispatchUpdateName

        local.payload.Name =
            local.payload.Name === undefined
                ? destination.Name
                : local.payload.Name

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateDetails(incoming)) {
        const local: StudentDispatchUpdateDetails =
            incoming as StudentDispatchUpdateDetails

        local.payload.Details =
            local.payload.Details === undefined
                ? destination.Details
                : local.payload.Details

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateDueDate(incoming)) {
        const local: StudentDispatchUpdateDueDate =
            incoming as StudentDispatchUpdateDueDate

        local.payload.DueDate =
            local.payload.DueDate === undefined
                ? destination.DueDate
                : local.payload.DueDate

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateCurrentApproach(incoming)) {
        const local: StudentDispatchUpdateCurrentApproach =
            incoming as StudentDispatchUpdateCurrentApproach

        local.payload.CurrentApproach =
            local.payload.CurrentApproach === undefined
                ? destination.CurrentApproach
                : local.payload.CurrentApproach

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateCurrentGrade(incoming)) {
        const local: StudentDispatchUpdateCurrentGrade =
            incoming as StudentDispatchUpdateCurrentGrade

        local.payload.CurrentGrade =
            local.payload.CurrentGrade === undefined
                ? destination.CurrentGrade
                : local.payload.CurrentGrade

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateCurrentErrorApproach(incoming)) {
        const local: StudentDispatchUpdateCurrentErrorApproach =
            incoming as StudentDispatchUpdateCurrentErrorApproach

        local.payload.CurrentErrorApproach =
            local.payload.CurrentErrorApproach === undefined
                ? destination.CurrentErrorApproach
                : local.payload.CurrentErrorApproach

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateCurrentTarget(incoming)) {
        const local: StudentDispatchUpdateCurrentTarget =
            incoming as StudentDispatchUpdateCurrentTarget

        local.payload.CurrentTarget =
            local.payload.CurrentTarget === undefined
                ? destination.CurrentTarget
                : local.payload.CurrentTarget

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateCurrentSRApproach(incoming)) {
        const local: StudentDispatchUpdateCurrentSRApproach =
            incoming as StudentDispatchUpdateCurrentSRApproach

        local.payload.CurrentSRApproach =
            local.payload.CurrentSRApproach === undefined
                ? destination.CurrentSRApproach
                : local.payload.CurrentSRApproach

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateCurrentProblemSet(incoming)) {
        const local: StudentDispatchUpdateCurrentProblemSet =
            incoming as StudentDispatchUpdateCurrentProblemSet

        local.payload.CurrentProblemSet =
            local.payload.CurrentProblemSet === undefined
                ? destination.CurrentProblemSet
                : local.payload.CurrentProblemSet

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateCurrentBenchmarking(incoming)) {
        const local: StudentDispatchUpdateCurrentBenchmarking =
            incoming as StudentDispatchUpdateCurrentBenchmarking

        local.payload.CurrentBenchmarking =
            local.payload.CurrentBenchmarking === undefined
                ? destination.CurrentBenchmarking
                : local.payload.CurrentBenchmarking

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateDidBuild(incoming)) {
        const local: StudentDispatchUpdateDidBuild =
            incoming as StudentDispatchUpdateDidBuild

        local.payload.DidBuild =
            local.payload.DidBuild === undefined
                ? destination.DidBuild
                : local.payload.DidBuild

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateAimLine(incoming)) {
        const local: StudentDispatchUpdateAimLine =
            incoming as StudentDispatchUpdateAimLine

        local.payload.AimLine =
            local.payload.AimLine === undefined
                ? destination.AimLine
                : local.payload.AimLine

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateExplicitTime(incoming)) {
        const local: StudentDispatchUpdateExplicitTime =
            incoming as StudentDispatchUpdateExplicitTime

        local.payload.ExplicitTime =
            local.payload.ExplicitTime === undefined
                ? destination.ExplicitTime
                : local.payload.ExplicitTime

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateStudentLoaded(incoming)) {
        const local: StudentDispatchUpdateStudentLoaded =
            incoming as StudentDispatchUpdateStudentLoaded

        local.payload.Name =
            local.payload.Name === undefined
                ? destination.Name
                : local.payload.Name

        local.payload.Details =
            local.payload.Details === undefined
                ? destination.Details
                : local.payload.Details

        local.payload.DueDate =
            local.payload.DueDate === undefined
                ? destination.DueDate
                : local.payload.DueDate

        local.payload.AimLine =
            local.payload.AimLine === undefined
                ? destination.AimLine
                : local.payload.AimLine

        local.payload.ExplicitTime =
            local.payload.ExplicitTime === undefined
                ? destination.ExplicitTime
                : local.payload.ExplicitTime

        local.payload.CurrentTarget =
            local.payload.CurrentTarget === undefined
                ? destination.CurrentTarget
                : local.payload.CurrentTarget

        local.payload.CurrentGrade =
            local.payload.CurrentGrade === undefined
                ? destination.CurrentGrade
                : local.payload.CurrentGrade

        local.payload.CurrentApproach =
            local.payload.CurrentApproach === undefined
                ? destination.CurrentApproach
                : local.payload.CurrentApproach

        local.payload.CurrentErrorApproach =
            local.payload.CurrentErrorApproach === undefined
                ? destination.CurrentErrorApproach
                : local.payload.CurrentErrorApproach

        local.payload.CurrentSRApproach =
            local.payload.CurrentSRApproach === undefined
                ? destination.CurrentSRApproach
                : local.payload.CurrentSRApproach

        local.payload.CurrentBenchmarking =
            local.payload.CurrentBenchmarking === undefined
                ? destination.CurrentBenchmarking
                : local.payload.CurrentBenchmarking

        local.payload.CurrentProblemSet =
            local.payload.CurrentProblemSet === undefined
                ? destination.CurrentProblemSet
                : local.payload.CurrentProblemSet

        local.payload.TutorialBenchmarkAddition =
            local.payload.TutorialBenchmarkAddition === undefined
                ? destination.TutorialBenchmarkAddition
                : local.payload.TutorialBenchmarkAddition

        local.payload.TutorialBenchmarkSubtraction =
            local.payload.TutorialBenchmarkSubtraction === undefined
                ? destination.TutorialBenchmarkSubtraction
                : local.payload.TutorialBenchmarkSubtraction

        local.payload.TutorialBenchmarkMultiplication =
            local.payload.TutorialBenchmarkMultiplication === undefined
                ? destination.TutorialBenchmarkMultiplication
                : local.payload.TutorialBenchmarkMultiplication

        local.payload.TutorialBenchmarkDivision =
            local.payload.TutorialBenchmarkDivision === undefined
                ? destination.TutorialBenchmarkDivision
                : local.payload.TutorialBenchmarkDivision

        local.payload.TutorialCCC =
            local.payload.TutorialCCC === undefined
                ? destination.TutorialCCC
                : local.payload.TutorialCCC

        local.payload.TutorialET =
            local.payload.TutorialET === undefined
                ? destination.TutorialET
                : local.payload.TutorialET

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateBulkStudentsLoaded(incoming)) {
        const local: StudentDispatchUpdateBulkStudentsLoaded =
            incoming as StudentDispatchUpdateBulkStudentsLoaded

        local.payload.DidBuild = true

        local.payload.BulkStudentLoad =
            local.payload.BulkStudentLoad === undefined
                ? destination.BulkStudentLoad
                : local.payload.BulkStudentLoad

        return {
            ...destination,
            ...local.payload,
        }
    }

    if (isStudentDispatchUpdateBulkStudentsToggled(incoming)) {
        const local: StudentDispatchUpdateBulkStudentsToggled =
            incoming as StudentDispatchUpdateBulkStudentsToggled

        const incomeState = incoming.payload.ModifiedState
        const modifiedBulkState = destination.BulkStudentLoad.map((student) => {
            return {
                ...student,
                Checked:
                    student.docId === incomeState.docId
                        ? !student.Checked
                        : student.Checked,
            }
        })

        return {
            ...destination,
            BulkStudentLoad: modifiedBulkState,
        }
    }

    if (isStudentDispatchUpdateFormError(incoming)) {
        const local: StudentDispatchUpdateFormError =
            incoming as StudentDispatchUpdateFormError

        // NOTE: should be undefined most of the time

        return {
            ...destination,
            ...local.payload,
        }
    }

    throw Error(`Didn't match: ${JSON.stringify(incoming)}`)
}

/** userCreationReducer
 *
 * Reducer for creating/editing student
 *
 * @param {StudentCreateState} state
 * @param {StudentActionObject} action
 * @returns {StudentCreateState}
 */
export function userCreationReducer(
    state: StudentCreateState,
    action: StudentDataDispatches
): StudentCreateState {
    switch (action.type) {
        case StudentCreatorBehavior.SetName:
        case StudentCreatorBehavior.SetDetails:
        case StudentCreatorBehavior.SetFormError:
        case StudentCreatorBehavior.SetDueDate:
        case StudentCreatorBehavior.SetCurrentApproach:
        case StudentCreatorBehavior.SetCurrentGrade:
        case StudentCreatorBehavior.SetCurrentErrorApproach:
        case StudentCreatorBehavior.SetCurrentTarget:
        case StudentCreatorBehavior.SetCurrentSRApproach:
        case StudentCreatorBehavior.SetProblemSet:
        case StudentCreatorBehavior.SetCurrentBenchmarking:
        case StudentCreatorBehavior.SetBuilt:
        case StudentCreatorBehavior.SetAimLine:
        case StudentCreatorBehavior.SetExplicitTime:
        case StudentCreatorBehavior.SetLoadedStudent:
        case StudentCreatorBehavior.SetLoadedStudents:
        case StudentCreatorBehavior.SetToggleSelectedStudent:
            return overwriteOnlyExistingStudent(state, action)

        default:
            return state
    }
}
