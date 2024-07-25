import React, { createContext, useContext, useState, useEffect } from "react";
import { arbitrumSepolia, avalancheFuji } from "thirdweb/chains";
import {
  createThirdwebClient,
  getContract,
  readContract,
  prepareContractCall,
  sendAndConfirmTransaction,
  sendTransaction,
  ThirdwebContract,
  PreparedTransaction,
} from "thirdweb";
import {
  useActiveAccount,
  useSendTransaction,
  useActiveWalletChain,
} from "thirdweb/react";
import { client } from "@/lib/client";

interface ContractContextState {
  contractInstance: ThirdwebContract | undefined;
}

const ContractContext = createContext<ContractContextState | undefined>(
  undefined
);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contractInstance, setContractInstance] = useState<
    ThirdwebContract | undefined
  >();
  const activeChain = useActiveWalletChain();
  const activeAccount = useActiveAccount();

  useEffect(() => {
    const initContract = async () => {
      try {
        if (activeChain?.name === "Arbitrum Sepolia") {
          const contract = getContract({
            address: "",
            abi: [] as [],
            client: client,
            chain: arbitrumSepolia,
          });

          setContractInstance(contract);
        }
      } catch (error) {
        throw new Error(`Error getting contract: ${(error as Error).message}`);
        console.error(error);
      }
    };
    initContract();
  }, [activeChain]);

  const getBalance = async () => {
    if (!contractInstance) return;

    const balance = await readContract({
      contract: contractInstance,
      method:
        "function getUserBalance(address) view returns ((uint256, uint256))",
      params: [activeAccount?.address?.toString() || ""],
    });
    console.log(balance);
    return balance;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const ethPriceInUSD = data.ethereum.usd;
      const weiPriceInUSD = ethPriceInUSD / 1e18;
      localStorage.setItem(
        "price",
        JSON.stringify({ price: data.ethereum.usd, timestamp: Date.now() })
      );
      return { ethereum: { usd: weiPriceInUSD } };
    } catch (error) {
      console.log(error);
    }
  };

  const withdraw = async (isEth: boolean, amount: number) => {
    try {
      if (!activeAccount) {
        throw new Error("Active account is undefined");
      }

      if (!contractInstance) {
        throw new Error("Contract instance is undefined");
      }

      const transaction = prepareContractCall({
        contract: contractInstance,
        method: "function withdrawFunds(uint256 amount, bool isETH) public",
        params: [BigInt(amount), isEth],
        value: BigInt(0),
      });

      const result = await sendTransaction({
        transaction: transaction,
        account: activeAccount,
      });

      await getBalance();

      return result;
    } catch (error) {
      console.log({ error });
      throw new Error(`Error withdrawing: ${error}`);
    }
  };

  return (
    <ContractContext.Provider
      value={{
        contractInstance,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};
