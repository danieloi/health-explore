/**
 * wrapper for counter
 */
import React from "react";

export default function NotificationBadge({ children, count = 2 }) {
  return (
    <div className="relative">
      <span className="absolute -right-1.5 -top-1.5  bg-red-500 rounded-full w-5 h-5 text-white text-xs border-white border-2 ">
        {count}
      </span>
      {children}
    </div>
  );
}
