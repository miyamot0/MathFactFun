/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ItemHistory, SetItem } from '../interfaces/SetCreatorInterfaces'

/**
 * Actions for reducer
 */
export enum DragDropActions {
    LoadCallback = 'LoadCallback',
    SetItemHistory = 'SetItemHistory',
    SetBaseItems = 'SetBaseItems',
    UpdateColumns = 'UpdateColumns',
    ToggleLoaded = 'ToggleLoaded',
    SetThrow = 'SetThrow',
}

export type ColumnVector = {
    name: string
    items: any[]
}

export type ColumnObject = {
    [key: string]: ColumnVector
}

export type ColumnsObject = {
    columns: {
        [key: string]: ColumnVector
    }
    columnsOld: {
        [key: string]: ColumnVector
    }
    ItemHistory: ItemHistory[] | undefined
    BaseItems: SetItem[]
    LoadedData: boolean
    Callback: any
}

export type FactSaveObject = {
    factsTargeted: string[]
    factsSkipped: string[]
    factsMastered: string[]
}

export type ColumnSnapsot = {
    Preview: FactSaveObject
    Current: FactSaveObject
}
