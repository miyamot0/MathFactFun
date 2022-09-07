/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Set Creator file
 */

import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseDocumentTyped } from "../../firebase/useFirebaseDocument";
import { useFirebaseCollectionTyped } from "../../firebase/useFirebaseCollection";
import { useFirestore } from "../../firebase/useFirestore";
import Select from "react-select";
import { DragDropContext } from "react-beautiful-dnd";
import { OnlyUnique } from "../../utilities/LabelHelper";
import {
  FactDataInterface,
  PerformanceDataInterface,
  StudentDataInterface,
} from "../../firebase/types/GeneralTypes";
import {
  ColumnsObject,
  DragDropActions,
  FactStructure,
  ItemHistory,
  ItemMetrics,
  SetItem,
} from "./types/SetCreatorTypes";
import {
  RoutedIdTargetParam,
  SingleOptionType,
} from "../CommonTypes/CommonPageTypes";
import {
  generateItemHistory,
  getRelevantCCCSet,
  InitialSetCreatorState,
  loadMathFacts,
  onDragEnd,
  populateColumnMetrics,
} from "./functionality/SetCreatorBehavior";
import {
  ClearBtn,
  DragDropContainer,
  generateDroppable,
  SetContainer,
  SetEditForm,
  TitleStyle,
} from "./views/SetCreatorViews";

export default function SetCreator() {
  const { target, id } = useParams<RoutedIdTargetParam>();
  const { document } = useFirebaseDocumentTyped<StudentDataInterface>(
    { collectionString: "students", idString: id });

  const { documents } = useFirebaseCollectionTyped<PerformanceDataInterface>(
    { collectionString: `performances/${target}/${id}`, queryString: undefined, orderString: undefined }
  );

  const { updateDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );

  const [assignedSet, setAssignedSet] = useState<SingleOptionType>();

  /**
   * Reducer for submission
   *
   * @param {ColumnsObject} state
   * @param {any} action
   * @returns {ColumnsObject}
   */
  const SetCreatorReducer = (
    state: ColumnsObject,
    action: any
  ): ColumnsObject => {
    switch (action.type) {
      case DragDropActions.Load:
        return { ...state, columns: action.payload };
      case DragDropActions.SetItemHistory:
        return { ...state, ItemHistory: action.payload };
      case DragDropActions.SetBaseItems:
        return { ...state, BaseItems: action.payload };
      case DragDropActions.UpdateColumns:
        saveUpdatedInformation({ ...state, columns: action.payload });
        return { ...state, columns: action.payload };
      case DragDropActions.ToggleLoaded:
        return { ...state, LoadedData: action.payload };

      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(
    SetCreatorReducer,
    InitialSetCreatorState
  );

  useEffect(() => {
    if (documents && target) {
      const mappedDocument = documents!.map((doc) => {
        return {
          Items: doc.entries as FactDataInterface[],
          Date: new Date(doc.dateTimeStart!),
          ShortDate: new Date(doc.dateTimeStart!).toLocaleDateString("en-US"),
          Errors: doc.errCount,
          DigitsCorrect: doc.correctDigits,
          DigitsCorrectInitial: doc.nCorrectInitial,
          DigitsTotal: doc.totalDigits,
          SessionDuration: doc.sessionDuration,
        } as ItemMetrics;
      });

      // Pull out fact models alone, array of array
      const itemSummaries: FactDataInterface[][] = mappedDocument.map(
        (items) => items.Items
      );
      const flatItemSummaries: FactDataInterface[] = itemSummaries.reduce(
        (accumulator, value) => accumulator.concat(value)
      );

      const uniqueProblems: string[] = flatItemSummaries
        .map((obj) => obj.factString!)
        .filter(OnlyUnique)
        .sort();

      const uniqueQuants = generateItemHistory(
        uniqueProblems,
        flatItemSummaries,
        target
      );

      dispatch({ type: DragDropActions.SetItemHistory, payload: uniqueQuants });
    }
  }, [documents, target]);

  /**
   * Save information to firestore
   */
  async function saveUpdatedInformation(objectToSave: ColumnsObject) {
    if (objectToSave !== null) {
      let factsTargeted = objectToSave.columns.Targeted!.items.map(
        (a: FactStructure) => a.id
      );
      var factsSkipped = objectToSave.columns.Skipped!.items.map(
        (a: FactStructure) => a.id
      );
      var factsMastered = objectToSave.columns.Mastered!.items.map(
        (a: FactStructure) => a.id
      );

      const studentObject = {
        factsTargeted,
        factsSkipped,
        factsMastered,
      };

      await updateDocument(id!, studentObject);

      if (response.error) {
        window.alert("There was an error saving to the database");
      }
    }
  }

  useEffect(() => {
    if (document && state.ItemHistory && !state.LoadedData) {
      // Loads ALL facts

      const mapped: FactStructure[][] = loadMathFacts(document);
      const mappedReduced: FactStructure[] = mapped.reduce(
        (accumulator, value) => accumulator.concat(value)
      );

      const flattened: SetItem[] = mappedReduced.map((entry: FactStructure) => {
        let otrs = 0,
          accuracy = 0,
          latency = 0;

        const releventResult = state.ItemHistory!.filter(
          (obj: ItemHistory) => obj.FactString === entry.Answer
        );

        if (releventResult && releventResult.length === 1) {
          otrs = releventResult[0].Total;
          accuracy = releventResult[0].AverageCorrect;
          latency = releventResult[0].Latency;
        }

        return {
          ...entry,
          OTRs: otrs,
          Accuracy: accuracy,
          Latency: latency,
        } as SetItem;
      });

      dispatch({ type: DragDropActions.SetBaseItems, payload: flattened });

      var newColumns = state.columns;

      const currTargetedSets = populateColumnMetrics(
        document!.factsTargeted,
        state.ItemHistory!
      );

      newColumns.Targeted!.items = currTargetedSets;

      const currMasteredSets = populateColumnMetrics(
        document!.factsMastered,
        state.ItemHistory!
      );

      newColumns.Mastered!.items = currMasteredSets;

      const currSkippedSets = populateColumnMetrics(
        document!.factsSkipped,
        state.ItemHistory!
      );

      newColumns.Skipped!.items = currSkippedSets;

      let takenArray = [
        ...currTargetedSets.map((a) => a.id),
        ...currMasteredSets.map((a) => a.id),
        ...currSkippedSets.map((a) => a.id),
      ];

      const filteredMap = flattened.filter((item) => {
        return !takenArray.includes(item.id);
      });

      newColumns.Available!.items = filteredMap;

      newColumns.Available!.name = `Available (${newColumns.Available!.items.length
        })`;
      newColumns.Targeted!.name = `Targeted (${newColumns.Targeted!.items.length
        })`;
      newColumns.Mastered!.name = `Mastered (${newColumns.Mastered!.items.length
        })`;
      newColumns.Skipped!.name = `Skipped (${newColumns.Skipped!.items.length
        })`;

      dispatch({ type: DragDropActions.UpdateColumns, payload: newColumns });
      dispatch({ type: DragDropActions.ToggleLoaded, payload: true });
    }
  }, [document, documents, state.ItemHistory, state.columns, state.LoadedData]);

  /** moveTargetedItems
   *
   * Move items, per current targets, to the specified column
   *
   * @param {String} value Column to receive
   */
  function moveTargetedItems(value: string): void {
    let newColumns = state.columns;
    let preAvailable = state.columns.Available!.items;
    let preTargeted = state.columns.Targeted!.items;
    let preMastered = state.columns.Mastered!.items;
    let preSkipped = state.columns.Skipped!.items;

    switch (value) {
      case "Mastered":
        preTargeted.forEach((item: FactStructure) => {
          preMastered.push(item);
        });

        break;

      case "Available":
        preTargeted.forEach((item: FactStructure) => {
          preAvailable.push(item);
        });
        break;

      case "Skipped":
        preTargeted.forEach((item: FactStructure) => {
          preSkipped.push(item);
        });
        break;

      default:
        preTargeted.forEach((item: FactStructure) => {
          preAvailable.push(item);
        });
        break;
    }

    preTargeted = [];

    newColumns.Available!.items = preAvailable;
    newColumns.Available!.name = `Available (${preAvailable.length})`;
    newColumns.Targeted!.items = preTargeted;
    newColumns.Targeted!.name = `Targeted (${preTargeted.length})`;
    newColumns.Mastered!.items = preMastered;
    newColumns.Mastered!.name = `Mastered (${preMastered.length})`;
    newColumns.Skipped!.items = preSkipped;
    newColumns.Skipped!.name = `Skipped (${preSkipped.length})`;

    dispatch({ type: DragDropActions.UpdateColumns, payload: newColumns });
  }

  /** moveItemsToTargeted
   *
   * Move items, per a set, to the targeted column
   *
   * @param {number} setArray Index of set
   */
  function moveItemsToTargeted(setArray: number): void {
    let newColumns = state.columns;
    let preAvailable = state.columns.Available!.items;
    let preTargeted = state.columns.Targeted!.items;
    let preSkipped = state.columns.Skipped!.items;
    let preMastered = state.columns.Mastered!.items;

    const mapped = loadMathFacts(document)[setArray].map((item) => item.id);

    state.columns.Targeted!.items.forEach((item: FactStructure) => {
      preAvailable.push(item);
    });

    preTargeted = [];

    state.columns.Available!.items.forEach((item: FactStructure) => {
      if (mapped.includes(item.id)) {
        preTargeted.push(item);

        preAvailable = preAvailable.filter((fact: FactStructure) => {
          return fact.id !== item.id;
        });
      }
    });

    state.columns.Skipped!.items.forEach((item: FactStructure) => {
      if (mapped.includes(item.id)) {
        preTargeted.push(item);

        preSkipped = preSkipped.filter((fact: FactStructure) => {
          return fact.id !== item.id;
        });
      }
    });

    state.columns.Mastered!.items.forEach((item: FactStructure) => {
      if (mapped.includes(item.id)) {
        preTargeted.push(item);

        preMastered = preMastered.filter((fact: FactStructure) => {
          return fact.id !== item.id;
        });
      }
    });

    newColumns.Available!.items = preAvailable;
    newColumns.Available!.name = `Available (${preAvailable.length})`;
    newColumns.Targeted!.items = preTargeted;
    newColumns.Targeted!.name = `Targeted (${preTargeted.length})`;
    newColumns.Mastered!.items = preMastered;
    newColumns.Mastered!.name = `Mastered (${preMastered.length})`;
    newColumns.Skipped!.items = preSkipped;
    newColumns.Skipped!.name = `Skipped (${preSkipped.length})`;

    dispatch({ type: DragDropActions.UpdateColumns, payload: newColumns });
  }

  /** resetItems
   *
   * Reset columns to default
   *
   */
  function resetItems(): void {
    if (window.confirm("Are you sure you want to reset?") === true) {
      let newColumns = state.columns;
      newColumns.Available!.items = state.BaseItems!;
      newColumns.Mastered!.items = [];
      newColumns.Skipped!.items = [];
      newColumns.Targeted!.items = [];

      newColumns.Available!.name = `Available (${state.BaseItems!.length})`;
      newColumns.Targeted!.name = `Targeted (0)`;
      newColumns.Mastered!.name = `Mastered (0)`;
      newColumns.Skipped!.name = `Skipped (0)`;

      dispatch({ type: DragDropActions.UpdateColumns, payload: newColumns });
    }
  }

  const relevantFOFSets = getRelevantCCCSet(target!);

  return (
    <div style={SetContainer}>
      <h2 style={TitleStyle}>
        Item Set: {document ? document.name : ""} (
        {document ? document.currentTarget : ""})
      </h2>
      <div style={SetEditForm}>
        <form>
          <label>
            <span>Target an Existing Set:</span>
            <Select
              options={relevantFOFSets.map((set, index) => {
                let label = "B";
                let valueAdjustment = 6;

                if (index <= 5) {
                  label = "A";
                  valueAdjustment = 0;
                }

                if (index >= 12) {
                  label = "C";
                  valueAdjustment = 12;
                }

                return {
                  value: (index + 1).toString(),
                  label:
                    "Set: " + label + (index + 1 - valueAdjustment).toString(),
                } as SingleOptionType;
              })}
              onChange={(option) => {
                setAssignedSet(option!);
                moveItemsToTargeted(parseInt(option!.value) - 1);
              }}
              value={assignedSet}
            />
          </label>
          <label>
            <span>Move Current Targets to: </span>
            <Select
              options={["Mastered", "Available", "Skipped"].map((opt) => {
                return {
                  value: opt,
                  label: "Move to: " + opt,
                };
              })}
              onChange={(option) => {
                moveTargetedItems(option!.value);
              }}
            />
          </label>
          <button
            className="global-btn global-btn-red"
            style={ClearBtn}
            onClick={() => resetItems()}
          >
            Reset Items
          </button>
        </form>
      </div>

      <div style={DragDropContainer}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, state.columns, dispatch)}
        >
          {generateDroppable(state.columns)}
        </DragDropContext>
      </div>
    </div>
  );
}
