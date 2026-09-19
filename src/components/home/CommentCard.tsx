import { useState } from 'react'
import ProfileImage from '../global/ProfileImage'
import { Heart, MessageCircle, Reply } from 'lucide-react'
import CommentReplyForm from '../form/CommentReplyForm'
import type { PostComment } from '@/types/post.types'
import { useLikeComment, useUnlikeComment } from '@/hooks/usePosts'
import CommentReplies from './CommentReplies'
import { formatCommentTime } from '@/utils/format'

export default function CommentCard({
  comment_id,
  total_likes,
  total_replies,
  user,
  message,
  post_id,
  is_liked,
  is_replied,
  created_at,
  depth = 0,
}: PostComment & { depth?: number }) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  const { mutate: likeComment, isPending: liking } = useLikeComment()
  const { mutate: unlikeComment, isPending: unliking } = useUnlikeComment()
  const handleLike = () => {
    is_liked ? unlikeComment(comment_id) : likeComment({ comment_id })
  }
  const handleShowReply = () => {
    setShowReplies((prev) => !prev)
    setShowReplyForm(false)
  }
  return (
    <div
      className="space-y-2"
      style={{
        marginLeft: `${Math.min(depth * 10, 40)}px`,
      }}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <ProfileImage
          noStatus
          size="size-8 md:size-10"
          avatar={user?.profile?.avatar?.avatar}
        />
        <div>
          <h3 className="font-semibold text-gray-900 text-sm md:text-base">
            {user?.profile?.display_name}
          </h3>
          <p className="text-[10px] md:text-xs text-muted-foreground">
            {formatCommentTime(created_at)}
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm md:text-base leading-snug md:leading-relaxed">
        {message}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-6 md:gap-10 pt-2 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-sm font-medium transition-all cursor-pointer   rounded-full ${
            is_liked ? 'text-red-600' : 'text-gray-600 hover:text-primary'
          }`}
          disabled={liking || unliking}
        >
          <Heart
            className="w-4 h-4 md:h-5 md:w-5"
            fill={is_liked ? 'currentColor' : 'none'}
          />
          <span className="text-xs md:text-sm text-muted-foreground">
            {total_likes}
          </span>
        </button>

        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary rounded-full transition-all cursor-pointer"
        >
          <Reply className="w-4 h-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm">Reply</span>
        </button>

        <button
          className={`flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary  rounded-full transition-all cursor-pointer ${is_replied && 'text-blue-600'}`}
          onClick={handleShowReply}
        >
          <MessageCircle className="w-4 h-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm text-muted-foreground">
            {total_replies} repl{total_replies > 1 ? 'ies' : 'y'}
          </span>
        </button>
      </div>

      {/* Reply Input */}
      {showReplyForm && (
        <CommentReplyForm
          setShowReplyForm={setShowReplyForm}
          post_id={post_id}
          comment_id={comment_id}
        />
      )}
      {/* Replies */}
      {showReplies && (
        <CommentReplies
          comment_id={comment_id}
          post_id={post_id}
          depth={depth + 1}
        />
      )}
    </div>
  )
}
