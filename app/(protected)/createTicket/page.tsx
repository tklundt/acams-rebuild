import { AddTicketForm } from "../_components/AddTicketForm"

export default async function AddTicketPage({
    searchParams,
}: {
    searchParams?: {[key:string]: string|undefined}
}) {
    return (
        <AddTicketForm assetId={searchParams?.a} />
    )
}