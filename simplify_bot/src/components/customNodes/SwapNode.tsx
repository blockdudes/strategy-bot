import React, { useState } from "react";
import { ParentNode } from "./parentNode";
import { FaEdit, FaTrash } from "react-icons/fa";
import SwapCard from "../inputCards/SwapCard";
import { NodeProps, useReactFlow } from "reactflow";

const SwapNode = (props: NodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const reactflow = useReactFlow();

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <ParentNode className="bg-gradient-to-r from-teal-200 via-teal-300 to-gray-300 rounded-lg shadow-lg p-4 text-gray-800 transition duration-300 ease-in-out hover:from-teal-300 hover:via-teal-400 hover:to-gray-400">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-semibold">Swap</span>
            <div className="text-white text-sm">
              <span className="font-semibold">
                {" "}
                Token {props.data.tokenToSwapTo}
              </span>
            </div>
          </div>
          <div className="flex gap-2 ">
            <FaEdit
              className="text-gray-800 cursor-pointer hover:text-white"
              onClick={handleEditClick}
              aria-label="Edit"
            />
          </div>
        </div>
      </ParentNode>

      {isDialogOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <SwapCard open={isDialogOpen} onClose={handleDialogClose} />
        </div>
      )}
    </>
  );
};

export default SwapNode;