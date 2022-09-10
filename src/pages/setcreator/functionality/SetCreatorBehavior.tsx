import { DropResult } from "react-beautiful-dnd";
import { FactsOnFire } from "../../../maths/Mind";
import { GetOperatorFromLabel, Sum } from "../../../utilities/LabelHelper";
import { StudentDataInterface } from "../../student/types/StudentTypes";
import {
  ColumnObject,
  ColumnsObject,
  DragColumnContents,
  DragColumnsInterface,
  DragDropActions,
  FactDataInterface,
  FactStructure,
  ItemHistory,
  SetItem,
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
  ItemHistory: {} as ItemHistory[],
  BaseItems: {} as SetItem[],
  LoadedData: false,
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
export function onDragEnd(
  result: DropResult,
  columns: DragColumnsInterface,
  dispatch: any
): void {
  if (!result.destination) return;
  const { source, destination } = result;

  let columnObject: DragColumnsInterface = {
    Available: {} as DragColumnContents,
    Targeted: {} as DragColumnContents,
    Mastered: {} as DragColumnContents,
    Skipped: {} as DragColumnContents,
  };

  // Source and destination differ
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    //setIncomingChange(true);

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

    columnObject.Available.name = `Available (${columnObject.Available.items.length})`;
    columnObject.Targeted.name = `Targeted (${columnObject.Targeted.items.length})`;
    columnObject.Mastered.name = `Mastered (${columnObject.Mastered.items.length})`;
    columnObject.Skipped.name = `Skipped (${columnObject.Skipped.items.length})`;

    dispatch({ type: DragDropActions.UpdateColumns, payload: columnObject });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    columnObject = {
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    } as DragColumnsInterface;

    dispatch({ type: DragDropActions.UpdateColumns, payload: columnObject });
  }
}

/** loadMathFacts
 *
 * Load relevant math facts
 *
 * @param {StudentDataInterface} student Student document from firestore
 * @returns {Array} Mind facts
 */
export function loadMathFacts(
  student: StudentDataInterface
): FactStructure[][] {
  let factsOnFire = FactsOnFire.Addition;

  switch (student.currentTarget) {
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
      } as FactStructure;
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
export function formatTextBox(entry: number, dec: number) {
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
export function formatBackgroundColor(entry: SetItem): string {
  const backgroundColor = "#456C86";

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
}

export function generateItemHistory(
  uniqueProblems: string[],
  flatItemSummaries: FactDataInterface[],
  target: string
) {
  return uniqueProblems.map((itemString) => {
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
}

export function populateColumnMetrics(
  facts: string[],
  itemHistory: ItemHistory[]
) {
  return facts.map((element) => {
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
}

/** getRelevantCCCSet
 *
 * Get the relevant set of problems from MIND
 *
 * @param {String} target Type of problem
 * @returns {Object} Bank of math fact problems
 */
export function getRelevantCCCSet(target: string): string[][] {
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
