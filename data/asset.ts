import { db } from "@/lib/db";

export const getAssetById = async (assetId: string) => {
    try {
        const asset = await db.asset.findUnique({
            where: {assetId}
        })
        console.log("Dev: asset.ts", asset);
        return asset;
    } catch {
        return null;
    }
}