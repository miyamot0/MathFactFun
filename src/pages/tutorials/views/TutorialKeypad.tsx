/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import { KeypadInterface } from '../../intervention/subcomponents/interfaces/KeyPadInterfaces';
import { TutorialKeyItem } from './TutorialKeyItem';
import { KeyItem } from '../../intervention/subcomponents/views/KeyItem';

// styles
import '../styles/TutorialKeypad.css';
import { InitialTutorialBenchmarkState } from '../TutorialBenchmark';

export interface TutorialKeyPad {
  callBackFunction: any;
  operatorSymbol: string | undefined;
  showEquals: boolean;
  state: InitialTutorialBenchmarkState;
  dispatch: any;
}

export default function TutorialKeyPad({
  callBackFunction,
  operatorSymbol,
  showEquals = true,
  state,
  dispatch,
}: TutorialKeyPad) {
  //useEffect(() => {
  //  dispatch({
  //    type: 0,
  //    payload: {},
  //  });
  //});

  return (
    <div className='key-pad-wrapper'>
      <TutorialKeyItem
        char={' 1 '}
        state={state}
        showEquals={showEquals}
        addedClass={'key1'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' 2 '}
        state={state}
        showEquals={showEquals}
        addedClass={'key2'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' 3 '}
        state={state}
        showEquals={showEquals}
        addedClass={'key3'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' + '}
        state={state}
        showEquals={showEquals}
        addedClass={'key4'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />

      <TutorialKeyItem
        char={' 4 '}
        state={state}
        showEquals={showEquals}
        addedClass={'key5'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' 5 '}
        state={state}
        showEquals={showEquals}
        addedClass={'key6'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' 6 '}
        state={state}
        showEquals={showEquals}
        addedClass={'key7'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' - '}
        state={state}
        showEquals={showEquals}
        addedClass={'key8'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />

      <TutorialKeyItem
        char={' 7 '}
        state={state}
        showEquals={showEquals}
        addedClass={'key9'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' 8 '}
        state={state}
        showEquals={showEquals}
        addedClass={'key10'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' 9 '}
        state={state}
        showEquals={showEquals}
        addedClass={'key11'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' x '}
        state={state}
        showEquals={showEquals}
        addedClass={'key12'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />

      <TutorialKeyItem
        char={'Del'}
        state={state}
        showEquals={showEquals}
        addedClass={'key13'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' 0 '}
        state={state}
        showEquals={showEquals}
        addedClass={'key14'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={' = '}
        state={state}
        showEquals={showEquals}
        addedClass={'key15'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
      <TutorialKeyItem
        char={'\u00F7'}
        state={state}
        showEquals={showEquals}
        addedClass={'key16'}
        operatorSymbol={operatorSymbol}
        callBackFunction={callBackFunction}
      />
    </div>
  );
}
