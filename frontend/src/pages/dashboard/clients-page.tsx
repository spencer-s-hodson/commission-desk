import { useCallback, useEffect, useState } from "react"
import { CalendarClock } from "lucide-react"

import { type Person, fetchPersons } from "@/api/persons"
import { CrudLayout } from "@/components/layouts/crud-layout"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function formatInstant(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d)
}

function initialsFromDisplayName(displayName: string): string {
  const parts = displayName.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]![0] : ""
  return (first + last).toUpperCase() || "?"
}

function ClientCardSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader className="border-b pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <Skeleton className="size-12 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-full max-w-[240px]" />
            </div>
          </div>
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Skeleton className="h-4 w-52" />
      </CardContent>
    </Card>
  )
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Person[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadClients = useCallback(() => {
    void fetchPersons()
      .then((data) => {
        setError(null)
        setClients(data)
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to load clients")
      })
  }, [])

  useEffect(() => {
    loadClients()
  }, [loadClients])

  const loading = clients === null && error === null

  return (
    <CrudLayout
      title="Clients"
      description="Client directory from GET /api/persons."
      resource="person"
      onCreated={loadClients}
    >
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }, (_, i) => (
                <ClientCardSkeleton key={i} />
              ))
            : null}
          {!loading && clients?.length === 0 ? (
            <p className="text-muted-foreground col-span-full text-sm">
              No clients returned.
            </p>
          ) : null}
          {!loading && clients && clients.length > 0
            ? clients.map((client) => (
                <Card key={client.id} className="@container/card">
                  <CardHeader className="border-b pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <Avatar
                          className="mt-0.5 size-12 ring-1 ring-border"
                          aria-hidden
                        >
                          <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                            {initialsFromDisplayName(client.displayName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1 space-y-1">
                          <CardTitle className="truncate">
                            {client.displayName}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            Description placeholder
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">client</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 text-muted-foreground">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarClock className="size-4 shrink-0" aria-hidden />
                      <span className="tabular-nums">
                        Updated {formatInstant(client.updatedAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            : null}
      </div>
    </CrudLayout>
  )
}
