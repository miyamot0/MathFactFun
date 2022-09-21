/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { InitialInterventionState } from "../../../functionality/InterventionBehavior";

import { InterventionState } from "../../../interfaces/InterventionInterfaces";
import { waitFor } from "@testing-library/react";
import ListViewLayout from "../ListViewLayout";

Enzyme.configure({ adapter: new Adapter() });

describe('ListViewLayout', () => {
    it('Should render with default state', () => {
        const state = InitialInterventionState;
        const captureItemClick = jest.fn();
        const className = "box5"

        const wrapper = mount(ListViewLayout({
            className,
            state,
            captureItemClick,
        }));

        expect(wrapper.find(`div.${className}`).length).toBe(1)
    })

    it('Should render with covered list view', () => {
        const state = {
            ...InitialInterventionState,
            CoverListViewItems: true
        } as InterventionState;
        const captureItemClick = jest.fn();
        const className = "box5"

        const wrapper = mount(ListViewLayout({
            className,
            state,
            captureItemClick
        }));

        expect(wrapper.find(`div.${className}`).length).toBe(1)
    })

    it('Should render with covered list view and no working data', () => {
        const state = {
            ...InitialInterventionState,
            CoverListViewItems: true,
            WorkingData: undefined as unknown as string[]
        } as InterventionState;
        const captureItemClick = jest.fn();
        const className = "box5"

        const wrapper = mount(ListViewLayout({
            className,
            state,
            captureItemClick
        }));

        expect(wrapper.find(`div.${className}`).length).toBe(1)
    })

    it('Should render with uncovered list view and working data', () => {
        const state = {
            ...InitialInterventionState,
            WorkingData: ["1+1=2:1", "1+2=3:2", "1+3=4:3"]
        } as InterventionState;
        const captureItemClick = jest.fn();
        const className = "box5"

        const wrapper = mount(ListViewLayout({
            className,
            state,
            captureItemClick
        }));

        expect(wrapper.find(`div.${className}`).length).toBe(1)
    })

    it('Should fire with uncovered list view and working data', () => {
        const state = {
            ...InitialInterventionState,
            WorkingData: ["1+1=2:1", "1+2=3:2", "1+3=4:3"]
        } as InterventionState;
        const captureItemClick = jest.fn((fact: string) => {
            return fact;
        });
        const className = "box5"

        const wrapper = mount(ListViewLayout({
            className,
            state,
            captureItemClick
        }));

        const items = wrapper.find('li.list-styling');
        const item = wrapper.find('li.list-styling').first();
        item.simulate('click');

        waitFor(() => {
            expect(items.length).toBe(3);
            expect(captureItemClick).toBeCalled()
        })
    })
})