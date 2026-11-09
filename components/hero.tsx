import Link from "next/link"
import { Search, Sparkles, MapPin } from "lucide-react"

const trending = [
  { label: "Product Designer", href: "#" },
  { label: "AI Engineering", href: "#" },
  { label: "Dev-ops Engineer", href: "#" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#010103]">
      {/* Decorative gradient glows from the design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-[-15%] size-[720px] opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(92,83,254,0.5), rgba(92,83,254,0.12) 55%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 left-[-20%] size-[640px] opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(220,2,206,0.28), rgba(220,2,206,0.08) 55%, transparent)",
        }}
      />

      <div className="relative mx-auto flex max-w-[784px] flex-col items-center px-4 pt-16 pb-24 text-center md:pt-24 md:pb-28">
        {/* Badge */}
        <div className="flex w-full items-center justify-center gap-4">
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-r from-transparent to-white/30 md:block"
          />
          <div className="flex h-12 items-center gap-2.5 rounded-full border border-white/10 bg-gradient-to-b from-[#474747] to-[#010102] py-3 pr-5 pl-4">
            <Sparkles className="size-5 shrink-0 text-white" />
            <span className="font-[family-name:var(--font-space-mono)] text-sm whitespace-nowrap text-white md:text-[20px]">
              50,000+ new jobs this month
            </span>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-l from-transparent to-white/30 md:block"
          />
        </div>

        {/* Title */}
        <h1 className="mt-8 font-[family-name:var(--font-manrope)] text-4xl font-bold text-white md:text-[56px] md:leading-[1.15]">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 font-[family-name:var(--font-manrope)] text-lg text-white/80 md:mt-5 md:text-xl">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          action="/jobs"
          className="mt-12 flex w-full flex-col gap-2 rounded-2xl border border-white/5 bg-[#101010] p-2 md:flex-row md:items-center"
        >
          <div className="flex h-12 flex-1 items-center gap-3 px-4">
            <Search className="size-5 shrink-0 text-white/60" />
            <input
              type="search"
              name="q"
              placeholder="Job title, skill or company"
              className="h-full w-full bg-transparent text-base text-white outline-none placeholder:text-white/70"
            />
          </div>
          <span
            aria-hidden="true"
            className="hidden h-6 w-px shrink-0 bg-white/20 md:block"
          />
          <div className="flex h-12 flex-1 items-center gap-3 px-4">
            <MapPin className="size-5 shrink-0 text-white/60" />
            <input
              type="search"
              name="location"
              placeholder="Location or Remote"
              className="h-full w-full bg-transparent text-base text-white outline-none placeholder:text-white/70"
            />
          </div>
          <button
            type="submit"
            aria-label="Search jobs"
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#5c53fe] text-white transition-colors hover:bg-[#6a62ff]"
          >
            <Search className="size-5" />
          </button>
        </form>

        {/* Trending positions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <span className="font-[family-name:var(--font-manrope)] text-base text-white">
            Trending Position
          </span>
          {trending.map((tag) => (
            <Link
              key={tag.label}
              href={tag.href}
              className="rounded-full bg-[#1a1a1b] px-4 py-1.5 font-[family-name:var(--font-manrope)] text-sm text-white transition-colors hover:bg-white/10"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
