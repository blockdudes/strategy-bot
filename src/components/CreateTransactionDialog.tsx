"use client";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React from "react";
import { useRouter } from "next/navigation";

const CreateTransactionDialog = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => {
  const router = useRouter();
  const handleConfirm = () => {
    console.log("Confirmed");
    router.push("/");
    handleOpen();
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-gray-900"
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
        Create Transaction
      </DialogHeader>
      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="w-full flex flex-col space-y-2">
        <Input
          type=""
          size="lg"
          color="white"
          label="Name"
          className=" !text-white"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
        <Input
          type=""
          size="lg"
          color="white"
          label="Description"
          className=" !text-white"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
        </div>
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
          onClick={handleOpen}
          className="text-gray-400 hover:text-red-600"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          className="bg-gray-800 hover:bg-gray-700"
          onClick={handleConfirm}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Create
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CreateTransactionDialog;
