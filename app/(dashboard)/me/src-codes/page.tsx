import MeSourceCodePageComponent from "@/page-components/me/src-codes";
import React from "react";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const page = ({ searchParams }: paramsProps) => {
  return <MeSourceCodePageComponent searchParams={searchParams} />;
};

export default page;
