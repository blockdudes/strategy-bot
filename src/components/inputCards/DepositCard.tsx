"use-client";
import React, { useState } from "react";
import { ParentCard } from "./parentCard";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";

const DepositCard = ({
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
    minAmount: data?.minAmount || "",
    maxAmount: data?.maxAmount || "",
  });

  const handleChange = (
    name: string,
    val: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = val.target.value;

    setFormData({
      ...formData,
      [name]: newValue,
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
        Edit Deposit Node
      </DialogHeader>
      <DialogBody
        className="text-white"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ParentCard>
          <div className="flex flex-col space-y-4">
            <Input
              type="number"
              size="lg"
              color="blue"
              label="Min Amount"
              value={formData.minAmount}
              onChange={(val) => handleChange("minAmount", val)}
              className=" !text-white"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              type="number"
              size="lg"
              color="blue"
              label="Max Amount"
              value={formData.maxAmount}
              onChange={(val) => handleChange("maxAmount", val)}
              className=" !text-white"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
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

export default DepositCard;
