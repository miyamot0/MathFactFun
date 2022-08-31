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
import { useFirebaseDocument } from "../../firebase/useFirebaseDocument";
import { useFirebaseCollection } from "../../firebase/useFirebaseCollection";
import { useFirestore } from "../../firebase/useFirestore";
import { FactsOnFire } from "../../maths/Mind";
import Select from "react-select";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import {
  OnlyUnique,
  GetOperatorFromLabel,
  Sum,
} from "../../utilities/LabelHelper";
import { StudentDataInterface } from "../../models/StudentModel";
import { PerformanceDataInterface } from "../../models/PerformanceModel";
import { FactDataInterface, FactModelInterface } from "../../models/FactEntryModel";

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

interface SetItem {
  Answer: string;
  id: string;
  OTRs: number;
  Accuracy: number;
  Latency: number;
}

interface DragColumnContents {
  name: string;
  items: SetItem[];
}

interface DragColumnsInterface {
  [key: string]: DragColumnContents | null
}

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

    columnObject.Available!.name = `Available (${columnObject.Available!.items.length})`;
    columnObject.Targeted!.name = `Targeted (${columnObject.Targeted!.items.length})`;
    columnObject.Mastered!.name = `Mastered (${columnObject.Mastered!.items.length})`;
    columnObject.Skipped!.name = `Skipped (${columnObject.Skipped!.items.length})`;

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

/** loadMathFacts
 *
 * Load relevant math facts
 *
 * @param {StudentDataInterface} student Student document from firestore
 * @returns {Array} Mind facts
 */
function loadMathFacts(student: StudentDataInterface | null): { Answer: string; id: string; }[][] {
  let factsOnFire = FactsOnFire.Addition;

  switch (student!.currentTarget) {
    case "Addition":
      factsOnFire = FactsOnFire.Addition;
      break;
    case "Subtraction":
      factsOnFire = FactsOnFire.Subtraction;
      break;
    case "Multiplication":
      factsOnFire = FactsOnFire.Multiplication;
      break;
    case "Division":
      factsOnFire = FactsOnFire.Division;
      break;
    default:
      factsOnFire = FactsOnFire.Addition;
      break;
  }

  return factsOnFire.map(function (array, setNum) {
    return array.map(function (answer, posInArray) {
      return {
        Answer: answer,
        id: `${answer}:${setNum}:${posInArray}`,
      };
    });
  });
}

/** formatTextBox
 *
 * Format text output regarding decimal points
 *
 * @param {number} entry Value supplied
 * @param {number} dec Decimal points
 * @returns {string} Formatted string
 */
function formatTextBox(entry: number, dec: number) {
  if (entry === undefined) {
    return "---";
  } else {
    return entry.toFixed(dec);
  }
}

/** formatBackgroundColor
 *
 * Formats the background color based on criteria
 *
 * @param {SetItem} entry Summarized math fact info
 * @returns {String} Color for background
 */
const formatBackgroundColor = (entry: SetItem) => {
  let backgroundColor = "#456C86";

  if (
    entry.OTRs === undefined ||
    entry.Accuracy === undefined ||
    entry.Latency === undefined
  ) {
    return backgroundColor;
  }

  if (entry.OTRs > 5 && entry.Accuracy > 80 && entry.Latency < 10) {
    return "#42c966";
  }

  return backgroundColor;
};

interface RoutedStudentSet {
  id?: string;
  target?: string
};

export default function SetCreator() {
  const { target, id } = useParams<RoutedStudentSet>();
  const { document } = useFirebaseDocument("students", id);
  const { documents } = useFirebaseCollection(
    `performances/${target}/${id}`,
    undefined,
    undefined
  );
  const { updateDocument, response } = useFirestore("students");

  const [loadedData, setLoadedData] = useState(false);
  const [incomingChange, setIncomingChange] = useState(false);
  const [baseItems, setBaseItems] = useState([]);
  const [assignedSet, setAssignedSet] = useState([]);
  const [itemHistory, setItemHistory] = useState(null);

  const [columns, setColumns] = useState<DragColumnsInterface>({
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
  });

  useEffect(() => {
    if (documents) {
      const mappedDocument = documents.map((doc) => {

        // Obj saved on FS
        const docAsObject = doc as PerformanceDataInterface;

        return {
          // Pull in entries
          Items: docAsObject.entries as FactDataInterface[],
          Date: new Date(docAsObject.dateTimeStart),
          ShortDate: new Date(docAsObject.dateTimeStart).toLocaleDateString("en-US"),
          Errors: docAsObject.errCount,
          DigitsCorrect: docAsObject.correctDigits,
          DigitsCorrectInitial: docAsObject.nCorrectInitial,
          DigitsTotal: docAsObject.totalDigits,
          SessionDuration: docAsObject.sessionDuration,
        };
      });

      // Pull out fact models alone, array of array
      const itemSummaries: FactDataInterface[][] = mappedDocument.map((items) => items.Items);

      const flatItemSummaries = [].concat(...itemSummaries);

      const uniqueProblems: string[] = flatItemSummaries
        .map((obj) => obj.factString)
        .filter(OnlyUnique)
        .sort();

      const uniqueQuants = uniqueProblems.map((itemString) => {
        const relevantItems = flatItemSummaries.filter(
          (obj) => obj.factString === itemString
        );

        const itemsCorrect = relevantItems
          .map((item) => (item.factCorrect ? 1 : 0) as number)
          .reduce(Sum);

        const itemLatency = relevantItems
          .map((item) => Math.abs(item.latencySeconds))
          .reduce(Sum);

        return {
          FactString: itemString,
          X: parseInt(itemString.split(GetOperatorFromLabel(target))[0]),
          Y: parseInt(
            itemString.split(GetOperatorFromLabel(target))[1].split("=")[0]
          ),
          Latency: itemLatency / relevantItems.length,
          AverageCorrect: (itemsCorrect / relevantItems.length) * 100,
          Correct: itemsCorrect,
          Total: relevantItems.length,
        };
      });

      setItemHistory(uniqueQuants);
    }
  }, [documents, target]);

  useEffect(() => {
    if (loadedData && incomingChange) {
      setIncomingChange(false);

      let factsTargeted = columns.Targeted.items.map((a) => a.id);
      var factsSkipped = columns.Skipped.items.map((a) => a.id);
      var factsMastered = columns.Mastered.items.map((a) => a.id);

      const studentObject = {
        factsTargeted,
        factsSkipped,
        factsMastered,
      };

      const uploadData = async () => {
        await updateDocument(id, studentObject);
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

      const mapped = loadMathFacts(document as StudentDataInterface);

      const flattened = [].concat.apply([], mapped).map((entry) => {
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
        };
      });

      setBaseItems(flattened);

      var newColumns = columns;

      const currTargetedSets = (document as StudentDataInterface).factsTargeted.map((element) => {
        let otrs = 0,
          accuracy = 0,
          latency = 0;

        const releventResult = itemHistory.filter(
          (obj) => obj.FactString === element.split(":")[0]
        );

        if (releventResult && releventResult.length === 1) {
          otrs = releventResult[0].Total;
          accuracy = releventResult[0].AverageCorrect;
          latency = releventResult[0].Latency;
        }

        return {
          Answer: element.split(":")[0],
          id: element,
          OTRs: otrs,
          Accuracy: accuracy,
          Latency: latency,
        };
      });

      newColumns.Targeted!.items = currTargetedSets;

      const currMasteredSets = (document as StudentDataInterface).factsMastered.map((element) => {
        let otrs = 0,
          accuracy = 0,
          latency = 0;

        const releventResult = itemHistory.filter(
          (obj) => obj.FactString === element.split(":")[0]
        );

        if (releventResult && releventResult.length === 1) {
          otrs = releventResult[0].Total;
          accuracy = releventResult[0].AverageCorrect;
          latency = releventResult[0].Latency;
        }

        return {
          Answer: element.split(":")[0],
          id: element,
          OTRs: otrs,
          Accuracy: accuracy,
          Latency: latency,
        };
      });

      newColumns.Mastered!.items = currMasteredSets;

      const currSkippedSets = (document as StudentDataInterface).factsSkipped.map((element) => {
        let otrs = 0,
          accuracy = 0,
          latency = 0;

        const releventResult = itemHistory.filter(
          (obj) => obj.FactString === element.split(":")[0]
        );

        if (releventResult && releventResult.length === 1) {
          otrs = releventResult[0].Total;
          accuracy = releventResult[0].AverageCorrect;
          latency = releventResult[0].Latency;
        }

        return {
          Answer: element.split(":")[0],
          id: element,
          OTRs: otrs,
          Accuracy: accuracy,
          Latency: latency,
        };
      });

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

      newColumns.Available!.name = `Available (${newColumns.Available!.items.length})`;
      newColumns.Targeted!.name = `Targeted (${newColumns.Targeted!.items.length})`;
      newColumns.Mastered!.name = `Mastered (${newColumns.Mastered!.items.length})`;
      newColumns.Skipped!.name = `Skipped (${newColumns.Skipped!.items.length})`;

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

    const mapped = loadMathFacts(document as StudentDataInterface)[setArray].map((item) => item.id);

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

  /** getRelevantCCCSet
   *
   * Get the relevant set of problems from MIND
   *
   * @param {String} target Type of problem
   * @returns {Object} Bank of math fact problems
   */
  function getRelevantCCCSet(target: string): string[][] {
    switch (target) {
      case "Addition":
        return FactsOnFire.Addition;
      case "Subtraction":
        return FactsOnFire.Subtraction;
      case "Multiplication":
        return FactsOnFire.Multiplication;
      case "Division":
        return FactsOnFire.Division;
      default:
        return FactsOnFire.Addition;
    }
  }

  const relevantFOFSets = getRelevantCCCSet(target);

  return (
    <div style={SetContainer}>
      <h2 style={TitleStyle}>
        Item Set: {document ? (document as StudentDataInterface).name : ""} (
        {document ? (document as StudentDataInterface).currentTarget : ""})
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
                };
              })}
              onChange={(option) => {
                setAssignedSet(option);
                moveItemsToTargeted(parseInt(option.value) - 1);
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
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div style={DropContainer} key={columnId}>
                <h2 style={HeadingStyle}>{column.name}</h2>
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
                                        ).toString()} Item: ${parseInt(item.id.split(":")[2]) + 1
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
