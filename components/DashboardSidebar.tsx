"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Shield,
  Building2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "@/lib/auth-client"

const menuItemsByRole = {
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { id: "applications", name: "My Applications", url: "/dashboard/seeker/applications", icon: FileText },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { id: "jobs", name: "My Jobs", url: "/dashboard/recruiter", icon: Briefcase },
    { id: "applicants", name: "Applicants", url: "/dashboard/recruiter", icon: Users },
  ],
  admin: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: "companies", name: "Companies", url: "/dashboard/admin", icon: Building2 },
    { id: "users", name: "Users", url: "/dashboard/admin", icon: Users },
    { id: "moderation", name: "Moderation", url: "/dashboard/admin", icon: Shield },
  ],
} as const

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const role = session?.user?.role ?? "seeker"

  const items =
    menuItemsByRole[role as keyof typeof menuItemsByRole] ?? menuItemsByRole.seeker

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {isPending ? "Loading..." : `${role} menu`}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isPending
                ? Array.from({ length: 3 }).map((_, i) => (
                    <SidebarMenuItem key={i}>
                      <Skeleton className="h-8 w-full" />
                    </SidebarMenuItem>
                  ))
                : items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton render={<Link href={item.url} />}>
                        <item.icon />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
