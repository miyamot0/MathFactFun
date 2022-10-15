/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  createVerticalStringSimpleProblemFrame,
  getColorForEqualsLine,
} from '../../intervention/subcomponents/helpers/ProblemHelpers';

// styles
import '../styles/TutorialSimpleProblemFrame.css';

export interface TutorialSimpleProblemFrame {
  problemStem: string;
  coverProblemSpace: boolean;
  entryString: string;
  numberBoxReference1: React.RefObject<HTMLDivElement>;
  numberBoxReference2: React.RefObject<HTMLDivElement>;
  numberBoxReference3: React.RefObject<HTMLDivElement>;
}

export default function TutorialSimpleProblemFrame({
  problemStem,
  coverProblemSpace,
  entryString,
  numberBoxReference1,
  numberBoxReference2,
  numberBoxReference3,
}: TutorialSimpleProblemFrame) {
  const sharedStyle = {
    backgroundColor: coverProblemSpace ? 'gray' : 'transparent',
  };

  const colorOfEqualsLine = getColorForEqualsLine(
    problemStem,
    coverProblemSpace,
  );

  if (!problemStem || problemStem.length <= 0) {
    return (
      <div className='block-wrapper'>
        <div className='block1 block-shared' style={sharedStyle}></div>
        <div className='block2 block-shared' style={sharedStyle}></div>
        <div className='block3 block-shared' style={sharedStyle}></div>
        <div className='block4 block-shared' style={sharedStyle}></div>
        <div className='block5 block-shared' style={sharedStyle}></div>
        <div className='block6 block-shared' style={sharedStyle}></div>
        <div
          className='stimulus-equalsLine'
          style={{
            backgroundColor: colorOfEqualsLine,
          }}
        ></div>
        <div className='block7 block-shared' style={sharedStyle}></div>
        <div className='block8 block-shared' style={sharedStyle}></div>
        <div className='block9 block-shared' style={sharedStyle}></div>
      </div>
    );
  }

  const displayMatrix = createVerticalStringSimpleProblemFrame(
    problemStem,
    entryString,
  );

  return (
    <div className='block-wrapper'>
      <div className='block1 block-shared'>{displayMatrix[0][0]}</div>
      <div className='block2 block-shared'>{displayMatrix[0][1]}</div>
      <div className='block3 block-shared'>{displayMatrix[0][2]}</div>
      <div className='block4 block-shared'>{displayMatrix[1][0]}</div>
      <div className='block5 block-shared'>{displayMatrix[1][1]}</div>
      <div className='block6 block-shared'>{displayMatrix[1][2]}</div>
      <div
        className='stimulus-equalsLine'
        style={{
          backgroundColor: colorOfEqualsLine,
        }}
      ></div>
      <div className='block7 block-shared' ref={numberBoxReference1}>
        {displayMatrix[2][0]}
      </div>
      <div className='block8 block-shared' ref={numberBoxReference2}>
        {displayMatrix[2][1]}
      </div>
      <div className='block9 block-shared' ref={numberBoxReference3}>
        {displayMatrix[2][2]}
      </div>
    </div>
  );
}
