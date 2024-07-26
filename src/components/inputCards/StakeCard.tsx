import React from 'react'
import { ParentCard } from './parentCard'
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
  } from "@material-tailwind/react";

const StakeCard = ({
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
      handler={onClose}
      placeholder="Enter placeholder"
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      className="bg-[#212128] text-white"
    >
      <DialogHeader
        placeholder="Enter placeholder"
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className="text-white"
      >
        Edit Stake Node
      </DialogHeader>{" "}
      <DialogBody
        className="text-white"
        placeholder="Enter placeholder"
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <ParentCard>body</ParentCard>
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
  )
}

export default StakeCard
