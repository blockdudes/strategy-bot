import React, { useState } from "react";
import { ParentNode } from "./parentNode";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NodeProps, useReactFlow } from "reactflow";
import MultiSwapCard from "../inputCards/MultiSwapCard";
import { MultiSwapDataType } from "./NodeTypes";

const MultiSwapNode = (props: NodeProps<MultiSwapDataType>) => {
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

  const truncate = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 3)}....${address.slice(-5)}`;
  };

  return (
    <>
      <ParentNode className="bg-gradient-to-r from-green-200 via-green-300 to-teal-300 rounded-lg shadow-lg p-4 text-black transition duration-300 ease-in-out hover:from-green-300 hover:via-green-400 hover:to-teal-400">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-semibold">MultiSwap</span>
            <div className="text-white text-sm flex flex-col">
              <div>
              <span className="font-semibold">ip token </span><span className="text-gray-900">{truncate(nodeData.inputToken)}</span>
              {/* <span className="font-semibold">ip token </span><span className="text-gray-900">{truncate("0x1dSk023ndoDj12ewjdsamdAbd")}</span> */}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <FaEdit
              className="text-gray-800 cursor-pointer hover:text-white"
              onClick={handleEditClick}
              aria-label="Edit"
            />
          </div>
        </div>
        {isDialogOpen && (
          <div onClick={(e) => e.stopPropagation()}>
            <MultiSwapCard
              open={isDialogOpen}
              onClose={handleDialogClose}
              data={props.data}
              onSave={handleSave}
            />
          </div>
        )}
      </ParentNode>
    </>
  );
};

export default MultiSwapNode;
