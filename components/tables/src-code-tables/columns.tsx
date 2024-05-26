"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SrcCode } from "@/types/src-code";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<SrcCode>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "user_email",
  //   header: "DISTRIBUTOR",
  //   cell: ({ row }) => (
  //     <p className="text-wrap break-words w-full max-w-52 min-w-24">
  //       {row.getValue("user_email")}
  //     </p>
  //   ),
  // },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="w-fit max-w-40 text-nowrap overflow-hidden text-ellipsis">
              {row.getValue("id")}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p className="">{row.getValue("id")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "src_name",
    header: "SOURCE NAME",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="w-40 overflow-hidden text-ellipsis">
              {row.getValue("src_name")}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p className="">{row.getValue("src_name")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "key",
    header: "KEY",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="w-full max-w-52 overflow-hidden text-ellipsis">
              {row.getValue("key")}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p className="">{row.getValue("key")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "password",
    header: "PASSWORD",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="w-24 overflow-hidden text-ellipsis">
              {row.getValue("password")}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p className="">{row.getValue("password")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "created_at",
    header: "CREATED AT",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="w-full min-w-24 overflow-hidden text-ellipsis">
              {moment(row.getValue("created_at")).format(
                "MMMM Do YYYY, h:mm A",
              )}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p className="">
              {moment(row.getValue("created_at")).format(
                "MMMM Do YYYY, h:mm A",
              )}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "expire_date",
    header: "EXPIRE DATE",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="w-full min-w-24 overflow-hidden text-ellipsis">
              {moment(row.getValue("expire_date")).format("MMMM Do YYYY")}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p className="">
              {moment(row.getValue("expire_date")).format("MMMM Do YYYY")}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
