"use client";
import React, { useState } from "react";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { PiPlusLight } from "react-icons/pi";
import StrategyCard from "@/components/StrategyCard";

export default function Home() {
  const [strategies, setStrategies] = useState<{ id: number; name: string }[]>(
    []
  );

  const router = useRouter();

  const addStrategy = () => {
    // router.push(`/create/${strategies.length + 1}`);
    const newId = strategies.length + 1; // Adjust the ID to be based on current length
    const newStrategy = {
      id: newId,
      name: `Strategy ${newId}`,
    };
    setStrategies([...strategies, newStrategy]);
  };

  // Prepare the strategy cards and include empty placeholders for empty slots
  const items = strategies.slice(0, 3); // Only take the first three for the first row
  const emptySlots = 3 - items.length; // Calculate remaining slots before the Add button

  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-3xl h-44 p-4 rounded-lg shadow-lg">Balance</div>
      </div>
      <div>
        <div className="text-3xl mb-4">Strategies</div>
        <div className="grid grid-cols-4 gap-1">
          {items.map((strategy) => (
            <StrategyCard
              id={strategy.id.toString()}
              name={strategy.name}
              onCardClick={() => router.push(`/strategy/${strategy.id}`)}
            />
          ))}
          {Array.from({ length: emptySlots }, (_, i) => (
            <div key={`empty-${i}`} className="h-[21rem] w-[21rem]"></div> // Empty divs to maintain grid structure
          ))}
          <StrategyCard
            id="add"
            name="Add"
            onCardClick={addStrategy}
            addButton={true}
          />
          {strategies.slice(3).map((strategy) => (
            <StrategyCard
              id={strategy.id.toString()}
              name={strategy.name}
              onCardClick={() => router.push(`/strategy/${strategy.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
