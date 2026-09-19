import { useDeletePost } from '@/hooks/usePosts'
import { Trash2, X } from 'lucide-react'
import { useState } from 'react'

export default function DeleteOfferDialog({
  setIsDeleteOpen,
  post_id,
}: {
  setIsDeleteOpen: (value: boolean) => void
  post_id?: string
}) {
  const { mutate: deleteOffer } = useDeletePost()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    deleteOffer({ post_id })
  }
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Delete Offer?</h2>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this offer? This action cannot be
          undone.
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 cursor-pointer"
          >
            <X size={16} /> Cancel
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-[var(--destructive)] text-white text-sm hover:opacity-90 cursor-pointer"
          >
            <Trash2 size={16} /> {isDeleting ? 'Deleting' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
