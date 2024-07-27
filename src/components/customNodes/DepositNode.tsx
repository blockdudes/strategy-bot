import React, { useState } from "react";
import { ParentNode } from "./parentNode";
import { FaEdit, FaTrash } from "react-icons/fa";
import DepositCard from "../inputCards/DepositCard";
import { NodeProps, useReactFlow } from "reactflow";
import { Button } from "@material-tailwind/react";
import { DepositDataType } from "./NodeTypes";

const DepositNode = (props: NodeProps<DepositDataType>) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nodeData, setNodeData] = useState(props.data);

  const reactflow = useReactFlow();

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSave = (data: any) => {
    setNodeData(data);
    console.log("Saved data:", data);
  };

  return (
    <>
      <ParentNode className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 rounded-lg shadow-lg p-4 text-black transition duration-300 ease-in-out hover:from-blue-300 hover:via-blue-400 hover:to-blue-500">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-semibold">Deposit</span>
            <div className="text-white text-sm flex flex-col">
              <span className="font-semibold">min Amount</span> <span className="text-blue-gray-900"> {nodeData.minAmount}</span>
              {/* <span className="font-semibold">min Amount</span> <span className="text-blue-gray-900"> 1</span> */}
              <span className="font-semibold">max Amount</span> <span className="text-blue-gray-900"> {nodeData.maxAmount}</span>
              {/* <span className="font-semibold">max Amount</span> <span className="text-blue-gray-900"> 1000</span> */}
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
          <DepositCard
            open={isDialogOpen}
            onClose={handleDialogClose}
            onSave={handleSave}
            data={props.data}
          />
        </div>
      )}
    </>
  );
};

export default DepositNode;
