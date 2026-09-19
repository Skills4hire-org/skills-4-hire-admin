import { Loader2Icon } from 'lucide-react'

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center text-xs gap-1 text-gray-600">
      <Loader2Icon className="w-3 h-3 md:w-4 md:h-4 animate-spin text-primary" />
      <span className="text-xs md:text-sm font-medium">Loading...</span>
    </div>
  )
}
