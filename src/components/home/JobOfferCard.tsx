import ProfileImage from '@/components/global/ProfileImage'
import { MapPin, Clock, Wallet, RefreshCw, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import ImageCarousel from './ImageCarousel'
import NegotiationDialog from './NegotiationDialog'
/* import { useCreateConversation } from '@/hooks/useChats'
import { useNavigate } from 'react-router-dom' */
import type { Post } from '@/types/post.types'
import { currencyFormatter, formatCommentTime } from '@/utils/format'

export default function JobOfferCard({
  post_title,
  post_content,
  amount,
  duration,
  city,
  state,
  attachments,
  updated_at,
  user,
}: Post) {
  const [viewMore, setViewMore] = useState(false)
  const [isNegotiateOpen, setIsNegotiateOpen] = useState(false)
  const media = attachments
    ?.filter((attachment) => attachment.attachment_type !== 'FILES')
    .map(({ attachmentURL }) => attachmentURL)
  /*  const { mutate: createConversation, isPending } = useCreateConversation()
  const navigate = useNavigate()
  const sendMessage = () => {
    const data = {
      participant_one: {
        first_name: '',
        last_name: '',
      },
      participant_two: {
        first_name: '',
        last_name: '',
      },
      participant_two_id: '',
    }
    createConversation(data, {
      onSuccess: () => {
        navigate(`/professional/chats/${data.participant_two_id}`)
      },
    })
  } */

  return (
    <>
      {isNegotiateOpen && (
        <NegotiationDialog setIsNegotiateOpen={setIsNegotiateOpen} />
      )}

      <div className="bg-white rounded-lg shadow p-2.5 md:p-4 space-y-2 md:space-y-3 w-full">
        <p className="text-xs md:text-sm font-medium text-gray-600">
          Posted {formatCommentTime(updated_at as string)}
        </p>

        <div className="flex items-start gap-2">
          <div className="shrink-0">
            <ProfileImage
              noStatus
              size="size-10 md:size-12"
              avatar={user?.profile?.avatar?.avatar}
            />
          </div>

          <div className="space-y-0.5">
            <p className="text-sm md:text-base font-semibold text-gray-900 leading-tight line-clamp-1">
              {user?.profile?.display_name}
            </p>

            {location && (
              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{user?.profile?.city}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-0.5">
            {post_title}
          </h3>

          <div>
            <p
              className={`text-xs md:text-sm text-gray-600 ${
                !viewMore && 'line-clamp-2 sm:line-clamp-none'
              }`}
            >
              {post_content}
            </p>

            <button
              onClick={() => setViewMore(!viewMore)}
              className="text-xs md:text-sm text-primary underline cursor-pointer hover:no-underline sm:hidden"
            >
              {viewMore ? 'less' : 'more'}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
          <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-green-50 text-green-700 whitespace-nowrap capitalize">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>
              {city}, <span className="uppercase">{state}</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-yellow-50 text-yellow-800 whitespace-nowrap">
            <Clock className="w-4 h-4 shrink-0" />
            <span>
              {duration} day{duration && duration > 1 && 's'}
            </span>
          </span>
          (
          <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-blue-50 text-blue-700 whitespace-nowrap">
            <Wallet className="w-4 h-4 shrink-0" />
            <span>{currencyFormatter(Number(amount))}</span>
          </span>
        </div>

        <div className="my-6">{media && <ImageCarousel images={media} />}</div>

        {/* <OfferFilesCarousel /> */}

        <div className="mt-2">
          <div className="flex gap-2 flex-nowrap">
            <button
              onClick={() => setIsNegotiateOpen(true)}
              className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1 md:py-1.5 rounded-md bg-yellow-400 text-white text-sm md:text-base hover:opacity-90 transition font-medium cursor-pointer hover:opacity-90"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Negotiate</span>
            </button>

            <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1 md:py-1.5 rounded-md border border-gray-200 text-gray-700 text-sm md:text-base hover:bg-gray-50 transition font-medium cursor-pointer hover:bg-gray-200">
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
