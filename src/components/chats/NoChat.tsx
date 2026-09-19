import { Search } from 'lucide-react'
import icon from '../../assets/images/NoChat.png'
export default function NoChat() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
      <figure className="w-40 md:w-56 h-32 md:h-44 ">
        <img src={icon} alt="chat" className="w-full h-auto" />
      </figure>
      <div className="space-y-3 text-center">
        <p className="text-sm md:text-base text-gray-500">No messages yet</p>
        <button className="flex items-center gap-1 text-xs md:text-sm px-3 py-1.5 rounded-full bg-primary text-white hover:bg-primary/90 cursor-pointer">
          <Search className="w-4 h-4 md:w-5 md:h-5" />
          <span>Search for a skilled professional</span>
        </button>
      </div>
    </div>
  )
}
