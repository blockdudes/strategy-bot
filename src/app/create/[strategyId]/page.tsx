"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

const CreateStrategy = (params: { strategyId: string }) => {
  const router = useRouter();
  return (
    <div>
      Create Strategy {params.strategyId}
      <Button
        onClick={() => router.push("/")}
        color="gray"
        variant="outlined"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Back
      </Button>
    </div>
  );
};

export default CreateStrategy;
