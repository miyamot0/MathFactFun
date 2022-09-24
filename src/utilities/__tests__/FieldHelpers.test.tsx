/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import selectEvent from "react-select-event";

import {
  standardEntryFieldDate,
  standardEntryFieldNumber,
  standardEntryFieldText,
  standardEntryFieldTextArea,
  standardErrorField,
  standardSelectField,
  standardSelectFieldMulti,
} from "../FieldHelpers";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { SingleOptionType } from "../../types/SharedComponentTypes";
import { MultiValue } from "react-select";

Enzyme.configure({ adapter: new Adapter() });

describe("standardEntryFieldText", () => {
  it("Should fire dispatch", () => {
    const label = "";
    const currentValue = "";
    const type = 0;
    const dispatch = jest.fn();

    const event = {
      target: { value: "the-value" },
    };

    const wrapper = shallow(
      standardEntryFieldText(label, currentValue, type, dispatch)
    );

    wrapper.find("input").simulate("change", event);

    expect(dispatch).toBeCalled();
  });
});

describe("standardEntryFieldTextArea", () => {
  it("Should fire dispatch", () => {
    const label = "";
    const currentValue = "";
    const type = 0;
    const dispatch = jest.fn();

    const event = {
      target: { value: "the-value" },
    };

    const wrapper = shallow(
      standardEntryFieldTextArea(label, currentValue, type, dispatch)
    );

    wrapper.find("textarea").simulate("change", event);

    expect(dispatch).toBeCalled();
  });
});

describe("standardEntryFieldDate", () => {
  it("Should fire dispatch", () => {
    const label = "";
    const currentValue = "9/16/2022";
    const type = 0;
    const dispatch = jest.fn();

    const event = {
      target: { value: "9/18/2022" },
    };

    const wrapper = shallow(
      standardEntryFieldDate(label, currentValue, type, dispatch)
    );

    wrapper.find("input").simulate("change", event);

    expect(dispatch).toBeCalled();
  });
});

describe("standardEntryFieldNumber", () => {
  it("Should fire dispatch", () => {
    const label = "";
    const currentValue = 0;
    const type = 0;
    const dispatch = jest.fn();

    const event = {
      target: { value: 2 },
    };

    const wrapper = shallow(
      standardEntryFieldNumber(label, currentValue, type, dispatch)
    );

    wrapper.find("input").simulate("change", event);

    expect(dispatch).toBeCalled();
  });
});

describe("standardSelectField", () => {
  it("Should fire dispatch", async () => {
    await act(async () => {
      const label = "single-select";
      const type = 0;
      const dispatch = jest.fn();

      const options = [
        { value: "K", label: "Kindergarten" },
        { value: "1st", label: "First Grade" },
        { value: "2nd", label: "Second Grade" },
        { value: "3rd", label: "Third Grade" },
        { value: "4th", label: "Fourth Grade" },
        { value: "5th", label: "Fifth Grade" },
        { value: "6th", label: "Sixth Grade" },
      ];

      const result = render(
        <>{standardSelectField(label, options, options[0], type, dispatch)}</>
      );
      const input = result.getByLabelText(`${label}:`);

      await selectEvent.select(input, "Second Grade");

      expect(dispatch).toBeCalled();
    });
  });
});

describe("standardSelectFieldMulti", () => {
  it("Should fire dispatch", async () => {
    await act(async () => {
      const label = "multi-field";
      const type = 0;
      const dispatch = jest.fn();

      const options = [
        { value: "K", label: "Kindergarten" },
        { value: "1st", label: "First Grade" },
        { value: "2nd", label: "Second Grade" },
        { value: "3rd", label: "Third Grade" },
        { value: "4th", label: "Fourth Grade" },
        { value: "5th", label: "Fifth Grade" },
        { value: "6th", label: "Sixth Grade" },
      ];

      const result = render(
        <>
          {standardSelectFieldMulti(
            label,
            options,
            [options[0]] as MultiValue<SingleOptionType>,
            type,
            dispatch
          )}
        </>
      );
      const input = result.getByLabelText(`${label}:`);

      await selectEvent.select(input, "Second Grade");

      await selectEvent.select(input, "Third Grade");

      expect(dispatch).toBeCalled();
    });
  });
});

describe("standardErrorField", () => {
  it("Should render same, if valid", () => {
    const label = "";
    const returner = standardErrorField(label);

    expect(returner).toStrictEqual(<p className="error">{label}</p>);
  });

  it("Should render blank div, if undefined", () => {
    const label = undefined;
    const returner = standardErrorField(label);

    expect(returner).toStrictEqual(<></>);
  });
});
