import React, { ReactNode, useState } from "react";
import {
  Badge,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa";
import { useReactFlow } from "reactflow";
import ShortUniqueId from "short-unique-id";

export const NodeSelector = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(
    null
  );
  const reactflow = useReactFlow();
  const nodes: {
    label: string;
    icon: ReactNode;
    type: string;
    color: string;
    data: {
      [key: string]: any;
    };
  }[] = [
    {
      label: "Deposit Node",
      icon: <div />,
      type: "deposit",
      color: "blue-500",
      data: { amount: "0" },
    },
    {
      label: "Swap Node",
      icon: <div />,
      type: "swap",
      color: "green-500",
      data: { tokenToSwapTo: "0x133212..121" },
    },
    {
      label: "Stake Node",
      icon: <div />,
      type: "stake",
      color: "purple-500",
      data: { amount: "0" },
    },
    {
      label: "MultiSwap Node",
      icon: <div />,
      type: "multiswap",
      color: "teal-500",
      data: { dai: "", usdc: "" },
    },
  ];

  const handleAddNode = () => {
    const reactflowNodes = reactflow.getNodes();
    const sourceNode = reactflowNodes[reactflowNodes.length - 1];
    const nodeId = "action" + reactflowNodes.length.toString();
    if (sourceNode) {
      reactflow.setNodes((reactflowNodes) => [
        ...reactflowNodes,
        {
          id: nodeId,
          type: nodes[selectedNodeIndex!].type,
          data: nodes[selectedNodeIndex!].data,
          position: {
            x: sourceNode.position.x,
            y: sourceNode.position.y + 150,
          },
        },
      ]);
      reactflow.addEdges({
        id: `${sourceNode.id}-${nodeId}`,
        source: sourceNode.id,
        target: nodeId,
      });
    } else {
      reactflow.setNodes((reactflowNodes) => [
        ...reactflowNodes,
        {
          id: nodeId,
          type: nodes[selectedNodeIndex!].type,
          data: nodes[selectedNodeIndex!].data,
          position: { x: 0, y: 0 },
        },
      ]);
    }
    setSelectedNodeIndex(null);
    handleOpen();
  };

  return (
    <Dialog
      open={open}
      size="md"
      handler={handleOpen}
      className="bg-gray-900"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <DialogHeader
        className="text-white"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Node Selector
      </DialogHeader>
      <DialogBody
        className="grid grid-cols-2 gap-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {nodes.map((node, index) => (
          <Badge
            key={index}
            content={
              <FaCheck
                className="h-3 aspect-square text-white"
                strokeWidth={0.5}
              />
            }
            invisible={selectedNodeIndex !== index}
            className={`bg-gray-800 border-2 border-[rgb(var(--tw-color-${node.color}))] shadow-lg cursor-pointer`}
          >
            <Button
              variant="filled"
              className={`w-full h-12 text-base font-medium bg-gray-800 rounded-lg normal-case hover:bg-gray-700 outline-none border-l-4 border-${node.color}`}
              onClick={() =>
                setSelectedNodeIndex((prev) => (prev !== index ? index : null))
              }
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className="flex gap-2 items-center justify-center">
                <span>{node.icon}</span>
                <span>{node.label}</span>
              </div>
            </Button>
          </Badge>
        ))}
      </DialogBody>
      <DialogFooter
        className="flex space-x-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="text-gray-400 hover:text-red-600"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          className="bg-gray-800 hover:bg-gray-700"
          onClick={
            selectedNodeIndex !== null
              ? handleAddNode
              : () => console.log("Please select a node")
          }
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
