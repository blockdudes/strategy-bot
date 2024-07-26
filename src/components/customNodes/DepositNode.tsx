import React, { useState } from "react";
import { ParentNode } from "./parentNode";
import { FaEdit, FaTrash } from "react-icons/fa";
import DepositCard from "../inputCards/DepositCard";
import { NodeProps, useReactFlow } from "reactflow";

const DepositNode = (props: NodeProps) => {
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
      <ParentNode className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 rounded-lg shadow-lg p-4 text-gray-800 transition duration-300 ease-in-out hover:from-blue-300 hover:via-blue-400 hover:to-blue-500">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-semibold">Deposit {props.data.label}</span>
            <div className="text-white text-sm">
              <span className="font-semibold">Amount {props.data.amount}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <FaEdit
              className="text-gray-800 cursor-pointer hover:text-white"
              onClick={handleEditClick}
              aria-label="Edit Deposit"
            />
          </div>
        </div>
      </ParentNode>

      {isDialogOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <DepositCard open={isDialogOpen} onClose={handleDialogClose} data={props.data} />
        </div>
      )}
    </>
  );
};

export default DepositNode;
