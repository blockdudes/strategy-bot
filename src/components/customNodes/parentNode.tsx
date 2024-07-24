import React, { ReactNode } from "react";
import { Handle, Position } from "reactflow";
import { FaPlus } from "react-icons/fa";


export const ParentNode = ({
  children,
}: {
  children: ReactNode;
}) => {

  const handleStyleLeft = {
    height: '15px',
    width: '15px',
    backgroundColor: 'white',
    marginLeft: '-4px', 
    // border: '2px solid #323232', 
    zIndex: -1

  };

  const handleStyleRight = {
    height: '15px',
    width: '15px',
    backgroundColor: 'white',
    marginRight: '-4px', 
    // border: '2px solid #323232', 
    zIndex: -1
  }


  return (
    <div
      className={`relative w-80 bg-[#4C4C4C] rounded-xl transition-all duration-300 ease-in-out `}
    >
      {children}
      <Handle type="target" position={Position.Left} style={handleStyleLeft}/>
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
        <div
          className="rounded-md bg-[#21954f] p-3 cursor-pointer"
          onClick={()=>{"clicked"}}
        >
          <Handle type="source" position={Position.Right} style={handleStyleRight} />
          <FaPlus color="white" />
        </div>
      </div>
    </div>
  );
};