import { useCallback, useEffect, useState } from "react"
import { Building2, CalendarClock } from "lucide-react"

import { type Carrier, fetchCarriers } from "@/api/carriers"
import { CrudLayout } from "@/components/layouts/crud-layout"
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

function CarrierCardSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader className="border-b pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full max-w-[220px]" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Skeleton className="h-4 w-56" />
      </CardContent>
    </Card>
  )
}

export default function CarriersPage() {
  const [carriers, setCarriers] = useState<Carrier[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadCarriers = useCallback(() => {
    void fetchCarriers()
      .then((data) => {
        setError(null)
        setCarriers(data)
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to load carriers")
      })
  }, [])

  useEffect(() => {
    loadCarriers()
  }, [loadCarriers])

  const loading = carriers === null && error === null

  return (
    <CrudLayout
      title="Carriers"
      description="Carrier directory from GET /api/carriers."
      resource="carrier"
      onCreated={loadCarriers}
    >
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }, (_, i) => (
                <CarrierCardSkeleton key={i} />
              ))
            : null}
          {!loading && carriers?.length === 0 ? (
            <p className="text-muted-foreground col-span-full text-sm">
              No carriers returned.
            </p>
          ) : null}
          {!loading && carriers && carriers.length > 0
            ? carriers.map((carrier) => (
                <Card key={carrier.id} className="@container/card">
                  <CardHeader className="border-b pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div
                          className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-border"
                          aria-hidden
                        >
                          <Building2 className="size-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <CardTitle className="truncate">{carrier.name}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            Description placeholder
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">carrier</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 text-muted-foreground">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarClock className="size-4 shrink-0" aria-hidden />
                      <span className="tabular-nums">
                        Updated {formatInstant(carrier.updatedAt)}
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
