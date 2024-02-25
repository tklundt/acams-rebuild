
import React from "react";
import Search from "../_components/SearchButton";
import { Suspense } from 'react';
import AssetTable from "../_components/AssetTable";
import { CreateAsset } from "../_components/CreateAssetButton";
import { CreateTicket } from "../_components/CreateTicketButton";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export default async function AssetsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}){
    const query = searchParams?.query || '';
    const user = await currentUser();
    return ( 
    <div className="w-[900px]">
        <div className="flex items-center gap-2 mb-2 w-full">
            <div className="w-[400px]">
              <Search placeholder="Search assets..."/>
            </div>
            {user?.role===UserRole.ADMIN && (
                <>
                  <div className="">
                    <CreateAsset/>
                  </div>
                </>
            )}
            <div className="">
            <CreateTicket/>
            </div>
        </div>
        <Suspense key={query}>
            <AssetTable query={query} />
        </Suspense>
    </div>
    );
}