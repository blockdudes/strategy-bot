import React from "react";
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
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const handleSave = () => {
    console.log("Saving");
    onClose();
  };

  return (
    <Dialog
      open={open}
      handler={() => {}}
      placeholder="Enter placeholder"
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      className="bg-gray-900 text-white"
    >
      <DialogHeader
        placeholder="Enter placeholder"
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className="text-white"
      >
        Edit Swap Node
      </DialogHeader>{" "}
      <DialogBody
        className="text-white"
        placeholder="Enter placeholder"
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <ParentCard>
          <div className="flex flex-col space-y-10">
            <div className="flex flex-col space-y-4">
              <div className=" flex space-x-4">
                <Select
                  variant="outlined"
                  color="teal"
                  size="lg"
                  label="Select Asset"
                  className="!text-white "
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
                  className=" !text-white"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <div className=" flex space-x-4">
                <Select
                  variant="outlined"
                  color="teal"
                  size="lg"
                  label="Select Asset"
                  className="!text-white "
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
                  className=" !text-white"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
            </div>
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

export default MultiSwapCard;
