import moment from "moment";
import { Icons } from "../icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { bitStrToOptions } from "@/utils/helper-functions";
import { useEffect, useState } from "react";
import { Ticket } from "@/types";

export const TicketInfo = ({ ticket }: { ticket: Ticket }) => {
  return (
    <div>
      <div className="w-full flex justify-between">
        <h1 className="font-semibold text-2xl mb-6">Ticket Info</h1>
        <Icons.tag className="text-cyan-500" />
      </div>
      <div className="flex gap-4 mb-2 justify-between">
        <h1 className="font-semibold line-clamp-1">Id: {ticket.id}</h1>
      </div>
      <p className="flex gap-2 mb-2">
        <div className="w-fit text-nowrap font-semibold">Options:</div>{" "}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="line-clamp-1 text-foreground/70">
                {bitStrToOptions(ticket.option_bit)}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <span className="">{bitStrToOptions(ticket.option_bit)}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>
      <div className="flex gap-2 mb-2">
        <div className="w-fit text-nowrap font-semibold">Created at:</div>{" "}
        <span className="text-ellipsis overflow-hidden">
          {moment(ticket.created_at).format("MMMM Do YYYY, h:mm:ss a")}
        </span>
      </div>
    </div>
  );
};
