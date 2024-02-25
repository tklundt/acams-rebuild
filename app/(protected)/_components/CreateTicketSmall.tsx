import { FcDocument } from "react-icons/fc";
import Link from "next/link";

export function CreateTicketSmall({ assetId }: { assetId: string }) {
    return (
      <Link
        href={`/createTicket?a=${assetId}`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <FcDocument className="w-5" />
      </Link>
    );
  }