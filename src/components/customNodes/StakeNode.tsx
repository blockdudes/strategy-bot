import React, { useState } from "react";
import { ParentNode } from "./parentNode";
import { FaEdit, FaTrash } from "react-icons/fa";
import StakeCard from "../inputCards/StakeCard";
import { NodeProps, useReactFlow } from "reactflow";

const StakeNode = (props: NodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const reactflow = useReactFlow();

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    reactflow.setNodes((nodes) => nodes.filter((node) => node.id !== props.id));
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <ParentNode className="bg-gradient-to-r from-lilac-200 via-lilac-300 to-lilac-400 rounded-lg shadow-lg p-4 text-gray-800 transition duration-300 ease-in-out hover:from-lilac-300 hover:via-lilac-400 hover:to-lilac-500">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-semibold">Stake {props.data.label}</span>
          </div>
          <div className="flex gap-2">
            <FaTrash
              className="text-gray-800 cursor-pointer hover:text-red-600"
              onClick={handleDeleteClick}
              aria-label="Delete Stake"
            />
          </div>
        </div>
        {isDialogOpen && (
          <div onClick={(e) => e.stopPropagation()}>
            <StakeCard open={isDialogOpen} onClose={handleDialogClose} />
          </div>
        )}
      </ParentNode>

      {isDialogOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <StakeCard open={isDialogOpen} onClose={handleDialogClose} />
        </div>
      )}
    </>
  );
};

export default StakeNode;
