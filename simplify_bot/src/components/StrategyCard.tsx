import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { PiPlusLight } from "react-icons/pi";

const StrategyCard = ({
  id,
  name,
  description,
  onCardClick,
  addButton,
}: {
  id?: string;
  name?: string;
  description?: string;
  onCardClick: () => void;
  addButton?: boolean;
}) => {
  return (
    <Card
      key={id}
      {...(addButton
        ? {
            className:
              "h-[21rem] w-[21rem] rounded-none bg-gray-900/50 border border-gray-800 flex justify-center items-center hover:bg-gray-900/20",
          }
        : {
            className:
              "h-[21rem] w-[21rem] rounded-none bg-gray-900 border border-gray-800 flex justify-center items-center hover:bg-gray-900/65",
          })}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onClick={onCardClick}
      onPointerLeaveCapture={undefined}
    >
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {addButton ? (
          <PiPlusLight className="h-40 w-40" />
        ) : (
          <>
            <div className="text-3xl text-gray-500">{name}</div>
            <div className="text-sm ">{description}</div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default StrategyCard;