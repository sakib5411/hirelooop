"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type Mode = "signin" | "signup"

const inputClass =
  "h-11 w-full rounded-lg border border-white/10 bg-[#101010] px-4 text-base text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#5c53fe] focus:ring-2 focus:ring-[#5c53fe]/40"

function Field({
  label,
  id,
  name,
  type,
  placeholder,
  autoComplete,
}: {
  label: string
  id: string
  name: string
  type: string
  placeholder: string
  autoComplete: string
}) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label htmlFor={id} className="text-sm text-[#ededef]/80">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  )
}

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<string | null>(null)

  const isSignIn = mode === "signin"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    const email = String(data.email ?? "")
    const password = String(data.password ?? "")

    setPending(true)
    setError(null)

    try {
      if (isSignIn) {
        const { error } = await authClient.signIn.email({ email, password })
        if (error) {
          setError(error.message ?? "Sign in failed. Please try again.")
          return
        }
        setSubmitted(`Signed in as ${email}. Redirecting...`)
        router.push("/dashboard/seeker")
      } else {
        const { error } = await authClient.signUp.email({
          email,
          password,
          name: String(data.name ?? ""),
        })
        if (error) {
          setError(error.message ?? "Sign up failed. Please try again.")
          return
        }
        setSubmitted(`Account created for ${email}. Redirecting...`)
        router.push("/dashboard/seeker")
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#141418] px-4 py-16">
      {/* Decorative gradient glows from the design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-[-15%] size-[640px] opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(92,83,254,0.4), rgba(92,83,254,0.1) 55%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 left-[-20%] size-[560px] opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(220,2,206,0.22), rgba(220,2,206,0.07) 55%, transparent)",
        }}
      />
      <div className="relative z-10 w-full max-w-md">
        {/* Mode toggle */}
        <div
          className="mb-8 flex items-center gap-1 rounded-full border border-white/10 bg-[#1a1a1f] p-1"
          role="tablist"
          aria-label="Authentication mode"
        >
          <Link
            href="/sign-in"
            role="tab"
            aria-selected={isSignIn}
            className={cn(
              "flex h-9 flex-1 items-center justify-center rounded-full text-sm font-semibold transition-colors",
              isSignIn
                ? "bg-[#5c53fe] text-white"
                : "text-[#ededef]/60 hover:text-white"
            )}
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            role="tab"
            aria-selected={!isSignIn}
            className={cn(
              "flex h-9 flex-1 items-center justify-center rounded-full text-sm font-semibold transition-colors",
              !isSignIn
                ? "bg-[#5c53fe] text-white"
                : "text-[#ededef]/60 hover:text-white"
            )}
          >
            Sign Up
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-white/10 bg-[#1a1a1f] p-6 md:p-8">
          <h1 className="font-[family-name:var(--font-manrope)] text-2xl font-bold text-white">
            {isSignIn ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-[#ededef]/70">
            {isSignIn
              ? "Sign in to continue to your HireLoop account."
              : "Join HireLoop and find your dream job today."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {!isSignIn && (
              <Field
                label="Full name"
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
              />
            )}
            <Field
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
            <Field
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete={isSignIn ? "current-password" : "new-password"}
            />

            {isSignIn && (
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm text-[#645bff] transition-colors hover:text-[#8b85ff]"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-[#5c53fe] text-base font-semibold text-white transition-colors hover:bg-[#6a62ff] disabled:pointer-events-none disabled:opacity-60"
            >
              {pending
                ? isSignIn
                  ? "Signing in..."
                  : "Creating account..."
                : isSignIn
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </p>
          )}

          {submitted && (
            <p
              role="status"
              className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#ededef]/90"
            >
              {submitted} <span className="text-[#ededef]/50">(logged to console)</span>
            </p>
          )}

          <p className="mt-6 text-center text-sm text-[#ededef]/70">
            {isSignIn ? "New to HireLoop? " : "Already have an account? "}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="font-semibold text-[#645bff] transition-colors hover:text-[#8b85ff]"
            >
              {isSignIn ? "Create an account" : "Sign In"}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
