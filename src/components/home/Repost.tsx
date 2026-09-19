import { useRepost } from '@/hooks/usePosts'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Repeat, Users } from 'lucide-react'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import RepostDialog from './RepostDialog'
import { useState } from 'react'

export default function Repost({
  post_id,
  reposts_count,
  is_reposted,
}: {
  post_id?: string
  reposts_count?: number
  is_reposted?: boolean
}) {
  const [open, setOpen] = useState(false)
  const { mutate: repost, isPending: reposting } = useRepost()

  const handleRepost = () => {
    repost({ post_id })
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            disabled={reposting}
            className={`flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer ${is_reposted && 'text-blue-600'} outline-none `}
          >
            <Repeat className="w-5 h-5 md:h-6 md:w-6" />
            <span>{reposts_count}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          sideOffset={4}
          className="bg-gray-50 py-2 px-1 rounded-md"
        >
          <DropdownMenuItem
            onClick={handleRepost}
            /*  disabled={is_reposted} */
            className=""
            asChild
          >
            <button className="cursor-pointer group focus:bg-transparent">
              <Repeat className="w-4 h-4 md:w-5 md:h-5  group-hover:text-foreground" />
              <span className="capitalize text-xs md:text-sm flex items-center justify-between group-hover:text-foreground flex-1">
                Repost
              </span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="" asChild>
            <button
              className="cursor-pointer group focus:bg-transparent flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <Users className="w-4 h-4 md:w-5 md:h-5  group-hover:text-foreground" />
              <span className=" text-xs md:text-sm flex items-center justify-between group-hover:text-foreground flex-1">
                Reposted by
              </span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RepostDialog open={open} onOpenChange={setOpen} post_id={post_id} />
    </>
  )
}
