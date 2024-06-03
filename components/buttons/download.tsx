"use client";

import { _get, _post } from "@/app/api/backend/api-client";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { Download } from "lucide-react";

const DownloadButton = () => {
  const { data: session } = useSession();
  const handleDownload = async () => {
    const res = await _get("/extension", {
      responseType: "blob",
    });
    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "php_extcrypt.dll";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleDownload}
      className="bg-cyan-500/80 gap-2 hover:bg-cyan-500/50 shadow-lg text-zinc-800 dark:text-white"
    >
      <span>Download extension</span>
      <Download className="h-4 w-4" />
    </Button>
  );
};

export default DownloadButton;
