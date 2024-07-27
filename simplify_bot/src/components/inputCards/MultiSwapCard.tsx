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
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    inputToken: data.inputToken || "",
    outputTokensToken: data.outputToken?.token || [""],
    outputTokensAmount: data.outputToken?.amount || [""],
  });

  // const [tokenOutputs, setTokenOutputs] = useState([{ token: "", amount: "" }]);

  const handleAddOutput = () => {
    setFormData({
      ...formData,
      outputTokensToken: [...formData.outputTokensToken, ""],
      outputTokensAmount: [...formData.outputTokensAmount, ""],
    });
  };

  const handleRemoveOutput = () => {
    if (formData.outputTokensToken.length > 1) {
      setFormData({
        ...formData,
        outputTokensToken: formData.outputTokensToken.slice(0, -1),
        outputTokensAmount: formData.outputTokensAmount.slice(0, -1),
      });
    }
  };

  const handleChange = (
    name: string,
    val: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const newValue = val.target.value;

    setFormData((prevData) => {
      if (name.startsWith('outputTokens')) {
        const [field, indexStr] = name.split('[');
        const updatedArray = [...prevData[field as keyof typeof prevData]];
        updatedArray[index as number] = newValue;
        return { ...prevData, [field]: updatedArray };
      }
      return { ...prevData, [name]: newValue };
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
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
              label="Input Token Address"
              value={formData.inputToken}
              onChange={(e) => handleChange("inputToken", e)}
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
          {formData.outputTokensToken.map((output: string, index: number) => (
            <div key={index} className="flex space-x-4 mb-4">
              <Input
                type="text"
                size="lg"
                color="teal"
                label="Output Token Address"
                className="!text-white w-full"
                value={formData.outputTokensToken[index]}
                onChange={(e) => handleChange("outputTokensToken", e, index)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                type="number"
                size="lg"
                color="teal"
                label="Percentage"
                className="!text-white w-full"
                value={formData.outputTokensAmount[index]}
                onChange={(e) => handleChange("outputTokensAmount", e, index)}
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