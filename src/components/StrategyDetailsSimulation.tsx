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
import { FaPaperPlane, FaPlus, FaTrash } from "react-icons/fa";
import { NodeSelector } from "@/components/NodeSelector";
import MultiSwapNode from "@/components/customNodes/MultiSwapNode";

const StrategyDetailsSimulation = () => {
  const router = useRouter();

  const initialNodes = [
    {
      id: "1",
      type: "deposit",
      position: { x: 80, y: 100 },
      data: { label: "1" },
    },
    {
      id: "2",
      type: "multiswap",
      position: { x: 80, y: 250 },
      data: { label: "2" },
    },
    {
      id: "3",
      type: "stake",
      position: { x: 80, y: 400 },
      data: { label: "3" },
    },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [openNodeSelector, setOpenNodeSelector] = useState(false);

  const handleOpenNodeSelector = () => {
    setOpenNodeSelector((prev) => !prev);
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
    <>
      <div className="w-[27vw] h-[95vh]">
        <ReactFlow
          className="w-full h-full"
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodesDraggable={false}
          edgesUpdatable={false}
        >
          <NodeSelector
            open={openNodeSelector}
            handleOpen={handleOpenNodeSelector}
          />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
};
export default StrategyDetailsSimulation;
