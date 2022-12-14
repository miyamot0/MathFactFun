/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DropResult } from 'react-beautiful-dnd'
import { SingleOptionType } from '../../../types/SharedComponentTypes'
import { StudentDataInterface } from '../../student/interfaces/StudentInterfaces'
import {
    DragColumnContents,
    DragColumnsInterface,
    FactStructure,
    ItemHistory,
    SetItem,
} from '../interfaces/SetCreatorInterfaces'
import {
    ColumnObject,
    ColumnsObject,
    DragDropActions,
} from '../types/SetCreatorTypes'
import { loadMathFacts, populateColumnMetrics } from './SetCreatorHelpers'

/** onDragEnd
 *
 * Event after drag ends
 *
 * @param {DraggableObject} result Results from event (Source + Destination)
 * @param {DragColumnsInterface} columns Current column state
 * @param {(value: React.SetStateAction<DragColumnsInterface>) => void} setColumns Callback for trigger column change
 * @param {(value: React.SetStateAction<boolean>) => void} setIncomingChange Callback for triggering change
 */
export function onDragEnd(
    result: DropResult,
    columns: DragColumnsInterface,
    dispatch: any
): void {
    if (!result.destination) {
        return
    } else {
        const { source, destination } = result

        let columnObject = {
            Available: {} as DragColumnContents,
            Targeted: {} as DragColumnContents,
            Mastered: {} as DragColumnContents,
            Skipped: {} as DragColumnContents,
        } as DragColumnsInterface

        // Source and destination differ
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)

            columnObject = {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            } as DragColumnsInterface

            columnObject.Available.name = `Available (${columnObject.Available.items.length})`
            columnObject.Targeted.name = `Targeted (${columnObject.Targeted.items.length})`
            columnObject.Mastered.name = `Mastered (${columnObject.Mastered.items.length})`
            columnObject.Skipped.name = `Skipped (${columnObject.Skipped.items.length})`

            dispatch({
                type: DragDropActions.UpdateColumns,
                payload: columnObject,
            })
        } else {
            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)

            columnObject = {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            } as DragColumnsInterface

            dispatch({
                type: DragDropActions.UpdateColumns,
                payload: columnObject,
            })
        }
    }
}

/** moveItemsToTargeted
 *
 * Move items, per a set, to the targeted column
 *
 * @param {number} setArray Index of set
 */
export function moveItemsToTargeted(
    setArray: number,
    state: ColumnsObject,
    document: StudentDataInterface | null,
    dispatch: any
): void {
    if (!document) {
        return
    }

    const newColumns: ColumnObject = state.columns
    let preAvailable = state.columns.Available.items
    let preTargeted = state.columns.Targeted.items
    let preSkipped = state.columns.Skipped.items
    let preMastered = state.columns.Mastered.items

    const mapped = loadMathFacts(document)[setArray].map((item) => item.id)

    state.columns.Targeted.items.forEach((item: FactStructure) => {
        preAvailable.push(item)
    })

    preTargeted = []

    state.columns.Available.items.forEach((item: FactStructure) => {
        if (mapped.includes(item.id)) {
            preTargeted.push(item)

            preAvailable = preAvailable.filter((fact: FactStructure) => {
                return fact.id !== item.id
            })
        } else {
            return false
        }
    })

    state.columns.Skipped.items.forEach((item: FactStructure) => {
        if (mapped.includes(item.id)) {
            preTargeted.push(item)

            preSkipped = preSkipped.filter((fact: FactStructure) => {
                return fact.id !== item.id
            })
        } else {
            return false
        }
    })

    state.columns.Mastered.items.forEach((item: FactStructure) => {
        if (mapped.includes(item.id)) {
            preTargeted.push(item)

            preMastered = preMastered.filter((fact: FactStructure) => {
                return fact.id !== item.id
            })
        } else {
            return false
        }
    })

    newColumns.Available.items = preAvailable
    newColumns.Available.name = `Available (${preAvailable.length})`
    newColumns.Targeted.items = preTargeted
    newColumns.Targeted.name = `Targeted (${preTargeted.length})`
    newColumns.Mastered.items = preMastered
    newColumns.Mastered.name = `Mastered (${preMastered.length})`
    newColumns.Skipped.items = preSkipped
    newColumns.Skipped.name = `Skipped (${preSkipped.length})`

    dispatch({ type: DragDropActions.UpdateColumns, payload: newColumns })
}

/** moveTargetedItems
 *
 * Move items, per current targets, to the specified column
 *
 * @param {String} value Column to receive
 */
export function moveTargetedItems(
    value: string,
    state: ColumnsObject,
    dispatch: any
): void {
    const newColumns = state.columns
    const preAvailable = state.columns.Available.items
    let preTargeted = state.columns.Targeted.items
    const preMastered = state.columns.Mastered.items
    const preSkipped = state.columns.Skipped.items

    switch (value) {
        case 'Mastered':
            preTargeted.forEach((item: FactStructure) => {
                preMastered.push(item)
            })

            break

        case 'Available':
            preTargeted.forEach((item: FactStructure) => {
                preAvailable.push(item)
            })
            break

        case 'Skipped':
            preTargeted.forEach((item: FactStructure) => {
                preSkipped.push(item)
            })
            break

        default:
            preTargeted.forEach((item: FactStructure) => {
                preAvailable.push(item)
            })
            break
    }

    preTargeted = []

    newColumns.Available.items = preAvailable
    newColumns.Available.name = `Available (${preAvailable.length})`
    newColumns.Targeted.items = preTargeted
    newColumns.Targeted.name = `Targeted (${preTargeted.length})`
    newColumns.Mastered.items = preMastered
    newColumns.Mastered.name = `Mastered (${preMastered.length})`
    newColumns.Skipped.items = preSkipped
    newColumns.Skipped.name = `Skipped (${preSkipped.length})`

    dispatch({ type: DragDropActions.UpdateColumns, payload: newColumns })
}

/** resetItems
 *
 * Reset columns to default
 *
 */
export function resetItems(state: ColumnsObject, dispatch: any): void {
    if (window.confirm('Are you sure you want to reset?') === true) {
        const newColumns = state.columns
        newColumns.Available.items = state.BaseItems
        newColumns.Mastered.items = []
        newColumns.Skipped.items = []
        newColumns.Targeted.items = []

        newColumns.Available.name = `Available (${state.BaseItems.length})`
        newColumns.Targeted.name = `Targeted (0)`
        newColumns.Mastered.name = `Mastered (0)`
        newColumns.Skipped.name = `Skipped (0)`

        dispatch({ type: DragDropActions.UpdateColumns, payload: newColumns })
    } else {
        return
    }
}

/** loadCreatorMathFacts
 *
 * @param document
 * @param state
 * @param dispatch
 */
export function loadCreatorMathFacts(
    document: StudentDataInterface,
    state: ColumnsObject,
    dispatch: any
) {
    //TODO: address this, its a resource nightmare
    const mapped: FactStructure[][] = loadMathFacts(document)

    const mappedReduced: FactStructure[] = mapped.reduce((accumulator, value) =>
        accumulator.concat(value)
    )

    const flattened: SetItem[] = mappedReduced.map((entry: FactStructure) => {
        const releventResult = !state.ItemHistory
            ? undefined
            : state.ItemHistory.filter(
                  (obj: ItemHistory) => obj.FactString === entry.Answer
              )

        if (releventResult && releventResult.length === 1) {
            return {
                ...entry,
                OTRs: releventResult[0].Total,
                Accuracy: releventResult[0].AverageCorrect,
                Latency: releventResult[0].Latency,
            } as SetItem
        } else {
            return {
                ...entry,
                OTRs: 0,
                Accuracy: 0,
                Latency: 0,
            } as SetItem
        }
    })

    dispatch({ type: DragDropActions.SetBaseItems, payload: flattened })

    const newColumns = state.columns

    const currTargetedSets = populateColumnMetrics(
        document.factsTargeted,
        state.ItemHistory!
    )

    newColumns.Targeted.items = currTargetedSets

    const currMasteredSets = populateColumnMetrics(
        document.factsMastered,
        state.ItemHistory!
    )

    newColumns.Mastered.items = currMasteredSets

    const currSkippedSets = populateColumnMetrics(
        document.factsSkipped,
        state.ItemHistory!
    )

    newColumns.Skipped.items = currSkippedSets

    const takenArray = [
        ...currTargetedSets.map((a) => a.id),
        ...currMasteredSets.map((a) => a.id),
        ...currSkippedSets.map((a) => a.id),
    ]

    const filteredMap = flattened.filter((item) => {
        return !takenArray.includes(item.id)
    })

    newColumns.Available.items = filteredMap

    newColumns.Available.name = `Available (${newColumns.Available.items.length})`
    newColumns.Targeted.name = `Targeted (${newColumns.Targeted.items.length})`
    newColumns.Mastered.name = `Mastered (${newColumns.Mastered.items.length})`
    newColumns.Skipped.name = `Skipped (${newColumns.Skipped.items.length})`

    dispatch({ type: DragDropActions.UpdateColumns, payload: newColumns })
    dispatch({ type: DragDropActions.ToggleLoaded, payload: true })
}

/** onChangedSetTargetHandler
 *
 * @param option
 * @param document
 * @param state
 * @param setAssignedSet
 * @param dispatch
 * @returns
 */
export function onChangedSetTargetHandler(
    option: SingleOptionType | null,
    document: StudentDataInterface | null,
    state: ColumnsObject,
    setAssignedSet: any,
    dispatch: any
) {
    if (!option) {
        return
    } else {
        setAssignedSet(option)
        moveItemsToTargeted(
            parseInt(option.value) - 1,
            state,
            document,
            dispatch
        )
    }
}

/** onChangedMovedTargetsHandler
 *
 * @param option
 * @param state
 * @param dispatch
 * @returns
 */
export function onChangedMovedTargetsHandler(
    option: SingleOptionType | null,
    state: ColumnsObject,
    dispatch: any
) {
    if (!option) {
        return
    } else {
        moveTargetedItems(option.value, state, dispatch)
    }
}

/** generateSetTargetOptions
 *
 * @param relevantFOFSets
 */
export function generateSetTargetOptions(
    relevantFOFSets: string[][]
): SingleOptionType[] {
    return relevantFOFSets.map((_set, index) => {
        let label = 'B'
        let valueAdjustment = 6

        if (index <= 5) {
            label = 'A'
            valueAdjustment = 0
        }

        if (index >= 12) {
            label = 'C'
            valueAdjustment = 12
        }

        return {
            value: (index + 1).toString(),
            label: 'Set: ' + label + (index + 1 - valueAdjustment).toString(),
        } as SingleOptionType
    })
}
