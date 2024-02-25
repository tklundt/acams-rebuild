"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { AssetSchema  } from "@/schemas";
import { getAssetById } from "@/data/asset";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//This is something being submitted to the database with an already populated form

export const editasset = async (values: z.infer<typeof AssetSchema>, urlId: String) => {

    if(!urlId){
        return { error: "Missing URL asset identifier"}
    }

    // @ts-ignore:next-line
    const dbAsset = await getAssetById(urlId);
    if(!dbAsset){
        return { error: "Invalid asset ID"}
    }

    await db.asset.update({
        where: {assetId: dbAsset.assetId},
        data: {
            type: values.type,
            status: values.status,
            usedBy: values.usedBy,
            name: values.name,
            description: values.description,
            condition: values.condition,
        },
    })

    revalidatePath('/assets');
    redirect('/assets');
}