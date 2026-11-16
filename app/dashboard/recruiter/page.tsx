import Link from "next/link"
import {
  FileText,
  Users,
  Zap,
  CheckCircle2,
  MoreHorizontal,
  Trash2,
  Pencil,
  Plus,
} from "lucide-react"

import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Job Posts", value: "48", icon: FileText },
  { label: "Total Applicants", value: "1,284", icon: Users },
  { label: "Active Jobs", value: "18", icon: Zap },
  { label: "Jobs Closed", value: "32", icon: CheckCircle2 },
]

const statusStyles: Record<string, string> = {
  Interviewing: "border-[#8f88ff] text-[#8f88ff]",
  New: "border-[#60a5fa] text-[#60a5fa]",
  Reviewing: "border-[#f59e0b] text-[#f59e0b]",
  Rejected: "border-[#ef4444] text-[#ef4444]",
}

const applications = [
  {
    name: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    name: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    name: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    name: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default function RecruiterDashboardPage() {
  return (
    <div className="relative flex min-h-full flex-col gap-8 p-8">
      <h1 className="text-[22px] font-semibold leading-7 text-[#ededef]">
        Welcome back, Alex Sterling
      </h1>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-4 rounded-[14px] bg-[#141418] p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#222228]">
              <s.icon className="size-5 text-[#e5e2e3]" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[13px] leading-5 text-[#a0a0ab]">{s.label}</p>
              <p className="text-[26px] font-semibold leading-8 text-[#ededef]">
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent applications */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-semibold leading-7 text-[#ededef]">
            Recent Applications
          </h2>
          <Link
            href="/dashboard/recruiter/applications"
            className="text-[13px] leading-5 text-[#ededef]/80 hover:text-[#ededef]"
          >
            View all
          </Link>
        </div>

        <div className="overflow-hidden rounded-[14px] bg-[#141418]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="bg-[#1a1a1f]">
                  {["Candidate Name", "Role", "Date Applied", "Experience", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-[15px] text-left text-[11px] font-medium uppercase leading-[14px] tracking-wide text-[#6e6e78]"
                      >
                        {h}
                      </th>
                    )
                  )}
                  <th className="w-16" aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.name} className="border-t border-white/5">
                    <td className="px-6 py-[15px]">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#222228] text-[11px] font-semibold text-[#a0a0ab]">
                          {initials(a.name)}
                        </span>
                        <span className="text-[13px] font-medium leading-5 text-[#ededef]">
                          {a.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-[15px] text-[13px] leading-5 text-[#a0a0ab]">
                      {a.role}
                    </td>
                    <td className="px-6 py-[15px] text-[13px] leading-5 text-[#a0a0ab]">
                      {a.date}
                    </td>
                    <td className="px-6 py-[15px] text-[13px] leading-5 text-[#a0a0ab]">
                      {a.experience}
                    </td>
                    <td className="px-6 py-[15px]">
                      <span
                        className={cn(
                          "inline-flex h-[22px] items-center rounded-full border px-3 text-xs font-medium leading-4",
                          statusStyles[a.status]
                        )}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-[15px] text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Update ${a.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#1f1f1f] text-[#a0a0ab] hover:bg-[#232327]"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Remove ${a.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#1f1f1f] text-[#a0a0ab] hover:bg-[#232327]"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`More options for ${a.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-[#a1a4aa] hover:bg-[#232327]"
                        >
                          <MoreHorizontal className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Floating action button — Create Job Post */}
      <Link
        href="/dashboard/recruiter/add-job"
        className="fixed bottom-8 right-8 z-40 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#f4f4f5]"
      >
        <Plus className="size-6 text-[#2f3131]" />
        <span className="sr-only">Create Job Post</span>
      </Link>
    </div>
  )
}
