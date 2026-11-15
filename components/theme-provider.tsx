"use client"

import * as React from "react"
import { InlineScript } from "@/components/inline-script"

type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "theme"

// Runs synchronously during HTML parsing on hard navigations, so the correct
// theme class is on <html> before the first paint (no flash).
// https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);var c=document.documentElement.classList;d?c.add("dark"):c.remove("dark")}catch(e){}})()`

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function getStoredTheme(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === "light" || value === "dark" || value === "system") {
      return value
    }
  } catch {}
  return "system"
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme !== "system") {
    return theme
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function applyTheme(theme: Theme): "light" | "dark" {
  const resolved = resolveTheme(theme)
  document.documentElement.classList.toggle("dark", resolved === "dark")
  return resolved
}

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: "light" | "dark"
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

function ThemeProvider({ children }: { children?: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() =>
    typeof window === "undefined" ? "system" : getStoredTheme()
  )
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(() =>
    typeof window === "undefined" ? "light" : applyTheme(getStoredTheme())
  )

  // Strict Mode remounts reset <html>'s classes, and client-side navigations
  // skip the inline script — so re-apply the theme on the client.
  React.useLayoutEffect(() => {
    setResolvedTheme(applyTheme(theme))
  }, [theme])

  React.useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    function onSystemChange() {
      setResolvedTheme(applyTheme(getStoredTheme()))
    }

    media.addEventListener("change", onSystemChange)

    return () => {
      media.removeEventListener("change", onSystemChange)
    }
  }, [])

  const setTheme = React.useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    setThemeState(next)
    setResolvedTheme(applyTheme(next))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      <InlineScript html={THEME_SCRIPT} />
      <ThemeHotkey />
      {children}
    </ThemeContext.Provider>
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider, ThemeHotkey, useTheme }
