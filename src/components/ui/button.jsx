import React from "react";

export function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition ${className || "bg-orange-500 text-white hover:bg-orange-600"}`}
      {...props}
    >
      {children}
    </button>
  );
}