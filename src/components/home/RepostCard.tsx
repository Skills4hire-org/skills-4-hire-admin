import type { Reposted } from '@/types/post.types'
import ProfileImage from '../global/ProfileImage'

export default function RepostCard({ reposted_by }: Reposted) {
  return (
    <div className="flex items-center gap-2">
      <ProfileImage
        noStatus
        size="size-9"
        avatar={reposted_by.profile.avatar.avatar}
      />
      <h3 className="font-semibold text-base md:text-lg">
        {reposted_by.profile.display_name}
      </h3>
    </div>
  )
}
