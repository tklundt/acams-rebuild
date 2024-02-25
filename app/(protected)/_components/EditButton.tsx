import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export function UpdateAsset({ assetId }: { assetId: string }) {
    return (
      <Link
        href={`/editAsset?a=${assetId}`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <Pencil1Icon className="w-5" />
      </Link>
    );
  }

export function UpdateTicket({ ticketId }: { ticketId: string | null}) {
    return (
      <Link
        href={`/editTicket?t=${ticketId}`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <Pencil1Icon className="w-5" />
      </Link>
    );
  }