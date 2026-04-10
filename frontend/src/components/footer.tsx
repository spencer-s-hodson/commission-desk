import { cn } from "@/lib/utils"

const footerLinkClass =
  "text-muted-foreground hover:text-foreground text-sm transition-colors"

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "border-border bg-background mt-auto shrink-0 border-t",
        className
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-muted-foreground text-center text-sm sm:text-left">
          © {new Date().getFullYear()} CommissionDesk. All rights reserved.
        </p>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          aria-label="Footer"
        >
          <a href="#features" className={footerLinkClass}>
            Features
          </a>
          <a href="#about" className={footerLinkClass}>
            About
          </a>
          <a href="#pricing" className={footerLinkClass}>
            Pricing
          </a>
        </nav>
      </div>
    </footer>
  )
}
