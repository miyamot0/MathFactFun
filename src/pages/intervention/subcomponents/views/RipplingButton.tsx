import React from "react";
import { useEffect, useState } from "react";

export default function RippleButton({
  char,
  classList,
  showKey,
  onClick,
}: {
  char: string;
  classList: string;
  showKey: boolean;
  onClick: (arg0: string) => void;
}) {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else {
      setIsRippling(false);
    }
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <button
      className={`${classList}`}
      style={{
        visibility: showKey ? "visible" : "hidden",
      }}
      onClick={(event: React.MouseEvent<HTMLElement>): void => {
        const { left, top } = event.currentTarget.getBoundingClientRect();

        setCoords({ x: event.clientX - left, y: event.clientY - top });

        onClick(char.trim());
      }}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ""
      )}
      <span className="content">{char}</span>
    </button>
  );
}
