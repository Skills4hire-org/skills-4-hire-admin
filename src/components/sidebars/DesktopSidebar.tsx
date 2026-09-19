import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '../ui/sidebar'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  customerDesktopNavLinks,
  serviceProviderDesktopNavLinks,
} from '@/assets/data'
import CustomerDesktopMenu from './CustomerDesktopMenu'
import Logo from '../global/Logo'
import { getBasePath } from '@/utils/format'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import ProfileImage from '../global/ProfileImage'
import { Icon } from '@iconify/react'
import { useMyProfile } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'

export default function DesktopSidebar() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const { data } = useMyProfile()
  const user: Profile | undefined = data
  const avatar = user?.user?.profile?.avatar?.avatar
  const is_active = navigator.onLine
  const pathname = useLocation().pathname
  const basePath = getBasePath(pathname)

  const desktopNavLinks =
    userType == 'customer'
      ? customerDesktopNavLinks
      : serviceProviderDesktopNavLinks

  return (
    <Sidebar className="rounded-r-lg h-full border-none">
      <SidebarHeader className="mt-4 mb-2 px-0 flex-col items-center">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {desktopNavLinks.map(({ icon, label, url }) => {
                const active = url === basePath
                return (
                  <SidebarMenuItem key={label} className="group">
                    <NavLink
                      to={url}
                      className={`py-2 px-4 flex items-center transition duration-150 gap-2  ${
                        active
                          ? 'text-white border-l-2 border-white'
                          : 'text-white/60 hover:bg-background hover:text-foreground'
                      }`}
                    >
                      <Icon icon={icon} className="w-5 h-5 " />
                      <span className="capitalize text-xs flex items-center justify-between flex-1 ">
                        {label}
                      </span>
                    </NavLink>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-4 mt-2">
        {userType === 'customer' ? (
          <CustomerDesktopMenu />
        ) : (
          <Link to="/professional/profile" className="mx-auto">
            <ProfileImage is_active={is_active} avatar={avatar} />
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
