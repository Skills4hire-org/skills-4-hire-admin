import NegotiateOfferForm from '../form/NegotiateOfferForm'

export default function NegotiationDialog({
  setIsNegotiateOpen,
}: {
  setIsNegotiateOpen: (value: boolean) => void
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <NegotiateOfferForm setIsNegotiateOpen={setIsNegotiateOpen} />
    </div>
  )
}
