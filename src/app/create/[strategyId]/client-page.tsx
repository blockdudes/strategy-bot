"use client";
import DepositNode from "@/components/customNodes/DepositNode";
import StakeNode from "@/components/customNodes/StakeNode";
import SwapNode from "@/components/customNodes/SwapNode";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import { useCallback } from "react";

const ClientCreateStrategy = () => {
  const router = useRouter();

  const initialNodes = [
    {
      id: "1",
      type: "deposit",
      position: { x: 0, y: 0 },
      data: { label: "1" },
    },
    {
      id: "2",
      type: "stake",
      position: { x: 0, y: 150 },
      data: { label: "2" },
    },
    {
      id: "3",
      type: "swap",
      position: { x: 0, y: 300 },
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

  const nodeTypes = useMemo(
    () => ({
      deposit: DepositNode,
      stake: StakeNode,
      swap: SwapNode,
    }),
    []
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div>
      <div className="w-[90vw] h-[90vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
      <Button
        onClick={() => router.push("/")}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Back
      </Button>
    </div>
  );
};
export default ClientCreateStrategy;
