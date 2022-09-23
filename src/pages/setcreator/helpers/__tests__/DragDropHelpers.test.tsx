/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DraggableLocation, DropReason, DropResult } from "react-beautiful-dnd";
import { SingleOptionType } from "../../../../types/SharedComponentTypes";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import { InitialSetCreatorState } from "../../functionality/SetCreatorBehavior";
import {
  DragColumnContents,
  DragColumnsInterface,
  ItemHistory,
  SetItem,
} from "../../interfaces/SetCreatorInterfaces";
import { ColumnsObject } from "../../types/SetCreatorTypes";
import { loadCreatorMathFacts, moveItemsToTargeted, moveTargetedItems, onChangedMovedTargetsHandler, onChangedSetTargetHandler, onDragEnd, resetItems } from "../DragDropHelpers";

describe("onDragEnd", () => {
  it("should swap if differing", () => {
    const result = {
      draggableId: "Available",
      source: {
        droppableId: "Available",
        index: 0,
      } as DraggableLocation,
      destination: {
        droppableId: "Targeted",
        index: 0,
      } as DraggableLocation,
      combine: undefined,
      reason: "DROP" as DropReason,
    } as DropResult;

    const columns2 = {} as DragColumnsInterface;

    columns2["Available"] = {
      name: "Available",
      items: [
        {
          Answer: "1+1=2",
          id: "1+1=2",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Targeted"] = {
      name: "Targeted",
      items: [
        {
          Answer: "1+2=3",
          id: "1+2=3",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Mastered"] = {
      name: "Mastered",
      items: [],
    } as DragColumnContents;

    columns2["Skipped"] = {
      name: "Skipped",
      items: [],
    } as DragColumnContents;

    const dispatch = jest.fn();

    onDragEnd(result, columns2, dispatch);

    expect(dispatch).toBeCalled();
  });

  it("should return if matching", () => {
    const result = {
      draggableId: "Available",
      source: {
        droppableId: "Available",
        index: 0,
      } as DraggableLocation,
      destination: {
        droppableId: "Available",
        index: 0,
      } as DraggableLocation,
      combine: undefined,
      reason: "DROP" as DropReason,
    } as DropResult;

    const columns2 = {} as DragColumnsInterface;

    columns2["Available"] = {
      name: "Available",
      items: [
        {
          Answer: "1+1=2",
          id: "1+1=2",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Targeted"] = {
      name: "Targeted",
      items: [
        {
          Answer: "1+2=3",
          id: "1+2=3",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Mastered"] = {
      name: "Mastered",
      items: [],
    } as DragColumnContents;

    columns2["Skipped"] = {
      name: "Skipped",
      items: [],
    } as DragColumnContents;

    const dispatch = jest.fn();

    onDragEnd(result, columns2, dispatch);

    expect(dispatch).toBeCalled();
  });
});

describe("moveItemsToTargeted", () => {
  it("should pass if contains facts", () => {
    const columns2 = {} as DragColumnsInterface;

    columns2["Available"] = {
      name: "Available",
      items: [
        {
          Answer: "9+8=17:0:0",
          id: "9+8=17:0:0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Targeted"] = {
      name: "Targeted",
      items: [
        {
          Answer: "3+5=8:0:3",
          id: "3+5=8:0:3",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Mastered"] = {
      name: "Mastered",
      items: [
        {
          Answer: "6+9=15:0:2",
          id: "6+9=15:0:2",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Skipped"] = {
      name: "Skipped",
      items: [
        {
          Answer: "5+3=8:0:1",
          id: "5+3=8:0:1",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    const dispatch = jest.fn();
    const setArray = 0;

    const state = {
      ...InitialSetCreatorState,
      columns: columns2
    } as ColumnsObject;

    const document = { currentTarget: "Addition" } as StudentDataInterface;

    moveItemsToTargeted(setArray, state, document, dispatch);

    expect(dispatch).toBeCalled();
  });

  it("should fail if document is null", () => {
    const columns2 = {} as DragColumnsInterface;

    columns2["Available"] = {
      name: "Available",
      items: [
        {
          Answer: "1+1=2",
          id: "1+1=2",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Targeted"] = {
      name: "Targeted",
      items: [
        {
          Answer: "1+2=3",
          id: "1+2=3",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Mastered"] = {
      name: "Mastered",
      items: [
        {
          Answer: "1+1=2",
          id: "1+1=2",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Skipped"] = {
      name: "Skipped",
      items: [
        {
          Answer: "1+1=2",
          id: "1+1=2",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    const dispatch = jest.fn();
    const setArray = 0;

    const state = {
      ...InitialSetCreatorState,
      columns: columns2
    } as ColumnsObject;

    const document = null as unknown as StudentDataInterface;

    moveItemsToTargeted(setArray, state, document, dispatch);

    expect(dispatch).toBeCalledTimes(0);
  });
});

describe('moveTargetedItems', () => {
  it("Should pass: Available", () => {
    const columns2 = {} as DragColumnsInterface;

    columns2["Available"] = {
      name: "Available",
      items: [
        {
          Answer: "9+8=17:0:0",
          id: "9+8=17:0:0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Targeted"] = {
      name: "Targeted",
      items: [
        {
          Answer: "3+5=8:0:3",
          id: "3+5=8:0:3",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Mastered"] = {
      name: "Mastered",
      items: [
        {
          Answer: "6+9=15:0:2",
          id: "6+9=15:0:2",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Skipped"] = {
      name: "Skipped",
      items: [
        {
          Answer: "5+3=8:0:1",
          id: "5+3=8:0:1",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    const state = {
      ...InitialSetCreatorState,
      columns: columns2
    } as ColumnsObject;

    const value = "Available";
    const dispatch = jest.fn();

    moveTargetedItems(
      value,
      state,
      dispatch
    )

    expect(dispatch).toBeCalled();
  })

  it("Should pass: Mastered", () => {
    const columns2 = {} as DragColumnsInterface;

    columns2["Available"] = {
      name: "Available",
      items: [
        {
          Answer: "9+8=17:0:0",
          id: "9+8=17:0:0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Targeted"] = {
      name: "Targeted",
      items: [
        {
          Answer: "3+5=8:0:3",
          id: "3+5=8:0:3",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Mastered"] = {
      name: "Mastered",
      items: [
        {
          Answer: "6+9=15:0:2",
          id: "6+9=15:0:2",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Skipped"] = {
      name: "Skipped",
      items: [
        {
          Answer: "5+3=8:0:1",
          id: "5+3=8:0:1",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    const state = {
      ...InitialSetCreatorState,
      columns: columns2
    } as ColumnsObject;

    const value = "Mastered";
    const dispatch = jest.fn();

    moveTargetedItems(
      value,
      state,
      dispatch
    )

    expect(dispatch).toBeCalled();
  })

  it("Should pass: Skipped", () => {
    const columns2 = {} as DragColumnsInterface;

    columns2["Available"] = {
      name: "Available",
      items: [
        {
          Answer: "9+8=17:0:0",
          id: "9+8=17:0:0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Targeted"] = {
      name: "Targeted",
      items: [
        {
          Answer: "3+5=8:0:3",
          id: "3+5=8:0:3",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Mastered"] = {
      name: "Mastered",
      items: [
        {
          Answer: "6+9=15:0:2",
          id: "6+9=15:0:2",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Skipped"] = {
      name: "Skipped",
      items: [
        {
          Answer: "5+3=8:0:1",
          id: "5+3=8:0:1",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    const state = {
      ...InitialSetCreatorState,
      columns: columns2
    } as ColumnsObject;

    const value = "Skipped";
    const dispatch = jest.fn();

    moveTargetedItems(
      value,
      state,
      dispatch
    )

    expect(dispatch).toBeCalled();
  })

  it("Should pass: default", () => {
    const columns2 = {} as DragColumnsInterface;

    columns2["Available"] = {
      name: "Available",
      items: [
        {
          Answer: "9+8=17:0:0",
          id: "9+8=17:0:0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Targeted"] = {
      name: "Targeted",
      items: [
        {
          Answer: "3+5=8:0:3",
          id: "3+5=8:0:3",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Mastered"] = {
      name: "Mastered",
      items: [
        {
          Answer: "6+9=15:0:2",
          id: "6+9=15:0:2",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    columns2["Skipped"] = {
      name: "Skipped",
      items: [
        {
          Answer: "5+3=8:0:1",
          id: "5+3=8:0:1",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
        {
          Answer: "0",
          id: "0",
          OTRs: 0,
          Accuracy: 100,
          Latency: 5,
        } as SetItem,
      ],
    } as DragColumnContents;

    const state = {
      ...InitialSetCreatorState,
      columns: columns2
    } as ColumnsObject;

    const value = "default";
    const dispatch = jest.fn();

    moveTargetedItems(
      value,
      state,
      dispatch
    )

    expect(dispatch).toBeCalled();
  })
})

describe('resetItems', () => {
  let confirmSpy: jest.SpyInstance<boolean, [message?: string | undefined]>;
  let alertSpy: jest.SpyInstance<void, [message?: any]>;

  beforeAll(() => {
    confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));
    alertSpy = jest.spyOn(window, 'alert');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    alertSpy.mockImplementation(() => { });
  })

  afterAll(() => {
    confirmSpy.mockRestore();
    alertSpy.mockRestore();
  })

  it('should delete on confirm', () => {
    const dispatch = jest.fn();
    const state = InitialSetCreatorState;

    global.confirm = () => true
    window.alert = () => true

    resetItems(state, dispatch)
  })

  it('should NOT delete on decline confirm', () => {
    const dispatch = jest.fn();
    const state = InitialSetCreatorState;

    global.confirm = () => false
    window.alert = () => true

    resetItems(state, dispatch)
  })
})

describe('loadCreatorMathFacts', () => {
  it('Should correctly crunch numbers', () => {

    const document = {
      currentTarget: "Addition",
      factsTargeted: ["1+1=2", "9+8=17"],
      factsMastered: ["1+2=3"],
      factsSkipped: ["1+3=4"],
    } as StudentDataInterface
    const state = {
      ...InitialSetCreatorState,
      ItemHistory: [
        {
          FactString: "9+8=17",
          X: 0,
          Y: 0,
          Latency: 0,
          AverageCorrect: 0,
          Correct: 0,
          Total: 1,
        } as ItemHistory,
        {
          FactString: "8+7=15",
          X: 0,
          Y: 0,
          Latency: 0,
          AverageCorrect: 0,
          Correct: 1,
          Total: 1,
        } as ItemHistory
      ]
    } as ColumnsObject;
    const dispatch = jest.fn();

    loadCreatorMathFacts(document, state, dispatch)

    expect(dispatch).toBeCalledTimes(3)
  })
})

describe("onChangedSetTargetHandler", () => {
  it("Should fire with a good option", () => {
    const option = {
      label: '1',
      value: '1'
    } as SingleOptionType;
    const document = {} as StudentDataInterface;
    const state = InitialSetCreatorState;
    const setAssignedSet = jest.fn();
    const dispatch = jest.fn();

    onChangedSetTargetHandler(option, document, state, setAssignedSet, dispatch);

    expect(setAssignedSet).toBeCalled();
  })

  it("Should fire with a good option", () => {
    const option = null as unknown as SingleOptionType;
    const document = {} as StudentDataInterface;
    const state = InitialSetCreatorState;
    const setAssignedSet = jest.fn();
    const dispatch = jest.fn();

    onChangedSetTargetHandler(option, document, state, setAssignedSet, dispatch);

    expect(setAssignedSet).not.toBeCalled();
  })
})

describe("onChangedMovedTargetsHandler", () => {
  it("Should fire with a good option", () => {
    const option = {
      label: '1',
      value: '1'
    } as SingleOptionType;
    const state = InitialSetCreatorState;
    const dispatch = jest.fn();

    onChangedMovedTargetsHandler(option, state, dispatch)

    expect(dispatch).toBeCalled();
  })

  it("Should fire with a good option", () => {
    const option = null as unknown as SingleOptionType;
    const state = InitialSetCreatorState;
    const dispatch = jest.fn();

    onChangedMovedTargetsHandler(option, state, dispatch)

    expect(dispatch).not.toBeCalled();
  })
})