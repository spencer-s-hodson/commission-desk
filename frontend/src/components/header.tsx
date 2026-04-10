import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinkClass =
  "text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "border-border bg-background shrink-0 border-b",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="text-foreground text-base font-semibold tracking-tight"
        >
          CommissionDesk
        </Link>
        <nav
          className="hidden items-center gap-6 sm:flex"
          aria-label="Primary"
        >
          <a href="#features" className={navLinkClass}>
            Features
          </a>
          <a href="#about" className={navLinkClass}>
            About
          </a>
          <a href="#pricing" className={navLinkClass}>
            Pricing
          </a>
        </nav>
        <Button asChild size="default">
          <Link to="/signup">Sign up</Link>
        </Button>
      </div>
    </header>
  )
}
