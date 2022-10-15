/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface InitialTutorialBenchmarkState {
    CurrentAction: string
    TrainingItems: string[]
    ShowButton: boolean
    ViewRepresentationInternal: string
    EntryRepresentationInternal: string
    OperatorSymbol: string
    ButtonText: string
    CoverProblemItem: boolean
    DidLoad: boolean
    Animations: boolean
    IsAnimating: boolean
    EmphasizeDelete: boolean
    StartTime: Date | undefined

    Problems: number
    Attempts: number
    InitialCorrect: number
    Errors: number
}

export const TutorialSequenceBenchmark = {
    InitialLoading: 'InitialLoading',
    Responding: 'Responding',
    Correcting: 'Correcting',
}

export const InitialTutorialBenchmarkState: InitialTutorialBenchmarkState = {
    CurrentAction: TutorialSequenceBenchmark.InitialLoading,
    TrainingItems: [],
    ShowButton: false,
    ViewRepresentationInternal: '',
    EntryRepresentationInternal: '',
    OperatorSymbol: '+',
    ButtonText: 'Start',
    CoverProblemItem: true,
    DidLoad: false,
    Animations: false,
    IsAnimating: false,
    EmphasizeDelete: false,
    StartTime: undefined,

    Problems: 0,
    Attempts: 0,
    InitialCorrect: 0,
    Errors: 0,
}

export const enum TutorialBenchmarkActions {
    LoadInformation,
    LoadTrainingItem,
    LoadNextItem,
    UpdateEntry,
    ClearResponseAndRetry,
    LiftDeleteEmphasis,
    DeliverFeedback,
}

/**
 * Reducer for submission
 *
 * @param {InterventionState} state
 * @param {any} action
 * @returns {InterventionState}
 */
export const BenchmarkTutorialReducer = (
    state: InitialTutorialBenchmarkState,
    action: any
): InitialTutorialBenchmarkState => {
    switch (action.type) {
        case TutorialBenchmarkActions.LoadInformation:
            return {
                ...state,
                DidLoad: true,
                ShowButton: true,
                TrainingItems: action.payload.TrainingItems,
                Problems: action.payload.TrainingItems.length,
            }

        case TutorialBenchmarkActions.LoadTrainingItem:
            return {
                ...state,
                IsAnimating: false,
                ShowButton: false,
                ViewRepresentationInternal: state.TrainingItems[0],
                EntryRepresentationInternal: '',
                OperatorSymbol: '+',
                ButtonText: 'Start',
                CoverProblemItem: false,
                Animations: true,
                TrainingItems: state.TrainingItems.slice(1),
                CurrentAction: TutorialSequenceBenchmark.Responding,
                StartTime:
                    state.StartTime === undefined
                        ? new Date()
                        : state.StartTime,
            }

        case TutorialBenchmarkActions.LoadNextItem:
            // eslint-disable-next-line no-case-declarations
            const nextItem = state.TrainingItems[0]
            // eslint-disable-next-line no-case-declarations
            const remainingItems = state.TrainingItems.slice(1)

            if (!remainingItems) {
                throw new Error('Training item not found')
            }

            return {
                ...state,
                IsAnimating: false,
                ViewRepresentationInternal: nextItem,
                EntryRepresentationInternal: '',
                OperatorSymbol: '+',
                ButtonText: 'Check',
                CoverProblemItem: false,
                Animations: true,
                TrainingItems: remainingItems,
                CurrentAction: TutorialSequenceBenchmark.Responding,
                EmphasizeDelete: false,
            }

        case TutorialBenchmarkActions.UpdateEntry:
            return {
                ...state,
                EntryRepresentationInternal:
                    action.payload.EntryRepresentationInternal,
                ShowButton: true,
                ButtonText:
                    state.ButtonText !== 'Check' ? 'Check' : state.ButtonText,
                CurrentAction: TutorialSequenceBenchmark.Responding,
            }

        case TutorialBenchmarkActions.ClearResponseAndRetry:
            return {
                ...state,
                ShowButton: false,
                CurrentAction: TutorialSequenceBenchmark.Responding,
                EmphasizeDelete: true,
                Attempts: state.Attempts + 1,
                Errors: state.Errors + 1,
            }

        case TutorialBenchmarkActions.LiftDeleteEmphasis:
            return {
                ...state,
                EmphasizeDelete: false,
            }

        case TutorialBenchmarkActions.DeliverFeedback:
            return {
                ...state,
                EntryRepresentationInternal: '',
                IsAnimating: true,
                EmphasizeDelete: false,
                ShowButton: false,
                Attempts: state.Attempts + 1,
                InitialCorrect: !state.EmphasizeDelete
                    ? state.InitialCorrect + 1
                    : state.InitialCorrect,
            }

        default:
            throw new Error('Tutorial action type error')
    }
}
