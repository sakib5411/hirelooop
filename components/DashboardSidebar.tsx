"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Building2,
  Bookmark,
  CreditCard,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react"

import logo from "@/app/assets/logo.png"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { signOut, useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const menuItemsByRole = {
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { id: "jobs", name: "Browse Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { id: "saved", name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { id: "applications", name: "My Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { id: "billing", name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { id: "company", name: "My Company", url: "/dashboard/recruiter/my-company", icon: Building2 },
    { id: "jobs", name: "Manage Jobs", url: "/dashboard/recruiter/manage-jobs", icon: Briefcase },
    { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
    { id: "companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { id: "jobs", name: "Manage Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { id: "payments", name: "Payments", url: "/dashboard/admin/payments", icon: Wallet },
    { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
} as const

function IdentityCard({
  name,
  role,
  pending,
}: {
  name: string
  role: string
  pending: boolean
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  if (pending) {
    return (
      <div className="flex items-center gap-3 rounded-[8px] border border-[#090a15] bg-[#1a1a1f] p-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-[8px] border border-[#090a15] bg-[#1a1a1f] p-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5c53fe] text-sm font-semibold text-white">
        {initials || "U"}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#ededef]">{name}</p>
        <span className="mt-1 inline-block rounded-full bg-[#5c53fe]/20 px-2 py-0.5 text-[11px] font-medium capitalize text-[#a39dff]">
          {role} account
        </span>
      </div>
    </div>
  )
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()
  const role = session?.user?.role ?? "seeker"

  const items =
    menuItemsByRole[role as keyof typeof menuItemsByRole] ?? menuItemsByRole.seeker

  async function handleSignOut() {
    await signOut()
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-2 py-2">
          <Image src={logo} alt="Hireloop" className="h-9 w-auto" />
        </div>
        <div className="px-2 pb-2">
          <IdentityCard
            pending={isPending}
            name={session?.user?.name ?? ""}
            role={role}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {isPending
                ? Array.from({ length: 5 }).map((_, i) => (
                    <SidebarMenuItem key={i}>
                      <Skeleton className="h-8 w-full" />
                    </SidebarMenuItem>
                  ))
                : items.map((item) => {
                    const active =
                      pathname === item.url ||
                      (item.url !== `/dashboard/${role}` && pathname.startsWith(item.url))
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          render={<Link href={item.url} />}
                          isActive={active}
                          className={cn(
                            "text-base text-sidebar-foreground/80 hover:text-sidebar-foreground data-[active=true]:text-[#a39dff]"
                          )}
                        >
                          <item.icon className="!size-4" />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-base text-sidebar-foreground/80 hover:text-sidebar-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="!size-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
