import AssetTableFormat from "./AssetTableFormat";
import { db } from "@/lib/db";

export default async function AssetTable({
    query,
  }: {
    query: string;
  }) {
    if(query === ""){
      const assets = await db.asset.findMany()
      if(!assets){
        return (
          <div>
            <p className="bg-white text-red-500">
              🤔 There's nothing here!
            </p>
          </div>
        )
      }
      return (
        <AssetTableFormat assets={assets}/>
      )
    } else {
      const assets = await db.asset.findMany({
        where: {
          OR: [
            {
              type: {
                contains: `%${query}%`,
                mode: 'insensitive'
              },
            },
            {
              status: {
                contains: `%${query}%`,
                mode: 'insensitive',
              },
            },
            {
              usedBy: {
                contains: `%${query}%`,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: `%${query}%`,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: `%${query}%`,
                mode: 'insensitive',
              },
            },
            {
              condition: {
                contains: `%${query}%`,
                mode: 'insensitive',
              },
            }
          ]
        },
        select: {
          assetId: true,
          type: true,
          status: true,
          usedBy: true,
          name: true,
          description: true,
          condition: true
        }
      })
      if(!assets){
        return (
          <div>
            <p className="bg-white text-red-500">
              🤔 There's nothing here!
            </p>
          </div>
        )
      }
      return (
        <AssetTableFormat assets={assets}/>
      )
    }
  }