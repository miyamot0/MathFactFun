/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DraggableLocation, DropReason, DropResult } from "react-beautiful-dnd";
import {
  DragColumnContents,
  DragColumnsInterface,
  SetItem,
} from "../../interfaces/SetCreatorInterfaces";
import { onDragEnd } from "../DragDropHelpers";

describe("onDragEnd", () => {
  it("should pass out if differing", () => {
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

    let columns2 = {} as DragColumnsInterface;

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

  it("should pass out if differing", () => {
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

    let columns2 = {} as DragColumnsInterface;

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
