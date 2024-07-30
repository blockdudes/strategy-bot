import React from "react";

const TABLE_HEAD = [
  "Type",
  "Amount",
  "Time",
  "Transaction Address",
  "User Address",
];

const TRANSACTIONS = [
  {
    type: "Deposit",
    amount: "1000",
    time: "2023-07-10 14:22:05",
    transactionAddress: "0x3a5E7Fa23d1B8A4C8648c8DF4F2f2c84dA2c7Ae4",
    userAddress: "0x7F9e8E7d5E4b3C2b1A0D9F8C7B6A5E4D3C2B1A0D",
  },
  {
    type: "Withdraw",
    amount: "500",
    time: "2023-07-10 15:30:00",
    transactionAddress: "0x2B1c8E9D6A5F4E3C2D1B0A9F8C7B6A5E4D3C2B1A",
    userAddress: "0x9A8B7C6D5E4F3G2H1I0J9K8L7M6N5O4P3Q2R1S0",
  },
  {
    type: "Deposit",
    amount: "2000",
    time: "2023-07-11 09:45:12",
    transactionAddress: "0x5D4C3B2A1F0E9D8C7B6A5F4E3D2C1B0A9F8E7D6",
    userAddress: "0x1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0",
  },
  {
    type: "Deposit",
    amount: "750",
    time: "2023-07-12 11:17:30",
    transactionAddress: "0x8F7E6D5C4B3A2F1E0D9C8B7A6F5E4D3C2B1A0F9",
    userAddress: "0x2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1",
  },
  {
    type: "Withdraw",
    amount: "1200",
    time: "2023-07-13 16:05:45",
    transactionAddress: "0x1A0B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9",
    userAddress: "0x3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2",
  },
  {
    type: "Deposit",
    amount: "3000",
    time: "2023-07-14 08:30:22",
    transactionAddress: "0x9E8D7C6B5A4F3E2D1C0B9A8F7E6D5C4B3A2F1E0",
    userAddress: "0x4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3",
  },
  {
    type: "Withdraw",
    amount: "250",
    time: "2023-07-15 13:40:18",
    transactionAddress: "0x7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C9B8",
    userAddress: "0x5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4",
  },
  {
    type: "Deposit",
    amount: "1500",
    time: "2023-07-16 10:55:37",
    transactionAddress: "0x2A1B0C9D8E7F6G5H4I3J2K1L0M9N8O7P6Q5R4S3",
    userAddress: "0x6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5",
  },
  {
    type: "Withdraw",
    amount: "800",
    time: "2023-07-17 17:20:09",
    transactionAddress: "0x4F3E2D1C0B9A8F7E6D5C4B3A2F1E0D9C8B7A6F5",
    userAddress: "0x7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6",
  },
  {
    type: "Deposit",
    amount: "5000",
    time: "2023-07-18 12:10:55",
    transactionAddress: "0x6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C9B8A7",
    userAddress: "0x8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7",
  },
  {
    type: "Withdraw",
    amount: "800",
    time: "2023-07-17 17:20:09",
    transactionAddress: "0x4F3E2D1C0B9A8F7E6D5C4B3A2F1E0D9C8B7A6F5",
    userAddress: "0x7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6",
  },
  {
    type: "Deposit",
    amount: "5000",
    time: "2023-07-18 12:10:55",
    transactionAddress: "0x6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C9B8A7",
    userAddress: "0x8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7",
  },
];

const truncate = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 3)}....${address.slice(-5)}`;
};

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
              <td className="py-4 px-6">{truncate(transaction.transactionAddress)}</td>
              <td className="py-4 px-6">{truncate(transaction.userAddress)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StrategyDetailsTable;
