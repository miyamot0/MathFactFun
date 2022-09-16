/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { generateCard, generateDraggable, generateDroppable } from "../SetCreatorViews";
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from "react-beautiful-dnd";
import { SetItem } from "../../interfaces/SetCreatorInterfaces";
import { ColumnObject } from "../../types/SetCreatorTypes";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe('generateCard', () => {
    it('render static, not dragging', () => {
        const provided = {
            innerRef: undefined,
            draggableProps: {
                style: {}
            }
        } as unknown as DraggableProvided;
        const snapshot = {} as DraggableStateSnapshot;
        const item = {
            Answer: "1+1=2",
            id: "123",
            OTRs: 1,
            Accuracy: 100,
            Latency: 5,
        } as SetItem;
        const label = "label";
        const valueAdjustment = 1;
        const setNumber = 1;

        const wrapper = mount(generateCard(provided, snapshot, item, label, valueAdjustment, setNumber));

        expect(wrapper.find('div').length).toBe(1)
    })

    it('render static, is dragging', () => {
        const provided = {
            innerRef: undefined,
            draggableProps: {
                style: {}
            }
        } as unknown as DraggableProvided;
        const snapshot = { isDragging: true } as DraggableStateSnapshot;
        const item = {
            Answer: "1+1=2",
            id: "123",
            OTRs: 1,
            Accuracy: 100,
            Latency: 5,
        } as SetItem;
        const label = "label";
        const valueAdjustment = 1;
        const setNumber = 1;

        const wrapper = mount(generateCard(provided, snapshot, item, label, valueAdjustment, setNumber));

        expect(wrapper.find('div').length).toBe(1)
    })
})

describe('generateDroppable', () => {
    it('', () => {
        const startingColumnValues: ColumnObject = {
            Available: {
                name: "Available",
                items: [{
                    Answer: "1+1=2",
                    id: "123a",
                    OTRs: 1,
                    Accuracy: 100,
                    Latency: 5,
                }, {
                    Answer: "1+1=2",
                    id: "123b",
                    OTRs: 1,
                    Accuracy: 100,
                    Latency: 5,
                }],
            },
            Targeted: {
                name: "Targeted",
                items: [{
                    Answer: "1+1=2",
                    id: "123c",
                    OTRs: 1,
                    Accuracy: 100,
                    Latency: 5,
                }, {
                    Answer: "1+1=2",
                    id: "123d",
                    OTRs: 1,
                    Accuracy: 100,
                    Latency: 5,
                }],
            },
            Mastered: {
                name: "Mastered",
                items: [{
                    Answer: "1+1=2",
                    id: "123e",
                    OTRs: 1,
                    Accuracy: 100,
                    Latency: 5,
                }, {
                    Answer: "1+1=2",
                    id: "123f",
                    OTRs: 1,
                    Accuracy: 100,
                    Latency: 5,
                }],
            },
            Skipped: {
                name: "Skipped",
                items: [{
                    Answer: "1+1=2",
                    id: "123g",
                    OTRs: 1,
                    Accuracy: 100,
                    Latency: 5,
                }, {
                    Answer: "1+1=2",
                    id: "123h",
                    OTRs: 1,
                    Accuracy: 100,
                    Latency: 5,
                }, {
                    Answer: "1+1=2",
                    id: "123i",
                    OTRs: 1,
                    Accuracy: 100,
                    Latency: 5,
                }, {
                    Answer: "1+1=2",
                    id: "123j",
                    OTRs: 1,
                    Accuracy: 100,
                    Latency: 5,
                }],
            },
        }

        const wrapper = mount(<DragDropContext onDragEnd={() => jest.fn()}>{generateDroppable(startingColumnValues)}</DragDropContext>)

        expect(wrapper.find('p.draggable-individual-card').length).toBe(10)
    })
})

//TODO: failing because lacks provider for draggable
describe('generateDraggable', () => {
    it('Should render: Set A', () => {
        const mockId = "123:1";
        const item = {
            Answer: "1+1=2",
            id: mockId,
            OTRs: 1,
            Accuracy: 100,
            Latency: 5,
        } as SetItem;

        const index = 0;

        const component = generateDraggable(item, index);
        const componentJson = JSON.stringify(component);

        expect(componentJson.includes(mockId)).toBe(true)
    })

    it('Should render: Set B', () => {
        const mockId = "123:7";
        const item = {
            Answer: "1+1=2",
            id: mockId,
            OTRs: 8,
            Accuracy: 100,
            Latency: 5,
        } as SetItem;

        const index = 0;

        const component = generateDraggable(item, index);
        const componentJson = JSON.stringify(component);

        expect(componentJson.includes(mockId)).toBe(true)
    })

    it('Should render: Set c', () => {
        const mockId = "123:14";
        const item = {
            Answer: "1+1=2",
            id: mockId,
            OTRs: 14,
            Accuracy: 100,
            Latency: 5,
        } as SetItem;

        const index = 0;

        const component = generateDraggable(item, index);
        const componentJson = JSON.stringify(component);

        expect(componentJson.includes(mockId)).toBe(true)
    })
})
