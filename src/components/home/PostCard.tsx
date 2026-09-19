import type { UserType } from '@/utils/types'
import {
  Heart,
  MessageCircle,
  BarChart2,
  Star,
  MapPin,
  Dot,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ProfileImage from '@/components/global/ProfileImage'
import CommentForm from '../form/CommentForm'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLikePost, useUnlikePost } from '@/hooks/usePosts'
import type { Post } from '@/types/post.types'
import EndorseDialog from '../endorse/EndorseDialog'
import ImageCarousel from './ImageCarousel'
import Comment from './Comment'
import { formatCommentTime } from '@/utils/format'
import Repost from './Repost'

export default function PostCard({
  post_id,
  user,
  post_content,
  created_at,
  tags,
  attachments,
  comments_counts,
  likes_count,
  reposts_count,
  is_commented,
  is_liked,
  is_reposted,
}: Post) {
  const [showComment, setShowComment] = useState(false)
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const provider_id = user?.user_id
  const provider_service = user?.profile?.professional_title
  const impression_count = 0
  const images = attachments?.map((attachment) => attachment.attachmentURL)

  const { mutate: likePost, isPending: liking } = useLikePost()
  const { mutate: unlikePost, isPending: unliking } = useUnlikePost()

  const handleLikePost = () => {
    is_liked ? unlikePost(post_id) : likePost({ post_id })
  }

  return (
    <div className="bg-white rounded-2xl shadow p-3 md:p-4 space-y-2.5 md:space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 md:gap-3">
          <Link to={`/customer/professionals/${provider_id}`}>
            <ProfileImage noStatus avatar={user?.profile?.avatar.avatar} />
          </Link>

          <div className="min-w-0">
            <div className="flex items-start">
              <Link
                to={`/customer/professionals/${provider_id}`}
                className="no-underline hover:no-underline"
              >
                <h3 className="text-[15px] md:text-base  font-semibold text-gray-900 leading-tight">
                  {user?.profile?.display_name}
                </h3>
              </Link>
              {userType == 'customer' && (
                <>
                  <Dot className="w-8.5 h-8.5 -m-1.5" />

                  <EndorseDialog
                    provider_pk={provider_id}
                    name={user?.profile?.display_name as string}
                  />
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-gray-500 my-0.5">
              {user?.profile?.city && (
                <span className="inline-flex items-center gap-1 capitalize">
                  <MapPin size={13.5} className="md:w-[14px]" />{' '}
                  {user?.profile?.city}
                </span>
              )}
              {user?.avg_rating && (
                <span className="inline-flex items-center gap-1">
                  <Star
                    size={13.5}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="font-semibold text-gray-700">
                    {user?.avg_rating}
                  </span>
                  {user?.total_reviews && (
                    <span className="text-gray-500">
                      ({user?.total_reviews} review
                      {user?.total_reviews > 1 && 's'})
                    </span>
                  )}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {provider_service && (
                <Link
                  to={`/customer/professionals/${provider_id}`}
                  className="text-[12px] md:text-sm text-primary font-medium no-underline hover:no-underline block w-max"
                >
                  {provider_service}
                </Link>
              )}
              <Dot className="w-3 h-3 text-muted-foreground" />
              <span>{formatCommentTime(created_at as string)}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-[14px] md:text-base leading-snug md:leading-relaxed">
        {post_content}
      </p>

      <div className="my-6">
        {attachments && <ImageCarousel images={images} />}
      </div>

      {tags && tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {tags?.map((tag) => (
            <span
              key={tag.service_category_id}
              className="px-1.5 py-0.5 md:px-2 md:py-1 text-xs md:text-sm bg-primary/10 text-primary rounded-full capitalize"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-gray-200 text-gray-500">
        {/* like */}
        <button
          onClick={handleLikePost}
          disabled={liking || unliking}
          className={`flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer ${is_liked && 'text-blue-600'}`}
        >
          <Heart className="w-5 h-5 md:h-6 md:w-6" /> <span>{likes_count}</span>
        </button>
        {/* comment */}
        <button
          className={`flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer ${is_commented && 'text-blue-600'}`}
          onClick={() => setShowComment(true)}
        >
          <MessageCircle className="w-5 h-5 md:h-6 md:w-6" />
          <span>{comments_counts}</span>
        </button>

        {/* repost */}

        <Repost
          post_id={post_id}
          reposts_count={reposts_count}
          is_reposted={is_reposted}
        />

        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer">
          <BarChart2 className="w-5 h-5 md:h-6 md:w-6" />
          <span>{impression_count}</span>
        </button>
      </div>
      {showComment && (
        <div className="mt-6 space-y-4">
          <CommentForm post_id={post_id} />
          <Comment post_id={post_id} />
        </div>
      )}
    </div>
  )
}
