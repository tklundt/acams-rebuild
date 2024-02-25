import { getAssetById } from "@/data/asset";

//Client side get asset hook
export const useAsset = (urlId: string) => {
    
    const asset = getAssetById(urlId);
    return asset;
}