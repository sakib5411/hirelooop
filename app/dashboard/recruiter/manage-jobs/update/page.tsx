import { ChevronRight } from "lucide-react"

import { JobPostForm } from "@/components/recruiter/job-post-form"

export const metadata = {
  title: "Update Job Post | HireLoop",
}

export default function UpdateJobPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] leading-5">
        <span className="text-[#a0a0ab]">Manage Jobs</span>
        <ChevronRight className="size-3 text-[#5a5a60]" />
        <span className="text-[#a0a0ab]">Job Listings &amp; Postings</span>
        <ChevronRight className="size-3 text-[#5a5a60]" />
        <span className="font-medium text-white">Update Job Post</span>
      </nav>

      <div className="flex flex-col gap-1">
        <h1 className="text-[32px] font-semibold leading-[42px] text-white">
          Update Job Post
        </h1>
        <p className="text-sm leading-[22px] text-[#a0a0ab]">
          Modify position specifications, compensation range, and candidate
          requirements.
        </p>
      </div>

      <JobPostForm mode="edit" />
    </div>
  )
}
