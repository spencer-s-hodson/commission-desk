import { useCallback, useEffect, useState } from "react"
import {
  Building2,
  CalendarDays,
  FileText,
  UserRound,
} from "lucide-react"

import { fetchAgents } from "@/api/agents"
import { fetchCarriers } from "@/api/carriers"
import { type Policy, fetchPolicies } from "@/api/policies"
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

function policyStatusVariant(
  active: boolean
): "default" | "secondary" {
  return active ? "default" : "secondary"
}

function formatEffectiveDate(iso: string): string {
  const d = new Date(iso + "T12:00:00")
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(d)
}

function PolicyCardSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader className="border-b pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-4 w-full max-w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <Skeleton className="h-4 w-full max-w-xs" />
        <Skeleton className="h-4 w-full max-w-sm" />
        <Skeleton className="h-4 w-full max-w-sm" />
        <Skeleton className="h-4 w-48" />
      </CardContent>
    </Card>
  )
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[] | null>(null)
  const [agentNameById, setAgentNameById] = useState<Map<string, string>>(
    () => new Map()
  )
  const [carrierNameById, setCarrierNameById] = useState<Map<string, string>>(
    () => new Map()
  )
  const [error, setError] = useState<string | null>(null)

  const loadPoliciesPage = useCallback(() => {
    void Promise.all([fetchPolicies(), fetchAgents(), fetchCarriers()])
      .then(([policyRows, agents, carriers]) => {
        setError(null)
        setPolicies(policyRows)
        setAgentNameById(new Map(agents.map((a) => [a.id, a.fullName])))
        setCarrierNameById(new Map(carriers.map((c) => [c.id, c.name])))
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to load policies")
      })
  }, [])

  useEffect(() => {
    loadPoliciesPage()
  }, [loadPoliciesPage])

  const loading = policies === null && error === null

  return (
    <CrudLayout
      title="Policies"
      description="Policy register from GET /api/policies, with carrier and agent names resolved from the API."
      resource="policy"
      onCreated={loadPoliciesPage}
    >
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }, (_, i) => (
            <PolicyCardSkeleton key={i} />
          ))
          : null}
        {!loading && policies?.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-sm">
            No policies returned.
          </p>
        ) : null}
        {!loading && policies && policies.length > 0
          ? policies.map((policy) => {
            const statusLabel = policy.active ? "active" : "inactive"
            const carrierLabel =
              carrierNameById.get(policy.carrierId) ?? policy.carrierId
            const agentLabel =
              agentNameById.get(policy.agentId) ?? policy.agentId
            return (
              <Card key={policy.id} className="@container/card">
                <CardHeader className="border-b pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div
                        className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-border"
                        aria-hidden
                      >
                        <FileText className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <CardTitle className="truncate font-mono text-base tracking-tight">
                          {policy.policyNumber}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          Description placeholder
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={policyStatusVariant(policy.active)}>
                      {statusLabel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="size-4 shrink-0" aria-hidden />
                    <span className="min-w-0 truncate">
                      <span className="text-foreground">{carrierLabel}</span>

                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <UserRound className="size-4 shrink-0" aria-hidden />
                    <span className="min-w-0 truncate">
                      <span className="text-foreground">{agentLabel}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="size-4 shrink-0" aria-hidden />
                    <span className="tabular-nums">
                      Effective{" "}
                      <span className="text-foreground">
                        {formatEffectiveDate(policy.effectiveDate)}
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })
          : null}
      </div>
    </CrudLayout>
  )
}
