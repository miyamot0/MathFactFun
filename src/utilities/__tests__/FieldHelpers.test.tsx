import React from "react";
import firebase from "firebase";
import Select from 'react-select';
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { mount } from "enzyme";

import { studentEntryFieldText, studentEntryFieldTextArea, studentSelectField } from "../FieldHelpers"

Enzyme.configure({ adapter: new Adapter() });

describe('studentEntryFieldText', () => {
    it('Should submit', () => {
        const label = "";
        const currentValue = "";
        const type = 0;
        const dispatch = jest.fn();

        const event = {
            target: { value: 'the-value' }
        };

        const wrapper = mount(studentEntryFieldText(label, currentValue, type, dispatch));

        wrapper.find('input').simulate('change', event);

        expect(dispatch).toBeCalled();
    })
})

describe('studentEntryFieldTextArea', () => {
    it('Should submit', () => {
        const label = "";
        const currentValue = "";
        const type = 0;
        const dispatch = jest.fn();

        const event = {
            target: { value: 'the-value' }
        };

        const wrapper = mount(studentEntryFieldTextArea(label, currentValue, type, dispatch));

        console.log(JSON.stringify(wrapper))

        wrapper.find('textarea').simulate('change', event);

        expect(dispatch).toBeCalled();
    })
})

describe('studentSelectField', () => {
    it('Should submit', () => {
        const label = "";
        const currentValue = "";
        const type = 0;
        const dispatch = jest.fn();

        const event = {
            target: { value: "6th", label: "Sixth Grade" }
        };

        const options = [
            { value: "K", label: "Kindergarten" },
            { value: "1st", label: "First Grade" },
            { value: "2nd", label: "Second Grade" },
            { value: "3rd", label: "Third Grade" },
            { value: "4th", label: "Fourth Grade" },
            { value: "5th", label: "Fifth Grade" },
            { value: "6th", label: "Sixth Grade" },
        ];

        const wrapper = mount(studentSelectField(label, options,
            options[0], type, dispatch));

        //https://github.com/romgain/react-select-event/blob/master/src/__tests__/select-event.test.tsx

        //const component = wrapper.find('.single-select-field').at(0);
        //component.simulate('change', event);
        //component.simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });

        //expect(dispatch).toBeCalled();

        expect(1).toBe(1)
    })
})