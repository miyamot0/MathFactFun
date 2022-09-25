/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { useEffect, useState } from "react";

interface RippleButton {
  char: string;
  classList: string;
  showKey: boolean;
  onClick: (arg0: string) => void;
}

export default function RippleButton({
  char,
  classList,
  showKey,
  onClick,
}: RippleButton) {
  const [rippleCoordinates, setRippleCoordinates] = useState({ x: -1, y: -1 });
  const [isCurrentlyRippling, setIsCurrentlyRippling] = useState(false);

  useEffect(() => {
    if (rippleCoordinates.x !== -1 && rippleCoordinates.y !== -1) {
      setIsCurrentlyRippling(true);
      setTimeout(() => setIsCurrentlyRippling(false), 300);
    } else {
      setIsCurrentlyRippling(false);
    }
  }, [rippleCoordinates]);

  useEffect(() => {
    if (!isCurrentlyRippling) {
      setRippleCoordinates({ x: -1, y: -1 });
    }
  }, [isCurrentlyRippling]);

  return (
    <button
      className={`${classList}`}
      style={{
        visibility: showKey ? "visible" : "hidden",
      }}
      onClick={(event: React.MouseEvent<HTMLElement>): void => {
        const { left, top } = event.currentTarget.getBoundingClientRect();

        setRippleCoordinates({
          x: event.clientX - left,
          y: event.clientY - top,
        });

        onClick(char.trim());
      }}
    >
      {isCurrentlyRippling ? (
        <span
          className="ripple"
          style={{
            left: rippleCoordinates.x,
            top: rippleCoordinates.y,
          }}
        />
      ) : (
        ""
      )}
      <span className="content">{char}</span>
    </button>
  );
}
