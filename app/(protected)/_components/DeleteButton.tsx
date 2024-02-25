"use server";
import { deleteasset } from "@/actions/deleteasset";
import { TrashIcon } from "@radix-ui/react-icons";

export async function DeleteAsset({ assetId }: { assetId: string }) {
    const deleteAssetWithId = deleteasset.bind(null, assetId);
    return (
      <form action={deleteAssetWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
    );
  }