
import React from "react";
import Search from "../_components/SearchButton";
import { Suspense } from 'react';
import TicketTable from "../_components/TicketTable";
import { currentUser } from "@/lib/auth";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}){
  const user = await currentUser();
  if(user?.role==='USER'){
      return (
          <div>
              <p className="text-2xl shadow-md bg-white text-red-700 p-4 rounded-lg">⚠️Access denied</p>
          </div>
      )
  }
    const query = searchParams?.query || '';
    return ( 
    <div className="w-[900px]">
        <div className="flex items-center justify-between gap-2 mb-2 w-[400px]">
            <Search placeholder="Search tickets..."/>
        </div>
        <Suspense key={query}>
            <TicketTable query={query} />
        </Suspense>
    </div>
    );
}