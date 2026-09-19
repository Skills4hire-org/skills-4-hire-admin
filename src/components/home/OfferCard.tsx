import { currencyFormatter, dateFormatter } from '@/utils/format'
import { Pencil, Trash2, Calendar } from 'lucide-react'
import { useState } from 'react'
import OfferImageCarousel from './ImageCarousel'
import { Link } from 'react-router-dom'
import DeleteOfferDialog from './DeleteOfferDialog'
import type { Post } from '@/types/post.types'

export default function OfferCard({
  post_id,
  tags,
  post_status,
  post_title,
  post_content,
  amount,
  duration,
  city,
  state,
  attachments,
  updated_at,
}: Post) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [viewMore, setViewMore] = useState(false)
  const media = attachments
    ?.filter((attachment) => attachment.attachment_type !== 'FILES')
    .map(({ attachmentURL }) => attachmentURL)
  /*  const files = attachments
    ?.filter((attachment) => attachment.attachment_type == 'FILES')
    .map(({ attachmentURL }) => attachmentURL)
   */

  return (
    <>
      {isDeleteOpen && (
        <DeleteOfferDialog
          setIsDeleteOpen={setIsDeleteOpen}
          post_id={post_id}
        />
      )}
      <div className="bg-white rounded-lg shadow p-2.5 md:p-4 space-y-2 w-full">
        <div className="flex items-start justify-between gap-2 md:gap-4 mb-1">
          <span className="text-xs md:text-sm bg-primary/10 text-primary rounded-sm px-4 md:px-6 py-1 w-max mb-1 font-medium">
            {tags && tags[0]?.name}
          </span>
          <span
            className={`text-xs sm:text-sm font-medium px-3 md:px-8 py-1 bg-green-100 text-green-700 rounded-full capitalize ${post_status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {post_status}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-base md:text-lg">
          {post_title}
        </h3>

        <div>
          <p
            className={`text-[14px] md:text-base text-gray-600 ${!viewMore && 'line-clamp-2 sm:line-clamp-none'}`}
          >
            {post_content}
          </p>
          <button
            onClick={() => setViewMore(!viewMore)}
            className="text-[14px] md:text-base text-primary underline cursor-pointer hover:no-underline sm:hidden"
          >
            {viewMore ? 'less' : 'more'}
          </button>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-2 text-[14px] md:text-base text-gray-500 mb-4 ">
          <div className="flex flex-col gap-0.5 md:gap-1">
            <span className="flex items-center gap-1">
              Amount: {currencyFormatter(Number(amount))}
            </span>

            <span className="flex items-center gap-1">
              Time Frame: {duration} day{duration && duration > 1 && 's'}
            </span>
          </div>

          <span className="flex items-center gap-1 capitalize">
            Location: {city},<span className="uppercase">{state}</span>
          </span>
        </div>
        {media && <OfferImageCarousel images={media} />}

        {/* <OfferFilesCarousel /> */}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] md:text-base text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> Posted: {dateFormatter(updated_at)}
          </span>
        </div>
        {post_status == 'active' && (
          <div className="flex gap-2 mt-4">
            <Link
              to={`/customer/edit-offer/${post_id}`}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-md bg-[var(--primary)] text-white text-sm md:text-base hover:opacity-90"
            >
              <Pencil size={16} /> Edit
            </Link>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 text-sm hover:bg-gray-200  cursor-pointer"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </>
  )
}
