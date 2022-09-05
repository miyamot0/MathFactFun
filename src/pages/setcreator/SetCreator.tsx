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

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseDocument2 } from "../../firebase/useFirebaseDocument";
import { useFirebaseCollection2 } from "../../firebase/useFirebaseCollection";
import { useFirestore } from "../../firebase/useFirestore";
import { FactsOnFire } from "../../maths/Mind";
import Select from "react-select";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  OnlyUnique,
  GetOperatorFromLabel,
  Sum,
} from "../../utilities/LabelHelper";
import {
  FactDataInterface,
  PerformanceDataInterface,
  StudentDataInterface,
} from "../../firebase/types/GeneralTypes";
import {
  DragColumnsInterface,
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
  formatBackgroundColor,
  formatTextBox,
  generateItemHistory,
  getRelevantCCCSet,
  loadMathFacts,
  populateColumnMetrics,
  StartingColumnValues,
} from "./functionality/SetCreatorBehavior";

const TitleStyle = {
  color: "#444",
  height: "100%",
  textAlign: "center" as const,
  marginBottom: "10px",
};

const HeadingStyle = {
  color: "#444",
};

const SetContainer = {
  display: "block",
};

const SetEditForm = {
  maxWidth: "600px",
  justifyContent: "center",
  textAlign: "center" as const,
  margin: "auto",
};

const ClearBtn = {
  marginTop: "5px",
  marginBottom: "20px",
};

const DragDropContainer = {
  display: "flex",
  justifyContent: "center",
  height: "100%",
};

const DropContainer = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center" as const,
};

/** onDragEnd
 *
 * Event after drag ends
 *
 * @param {DraggableObject} result Results from event (Source + Destination)
 * @param {DragColumnsInterface} columns Current column state
 * @param {(value: React.SetStateAction<DragColumnsInterface>) => void} setColumns Callback for trigger column change
 * @param {(value: React.SetStateAction<boolean>) => void} setIncomingChange Callback for triggering change
 */
function onDragEnd(
  result: DropResult,
  columns: DragColumnsInterface,
  setColumns: (value: React.SetStateAction<DragColumnsInterface>) => void,
  setIncomingChange: (value: React.SetStateAction<boolean>) => void
): void {
  if (!result.destination) return;
  const { source, destination } = result;

  let columnObject: DragColumnsInterface = {
    Available: null,
    Targeted: null,
    Mastered: null,
    Skipped: null,
  };

  // Source and destination differ
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn!.items];
    const destItems = [...destColumn!.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setIncomingChange(true);

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
    } as DragColumnsInterface;

    columnObject.Available!.name = `Available (${
      columnObject.Available!.items.length
    })`;
    columnObject.Targeted!.name = `Targeted (${
      columnObject.Targeted!.items.length
    })`;
    columnObject.Mastered!.name = `Mastered (${
      columnObject.Mastered!.items.length
    })`;
    columnObject.Skipped!.name = `Skipped (${
      columnObject.Skipped!.items.length
    })`;

    setColumns(columnObject);
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column!.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    columnObject = {
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    } as DragColumnsInterface;

    setColumns(columnObject);
  }
}

export default function SetCreator() {
  const { target, id } = useParams<RoutedIdTargetParam>();
  const { document } = useFirebaseDocument2<StudentDataInterface>(
    "students",
    id
  );

  const { documents } = useFirebaseCollection2<PerformanceDataInterface>(
    `performances/${target}/${id}`,
    undefined,
    undefined
  );

  const { updateDocument, response } = useFirestore(
    "students",
    undefined,
    undefined
  );

  const [loadedData, setLoadedData] = useState(false);
  const [incomingChange, setIncomingChange] = useState(false);
  const [baseItems, setBaseItems] = useState<any>();
  const [assignedSet, setAssignedSet] = useState<SingleOptionType>();
  const [itemHistory, setItemHistory] = useState<ItemHistory[]>();

  const [columns, setColumns] =
    useState<DragColumnsInterface>(StartingColumnValues);

  useEffect(() => {
    if (documents) {
      const mappedDocument = documents.map((doc) => {
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

      setItemHistory(uniqueQuants);
    }
  }, [documents, target]);

  useEffect(() => {
    if (loadedData && incomingChange) {
      setIncomingChange(false);

      let factsTargeted = columns.Targeted!.items.map((a) => a.id);
      var factsSkipped = columns.Skipped!.items.map((a) => a.id);
      var factsMastered = columns.Mastered!.items.map((a) => a.id);

      const studentObject = {
        factsTargeted,
        factsSkipped,
        factsMastered,
      };

      const uploadData = async () => {
        await updateDocument(id!, studentObject);
      };

      uploadData();

      if (response.error) {
        window.alert("There was an error saving to the database");
      }
    }
  }, [
    id,
    incomingChange,
    loadedData,
    updateDocument,
    columns,
    setIncomingChange,
    response,
  ]);

  useEffect(() => {
    if (document && itemHistory && !loadedData) {
      // Loads ALL facts

      const mapped: FactStructure[][] = loadMathFacts(document);
      const mappedReduced: FactStructure[] = mapped.reduce(
        (accumulator, value) => accumulator.concat(value)
      );

      const flattened: SetItem[] = mappedReduced.map((entry: FactStructure) => {
        let otrs = 0,
          accuracy = 0,
          latency = 0;

        const releventResult = itemHistory.filter(
          (obj) => obj.FactString === entry.Answer
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

      setBaseItems(flattened);

      var newColumns = columns;

      const currTargetedSets = populateColumnMetrics(
        document.factsTargeted,
        itemHistory
      );

      newColumns.Targeted!.items = currTargetedSets;

      const currMasteredSets = populateColumnMetrics(
        document.factsMastered,
        itemHistory
      );

      newColumns.Mastered!.items = currMasteredSets;

      const currSkippedSets = populateColumnMetrics(
        document.factsSkipped,
        itemHistory
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

      newColumns.Available!.name = `Available (${
        newColumns.Available!.items.length
      })`;
      newColumns.Targeted!.name = `Targeted (${
        newColumns.Targeted!.items.length
      })`;
      newColumns.Mastered!.name = `Mastered (${
        newColumns.Mastered!.items.length
      })`;
      newColumns.Skipped!.name = `Skipped (${
        newColumns.Skipped!.items.length
      })`;

      setColumns(newColumns);
      setLoadedData(true);
    }
  }, [document, documents, itemHistory, columns, loadedData, setColumns]);

  /** moveTargetedItems
   *
   * Move items, per current targets, to the specified column
   *
   * @param {String} value Column to receive
   */
  function moveTargetedItems(value: string): void {
    let newColumns = columns;
    let preAvailable = columns.Available!.items;
    let preTargeted = columns.Targeted!.items;
    let preMastered = columns.Mastered!.items;
    let preSkipped = columns.Skipped!.items;

    switch (value) {
      case "Mastered":
        preTargeted.forEach((item) => {
          preMastered.push(item);
        });

        break;

      case "Available":
        preTargeted.forEach((item) => {
          preAvailable.push(item);
        });
        break;

      case "Skipped":
        preTargeted.forEach((item) => {
          preSkipped.push(item);
        });
        break;

      default:
        preTargeted.forEach((item) => {
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

    setIncomingChange(true);
    setColumns(newColumns);
  }

  /** moveItemsToTargeted
   *
   * Move items, per a set, to the targeted column
   *
   * @param {number} setArray Index of set
   */
  function moveItemsToTargeted(setArray: number): void {
    let newColumns = columns;
    let preAvailable = columns.Available!.items;
    let preTargeted = columns.Targeted!.items;
    let preSkipped = columns.Skipped!.items;
    let preMastered = columns.Mastered!.items;

    const mapped = loadMathFacts(document)[setArray].map((item) => item.id);

    columns.Targeted!.items.forEach((item) => {
      preAvailable.push(item);
    });

    preTargeted = [];

    columns.Available!.items.forEach((item) => {
      if (mapped.includes(item.id)) {
        preTargeted.push(item);

        preAvailable = preAvailable.filter((fact) => {
          return fact.id !== item.id;
        });
      }
    });

    columns.Skipped!.items.forEach((item) => {
      if (mapped.includes(item.id)) {
        preTargeted.push(item);

        preSkipped = preSkipped.filter((fact) => {
          return fact.id !== item.id;
        });
      }
    });

    columns.Mastered!.items.forEach((item) => {
      if (mapped.includes(item.id)) {
        preTargeted.push(item);

        preMastered = preMastered.filter((fact) => {
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

    setIncomingChange(true);
    setColumns(newColumns);
  }

  /** resetItems
   *
   * Reset columns to default
   *
   */
  function resetItems(): void {
    if (window.confirm("Are you sure you want to reset?") === true) {
      let newColumns = columns;
      newColumns.Available!.items = baseItems;
      newColumns.Mastered!.items = [];
      newColumns.Skipped!.items = [];
      newColumns.Targeted!.items = [];

      newColumns.Available!.name = `Available (${baseItems.length})`;
      newColumns.Targeted!.name = `Targeted (0)`;
      newColumns.Mastered!.name = `Mastered (0)`;
      newColumns.Skipped!.name = `Skipped (0)`;

      setIncomingChange(true);
      setColumns(newColumns);
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
              options={["Mastered", "Available", "Skipped"].map(
                (opt, index) => {
                  return {
                    value: opt,
                    label: "Move to: " + opt,
                  };
                }
              )}
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
          onDragEnd={(result) =>
            onDragEnd(result, columns, setColumns, setIncomingChange)
          }
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div style={DropContainer} key={columnId}>
                <h2 style={HeadingStyle}>{column!.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column!.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  let setNumber = parseInt(
                                    item.id.split(":")[1]
                                  );

                                  let label = "B";
                                  let valueAdjustment = 6;

                                  if (setNumber <= 5) {
                                    label = "A";
                                    valueAdjustment = 0;
                                  }

                                  if (setNumber >= 12) {
                                    label = "C";
                                    valueAdjustment = 12;
                                  }

                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        display: "flex",
                                        borderRadius: "10px",
                                        verticalAlign: "middle",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : formatBackgroundColor(item),
                                        color: "white",
                                        textAlign: "center",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1em",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <p>
                                        {item.Answer}
                                        <br />
                                        {`Set: ${label}${(
                                          setNumber +
                                          1 -
                                          valueAdjustment
                                        ).toString()} Item: ${
                                          parseInt(item.id.split(":")[2]) + 1
                                        }`}
                                        <br />
                                        {`OTRs: ${formatTextBox(item.OTRs, 0)}`}
                                        <br />
                                        {`Accuracy: ${formatTextBox(
                                          item.Accuracy,
                                          2
                                        )} %`}
                                        <br />
                                        {`Latency: ${formatTextBox(
                                          item.Latency,
                                          2
                                        )}s`}
                                      </p>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}
