import React from "react";
import { ParentCard } from "./parentCard";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

const SwapCard = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const handleSave = () => {
    console.log("save");
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
          {" "}
          <div className="flex flex-col space-y-4">
            <Input
              size="lg"
              color="green"
              label="Token Address"
              className=" !text-white"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </ParentCard>
      </DialogBody>
      <DialogFooter
        placeholder="Enter placeholder"
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <button
          onClick={onClose}
          className="mr-2 px-4 py-2 bg-gray-700 text-white rounded"
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-[#21957A] text-white rounded "
          onClick={handleSave}
        >
          Save
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default SwapCard;
