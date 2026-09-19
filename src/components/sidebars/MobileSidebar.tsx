import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import { X } from 'lucide-react'
import { user } from '@/utils/database'
import { Link, NavLink } from 'react-router-dom'
import { sidebarAboutUs, sidebarMobileGeneral } from '@/assets/data'
import SignOutButton from '../buttons/SignOutButton'
import { useSelector } from 'react-redux'

export default function MobileSidebar() {
  const { avatar }: { avatar: string } = useSelector(
    (state: any) => state.userState,
  )
  const is_active = navigator.onLine
  return (
    <Sidebar>
      <SidebarHeader className="border-b py-1.5 gap-0.5">
        <div className="flex items-start justify-between ">
          <ProfileImage size="size-10" is_active={is_active} avatar={avatar} />
          <SidebarTrigger
            size="icon"
            variant="outline"
            className="rounded-full"
          >
            <X />
          </SidebarTrigger>
        </div>
        <div>
          <span className="font-bold text-lg block">
            {user?.firstName} {user?.lastName}
          </span>
          <Link
            to="/customer/profile"
            className="capitalize text-primary underline text-xs block"
          >
            view profile
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-0 text-base text-primary">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent className="-mt-1">
            <SidebarMenu className="space-y-0.5">
              {sidebarMobileGeneral.map(({ icon, label, url }) => {
                const IconComponent = icon
                return (
                  <SidebarMenuItem key={label}>
                    <NavLink
                      to={url}
                      className="py-1 px-0 flex items-center gap-2"
                    >
                      <IconComponent strokeWidth={1.5} className="w-5 h-5 " />
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
        <SidebarGroup>
          <SidebarGroupLabel className="px-0 text-base text-primary">
            About Us
          </SidebarGroupLabel>
          <SidebarGroupContent className="-mt-1">
            <SidebarMenu className="space-y-0.5">
              {sidebarAboutUs.map(({ icon, label, url }) => {
                const IconComponent = icon
                return (
                  <SidebarMenuItem key={label}>
                    {label == 'helpline number' ? (
                      <a
                        href={url}
                        className="py-1 px-0 flex items-center gap-2"
                      >
                        <IconComponent
                          strokeWidth={1.5}
                          className="w-5 h-5 p-0.5 "
                        />
                        <span className="capitalize text-xs flex items-center justify-between flex-1 ">
                          {label}
                        </span>
                      </a>
                    ) : (
                      <NavLink
                        to={url}
                        className="py-1 px-0 flex items-center gap-2"
                      >
                        <IconComponent
                          strokeWidth={1.5}
                          className="w-5 h-5 p-0.5 "
                        />
                        <span className="capitalize text-xs flex items-center justify-between flex-1 ">
                          {label}
                        </span>
                      </NavLink>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton className=" text-destructive" />
      </SidebarFooter>
    </Sidebar>
  )
}
