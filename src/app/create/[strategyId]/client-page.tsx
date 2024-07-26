"use client";
import DepositNode from "@/components/customNodes/DepositNode";
import StakeNode from "@/components/customNodes/StakeNode";
import SwapNode from "@/components/customNodes/SwapNode";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IconButton } from "@material-tailwind/react";

import {
  addEdge,
  Background,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import { useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { NodeSelector } from "@/components/NodeSelector";
import MultiSwapNode from "@/components/customNodes/MultiSwapNode";

const ClientCreateStrategy = () => {
  const router = useRouter();

  // const initialNodes = [{}];
  // const initialEdges = [{}];

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const nodeTypes = useMemo(
    () => ({
      deposit: DepositNode,
      stake: StakeNode,
      swap: SwapNode,
      multiswap: MultiSwapNode,
    }),
    []
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div>
      <div className="w-[87vw] h-[80vh]">
        <ReactFlow
          className="w-full h-full"
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <NodeSelector open={open} handleOpen={handleOpen} />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
      <div className="absolute top-80 right-12 flex flex-col gap-5">
        <IconButton
          variant="gradient"
          color="white"
          size="lg"
          onClick={handleOpen}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <FaPlus size={20} />
        </IconButton>
        <IconButton
          variant="gradient"
          color="white"
          size="lg"
          onClick={() => {router.push("/")}}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <FiSend size={20} />
        </IconButton>
      </div>
    </div>
  );
};
export default ClientCreateStrategy;
