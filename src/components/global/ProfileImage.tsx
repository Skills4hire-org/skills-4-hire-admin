import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import placeholder from '../../assets/images/profile.jpg'

export default function ProfileImage({
  noStatus,
  size,
  avatar,
  is_active,
}: {
  noStatus?: boolean
  size?: string
  avatar?: string
  is_active?: boolean
}) {
  return (
    <div className="relative w-max cursor-pointer">
      <Avatar className={`${size ? size : 'size-12'}`}>
        <AvatarImage src={avatar ?? placeholder} />
        <AvatarFallback>
          <User className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      {noStatus || (
        <span
          className={`absolute border-2 border-background w-3 h-3
        rounded-full top-0 right-0  ${is_active ? 'bg-green-600' : 'bg-gray-100'} `}
        />
      )}
    </div>
  )
}
