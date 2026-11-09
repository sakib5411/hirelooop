import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"

export default function Page() {
  return (
    <div className="bg-[#141418] text-[#ededef] min-h-svh">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
