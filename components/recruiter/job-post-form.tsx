"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, ChevronDown, MapPin, Plus, Users } from "lucide-react"

import { cn } from "@/lib/utils"

type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

const jobTypes: JobType[] = ["Full-time", "Part-time", "Contract", "Internship"]

const defaultValues = {
  jobTitle: "",
  companyName: "",
  category: "",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  qualifications: "",
}

// Values shown as placeholders in the Figma design
const figmaPreview = {
  ...defaultValues,
  jobTitle: "Frontend Developer",
  companyName: "HirePulse Network",
  category: "Engineering & Tech",
  isRemote: true,
  location: "New York, USA",
  deadline: "05/30/2025",
  minSalary: "25",
  maxSalary: "40",
  frequency: "per hour",
  responsibilities:
    "Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products.",
  qualifications:
    "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers",
}

const inputClass =
  "h-11 w-full rounded-[10px] bg-[#1e1e21] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/60 focus:border-[#5c53fe] focus:ring-2 focus:ring-[#5c53fe]/30"

function SectionHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="size-2 rounded-full bg-[#5c53fe]" />
      <h2 className="text-base font-medium leading-6 text-white">{`${step}. ${title}`}</h2>
    </div>
  )
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-[18px] text-[#f4f4f5]">
      {children}
    </label>
  )
}

export function JobPostForm({
  mode,
  jobId,
}: {
  mode: "create" | "edit"
  jobId?: string
}) {
  const router = useRouter()
  const [values, setValues] = useState(
    mode === "edit" ? figmaPreview : defaultValues
  )
  const [jobType, setJobType] = useState<JobType>("Full-time")

  function set<K extends keyof typeof values>(key: K, v: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: v }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Backend integration comes later — for now the form only collects data.
    console.log(`[JobPostForm:${mode}]`, { ...values, jobType, jobId })
    router.push("/dashboard/recruiter/manage-jobs")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Section 1 — Basic Information */}
      <section className="flex flex-col gap-6 rounded-[14px] bg-[#151516] p-6">
        <SectionHeading step={1} title="Basic Information" />

        <div className="flex flex-col gap-2">
          <Label htmlFor="jobTitle">Job Title *</Label>
          <input
            id="jobTitle"
            name="jobTitle"
            value={values.jobTitle}
            onChange={(e) => set("jobTitle", e.target.value)}
            placeholder="Frontend Developer"
            className={inputClass}
            required
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <div className="relative">
              <input
                id="companyName"
                name="companyName"
                value={values.companyName}
                onChange={(e) => set("companyName", e.target.value)}
                placeholder="HirePulse Network"
                className={cn(inputClass, "pr-11")}
                required
              />
              <Building2 className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#a0a0ab]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Job Category *</Label>
            <div className="relative">
              <input
                id="category"
                name="category"
                value={values.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="Engineering & Tech"
                className={cn(inputClass, "appearance-none pr-11")}
                required
              />
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#a0a0ab]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Job Type *</Label>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {jobTypes.map((t) => {
              const active = jobType === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setJobType(t)}
                  className={cn(
                    "h-11 rounded-[10px] text-sm transition-colors",
                    active
                      ? "border border-[#5c53fe] bg-[#232327] font-medium text-white"
                      : "bg-[#1e1e21] text-[#a0a0ab] hover:text-white"
                  )}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 2 — Location, Compensation & Timeline */}
      <section className="flex flex-col gap-6 rounded-[14px] bg-[#151516] p-6">
        <SectionHeading step={2} title="Location, Compensation & Timeline" />

        <div className="flex items-center justify-between gap-6 rounded-[10px] border border-[#232327] bg-[#1e1e21] px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#232327]">
              <Users className="size-5 text-[#c3c0ff]" />
            </span>
            <div>
              <p className="text-sm font-medium leading-[18px] text-white">
                Remote Work Allowed (isRemote)
              </p>
              <p className="text-[13px] leading-5 text-[#a0a0ab]">
                Enable worldwide or distributed candidate applications
              </p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={values.isRemote}
            onClick={() => set("isRemote", !values.isRemote)}
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition-colors",
              values.isRemote ? "bg-[#5c53fe]" : "bg-[#1f1f1f]"
            )}
          >
            <span
              className={cn(
                "absolute top-1 size-4 rounded-full bg-white transition-all",
                values.isRemote ? "left-6" : "left-1"
              )}
            />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="location">Job Location (location)</Label>
              <span className="text-xs font-medium leading-4 text-[#5a5a60]">Required</span>
            </div>
            <div className="relative">
              <input
                id="location"
                name="location"
                value={values.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="New York, USA"
                className={cn(inputClass, "pr-11")}
                required
              />
              <MapPin className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#a0a0ab]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="deadline">Application Deadline (deadline)</Label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              value={values.deadline}
              onChange={(e) => set("deadline", e.target.value)}
              placeholder="05/30/2025"
              className={cn(inputClass, "[color-scheme:dark]")}
              required
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="minSalary">Min Salary / Rate</Label>
            <input
              id="minSalary"
              name="minSalary"
              type="number"
              min="0"
              value={values.minSalary}
              onChange={(e) => set("minSalary", e.target.value)}
              placeholder="25"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="maxSalary">Max Salary / Rate</Label>
            <input
              id="maxSalary"
              name="maxSalary"
              type="number"
              min="0"
              value={values.maxSalary}
              onChange={(e) => set("maxSalary", e.target.value)}
              placeholder="40"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="frequency">Frequency</Label>
            <div className="relative">
              <select
                id="frequency"
                name="frequency"
                value={values.frequency}
                onChange={(e) => set("frequency", e.target.value)}
                className={cn(inputClass, "appearance-none pr-11")}
              >
                <option value="per hour">per hour</option>
                <option value="per day">per day</option>
                <option value="per month">per month</option>
                <option value="per year">per year</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#a0a0ab]" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Responsibilities & Requirements */}
      <section className="flex flex-col gap-6 rounded-[14px] bg-[#151516] p-6">
        <SectionHeading step={3} title="Responsibilities & Requirements" />

        <div className="flex flex-col gap-2">
          <Label htmlFor="responsibilities">Key Responsibilities *</Label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            rows={4}
            value={values.responsibilities}
            onChange={(e) => set("responsibilities", e.target.value)}
            className="w-full rounded-[10px] bg-[#1e1e21] px-4 py-3 text-sm leading-[22px] text-[#f4f4f5] outline-none transition-colors placeholder:text-white/40 focus:border-[#5c53fe] focus:ring-2 focus:ring-[#5c53fe]/30"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="qualifications">Qualifications &amp; Requirements *</Label>
          <textarea
            id="qualifications"
            name="qualifications"
            rows={4}
            value={values.qualifications}
            onChange={(e) => set("qualifications", e.target.value)}
            className="w-full rounded-[10px] bg-[#1e1e21] px-4 py-3 text-sm leading-[22px] text-[#f4f4f5] outline-none transition-colors placeholder:text-white/40 focus:border-[#5c53fe] focus:ring-2 focus:ring-[#5c53fe]/30"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/dashboard/recruiter/manage-jobs"
            className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#1e1e21] px-5 text-sm font-medium text-[#a0a0ab] hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-[#5c53fe] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#6a62ff]"
          >
            <Plus className="size-4" />
            {mode === "create" ? "Publish Job" : "Save Changes"}
          </button>
        </div>
      </section>
    </form>
  )
}
