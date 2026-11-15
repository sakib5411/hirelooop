import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Sign up | HireLoop",
  description:
    "create a hireloop account and get matched with world class companies.",
}

export default function SignUpPage() {
  return <AuthForm mode="signup" />
}
