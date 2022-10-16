/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer } from 'react'
import { useFirestore } from '../../firebase/hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import { UserCreatorBehavior } from './types/UserTypes'
import { UserGenerationReducer } from './functionality/UserFunctionality'
import { UserDataInitialState } from './functionality/UserFunctionality'
import { verifyUserCreate } from './helpers/UserHelpers'
import {
    StandardEmailFieldText,
    StandardEntryFieldText,
    StandardEntryFieldTextArea,
    StandardErrorField,
    StandardPasswordFieldText,
} from '../../utilities/FieldHelpers'

// Page to create new students
export default function CreateUser(): JSX.Element {
    const history = useHistory()
    const { addDocument, response } = useFirestore(
        'tempUsers',
        undefined,
        undefined
    )

    const [state, dispatch] = useReducer(
        UserGenerationReducer,
        UserDataInitialState
    )

    return (
        <div style={{ maxWidth: '600px' }} className="create-user-page">
            <h2 className="global-page-title">Add a new user (Teacher)</h2>

            <form
                onSubmit={(event) => {
                    event.preventDefault()

                    verifyUserCreate(
                        state,
                        history,
                        addDocument,
                        response,
                        dispatch
                    )
                }}
            >
                <StandardEntryFieldText
                    label={'Teacher Name'}
                    currentValue={state.Name}
                    type={UserCreatorBehavior.SetName}
                    dispatch={dispatch}
                />
                <StandardEntryFieldTextArea
                    label={'Teacher School'}
                    currentValue={state.School}
                    type={UserCreatorBehavior.SetSchool}
                    dispatch={dispatch}
                />
                <StandardEmailFieldText
                    label={'Teacher Email'}
                    currentValue={state.Email}
                    type={UserCreatorBehavior.SetEmail}
                    dispatch={dispatch}
                />
                <StandardPasswordFieldText
                    label={'Teacher Password'}
                    currentValue={state.Password}
                    type={UserCreatorBehavior.SetPassword}
                    dispatch={dispatch}
                />

                <StandardErrorField formError={state.FormError} />
                <button className="global-btn global-btn-light-red">
                    Create New User
                </button>
            </form>
            <br></br>
        </div>
    )
}
