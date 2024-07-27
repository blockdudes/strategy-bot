"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StrategyCard from "@/components/StrategyCard";
import { useContract } from "@/providers/thirdwebHook";

export default function Home() {
  const { strategies } = useContract();

  // Prepare the strategy cards and include empty placeholders for empty slots
  const items = strategies.slice(0, 3); // Only take the first three for the first row
  const emptySlots = 3 - items.length; // Calculate remaining slots before the Add button

  const router = useRouter();

  return (
    <div className="px-6 pt-14 w-full ">
      <div className="flex justify-between items-center">
        <div className="text-6xl flex flex-col h-44 w-full space-y-2">
          <div className=" flex space-x-2 items-baseline">
            <span className="text-gray-500">Balance</span>
            <span> </span>
            <span> </span>
            <span> </span>
            {/* <span className="text-4xl">$12502</span>  */}
            <span className="text-4xl">$12500</span>
          </div>
          <div className="flex space-x-2 items-baseline">
            <span className="text-gray-500">Total Invested</span>
            <span> </span>
            <span> </span>
            <span> </span>
            {/* <span className="text-4xl">$26202</span> */}
            <span className="text-4xl">$26200</span>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-1">
          {items.map((strategy) => (
            <StrategyCard
            key={null}
              id={strategy.id.toString()}
              name={strategy.name}
              description={strategy.description}
              onCardClick={() => router.push(`/strategy/${strategy.id}`)}
            />
          ))}
          {Array.from({ length: emptySlots }, (_, i) => (
            <div key={`empty-${i}`} className="h-[21rem] w-[21rem]"></div> // Empty divs to maintain grid structure
          ))}
          <StrategyCard
            key={null}
            id="add"
            name="Add"
            onCardClick={() => router.push(`/create/`)}
            addButton={true}
          />
          {strategies.slice(3).map((strategy) => (
            <StrategyCard
              key={strategy.id}
              id={strategy.id.toString()}
              description={strategy.description}
              name={strategy.name}
              onCardClick={() => router.push(`/strategy/${strategy.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
