import React, { useState } from "react";
import { ParentNode } from "./parentNode";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NodeProps, useReactFlow } from "reactflow";
import MultiSwapCard from "../inputCards/MultiSwapCard";

const MultiSwapNode = (props: NodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const reactflow = useReactFlow();

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    reactflow.setNodes((nodes) => nodes.filter((node) => node.id !== props.id));
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <ParentNode className="bg-gradient-to-r from-green-200 via-green-300 to-teal-300 rounded-lg shadow-lg p-4 text-gray-800 transition duration-300 ease-in-out hover:from-green-300 hover:via-green-400 hover:to-teal-400">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-semibold">MultiSwap</span>
            <div className="text-white text-sm">
              <span className="font-semibold">DAI {props.data.dai}</span>
              <span className="font-semibold">USDC {props.data.usdc}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <FaEdit
              className="text-gray-800 cursor-pointer hover:text-white"
              onClick={handleEditClick}
              aria-label="Edit"
            />
            <FaTrash
              className="text-gray-800 cursor-pointer hover:text-red-600"
              onClick={handleDeleteClick}
              aria-label="Delete"
            />
          </div>
        </div>
        {isDialogOpen && (
          <div onClick={(e) => e.stopPropagation()}>
            <MultiSwapCard open={isDialogOpen} onClose={handleDialogClose} />
          </div>
        )}
      </ParentNode>
    </>
  );
};

export default MultiSwapNode;
