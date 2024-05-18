import BreadCrumb from "@/components/breadcrumb";
import TicketClient from "@/components/ticket/ticket-client";

const breadcrumbItems = [{ title: "Tickets", link: "/dashboard/tickets" }];
const page = () => {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <TicketClient />
      </div>
    </>
  );
};

export default page;
