import React, { useState } from "react";
import { ParentNode } from "./parentNode";
import StakeCard from "../inputCards/StakeCard";
import { NodeProps } from "reactflow";

const StakeNode = (props: NodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <ParentNode className="bg-gradient-to-r from-lilac-200 via-lilac-300 to-lilac-400 rounded-lg shadow-lg p-4 text-black transition duration-300 ease-in-out hover:from-lilac-300 hover:via-lilac-400 hover:to-lilac-500">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-semibold">Stake</span>
          </div>
          <div className="flex gap-2">
          </div>
        </div>

      </ParentNode>

      {isDialogOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <StakeCard open={isDialogOpen} onClose={handleDialogClose} data={props.data}/>
        </div>
      )}
    </>
  );
};

export default StakeNode;
