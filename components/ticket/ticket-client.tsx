"use client";

import { _delete, _post } from "@/app/api/backend/api-client";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Ticket {
  id: string;
  user_id: string;
  user_email: string;
  option_bit: string;
  expire_date: string;
  created_at: string;
}

const bitStrToOptions = (bitStr: string) => {
  if (bitStr.length != 5) {
    return "";
  }
  let res = "";
  let havePrev = false;
  if (bitStr[0] == "1") {
    res += "Mask Address";
    havePrev = true;
  }
  if (bitStr[1] == "1") {
    res += havePrev ? ", Volume Serial" : "Volume Serial";
    havePrev = true;
  }
  if (bitStr[2] == "1") {
    res += havePrev ? ", CPU Id" : "CPU Id";
    havePrev = true;
  }
  if (bitStr[3] == "1") {
    res += havePrev ? ", BIOS Activate Date" : "BIOS Activate Date";
    havePrev = true;
  }
  if (bitStr[4] == "1") {
    res += havePrev ? ", Device Name" : "Device Name";
    havePrev = true;
  }
  if (bitStr === "00000") {
    res = "No option";
  }
  return res;
};

const TicketClient = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [tickets, setTickets] = useState([]);

  const deleteTicket = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.stopPropagation();
    await _delete(`/tickets/${id}`);
    const fetchTickets = async () => {
      const res = await _post("/tickets/get-all", {
        email: session?.user?.email,
      });
      setTickets(res.data);
    };
    fetchTickets();
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await _post("/tickets/get-all", {
        email: session?.user?.email,
      });
      setTickets(res.data);
    };
    fetchTickets();
  }, [session]);
  return tickets ? (
    <div className="grid lg:grid-cols-4 grid-cols-3 lg:gap-12 gap-4 h-fit">
      {tickets.map((ticket: Ticket, idx) => (
        <div
          className="rounded-lg border shadow-lg py-3 px-4 w-full h-fit"
          key={idx}
        >
          <div className="flex gap-4 mb-3 justify-between">
            <h1 className="font-semibold text-sm line-clamp-1">{ticket.id}</h1>
            <div className="h-6 w-6">
              <Icons.tag className="text-cyan-600 h-5 w-5 bottom-0" />
            </div>
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
          {/* <div className="flex gap-2 mb-3">
            <div className="text-nowrap font-semibold">Created by:</div>{" "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-cyan-700 text-ellipsis overflow-hidden">
                    {ticket.user_email}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-cyan-700">{ticket.user_email}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div> */}
          <div className="w-full flex justify-between">
            <div
              className="group flex gap-1 items-center cursor-pointer underline-offset-2 hover:underline text-cyan-600"
              onClick={() => router.push("/upload-src-code/" + ticket.id)}
            >
              <span className="font-semibold bg-background z-30 py-2 sm:block hidden">
                Upload code
              </span>
              <Icons.arrowRight className="group-hover:text-cyan-600 w-4 h-4 z-20 sm:-translate-x-10 translate-x-0 group-hover:translate-x-0 duration-200" />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="z-10"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                deleteTicket(event, ticket.id)
              }
            >
              <Icons.trash className="text-red-500 h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="w-full h-full text-gray-400 flex flex-col gap-2 items-center justify-center pt-40">
      <Icons.empty className="w-16 h-16" strokeWidth={1} />
      <h1 className="font-semibold text-2xl">Empty Data</h1>
    </div>
  );
};

export default TicketClient;
