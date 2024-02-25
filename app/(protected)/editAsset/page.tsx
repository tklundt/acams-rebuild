import { db } from "@/lib/db";
import { EditAssetForm } from "../_components/EditAssetForm";
import { currentUser } from "@/lib/auth";

export default async function EditAssetPage({
    params,
    searchParams,
}: {
    params: { slug: string};
    searchParams?: { [key:string]: string | undefined};
}) {
    const user = await currentUser();
    if(user?.role==='USER'){
        return (
            <div>
                <p className="text-2xl shadow-md bg-white text-red-700 p-4 rounded-lg">⚠️Access denied</p>
            </div>
        )
    }
    const idToQuery = searchParams?.a;
    if(!idToQuery){
        return (
            <div><h1 className="text-white">⚠️ Missing ID ⚠️</h1></div>
        )
    }
    const asset = await db.asset.findUnique({
        where: {
            assetId: idToQuery,
        },
     })
    if(!asset){
        return (
            <div><h1 className="text-white w-[800px]">⚠️ Asset Not Found ⚠️</h1></div>
        )
    } 
    return(
        <EditAssetForm 
            urlId={idToQuery}
            type={asset.type}
            status={asset.status}
            usedBy={asset.usedBy}
            name={asset.name}
            description={asset.description}
            condition={asset.condition}
        />
    )
}