import type { Referral } from '@/types/referrals.types'
import ProfileImage from '../global/ProfileImage'

export default function ReferralCard({ referred }: Referral) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-500">
      <ProfileImage
        noStatus
        size="size-10"
        avatar={referred.profile.avatar.avatar}
      />
      <h3 className="font-medium text-sm text-gray-900">
        {referred.profile.display_name}
      </h3>
    </div>
  )
}
