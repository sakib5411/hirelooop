import { JobPostForm } from "@/components/recruiter/job-post-form"

export const metadata = {
  title: "Add Job | HireLoop",
}

export default function AddJobPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium leading-4">
        <span className="text-[#a0a0ab]">Manage Jobs</span>
        <span className="text-[#5a5a60]">/</span>
        <span className="text-[#c3c0ff]">Create New Listing</span>
      </nav>

      <div className="flex flex-col gap-1">
        <h1 className="text-[32px] font-medium leading-[42px] text-white">
          Post a New Job
        </h1>
        <p className="text-[13px] leading-5 text-[#a0a0ab]">
          Fill in the position specifications to attract qualified talent across
          the HireLoop network.
        </p>
      </div>

      <JobPostForm mode="create" />
    </div>
  )
}
