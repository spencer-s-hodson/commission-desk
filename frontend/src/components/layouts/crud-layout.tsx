import { useState } from "react"
import { PlusIcon } from "lucide-react"

import { NewAgentForm } from "@/components/forms/new-agent-form"
import { NewCarrierForm } from "@/components/forms/new-carrier-form"
import { NewPersonForm } from "@/components/forms/new-person-form"
import { NewPolicyForm } from "@/components/forms/new-policy-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type CrudResource = "agent" | "carrier" | "policy" | "person"

const dialogCopy: Record<
  CrudResource,
  { title: string; description: string }
> = {
  agent: {
    title: "New agent",
    description: "Add an agent to the directory. They will appear in lists after you save.",
  },
  carrier: {
    title: "New carrier",
    description: "Create a carrier record for policies to reference.",
  },
  policy: {
    title: "New policy",
    description: "Link a policy to a carrier and agent.",
  },
  person: {
    title: "New client",
    description: "Add a person to the client directory.",
  },
}

export type CrudLayoutProps = {
  title: string
  description: string
  resource: CrudResource
  children: React.ReactNode
  onCreated?: () => void
}

export function CrudLayout({
  title,
  description,
  resource,
  children,
  onCreated,
}: CrudLayoutProps) {
  const [open, setOpen] = useState(false)
  const copy = dialogCopy[resource]

  function handleSuccess() {
    setOpen(false)
    onCreated?.()
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 lg:px-6 md:py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3 sm:gap-6">
            <h1 className="min-w-0 flex-1 text-2xl font-semibold tracking-tight">
              {title}
            </h1>
            <Button
              type="button"
              className="cursor-pointer shrink-0"
              onClick={() => setOpen(true)}
            >
              <PlusIcon />
              New
            </Button>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {children}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[min(90vh,640px)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription>{copy.description}</DialogDescription>
          </DialogHeader>
          {resource === "agent" ? (
            <NewAgentForm onSuccess={handleSuccess} />
          ) : null}
          {resource === "carrier" ? (
            <NewCarrierForm onSuccess={handleSuccess} />
          ) : null}
          {resource === "policy" ? (
            <NewPolicyForm onSuccess={handleSuccess} />
          ) : null}
          {resource === "person" ? (
            <NewPersonForm onSuccess={handleSuccess} />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
