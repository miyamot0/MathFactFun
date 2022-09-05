import {
  FactDataInterface,
  StudentDataInterface,
} from "../../../firebase/types/GeneralTypes";
import { FactsOnFire } from "../../../maths/Mind";
import { GetOperatorFromLabel, Sum } from "../../../utilities/LabelHelper";
import { FactStructure, ItemHistory, SetItem } from "../types/SetCreatorTypes";

/** loadMathFacts
 *
 * Load relevant math facts
 *
 * @param {StudentDataInterface} student Student document from firestore
 * @returns {Array} Mind facts
 */
export function loadMathFacts(
  student: StudentDataInterface | null
): FactStructure[][] {
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
}

export const StartingColumnValues = {
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

export function generateItemHistory(
  uniqueProblems: string[],
  flatItemSummaries: FactDataInterface[],
  target: string | undefined
) {
  return uniqueProblems.map((itemString) => {
    const relevantItems = flatItemSummaries.filter(
      (obj) => obj.factString === itemString
    );

    const itemsCorrect = relevantItems
      .map((item) => (item.factCorrect ? 1 : 0) as number)
      .reduce(Sum);

    const itemLatency = relevantItems
      .map((item) => Math.abs(item.latencySeconds!))
      .reduce(Sum);

    return {
      FactString: itemString,
      X: parseInt(itemString.split(GetOperatorFromLabel(target!))[0]),
      Y: parseInt(
        itemString.split(GetOperatorFromLabel(target!))[1].split("=")[0]
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
