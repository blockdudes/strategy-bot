"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StrategyCard from "@/components/StrategyCard";
import { useContract } from "@/providers/thirdwebHook";
import { useActiveAccount } from "thirdweb/react";
import axios from "axios";

export default function Home() {
  const { strategies, setStrategies } = useContract();

  const items = strategies.slice(0, 3);
  const emptySlots = 3 - items.length;

  const router = useRouter();
  const activeAccount = useActiveAccount();
  const [totalInvested, setTotalInvested] = useState(0);

  useEffect(() => {
    const fetchTotalInvested = async () => {
      const response = await axios.get(`/api/owner/${activeAccount?.address}`);
      console.log(response.data.strategies);
      setStrategies(response.data.strategies);
      setTotalInvested(response.data.totalBalance);
    };
    fetchTotalInvested();
  }, [activeAccount]);

  return (
    <div className="px-6 pt-14 w-full ">
      <div className="flex justify-between items-center">
        <div className="text-6xl flex flex-col h-44 w-full space-y-2">
          <div className=" flex space-x-2 items-baseline">
            <span className="text-gray-500">Total Invested</span>
            <span> </span>
            <span> </span>
            <span> </span>
            <span className="text-4xl">${totalInvested}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-1">
          {items.map((strategy) => (
            <StrategyCard
              key={null}
              id={strategy?.strategyId?.toString()}
              name={strategy.strategyName}
              description={strategy.strategyDescription}
              onCardClick={() =>
                router.push(`/strategy/${strategy.strategyId}`)
              }
            />
          ))}
          {Array.from({ length: emptySlots }, (_, i) => (
            <div key={`empty-${i}`} className="h-[21rem] w-[21rem]"></div>
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
              key={strategy.strategyId}
              id={strategy.strategyId.toString()}
              description={strategy.strategyDescription}
              name={strategy.strategyName}
              onCardClick={() =>
                router.push(`/strategy/${strategy.strategyId}`)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
