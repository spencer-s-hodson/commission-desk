import * as React from "react"
import { Link } from "react-router-dom"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  AlertTriangleIcon,
  Building2Icon,
  CommandIcon,
  FileChartColumnIcon,
  GitMergeIcon,
  HistoryIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  ShieldIcon,
  TruckIcon,
  UploadIcon,
  UserCogIcon,
  UsersIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Spencer Hodson",
    email: "spencer.s.hodson@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  core: [
    {
      title: "Overview",
      url: "/overview",
      icon: <LayoutDashboardIcon />,
      comingSoon: true,
    },
    {
      title: "Policies",
      url: "/policies",
      icon: <ShieldIcon />,
    },
    {
      title: "Clients",
      url: "/clients",
      icon: <Building2Icon />,
    },
    {
      title: "Carriers",
      url: "/carriers",
      icon: <TruckIcon />,
    },
    {
      title: "Agents",
      url: "/agents",
      icon: <UsersIcon />,
    },
  ],
  commissions: [
    {
      title: "Upload Statement",
      url: "/commissions/upload-statement",
      icon: <UploadIcon />,
      comingSoon: true,
    },
    {
      title: "Reconciliation",
      url: "/commissions/reconciliation",
      icon: <GitMergeIcon />,
      comingSoon: true,
    },
    {
      title: "Gap Report",
      url: "/commissions/gap-report",
      icon: <AlertTriangleIcon />,
      comingSoon: true,
    },
  ],
  reports: [
    {
      title: "Agent Commission Report",
      url: "/reports/agent-commission",
      icon: <FileChartColumnIcon />,
      comingSoon: true,
    },
    {
      title: "Payment History",
      url: "/reports/payment-history",
      icon: <HistoryIcon />,
      comingSoon: true,
    },
  ],
  settings: [
    {
      title: "Agency Settings",
      url: "/settings/agency",
      icon: <Settings2Icon />,
      comingSoon: true,
    },
    {
      title: "User Management",
      url: "/settings/users",
      icon: <UserCogIcon />,
      comingSoon: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/overview">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">CommissionDesk</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.core} label="Core" />
        <NavSecondary items={data.commissions} label="Commissions" />
        <NavSecondary items={data.reports} label="Reports" />
        <NavSecondary
          items={data.settings}
          label="Settings"
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
