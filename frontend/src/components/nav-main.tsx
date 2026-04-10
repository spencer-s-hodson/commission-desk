import * as React from "react"
import { NavLink, useMatch } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export type NavMainItemType = {
  title: string
  url: string
  icon?: React.ReactNode
  comingSoon?: boolean
}

function NavMainItem({ item }: { item: NavMainItemType }) {
  const match = useMatch({ path: item.url, end: true })
  if (item.comingSoon) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          disabled
          tooltip={`${item.title} (coming soon)`}
          className="cursor-not-allowed opacity-70"
        >
          {item.icon}
          <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
            <span className="truncate">{item.title}</span>
            <Badge variant="secondary" className="shrink-0 text-[10px] font-normal">
              Coming soon
            </Badge>
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }
  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={item.title} asChild isActive={!!match}>
        <NavLink to={item.url} end>
          {item.icon}
          <span>{item.title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function NavMain({
  items,
  label,
}: {
  items: NavMainItemType[]
  label?: string
}) {
  return (
    <SidebarGroup>
      {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <NavMainItem key={item.title} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
