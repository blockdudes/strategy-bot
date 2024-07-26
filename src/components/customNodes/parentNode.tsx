import { Handle, Position } from "reactflow";
import React, { ReactNode } from "react";

export const ParentNode = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
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

  const defaultClassName = "h-[100px] w-[200px] bg-[#4C4C4C] rounded-xl p-4";
  const combinedClassName = `${defaultClassName} ${className}`;

  return (
    <div className={combinedClassName}>
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
