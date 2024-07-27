import React from "react";

const TABLE_HEAD = [
  "Type", "Amount", "Time", "Transaction Address", "User Address",
];

const TRANSACTIONS = [
  {
    type: "Deposit",
    amount: "2",
    time: "2024-07-27 20:12:05",
    transactionAddress: "0xAbC123sDsdsCrsșwgvFd...",
    userAddress: "0xUser1skEW2dzm2Dsds...",
  },
];

const StrategyDetailsTable = () => {
  return (
    <div className="relative shadow-md sm:rounded-lg max-h-[450px] overflow-x-auto overflow-y-scroll">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-gray-800 sticky top-0 z-10">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="py-3 px-6">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRANSACTIONS.map((transaction, index) => (
            <tr key={index} className="bg-gray-900 border-b border-gray-700 ">
                {transaction.type == "Deposit" ? (
                    <td className="py-4 px-6 text-blue-500">{transaction.type}</td>
                ) : (
                    <td className="py-4 px-6 text-red-500">{transaction.type}</td>
                )}
              <td className="py-4 px-6">{transaction.amount}</td>
              <td className="py-4 px-6">{transaction.time}</td>
              <td className="py-4 px-6">{transaction.transactionAddress}</td>
              <td className="py-4 px-6">{transaction.userAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StrategyDetailsTable;