import React from "react";

const TABLE_HEAD = [
  "Type", "Amount", "Time", "Transaction Address", "User Address",
];

const TRANSACTIONS = [
  {
    type: "Deposit",
    amount: "1000",
    time: "2023-07-10 14:22:05",
    transactionAddress: "0xAbC123...",
    userAddress: "0xUser1...",
  },
  {
    type: "Withdraw",
    amount: "500",
    time: "2023-07-10 15:30:00",
    transactionAddress: "0xAbD456...",
    userAddress: "0xUser2...",
  },
  {
    type: "Deposit",
    amount: "2000",
    time: "2023-07-11 09:45:12",
    transactionAddress: "0xAbE789...",
    userAddress: "0xUser3...",
  },
  {
    type: "Deposit",
    amount: "1000",
    time: "2023-07-10 14:22:05",
    transactionAddress: "0xAbC123...",
    userAddress: "0xUser1...",
  },
  {
    type: "Withdraw",
    amount: "500",
    time: "2023-07-10 15:30:00",
    transactionAddress: "0xAbD456...",
    userAddress: "0xUser2...",
  },
  {
    type: "Deposit",
    amount: "2000",
    time: "2023-07-11 09:45:12",
    transactionAddress: "0xAbE789...",
    userAddress: "0xUser3...",
  },
  {
    type: "Deposit",
    amount: "1000",
    time: "2023-07-10 14:22:05",
    transactionAddress: "0xAbC123...",
    userAddress: "0xUser1...",
  },
  {
    type: "Withdraw",
    amount: "500",
    time: "2023-07-10 15:30:00",
    transactionAddress: "0xAbD456...",
    userAddress: "0xUser2...",
  },
  {
    type: "Deposit",
    amount: "2000",
    time: "2023-07-11 09:45:12",
    transactionAddress: "0xAbE789...",
    userAddress: "0xUser3...",
  },
  {
    type: "Deposit",
    amount: "1000",
    time: "2023-07-10 14:22:05",
    transactionAddress: "0xAbC123...",
    userAddress: "0xUser1...",
  },
  {
    type: "Withdraw",
    amount: "500",
    time: "2023-07-10 15:30:00",
    transactionAddress: "0xAbD456...",
    userAddress: "0xUser2...",
  },
  {
    type: "Deposit",
    amount: "2000",
    time: "2023-07-11 09:45:12",
    transactionAddress: "0xAbE789...",
    userAddress: "0xUser3...",
  },
  {
    type: "Deposit",
    amount: "1000",
    time: "2023-07-10 14:22:05",
    transactionAddress: "0xAbC123...",
    userAddress: "0xUser1...",
  },
  {
    type: "Withdraw",
    amount: "500",
    time: "2023-07-10 15:30:00",
    transactionAddress: "0xAbD456...",
    userAddress: "0xUser2...",
  },
  {
    type: "Deposit",
    amount: "2000",
    time: "2023-07-11 09:45:12",
    transactionAddress: "0xAbE789...",
    userAddress: "0xUser3...",
  },
  {
    type: "Deposit",
    amount: "1000",
    time: "2023-07-10 14:22:05",
    transactionAddress: "0xAbC123...",
    userAddress: "0xUser1...",
  },
  {
    type: "Withdraw",
    amount: "500",
    time: "2023-07-10 15:30:00",
    transactionAddress: "0xAbD456...",
    userAddress: "0xUser2...",
  },
  {
    type: "Deposit",
    amount: "2000",
    time: "2023-07-11 09:45:12",
    transactionAddress: "0xAbE789...",
    userAddress: "0xUser3...",
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
