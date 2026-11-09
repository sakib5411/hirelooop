"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import logo from "@/app/assets/logo.png"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const links = [
  { label: "Browse Jobs", href: "#", active: true },
  { label: "Company", href: "#", active: false },
  { label: "Pricing", href: "#", active: false },
]

function Logo() {
  return (
    <Link href="/" className="shrink-0" aria-label="Hireloop home">
      <Image src={logo} alt="Hireloop" className="h-11 w-auto" priority />
    </Link>
  )
}

function NavLink({ label, href, active }: (typeof links)[number]) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-base leading-[1.8] text-[#ededef] transition-colors hover:text-white",
        active ? "font-bold" : "font-normal"
      )}
    >
      {label}
    </Link>
  )
}

function Actions() {
  return (
    <>
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href="#" />}
        className="h-9 rounded-[8px] px-4 text-lg font-bold text-[#645bff] hover:bg-white/5 hover:text-[#645bff] dark:hover:bg-white/5"
      >
        Sign In
      </Button>
      <Button
        nativeButton={false}
        render={<Link href="#" />}
        className="h-[52px] rounded-[8px] border border-[#090a15] bg-[#5c53fe] px-4 text-lg font-medium text-[#ededef] hover:bg-[#6a62ff]"
      >
        Get Started
      </Button>
    </>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/5 bg-[#141418]/90 backdrop-blur-sm"
      data-open={open}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between gap-4 px-4 lg:px-6">
        <Logo />

        {/* Desktop: pill nav */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-6 rounded-[8px] border border-white/15 bg-[#1a1a1f] py-2 pr-2 pl-6 md:flex"
        >
          <div className="flex items-center gap-5">
            {links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </div>
          <span aria-hidden="true" className="h-6 w-px bg-[#a8a8a8]/40" />
          <div className="flex items-center gap-4">
            <Actions />
          </div>
        </nav>

        {/* Mobile: hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="text-[#ededef] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main mobile"
          className="mx-4 mb-2 flex flex-col gap-1 rounded-[8px] border border-white/15 bg-[#1a1a1f] p-3 md:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-[8px] px-4 py-3 text-base text-[#ededef] transition-colors hover:bg-white/5",
                link.active
                  ? "bg-white/5 font-bold"
                  : "font-normal"
              )}
            >
              {link.label}
            </Link>
          ))}
          <span aria-hidden="true" className="h-px bg-[#a8a8a8]/40" />
          <div className="mt-2 flex flex-col gap-2">
            <Button
              nativeButton={false}
              render={<Link href="#" />}
              className="h-11 rounded-[8px] border border-[#090a15] bg-[#5c53fe] text-lg font-medium text-[#ededef] hover:bg-[#6a62ff]"
            >
              Get Started
            </Button>
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link href="#" />}
              className="h-10 rounded-[8px] text-lg font-bold text-[#645bff] hover:bg-white/5 hover:text-[#645bff] dark:hover:bg-white/5"
            >
              Sign In
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
