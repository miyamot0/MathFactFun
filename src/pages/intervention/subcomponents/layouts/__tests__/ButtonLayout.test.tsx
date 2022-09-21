/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import ButtonLayout from "../ButtonLayout";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { StudentDataInterface } from "../../../../student/interfaces/StudentInterfaces";
import { InitialInterventionState } from "../../../functionality/InterventionBehavior";
import { FirestoreState } from "../../../../../firebase/interfaces/FirebaseInterfaces";

Enzyme.configure({ adapter: new Adapter() });

describe('ButtonLayout', () => {
    it('Should render', () => {
        const user = { uid: "123" } as firebase.User;
        const id = "234";
        const approach = "Benchmark";
        const document = {} as StudentDataInterface;
        const state = InitialInterventionState;
        const openModal = jest.fn();
        const addDocument = jest.fn();
        const updateDocument = jest.fn();
        const addResponse = {} as FirestoreState;
        const dispatch = jest.fn();
        const className = "box3"

        const wrapper = mount(ButtonLayout({
            user,
            id,
            approach,
            document,
            state,
            openModal,
            addDocument,
            updateDocument,
            addResponse,
            history,
            dispatch,
            className,
        }));

        expect(wrapper.find(`div.${className}`).length).toBe(1)
    })
})