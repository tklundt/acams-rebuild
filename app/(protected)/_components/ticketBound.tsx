export default function TicketHasAsset({ assetId }: { assetId: string | null }) {
  if(assetId){
    return "✅"
  }

  return(
    <>
    </>
  )
}
