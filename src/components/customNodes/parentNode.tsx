import { Handle, Position } from "reactflow";
import React, { ReactNode } from "react";

export const ParentNode = ({ children }: { children: ReactNode }) => {
  const handleStyleLeft = {
    height: "10px",
    width: "10px",
    backgroundColor: "white",
    marginTop: "-4px",
    // border: '2px solid #323232',
    zIndex: -1,
  };

  const handleStyleRight = {
    height: "10px",
    width: "10px",
    backgroundColor: "white",
    marginBottom: "-4px",
    // border: '2px solid #323232',
    zIndex: -1,
  };

  return (
    <div className="h-[100px] w-[200px] bg-[#4C4C4C] rounded-xl transition-all duration-300 ease-in-out">
      <Handle type="target" position={Position.Top} style={handleStyleLeft} />
      {children}
      <Handle
        type="source"
        position={Position.Bottom}
        style={handleStyleRight}
      />
    </div>
  );
};
