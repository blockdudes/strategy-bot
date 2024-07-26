import React, { useState } from "react";
import { ParentCard } from "./parentCard";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";

const MultiSwapCard = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: {};
}) => {
  const [tokenOutputs, setTokenOutputs] = useState([{ token: "", amount: "" }]);

  const handleAddOutput = () => {
    setTokenOutputs([...tokenOutputs, { token: "", amount: "" }]);
  };

  const handleRemoveOutput = () => {
    if (tokenOutputs.length > 1) {
      setTokenOutputs(tokenOutputs.slice(0, -1));
    }
  };

  const handleSave = () => {
    console.log("Saving", tokenOutputs);
    onClose();
  };

  const handleTokenChange = (index: number, value: string) => {
    const newOutputs = [...tokenOutputs];
    newOutputs[index].token = value;
    setTokenOutputs(newOutputs);
  };

  const handleAmountChange = (index: number, value: string) => {
    const newOutputs = [...tokenOutputs];
    newOutputs[index].amount = value;
    setTokenOutputs(newOutputs);
  };

  return (
    <Dialog
      open={open}
      handler={() => {}}
      className="bg-gray-900 text-white"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <DialogHeader
        className="text-white"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Edit MultiSwap Node
      </DialogHeader>
      <DialogBody
        className="text-white"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ParentCard>
          <div className="flex flex-col items-center justify-between mb-4 space-y-2">
            <Input
              type=""
              size="lg"
              color="teal"
              label="Input Token"
              className=" !text-white"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              type="number"
              size="lg"
              color="teal"
              label="Token Amount"
              className=" !text-white"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex items-center justify-end mb-4 space-x-4">
            <Button
              color="white"
              variant="text"
              size="sm"
              onClick={handleAddOutput}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add Output
            </Button>
            <Button
              color="red"
              variant="text"
              size="sm"
              onClick={handleRemoveOutput}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Remove Output
            </Button>
          </div>
          {tokenOutputs.map((output, index) => (
            <div key={index} className="flex space-x-4 mb-4">
              <Select
                variant="outlined"
                color="teal"
                size="lg"
                label="Select Asset"
                value={output.token}
                onChange={(value) => handleTokenChange(index, value ?? "")}
                className="!text-white w-full"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Option value="DAI">DAI</Option>
                <Option value="USDC">USDC</Option>
                <Option value="DOT">DOT</Option>
              </Select>
              <Input
                type="number"
                size="lg"
                color="teal"
                label="Amount"
                value={output.amount}
                onChange={(e) => handleAmountChange(index, e.target.value)}
                className="!text-white w-full"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          ))}
        </ParentCard>
      </DialogBody>
      <DialogFooter
        className="flex space-x-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          variant="text"
          color="red"
          onClick={onClose}
          className="text-gray-400 hover:text-red-600"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="filled"
          className="bg-gray-800 hover:bg-gray-700"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default MultiSwapCard;
