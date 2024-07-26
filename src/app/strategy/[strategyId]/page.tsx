
import StrategyDetailsSimulation from "@/components/StrategyDetailsSimulation";
import StrategyDetailsTable from "@/components/StrategyDetailsTable";
import React from "react";

const StrategyDetailsPage = () => {
  return (
    <div className="flex w-full h-full space-x-10 px-8"> 
      <div className="w-[27vw] h-[95vh]">
        <StrategyDetailsSimulation />
      </div>
      <div className="w-[63vw] h-[95vh]">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col w-full h-full space-y-4">
            <div className="text-4xl font-bold">
              <span className="text-gray-500">Strategy Balance </span> <span className="text-white text-2xl font-normal">$10000</span>  
            </div>
            <div className="text-4xl font-bold">
              <span className="text-gray-500">Total Invested </span> <span className="text-white text-2xl font-normal">$7000</span>  
            </div>
            <div className="flex flex-col space-y-2">
            <div className="text-4xl font-bold">
              Strategy Name
            </div>
            <div className="text-xl font-normal text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dolorem fugiat temporibus sit est numquam voluptates reiciendis doloremque eius corrupti expedita deserunt, veritatis soluta a iste accusantium minus possimus vel!
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