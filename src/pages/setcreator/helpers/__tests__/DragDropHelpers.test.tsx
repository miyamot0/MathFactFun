/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DraggableLocation, DropReason, DropResult } from "react-beautiful-dnd";
import { StudentDataInterface } from "../../../student/interfaces/StudentInterfaces";
import { InitialSetCreatorState } from "../../functionality/SetCreatorBehavior";
import {
  DragColumnContents,
  DragColumnsInterface,
  SetItem,
} from "../../interfaces/SetCreatorInterfaces";
import { ColumnsObject } from "../../types/SetCreatorTypes";
import { moveItemsToTargeted, moveTargetedItems, onDragEnd, resetItems } from "../DragDropHelpers";

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
  let oldConfirm: typeof confirm;

  beforeAll(() => {
    oldConfirm = global.confirm
  })

  afterAll(() => {
    global.confirm = oldConfirm
  })

  it('should delete on confirm', () => {
    const dispatch = jest.fn();
    const state = InitialSetCreatorState;

    global.confirm = () => true

    resetItems(state, dispatch)
  })



  it('should NOT delete on decline confirm', () => {
    const dispatch = jest.fn();
    const state = InitialSetCreatorState;

    global.confirm = () => false

    resetItems(state, dispatch)
  })
})