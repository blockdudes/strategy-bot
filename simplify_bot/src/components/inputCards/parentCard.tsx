import React, { ReactNode } from "react";

export const ParentCard = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="p-4 bg-gray-900 rounded-xl transition-all duration-300 ease-in-out max-h-96 overflow-y-auto"
      style={{ maxHeight: "24rem" }}
    >
      {children}
    </div>
  );
};