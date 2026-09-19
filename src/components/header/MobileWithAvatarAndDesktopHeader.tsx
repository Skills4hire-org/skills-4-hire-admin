import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SidebarTrigger } from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import { useSelector } from 'react-redux'

export default function MobileWithAvatarAndDesktopHeader({
  title,
}: {
  title: string
}) {
  const navigate = useNavigate()
  const is_active = navigator.onLine
  const { avatar }: { avatar: string } = useSelector(
    (state: any) => state.userState,
  )
  return (
    <header className="flex md:block items-center justify-between items-center py-3 md:py-4">
      <button onClick={() => navigate(-1)} className="md:hidden">
        <ChevronLeft className="w-6 h-6" />
        <span className="sr-only">back</span>
      </button>
      <h1 className="font-bold text-lg md:text-2xl md:text-start">{title}</h1>
      <SidebarTrigger size="lg" className="md:hidden">
        <ProfileImage size="size-10" is_active={is_active} avatar={avatar} />
      </SidebarTrigger>
    </header>
  )
}
