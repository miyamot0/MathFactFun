/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseDocumentTyped } from "../../firebase/hooks/useFirebaseDocument";
import { useFirebaseCollectionTyped } from "../../firebase/hooks/useFirebaseCollection";
import { useFirestore } from "../../firebase/hooks/useFirestore";
import Select from "react-select";
import { DragDropContext } from "react-beautiful-dnd";
import { OnlyUnique } from "../../utilities/LabelHelper";
import { ColumnObject, DragDropActions } from "./types/SetCreatorTypes";
import { RoutedIdTargetParam } from "../../interfaces/RoutingInterfaces";
import {
  InitialSetCreatorState,
  SetCreatorReducer,
} from "./functionality/SetCreatorBehavior";
import {
  ClearBtn,
  DragDropContainer,
  generateDroppable,
  SetContainer,
  SetEditForm,
  TitleStyle,
} from "./views/SetCreatorViews";
import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";
import {
  checkIfNullUndefinedOrEmpty,
  generateItemHistory,
  getRelevantCCCSet,
  loadMathFacts,
  populateColumnMetrics,
} from "./helpers/SetCreatorHelpers";
import { SingleOptionType } from "../../types/SharedComponentTypes";
import {
  FactDataInterface,
  FactStructure,
  ItemHistory,
  ItemMetrics,
  SetItem,
} from "./interfaces/SetCreatorInterfaces";
import { PerformanceDataInterface } from "../intervention/interfaces/InterventionInterfaces";
import { moveItemsToTargeted, moveTargetedItems, onDragEnd, resetItems } from "./helpers/DragDropHelpers";

export default function SetCreator() {
  const { target, id } = useParams<RoutedIdTargetParam>();
  const { document } = useFirebaseDocumentTyped<StudentDataInterface>({
    collectionString: "students",
    idString: id,
  });

  const { documents } = useFirebaseCollectionTyped<PerformanceDataInterface>({
    collectionString: `performances/${target}/${id}`,
    queryString: undefined,
    orderString: undefined,
  });

  const { updateDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );

  const [assignedSet, setAssignedSet] = useState<SingleOptionType>();

  const [state, dispatch] = useReducer(
    SetCreatorReducer,
    InitialSetCreatorState
  );

  useEffect(() => {
    if (documents && target) {
      const mappedDocument = documents.map((doc) => {
        return {
          Items: doc.entries as FactDataInterface[],
          Date: new Date(doc.dateTimeStart),
          ShortDate: new Date(doc.dateTimeStart).toLocaleDateString("en-US"),
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
        .map((obj) => obj.factString)
        .filter(OnlyUnique)
        .sort();

      const uniqueQuants = generateItemHistory(
        uniqueProblems,
        flatItemSummaries,
        target
      );

      dispatch({ type: DragDropActions.SetItemHistory, payload: uniqueQuants });

      dispatch({
        type: DragDropActions.LoadCallback,
        payload: callbackFromReducer,
      });
    }
  }, [documents, target]);

  async function callbackFromReducer(
    callbackColumns: ColumnObject,
    callbackColumnsPre: ColumnObject
  ) {
    if (
      !checkIfNullUndefinedOrEmpty(callbackColumns) &&
      !checkIfNullUndefinedOrEmpty(callbackColumnsPre)
    ) {
      const factsTargeted = callbackColumns.Targeted.items.map(
        (a: FactStructure) => a.id
      );
      const factsSkipped = callbackColumns.Skipped.items.map(
        (a: FactStructure) => a.id
      );
      const factsMastered = callbackColumns.Mastered.items.map(
        (a: FactStructure) => a.id
      );

      const studentObject = {
        factsTargeted,
        factsSkipped,
        factsMastered,
      };

      const factsTargetedPrev = callbackColumnsPre.Targeted.items.map(
        (a: FactStructure) => a.id
      );
      const factsSkippedPrev = callbackColumnsPre.Skipped.items.map(
        (a: FactStructure) => a.id
      );
      const factsMasteredPrev = callbackColumnsPre.Mastered.items.map(
        (a: FactStructure) => a.id
      );

      const studentObjectPre = {
        factsTargetedPrev,
        factsSkippedPrev,
        factsMasteredPrev,
      };

      // Note: expensive
      if (JSON.stringify(studentObject) === JSON.stringify(studentObjectPre)) {
        return;
      }

      await updateDocument(id, studentObject);

      if (response.error) {
        window.alert("There was an error saving to the database");
      }
    }
  }

  useEffect(() => {
    if (
      document &&
      !checkIfNullUndefinedOrEmpty(state.ItemHistory) &&
      !state.LoadedData
    ) {
      // Loads ALL facts

      const mapped: FactStructure[][] = loadMathFacts(document);
      const mappedReduced: FactStructure[] = mapped.reduce(
        (accumulator, value) => accumulator.concat(value)
      );

      const flattened: SetItem[] = mappedReduced.map((entry: FactStructure) => {
        let otrs = 0,
          accuracy = 0,
          latency = 0;

        const releventResult = state.ItemHistory.filter(
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

      const newColumns = state.columns;

      const currTargetedSets = populateColumnMetrics(
        document.factsTargeted,
        state.ItemHistory
      );

      newColumns.Targeted.items = currTargetedSets;

      const currMasteredSets = populateColumnMetrics(
        document.factsMastered,
        state.ItemHistory
      );

      newColumns.Mastered.items = currMasteredSets;

      const currSkippedSets = populateColumnMetrics(
        document.factsSkipped,
        state.ItemHistory
      );

      newColumns.Skipped.items = currSkippedSets;

      const takenArray = [
        ...currTargetedSets.map((a) => a.id),
        ...currMasteredSets.map((a) => a.id),
        ...currSkippedSets.map((a) => a.id),
      ];

      const filteredMap = flattened.filter((item) => {
        return !takenArray.includes(item.id);
      });

      newColumns.Available.items = filteredMap;

      newColumns.Available.name = `Available (${newColumns.Available.items.length})`;
      newColumns.Targeted.name = `Targeted (${newColumns.Targeted.items.length})`;
      newColumns.Mastered.name = `Mastered (${newColumns.Mastered.items.length})`;
      newColumns.Skipped.name = `Skipped (${newColumns.Skipped.items.length})`;

      dispatch({ type: DragDropActions.UpdateColumns, payload: newColumns });
      dispatch({ type: DragDropActions.ToggleLoaded, payload: true });
    }
  }, [document, documents, state.ItemHistory, state.columns, state.LoadedData]);

  const relevantFOFSets = getRelevantCCCSet(target);

  return (
    <div style={SetContainer} className={"set-creator-wrapper"}>
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
                if (!option) {
                  return;
                }

                setAssignedSet(option);
                moveItemsToTargeted(parseInt(option.value) - 1,
                  state,
                  document,
                  dispatch);
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
                if (!option) {
                  return;
                }

                moveTargetedItems(option.value, state, dispatch);
              }}
            />
          </label>
          <button
            className="global-btn global-btn-red"
            style={ClearBtn}
            onClick={() => resetItems(state, dispatch)}>
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
