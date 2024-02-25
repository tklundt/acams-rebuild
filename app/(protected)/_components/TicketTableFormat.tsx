import { Ticket } from "@prisma/client";
import { UpdateTicket } from "./EditButton";
import TicketHasAsset from "./ticketBound";

export default async function TicketTableFormat({
    tickets,
  }: {
    tickets: Ticket[];
  }) {
    return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
      <table className="min-w-full text-black">
        <thead className="text-left text-sm font-normal bg-white border-black">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium">
              Asset-bound
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Subject
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Description
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Admin Note
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Created
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Status
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Edit/View</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {tickets?.map((ticket) => (
            <tr
              key={ticket.ticketId}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                  <TicketHasAsset assetId={ticket.assetId} />
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <p className="truncate">
                  {ticket.subject}
                </p>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <p className="truncate">
                  {ticket.description}
                </p>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <p className="truncate">
                  {ticket.adminNote}
                </p>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {ticket.createDate.toDateString()}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {ticket.status}
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <UpdateTicket ticketId={ticket.ticketId} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
};