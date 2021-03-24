import React from "react";

type Props = {
  /**
   * the
   */
  initials: string;
  /**
   * whether its a circle or a square with
   * rounded corners
   */
  isCircle?: boolean;
};

export default function Monogram({ initials, isCircle = true }: Props) {
  return (
    <div
      className={`${
        isCircle ? "rounded-full" : "rounded"
      } w-8 h-8 flex items-center justify-center bg-blue-500 `}
    >
      <p className="text-white font-semibold text-sm">{initials}</p>
    </div>
  );
}
