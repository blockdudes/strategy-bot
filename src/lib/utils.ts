import { Node } from "reactflow";

export const createTransaction = async ({
  strategyName,
  strategyDescription,
  nodes,
  isPublic,
  sender,
}: {
  strategyName: string;
  strategyDescription: string;
  nodes: Node[];
  isPublic: boolean;
  sender: string;
}) => {
  const steps = nodes.map((node) => ({
    executionContract: node.data.address,
    data: node.data.data,
    value: node.data.value,
  }));
  const payload = {
    strategyOwner: sender,
    ExecutionSteps: [
      {
        executionContract: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
        data: "0xabcdef",
        value: "1000",
      },
      {
        executionContract: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
        data: "0x123456",
        value: "2000",
      },
    ],
    isPublic: false,
    strategyName: "str1",
    strategyDescription: "asdasdasdasd",
  };
};
