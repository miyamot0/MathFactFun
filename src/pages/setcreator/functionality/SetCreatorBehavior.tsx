/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DropResult } from "react-beautiful-dnd";
import { FactsOnFire } from "../../../maths/Mind";
import { GetOperatorFromLabel, Sum } from "../../../utilities/LabelHelper";
import { StudentDataInterface } from "../../student/interfaces/StudentInterfaces";
import {
  DragColumnContents,
  DragColumnsInterface,
  FactDataInterface,
  FactStructure,
  ItemHistory,
  SetItem,
} from "../interfaces/SetCreatorInterfaces";
import {
  ColumnObject,
  ColumnsObject,
  DragDropActions,
} from "../types/SetCreatorTypes";

export const StartingColumnValues: ColumnObject = {
  Available: {
    name: "Available",
    items: [],
  },
  Targeted: {
    name: "Targeted",
    items: [],
  },
  Mastered: {
    name: "Mastered",
    items: [],
  },
  Skipped: {
    name: "Skipped",
    items: [],
  },
};

/**
 * Initial state
 */
export const InitialSetCreatorState: ColumnsObject = {
  columns: StartingColumnValues,
  columnsOld: StartingColumnValues,
  ItemHistory: {} as ItemHistory[],
  BaseItems: {} as SetItem[],
  LoadedData: false,
  Callback: undefined,
};

/**
 * Reducer for submission
 *
 * @param {ColumnsObject} state
 * @param {any} action
 * @returns {ColumnsObject}
 */
export const SetCreatorReducer = (
  state: ColumnsObject,
  action: any
): ColumnsObject => {
  switch (action.type) {
    case DragDropActions.LoadCallback:
      return { ...state, Callback: action.payload };
    case DragDropActions.SetItemHistory:
      return { ...state, ItemHistory: action.payload };
    case DragDropActions.SetBaseItems:
      return { ...state, BaseItems: action.payload };
    case DragDropActions.UpdateColumns:
      state.Callback(action.payload as ColumnObject, state.columns);
      return { ...state, columns: action.payload };
    case DragDropActions.ToggleLoaded:
      return { ...state, LoadedData: action.payload };

    default:
      throw new Error();
  }
};
