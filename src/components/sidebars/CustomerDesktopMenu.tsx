import { sidebarAboutUs, sidebarDesktopGeneral } from '@/assets/data'
import ProfileImage from '../global/ProfileImage'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import SignOutButton from '../buttons/SignOutButton'
import { useMyProfile } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'

export default function CustomerDesktopMenu() {
  const { data } = useMyProfile()
  const user: Profile | undefined = data
  const avatar = user?.user?.profile?.avatar?.avatar

  const navigate = useNavigate()
  const is_active = navigator.onLine
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mx-auto">
        <ProfileImage is_active={is_active} avatar={avatar} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        sideOffset={10}
        className="translate-x-23 translate-y-9 bg-primary border-2 border-t-transparent border-r-transparent text-white py-6 px-4"
      >
        <DropdownMenuLabel className="px-0 text-base py-0">
          General
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {sidebarDesktopGeneral.map(({ icon, label, url }) => {
            const IconComponent = icon
            return (
              <DropdownMenuItem
                onClick={(event) => {
                  event.preventDefault()
                  navigate(url)
                }}
                key={label}
                className="px-1 group cursor-pointer hover:bg-white"
                asChild
              >
                <div className="py-2 flex items-center gap-2 w-full">
                  <IconComponent className="w-5 h-5  group-hover:text-foreground" />
                  <span className="capitalize text-xs flex items-center justify-between group-hover:text-foreground flex-1">
                    {label}
                  </span>
                </div>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <DropdownMenuLabel className="px-0 text-base py-0 mt-4 ">
          About Us
        </DropdownMenuLabel>
        <DropdownMenuGroup className="mb-2">
          {sidebarAboutUs.map(({ icon, label, url }) => {
            const IconComponent = icon
            return (
              <>
                {label == 'helpline number' ? (
                  <div
                    key={label}
                    className="px-1 group cursor-pointer hover:bg-white rounded-sm"
                  >
                    <a
                      href={url}
                      className="py-2 flex items-center gap-2 w-full "
                    >
                      <IconComponent className="w-4 h-4  group-hover:text-foreground" />
                      <span className="capitalize text-xs flex items-center justify-between flex-1 group-hover:text-foreground">
                        {label}
                      </span>
                    </a>
                  </div>
                ) : (
                  <DropdownMenuItem
                    key={label}
                    className="px-1 group cursor-pointer hover:bg-white"
                    asChild
                    onClick={(event) => {
                      event.preventDefault()
                      navigate(url)
                    }}
                  >
                    <div className="py-2 flex items-center gap-2 w-full">
                      <IconComponent className="w-5 h-5  group-hover:text-foreground" />
                      <span className="capitalize text-xs flex items-center justify-between flex-1 group-hover:text-foreground">
                        {label}
                      </span>
                    </div>
                  </DropdownMenuItem>
                )}
              </>
            )
          })}
        </DropdownMenuGroup>

        <SignOutButton className="bg-destructive pl-4" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
