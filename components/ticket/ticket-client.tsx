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
import { useToast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { bitStrToOptions } from "@/utils/helper-functions";
import { Ticket } from "@/types";

export const TicketClient = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [tickets, setTickets] = useState([]);

  const deleteTicket = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.stopPropagation();
    await _delete(`/tickets/${id}`);
    toast({
      title: "Delete ticket successfully",
      description: "A ticket has been removed.",
    });
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
  }, []);
  return tickets ? (
    <div className="grid lg:grid-cols-4 grid-cols-3 lg:gap-12 gap-4 h-fit">
      {tickets.map((ticket: Ticket, idx) => (
        <div
          className="rounded-lg border shadow-lg py-3 px-4 w-full h-fit"
          key={idx}
        >
          <div className="flex gap-4 mb-3 justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h1 className="font-semibold text-sm line-clamp-1">
                    {ticket.id}
                  </h1>
                </TooltipTrigger>
                <TooltipContent>
                  <h1>{ticket.id}</h1>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" className="z-10">
                  <Icons.trash className="text-red-500 h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the ticket and you will not be able to continue step 2 with
                    this ticket.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      deleteTicket(event, ticket.id)
                    }
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
