import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function CreateAsset() {
    return (
      <Link
        href="/createAsset"
        className="flex h-10 items-center rounded-md bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        <span className="hidden md:block">Create Asset</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }