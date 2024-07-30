"use client";

import React, { useEffect, useState } from "react";
import StrategyDetailsSimulation from "@/components/StrategyDetailsSimulation";
import StrategyDetailsTable from "@/components/StrategyDetailsTable";
import axios from "axios";

const StrategyDetailsPage = ({
  params,
}: {
  params: { strategyId: string };
}) => {
  const [name, setName] = useState<string>("Name");
  const [description, setDescription] = useState<string>("Description");
  const [balance, setBalance] = useState<number>(0);
  const [totalInvested, setTotalInvested] = useState<number>(0);

  const getStrategies = async () => {
    const response = await axios.get(`/api/strategy/get/${params.strategyId}`);
    console.log(response.data);
    setName(response.data.strategyName);
    setDescription(response.data.strategyDescription);
    setBalance(response.data.balance);
    setTotalInvested(response.data.totalInvested);
    console.log(response.data);
  };

  useEffect(() => {
    getStrategies();
  }, []);

  return (
    <div className="flex w-full h-full space-x-10 px-8">
      <div className="w-[27vw] h-[95vh]">
        <StrategyDetailsSimulation />
      </div>
      <div className="w-[63vw] h-[95vh]">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col w-full h-full space-y-10">
            <div className="flex flex-col space-y-2">
              <div className="text-4xl font-bold flex gap-4 items-center">
                <span className="text-gray-500">Strategy Balance :</span>
                <span className="text-white text-2xl font-normal">
                  {balance}
                </span>
              </div>
              <div className="text-4xl font-bold flex gap-4 items-center">
                <span className="text-gray-500">Total Invested :</span>
                <span className="text-white text-2xl font-normal">
                  {totalInvested}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="text-4xl font-bold">{name}</div>
              <div className="text-xl font-normal text-gray-500">
                {description}
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col space-y-2">
            <StrategyDetailsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyDetailsPage;
