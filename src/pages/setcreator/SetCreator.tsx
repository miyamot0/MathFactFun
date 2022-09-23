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
import { ColumnObject } from "./types/SetCreatorTypes";
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
  generateColumnSnapshotPreview,
  getRelevantCCCSet,
  populateCoreInformation,
  saveUpdatedDataToFirebase,
} from "./helpers/SetCreatorHelpers";
import { SingleOptionType } from "../../types/SharedComponentTypes";
import { PerformanceDataInterface } from "../intervention/interfaces/InterventionInterfaces";
import { generateSetTargetOptions, loadCreatorMathFacts, onChangedMovedTargetsHandler, onChangedSetTargetHandler, onDragEnd, resetItems } from "./helpers/DragDropHelpers";

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
      populateCoreInformation(documents, target, callbackFromReducer, dispatch);
    }
  }, [documents, target]);

  /** callbackFromReducer
   * 
   * @param callbackColumns 
   * @param callbackColumnsPre 
   * @returns 
   */
  async function callbackFromReducer(callbackColumns: ColumnObject, callbackColumnsPre: ColumnObject) {
    if (!checkIfNullUndefinedOrEmpty(callbackColumns) && !checkIfNullUndefinedOrEmpty(callbackColumnsPre)) {

      const comparisonObjects = generateColumnSnapshotPreview(callbackColumns, callbackColumnsPre)

      // Note: expensive
      if (JSON.stringify(comparisonObjects.Current) ===
        JSON.stringify(comparisonObjects.Preview)) {
        return;
      }
      else {
        await saveUpdatedDataToFirebase(id, comparisonObjects, updateDocument, response);
      }
    } else {
      return
    }
  }

  useEffect(() => {
    if (document && !checkIfNullUndefinedOrEmpty(state.ItemHistory) && !state.LoadedData) {
      loadCreatorMathFacts(document, state, dispatch);
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
              options={generateSetTargetOptions(relevantFOFSets)}
              onChange={(option) => onChangedSetTargetHandler(option, document, state, setAssignedSet, dispatch)
              }
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
              onChange={(option) => onChangedMovedTargetsHandler(option, state, dispatch)}
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
