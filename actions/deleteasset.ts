'use server';
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export async function deleteasset(assetId: string){
    if(!assetId){
        return { error: "Missing asset identifier"}
    }
    try{
        const asset = await db.asset.findUnique({
            where: {
                assetId: assetId,
            },
         })
         await db.asset.delete({
            where: {assetId: assetId},
        })
        revalidatePath('/assets');
        return {
            message: 'Deleted asset'
        }
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Asset.'
        }
    } 
}