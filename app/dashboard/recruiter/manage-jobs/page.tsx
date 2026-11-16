import Link from "next/link"
import {
  Briefcase,
  ChevronRight,
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"

const jobs = [
  {
    title: "Frontend Developer",
    dept: "Engineering",
    deptColor: "text-[#38bdf8]",
    company: "HirePulse Network",
    location: "Remote (New York, USA)",
    type: "Full-time",
    compensation: "€25 – €40 / hr",
    applicants: 34,
    status: "Active",
    deadline: "May 30, 2025",
    posted: "Posted 4d ago",
  },
  {
    title: "Senior Product Designer",
    dept: "Design",
    deptColor: "text-[#f97316]",
    company: "HirePulse Labs",
    location: "London, UK (Hybrid)",
    type: "Full-time",
    compensation: "€90k – €115k / yr",
    applicants: 19,
    status: "Active",
    deadline: "Jun 14, 2025",
    posted: "Posted 1w ago",
  },
  {
    title: "DevOps Specialist",
    dept: "Infrastructure",
    deptColor: "text-[#38bdf8]",
    company: "HirePulse Platform",
    location: "Berlin, Germany",
    type: "Full-time",
    compensation: "€95k – €120k / yr",
    applicants: 12,
    status: "Active",
    deadline: "Jun 30, 2025",
    posted: "Posted 2w ago",
  },
  {
    title: "Product Marketing Lead",
    dept: "Marketing",
    deptColor: "text-[#c3c0ff]",
    company: "HirePulse Network",
    location: "Remote (EU/US)",
    type: "Full-time",
    compensation: "€80k – €105k / yr",
    applicants: 27,
    status: "Active",
    deadline: "Jul 15, 2025",
    posted: "Posted 5d ago",
  },
  {
    title: "QA Automation Engineer",
    dept: "Quality",
    deptColor: "text-[#c7d2fe]",
    company: "HirePulse Platform",
    location: "Dublin, Ireland (Hybrid)",
    type: "Part-time",
    compensation: "€35 – €50 / hr",
    applicants: 8,
    status: "Expired",
    deadline: "May 01, 2025",
    posted: "Closed",
  },
]

const headers = [
  "Job Title & Dept",
  "Company & Location",
  "Type",
  "Compensation",
  "Applicants",
  "Status",
  "Deadline",
  "Actions",
]

export default function ManageJobsPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] leading-5">
        <span className="text-[#a0a0ab]">Manage Jobs</span>
        <ChevronRight className="size-3 text-[#a0a0ab]" />
        <span className="font-medium text-[#c3c0ff]">Job Listings &amp; Postings</span>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-medium leading-[42px] text-white">
            Manage Job Posts
          </h1>
          <p className="text-sm leading-[22px] text-[#a0a0ab]">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/add-job"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#5c53fe] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#6a62ff]"
        >
          <span className="text-base leading-none">+</span> New Job Post
        </Link>
      </div>

      {/* Postings table */}
      <div className="overflow-hidden rounded-[14px] border border-[#232327] bg-[#151516]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="bg-[#0b0b0c]">
                {headers.map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase leading-[22px] text-[#a0a0ab]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => {
                const active = j.status === "Active"
                return (
                  <tr key={j.title} className="border-t border-[#232327]">
                    {/* Title & dept */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#232327]">
                          <Briefcase className="size-5 text-[#5c53fe]" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold leading-5 text-white">
                            {j.title}
                          </p>
                          <p
                            className={cn(
                              "text-[11px] font-medium leading-5",
                              j.deptColor
                            )}
                          >
                            {j.dept}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Company & location */}
                    <td className="px-6 py-4">
                      <p className="text-[13px] font-medium leading-5 text-white">
                        {j.company}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs leading-5 text-[#a0a0ab]">
                        <MapPin className="size-3.5" />
                        {j.location}
                      </p>
                    </td>
                    {/* Type */}
                    <td className="px-6 py-4">
                      <span className="inline-flex h-[30px] items-center rounded-[10px] border border-[#232327] bg-[#1f1f1f] px-3 text-[11px] font-medium leading-5 text-[#d4d4d8]">
                        {j.type}
                      </span>
                    </td>
                    {/* Compensation */}
                    <td className="px-6 py-4 text-[13px] font-medium leading-5 text-white">
                      {j.compensation}
                    </td>
                    {/* Applicants */}
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "flex items-center gap-2 text-[13px] font-semibold leading-5",
                          active ? "text-[#c3c0ff]" : "text-[#d4d4d8]"
                        )}
                      >
                        <Users className="size-[22px]" />
                        {j.applicants} Candidates
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex h-7 items-center gap-2 rounded-full px-3 text-[11px] font-medium leading-5",
                          active ? "bg-[#14532d] text-[#4ade80]" : "bg-[#1f1f1f] text-[#a0a0ab]"
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            active ? "bg-[#4ade80]" : "bg-[#5a5a60]"
                          )}
                        />
                        {j.status}
                      </span>
                    </td>
                    {/* Deadline */}
                    <td className="px-6 py-4">
                      <p
                        className={cn(
                          "text-[13px] font-medium leading-5",
                          active ? "text-white" : "text-[#a0a0ab]"
                        )}
                      >
                        {j.deadline}
                      </p>
                      <p className="text-[11px] leading-5 text-[#5a5a60]">{j.posted}</p>
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href="/dashboard/recruiter/manage-jobs/update"
                          className="inline-flex h-8 items-center justify-center gap-2 rounded-[10px] bg-[#5c53fe]/20 px-3 text-xs font-medium text-[#c3c0ff] transition-colors hover:bg-[#5c53fe]/30"
                        >
                          <Pencil className="size-4" />
                          Update
                        </Link>
                        <button
                          type="button"
                          aria-label={`Delete ${j.title}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#1f1f1f] text-[#a0a0ab] hover:bg-[#232327]"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`More options for ${j.title}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-[#a1a4aa] hover:bg-[#232327]"
                        >
                          <MoreVertical className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
