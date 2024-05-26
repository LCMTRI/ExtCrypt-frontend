"use client";

import { _get, _post } from "@/app/api/backend/api-client";
import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/src-code-tables/columns";
import { SrcCodeTable } from "@/components/tables/src-code-tables/src-code-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { GoogleUser } from "@/constants/user";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Employee", link: "/dashboard/employee" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function MeSourceCodePageComponent({
  searchParams,
}: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const offset = (page - 1) * pageLimit;
  const srcName = searchParams.search || null;

  const { data: session } = useSession();

  const [user, setUser] = useState<GoogleUser>();
  const [srcCodes, setSrcCodes] = useState();
  const [loading, setLoading] = useState(true);

  var pageCount = 0;

  useEffect(() => {
    console.log("call data");
    const fetchData = async () => {
      setLoading(true);
      await _get(`/users/${session?.user?.email}`).then(
        ({ data: userData }: { data: GoogleUser }) => {
          setUser(userData);
        },
      );
      await _post(
        `/src-codes/get-all?offset=${offset}&limit=${pageLimit}` +
          (srcName ? `&search=${srcName}` : ""),
        {
          email: session?.user?.email,
        },
      )
        .then(({ data: srcCodesData }) => {
          setSrcCodes(srcCodesData);
        })
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [srcName]);

  // const employeeRes = await res.json();
  if (user) pageCount = Math.ceil(user.num_of_src / pageLimit);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Source Codes (${user ? user.num_of_src : ""})`}
            description="View distributing source codes informations."
          />
        </div>
        <Separator />

        <SrcCodeTable
          searchKey="src_name"
          pageNo={page}
          columns={columns}
          totalUsers={user ? user.num_of_src : 0}
          data={srcCodes ?? []}
          loading={loading}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
