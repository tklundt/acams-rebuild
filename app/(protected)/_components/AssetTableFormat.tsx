import { Asset } from "@prisma/client";
import { DeleteAsset } from "./DeleteButton";
import { UpdateAsset } from "./EditButton";
import AssetCondition from "./condition";
import { CreateTicketSmall } from "./CreateTicketSmall";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export default async function AssetTableFormat({
    assets,
  }: {
    assets: Asset[];
  }) {
    const user = await currentUser();
    return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
      <table className="min-w-full text-black">
        <thead className="text-left text-sm font-normal bg-white border-black">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium">
              Type
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Status
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Condition
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Owned
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Name
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Description
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {assets?.map((asset) => (
            <tr
              key={asset.assetId}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                  <p>{asset.type}</p>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {asset.status}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <AssetCondition condition={asset.condition} />
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {asset.usedBy}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {asset.name}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {asset.description}
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <CreateTicketSmall assetId={asset.assetId} />
                  {user?.role===UserRole.ADMIN && (
                  <>
                    <UpdateAsset assetId={asset.assetId} />
                    <DeleteAsset assetId={asset.assetId} />
                  </>
                  )}
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