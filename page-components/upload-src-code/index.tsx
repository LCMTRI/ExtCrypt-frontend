"use client";

import { _get } from "@/app/api/backend/api-client";
import SrcCodeForm from "@/components/forms/src-code-form";
import { Icons } from "@/components/icons";
import { TicketInfo } from "@/components/ticket";
import { Ticket } from "@/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UploadSrcCodePageComponent = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<Ticket>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      await _get(`/tickets/${ticketId}`)
        .then((res) => {
          setLoading(true);
          setTicket(res.data);
        })
        .catch((reason) => {
          console.log(reason);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    // Call the fetchData function
    fetchData();
  }, []);
  return ticket ? (
    <div className="w-full h-full py-16 flex flex-col gap-20 items-center justify-center">
      <div className="flex flex-col text-center lg:mx-0 mx-10 gap-6">
        <h1 className="inline-block text-4xl">Upload Source Code</h1>
        <span className="text-lg mx-auto lg:w-2/3 w-full px-8">
          Choose additional options to generate key the target local machine's
          informations.
        </span>
      </div>
      <div className="px-20 py-2 w-full flex flex-col items-center gap-8">
        <div className="w-1/2 py-8 px-12 border rounded hidden md:block">
          <TicketInfo ticket={ticket} />
        </div>
        <div className="w-1/2 py-8 px-12 border rounded">
          <SrcCodeForm optionBit={ticket.option_bit} ticketId={ticketId} />
        </div>
      </div>
    </div>
  ) : loading ? (
    <div className="w-full lg:h-[calc(100vh-175px)] sm:h-[calc(100vh-165px)] h-screen flex flex-col gap-5 items-center justify-center">
      <Loader2 className="mr-2 h-8 w-8 text-cyan-500 animate-spin" />
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className="w-full lg:h-[calc(100vh-175px)] sm:h-[calc(100vh-165px)] h-screen flex flex-col gap-5 items-center justify-center">
      <Icons.xCircle className="text-red-500 w-16 h-16" />
      <h1 className="font-bold text-2xl">Fail to load ticket!</h1>
      <div className="flex flex-col gap-2 text-lg">
        <span className="mx-auto text-center">
          The ticket is probably expired or not exist!
        </span>
      </div>
    </div>
  );
};

export default UploadSrcCodePageComponent;
