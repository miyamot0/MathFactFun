/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

export interface TutorialButton {
  char: string;
  classList: string;
  showKey: boolean;
  onClick: any;
}

export default function TutorialButton({
  char,
  classList,
  showKey,
  onClick,
}: TutorialButton) {
  return (
    <button
      className={`${classList}`}
      style={{
        visibility: showKey ? 'visible' : 'hidden',
      }}
      onClick={(event: React.MouseEvent<HTMLElement>): void => {
        onClick(event, char.trim());
      }}
    >
      <span className='content'>{char}</span>
    </button>
  );
}
