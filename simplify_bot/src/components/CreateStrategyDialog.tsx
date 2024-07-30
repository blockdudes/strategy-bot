"use client";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Switch,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useContract } from "@/providers/thirdwebHook";
import { useReactFlow } from "reactflow";
import { useActiveAccount } from "thirdweb/react";

const CreateStrategyDialog = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => {
  const [isPublic, setIsPublic] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const reactflow = useReactFlow();

  const router = useRouter();
  const activeAccount = useActiveAccount();

  const { addStrategy } = useContract();

  const handleConfirm = () => {
    addStrategy(name, description, isPublic);
    console.log("name", name, "description", description, "public", isPublic);
    router.push("/");
    handleOpen();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const getDetails = () => {
    const nodes = reactflow.getNodes();
    const ExecutionSteps = nodes.map((node) => ({
      type: node.type,
      params: node.data
    }));

    const details = {
      strategyOwner: activeAccount?.address || "No active account",
      ExecutionSteps,
      isPublic,
      strategyName: name,
      strategyDescription: description
    };

    console.log(JSON.stringify(details, null, 2));
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
        Create Strategy
      </DialogHeader>
      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="w-full flex flex-col space-y-2">
          <div className="flex w-full items-end justify-end">
            <Switch
              onChange={() => setIsPublic(!isPublic)}
              label="Public"
              labelProps={{
                className: " !text-white",
              }}
              color="green"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <Input
            type=""
            size="lg"
            color="white"
            label="Name"
            onChange={handleNameChange}
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
            onChange={handleDescriptionChange}
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
        <Button
          variant="filled"
          className="bg-gray-800 hover:bg-gray-700"
          onClick={getDetails}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          get details
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CreateStrategyDialog;
