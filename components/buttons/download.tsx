"use client";

import { _get, _post } from "@/app/api/backend/api-client";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const DownloadButton = () => {
  const { data: session } = useSession();
  const handleDownload = async () => {
    // URL of the file in the public folder
    // const fileUrl = "/hello_world.php";

    // // Create a temporary <a> element
    // const link = document.createElement("a");
    // link.href = fileUrl;

    // // Set the download attribute to specify the filename
    // link.download = "hello_world.php";

    // // Programmatically click the link to trigger the download
    // document.body.appendChild(link);
    // link.click();

    // // Clean up
    // document.body.removeChild(link);
    const res = await _post("/options-submit", {
      option_bit: "00000",
      email: session?.user?.email,
    });
    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "install.php";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleDownload}
      className="bg-cyan-500/80 gap-2 hover:bg-cyan-500/50 shadow-lg text-zinc-800 dark:text-white"
    >
      <span>
        Download install.php <span className="opacity-70">(No options)</span>
      </span>
    </Button>
  );
};

export default DownloadButton;
