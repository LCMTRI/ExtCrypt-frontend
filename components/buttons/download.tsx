import { Button } from "../ui/button";

const DownloadButton = () => {
  const handleDownload = () => {
    // URL of the file in the public folder
    const fileUrl = "/hello_world.php";

    // Create a temporary <a> element
    const link = document.createElement("a");
    link.href = fileUrl;

    // Set the download attribute to specify the filename
    link.download = "hello_world.php";

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  return <Button onClick={handleDownload}>Download install.php</Button>;
};

export default DownloadButton;
