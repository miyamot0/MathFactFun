import firebase from 'firebase/app'
import { MultiValue } from 'react-select'
import { SingleOptionType } from '../../../types/SharedComponentTypes'
import { StudentSelectState } from '../functionality/StudentFunctionality'
import { CommentInterface } from '../subcomponents/types/CommentTypes'
import { StudentCreatorBehavior } from '../types/StudentTypes'

export interface StudentTutorialInterface {
    id: string | undefined | null
    Tutorial: string
    Target: string
    Problems: number
    Attempts: number
    InitialCorrect: number
    Errors: number
    SessionDuration: number
}

export interface StudentDataInterface {
    id: string | undefined | null
    aimLine: number
    createdAt: firebase.firestore.Timestamp
    dueDate: firebase.firestore.Timestamp
    lastActivity: firebase.firestore.Timestamp
    comments: CommentInterface[]
    completedBenchmark: string[]
    currentBenchmarking: string[]
    factsMastered: string[]
    factsSkipped: string[]
    factsTargeted: string[]

    creator: string
    currentApproach: string
    currentErrorApproach: string
    currentGrade: string
    currentSRApproach: string
    currentTarget: string
    details: string
    name: string
    problemSet: string

    minForTask: number

    // New
    TutorialBenchmarkAddition: boolean
    TutorialBenchmarkSubtraction: boolean
    TutorialBenchmarkMultiplication: boolean
    TutorialBenchmarkDivision: boolean

    tutorialCCC: boolean
    tutorialET: boolean
}

export interface StudentCreateState {
    Name: string
    Names: string[]
    Details: string
    FormError: undefined | string
    DueDate: string
    CurrentApproach: SingleOptionType
    CurrentGrade: SingleOptionType
    CurrentTarget: SingleOptionType
    CurrentErrorApproach: SingleOptionType
    CurrentSRApproach: SingleOptionType
    CurrentBenchmarking: MultiValue<SingleOptionType>
    DidBuild: boolean
    TutorialCCC: boolean
    TutorialET: boolean
    AimLine: number
    ExplicitTime: number
    CurrentProblemSet: SingleOptionType

    TutorialBenchmarkAddition: boolean
    TutorialBenchmarkSubtraction: boolean
    TutorialBenchmarkMultiplication: boolean
    TutorialBenchmarkDivision: boolean

    BulkStudentLoad: StudentSelectState[]
}

export interface StudentWidgetInterface {
    student: StudentDataInterface
}

/** StudentDispatchUpdateName
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateName {
    public type?: number
    public payload: {
        Name: string
    }
    public StudentDispatchUpdateName?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { Name: string }
        StudentDispatchUpdateName?: string
    }) {
        this.type = StudentCreatorBehavior.SetName
        this.payload = payload
        this.StudentDispatchUpdateName = 'StudentDispatchUpdateName'
    }
}

/** StudentDispatchUpdateDetails
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateDetails {
    public type?: number
    public payload: {
        Details: string
    }
    public StudentDispatchUpdateDetails?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { Details: string }
        StudentDispatchUpdateDetails?: string
    }) {
        this.type = StudentCreatorBehavior.SetDetails
        this.payload = payload
        this.StudentDispatchUpdateDetails = 'StudentDispatchUpdateDetails'
    }
}

/** StudentDispatchUpdateFormError
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateFormError {
    public type?: number
    public payload: {
        FormError: string | undefined
    }
    public StudentDispatchUpdateFormError?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { FormError: string | undefined }
        StudentDispatchUpdateFormError?: string
    }) {
        this.type = StudentCreatorBehavior.SetFormError
        this.payload = payload
        this.StudentDispatchUpdateFormError = 'StudentDispatchUpdateFormError'
    }
}

/** StudentDispatchUpdateDueDate
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateDueDate {
    public type?: number
    public payload: {
        DueDate: string
    }
    public StudentDispatchUpdateDueDate?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { DueDate: string }
        StudentDispatchUpdateDueDate?: string
    }) {
        this.type = StudentCreatorBehavior.SetDueDate
        this.payload = payload
        this.StudentDispatchUpdateDueDate = 'StudentDispatchUpdateDueDate'
    }
}

/** StudentDispatchUpdateCurrentApproach
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateCurrentApproach {
    public type?: number
    public payload: {
        CurrentApproach: SingleOptionType
    }
    public StudentDispatchUpdateCurrentApproach?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { CurrentApproach: SingleOptionType }
        StudentDispatchUpdateCurrentApproach?: string
    }) {
        this.type = StudentCreatorBehavior.SetCurrentApproach
        this.payload = payload
        this.StudentDispatchUpdateCurrentApproach =
            'StudentDispatchUpdateCurrentApproach'
    }
}

/** StudentDispatchUpdateCurrentGrade
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateCurrentGrade {
    public type?: number
    public payload: {
        CurrentGrade: SingleOptionType
    }
    public StudentDispatchUpdateCurrentGrade?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { CurrentGrade: SingleOptionType }
        StudentDispatchUpdateCurrentGrade?: string
    }) {
        this.type = StudentCreatorBehavior.SetCurrentGrade
        this.payload = payload
        this.StudentDispatchUpdateCurrentGrade =
            'StudentDispatchUpdateCurrentGrade'
    }
}

/** StudentDispatchUpdateCurrentErrorApproach
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateCurrentErrorApproach {
    public type?: number
    public payload: {
        CurrentErrorApproach: SingleOptionType
    }
    public StudentDispatchUpdateCurrentErrorApproach?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { CurrentErrorApproach: SingleOptionType }
        StudentDispatchUpdateCurrentErrorApproach?: string
    }) {
        this.type = StudentCreatorBehavior.SetCurrentErrorApproach
        this.payload = payload
        this.StudentDispatchUpdateCurrentErrorApproach =
            'StudentDispatchUpdateCurrentErrorApproach'
    }
}

/** StudentDispatchUpdateCurrentTarget
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateCurrentTarget {
    public type?: number
    public payload: {
        CurrentTarget: SingleOptionType
    }
    public StudentDispatchUpdateCurrentTarget?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { CurrentTarget: SingleOptionType }
        StudentDispatchUpdateCurrentTarget?: string
    }) {
        this.type = StudentCreatorBehavior.SetCurrentTarget
        this.payload = payload
        this.StudentDispatchUpdateCurrentTarget =
            'StudentDispatchUpdateCurrentTarget'
    }
}

/** StudentDispatchUpdateCurrentSRApproach
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateCurrentSRApproach {
    public type?: number
    public payload: {
        CurrentSRApproach: SingleOptionType
    }
    public StudentDispatchUpdateCurrentSRApproach?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { CurrentSRApproach: SingleOptionType }
        StudentDispatchUpdateCurrentSRApproach?: string
    }) {
        this.type = StudentCreatorBehavior.SetCurrentSRApproach
        this.payload = payload
        this.StudentDispatchUpdateCurrentSRApproach =
            'StudentDispatchUpdateCurrentSRApproach'
    }
}

/** StudentDispatchUpdateCurrentProblemSet
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateCurrentProblemSet {
    public type?: number
    public payload: {
        CurrentProblemSet: SingleOptionType
    }
    public StudentDispatchUpdateCurrentProblemSet?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { CurrentProblemSet: SingleOptionType }
        StudentDispatchUpdateCurrentProblemSet?: string
    }) {
        this.type = StudentCreatorBehavior.SetProblemSet
        this.payload = payload
        this.StudentDispatchUpdateCurrentProblemSet =
            'StudentDispatchUpdateCurrentProblemSet'
    }
}

/** StudentDispatchUpdateCurrentBenchmarking
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateCurrentBenchmarking {
    public type?: number
    public payload: {
        CurrentBenchmarking: MultiValue<SingleOptionType>
    }
    public StudentDispatchUpdateCurrentBenchmarking?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { CurrentBenchmarking: MultiValue<SingleOptionType> }
        StudentDispatchUpdateCurrentBenchmarking?: string
    }) {
        this.type = StudentCreatorBehavior.SetCurrentBenchmarking
        this.payload = payload
        this.StudentDispatchUpdateCurrentBenchmarking =
            'StudentDispatchUpdateCurrentBenchmarking'
    }
}

/** StudentDispatchUpdateDidBuild
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateDidBuild {
    public type?: number
    public payload: {
        DidBuild: boolean
    }
    public StudentDispatchUpdateDidBuild?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { DidBuild: boolean }
        StudentDispatchUpdateDidBuild?: string
    }) {
        this.type = StudentCreatorBehavior.SetBuilt
        this.payload = payload
        this.StudentDispatchUpdateDidBuild = 'StudentDispatchUpdateDidBuild'
    }
}

/** StudentDispatchUpdateAimLine
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateAimLine {
    public type?: number
    public payload: {
        AimLine: number
    }
    public StudentDispatchUpdateAimLine?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { AimLine: number }
        StudentDispatchUpdateAimLine?: string
    }) {
        this.type = StudentCreatorBehavior.SetBuilt
        this.payload = payload
        this.StudentDispatchUpdateAimLine = 'StudentDispatchUpdateAimLine'
    }
}

/** StudentDispatchUpdateExplicitTime
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateExplicitTime {
    public type?: number
    public payload: {
        ExplicitTime: number
    }
    public StudentDispatchUpdateExplicitTime?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: { ExplicitTime: number }
        StudentDispatchUpdateExplicitTime?: string
    }) {
        this.type = StudentCreatorBehavior.SetBuilt
        this.payload = payload
        this.StudentDispatchUpdateExplicitTime =
            'StudentDispatchUpdateExplicitTime'
    }
}

/** StudentDispatchUpdateStudentLoaded
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateStudentLoaded {
    public type?: number
    public payload: {
        Name: string
        Details: string
        DueDate: string
        AimLine: number
        ExplicitTime: number
        CurrentTarget: SingleOptionType
        CurrentGrade: SingleOptionType
        CurrentApproach: SingleOptionType
        CurrentErrorApproach: SingleOptionType
        CurrentSRApproach: SingleOptionType
        CurrentBenchmarking: MultiValue<SingleOptionType>
        CurrentProblemSet: SingleOptionType

        TutorialBenchmarkAddition: boolean
        TutorialBenchmarkSubtraction: boolean
        TutorialBenchmarkMultiplication: boolean
        TutorialBenchmarkDivision: boolean

        TutorialCCC: boolean
        TutorialET: boolean
    }
    public StudentDispatchUpdateStudentLoaded?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: {
            Name: string
            Details: string
            DueDate: string
            AimLine: number
            ExplicitTime: number
            CurrentTarget: SingleOptionType
            CurrentGrade: SingleOptionType
            CurrentApproach: SingleOptionType
            CurrentErrorApproach: SingleOptionType
            CurrentSRApproach: SingleOptionType
            CurrentBenchmarking: MultiValue<SingleOptionType>
            CurrentProblemSet: SingleOptionType

            TutorialBenchmarkAddition: boolean
            TutorialBenchmarkSubtraction: boolean
            TutorialBenchmarkMultiplication: boolean
            TutorialBenchmarkDivision: boolean

            TutorialCCC: boolean
            TutorialET: boolean
        }
        StudentDispatchUpdateStudentLoaded?: string
    }) {
        this.type = StudentCreatorBehavior.SetBuilt
        this.payload = payload
        this.StudentDispatchUpdateStudentLoaded =
            'StudentDispatchUpdateStudentLoaded'
    }
}

/** StudentDispatchUpdateBulkStudentsLoaded
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateBulkStudentsLoaded {
    public type?: number
    public payload: {
        DidBuild: boolean
        BulkStudentLoad: StudentSelectState[]
    }
    public StudentDispatchUpdateBulkStudentsLoaded?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: {
            DidBuild: boolean
            BulkStudentLoad: StudentSelectState[]
        }
        StudentDispatchUpdateBulkStudentsLoaded?: string
    }) {
        this.type = StudentCreatorBehavior.SetLoadedStudents
        this.payload = payload
        this.StudentDispatchUpdateBulkStudentsLoaded =
            'StudentDispatchUpdateBulkStudentsLoaded'
    }
}
/** StudentDispatchUpdateBulkStudentsLoaded
 *
 * Class for updating string entry
 *
 */
export class StudentDispatchUpdateBulkStudentsToggled {
    public type?: number
    public payload: {
        ModifiedState: StudentSelectState
    }
    public StudentDispatchUpdateBulkStudentsToggled?: string

    constructor({
        payload,
    }: {
        type?: number
        payload: {
            ModifiedState: StudentSelectState
        }
        StudentDispatchUpdateBulkStudentsToggled?: string
    }) {
        this.type = StudentCreatorBehavior.SetLoadedStudents
        this.payload = payload
        this.StudentDispatchUpdateBulkStudentsToggled =
            'StudentDispatchUpdateBulkStudentsToggled'
    }
}

// Type guards

export type StudentDataDispatches =
    | StudentDispatchUpdateName
    | StudentDispatchUpdateDetails
    | StudentDispatchUpdateDueDate
    | StudentDispatchUpdateCurrentApproach
    | StudentDispatchUpdateCurrentGrade
    | StudentDispatchUpdateCurrentErrorApproach
    | StudentDispatchUpdateCurrentTarget
    | StudentDispatchUpdateCurrentSRApproach
    | StudentDispatchUpdateCurrentProblemSet
    | StudentDispatchUpdateCurrentBenchmarking
    | StudentDispatchUpdateDidBuild
    | StudentDispatchUpdateAimLine
    | StudentDispatchUpdateExplicitTime
    | StudentDispatchUpdateStudentLoaded
    | StudentDispatchUpdateFormError
    | StudentDispatchUpdateBulkStudentsLoaded
    | StudentDispatchUpdateBulkStudentsToggled

export function isStudentDispatchUpdateName(
    object: StudentDataDispatches
): object is StudentDispatchUpdateName {
    const res_ =
        (object as StudentDispatchUpdateName).StudentDispatchUpdateName !==
        undefined
    return res_
}

export function isStudentDispatchUpdateDetails(
    object: StudentDataDispatches
): object is StudentDispatchUpdateDetails {
    const res_ =
        (object as StudentDispatchUpdateDetails)
            .StudentDispatchUpdateDetails !== undefined
    return res_
}

export function isStudentDispatchUpdateDueDate(
    object: StudentDataDispatches
): object is StudentDispatchUpdateDueDate {
    const res_ =
        (object as StudentDispatchUpdateDueDate)
            .StudentDispatchUpdateDueDate !== undefined
    return res_
}

export function isStudentDispatchUpdateCurrentApproach(
    object: StudentDataDispatches
): object is StudentDispatchUpdateCurrentApproach {
    const res_ =
        (object as StudentDispatchUpdateCurrentApproach)
            .StudentDispatchUpdateCurrentApproach !== undefined
    return res_
}

export function isStudentDispatchUpdateCurrentGrade(
    object: StudentDataDispatches
): object is StudentDispatchUpdateCurrentGrade {
    const res_ =
        (object as StudentDispatchUpdateCurrentGrade)
            .StudentDispatchUpdateCurrentGrade !== undefined
    return res_
}

export function isStudentDispatchUpdateCurrentErrorApproach(
    object: StudentDataDispatches
): object is StudentDispatchUpdateCurrentErrorApproach {
    const res_ =
        (object as StudentDispatchUpdateCurrentErrorApproach)
            .StudentDispatchUpdateCurrentErrorApproach !== undefined
    return res_
}

export function isStudentDispatchUpdateCurrentTarget(
    object: StudentDataDispatches
): object is StudentDispatchUpdateCurrentTarget {
    const res_ =
        (object as StudentDispatchUpdateCurrentTarget)
            .StudentDispatchUpdateCurrentTarget !== undefined
    return res_
}

export function isStudentDispatchUpdateCurrentSRApproach(
    object: StudentDataDispatches
): object is StudentDispatchUpdateCurrentSRApproach {
    const res_ =
        (object as StudentDispatchUpdateCurrentSRApproach)
            .StudentDispatchUpdateCurrentSRApproach !== undefined
    return res_
}

export function isStudentDispatchUpdateCurrentProblemSet(
    object: StudentDataDispatches
): object is StudentDispatchUpdateCurrentProblemSet {
    const res_ =
        (object as StudentDispatchUpdateCurrentProblemSet)
            .StudentDispatchUpdateCurrentProblemSet !== undefined
    return res_
}

export function isStudentDispatchUpdateCurrentBenchmarking(
    object: StudentDataDispatches
): object is StudentDispatchUpdateCurrentBenchmarking {
    const res_ =
        (object as StudentDispatchUpdateCurrentBenchmarking)
            .StudentDispatchUpdateCurrentBenchmarking !== undefined
    return res_
}

export function isStudentDispatchUpdateDidBuild(
    object: StudentDataDispatches
): object is StudentDispatchUpdateDidBuild {
    const res_ =
        (object as StudentDispatchUpdateDidBuild)
            .StudentDispatchUpdateDidBuild !== undefined
    return res_
}

export function isStudentDispatchUpdateAimLine(
    object: StudentDataDispatches
): object is StudentDispatchUpdateAimLine {
    const res_ =
        (object as StudentDispatchUpdateAimLine)
            .StudentDispatchUpdateAimLine !== undefined
    return res_
}

export function isStudentDispatchUpdateExplicitTime(
    object: StudentDataDispatches
): object is StudentDispatchUpdateExplicitTime {
    const res_ =
        (object as StudentDispatchUpdateExplicitTime)
            .StudentDispatchUpdateExplicitTime !== undefined
    return res_
}

export function isStudentDispatchUpdateStudentLoaded(
    object: StudentDataDispatches
): object is StudentDispatchUpdateStudentLoaded {
    const res_ =
        (object as StudentDispatchUpdateStudentLoaded)
            .StudentDispatchUpdateStudentLoaded !== undefined
    return res_
}

export function isStudentDispatchUpdateFormError(
    object: StudentDataDispatches
): object is StudentDispatchUpdateFormError {
    const res_ =
        (object as StudentDispatchUpdateFormError)
            .StudentDispatchUpdateFormError !== undefined
    return res_
}

export function isStudentDispatchUpdateBulkStudentsLoaded(
    object: StudentDataDispatches
): object is StudentDispatchUpdateBulkStudentsLoaded {
    const res_ =
        (object as StudentDispatchUpdateBulkStudentsLoaded)
            .StudentDispatchUpdateBulkStudentsLoaded !== undefined
    return res_
}

export function isStudentDispatchUpdateBulkStudentsToggled(
    object: StudentDataDispatches
): object is StudentDispatchUpdateBulkStudentsToggled {
    const res_ =
        (object as StudentDispatchUpdateBulkStudentsToggled)
            .StudentDispatchUpdateBulkStudentsToggled !== undefined
    return res_
}
