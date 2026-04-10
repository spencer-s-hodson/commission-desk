import { useCallback, useEffect, useState } from "react"
import { Mail, Phone, Shield } from "lucide-react"

import { fetchAgents } from "@/api/agents"
import { CrudLayout } from "@/components/layouts/crud-layout"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { type Agent, type AgentStatus } from "@/types"

function statusBadgeVariant(status: AgentStatus): "default" | "secondary" {
  return status === "active" ? "default" : "secondary"
}

function initialsFromFullName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]![0] : ""
  return (first + last).toUpperCase()
}

function avatarImageUrl(agent: Agent): string {
  const seed = encodeURIComponent(agent.id)
  return `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${seed}`
}

function AgentCardSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader className="border-b pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <Skeleton className="size-14 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <Skeleton className="h-4 w-full max-w-xs" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-44" />
      </CardFooter>
    </Card>
  )
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadAgents = useCallback(() => {
    void fetchAgents()
      .then((data) => {
        setError(null)
        setAgents(data)
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to load agents")
      })
  }, [])

  useEffect(() => {
    loadAgents()
  }, [loadAgents])

  const loading = agents === null && error === null

  return (
    <CrudLayout
      title="Agents"
      description="Agent directory from GET /api/agents."
      resource="agent"
      onCreated={loadAgents}
    >
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }, (_, i) => (
            <AgentCardSkeleton key={i} />
          ))
          : null}
        {!loading && agents?.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-sm">
            No agents returned.
          </p>
        ) : null}
        {!loading && agents && agents.length > 0
          ? agents.map((agent) => (
            <Card key={agent.id} className="@container/card">
              <CardHeader className="border-b pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <Avatar
                      size="lg"
                      className="mt-0.5 ring-1 ring-border"
                      aria-hidden
                    >
                      <AvatarImage
                        src={avatarImageUrl(agent)}
                        alt=""
                      />
                      <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                        {initialsFromFullName(agent.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 space-y-1">
                      <CardTitle className="truncate">
                        {agent.fullName}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {agent.activePolicyCount} active{" "}
                        {agent.activePolicyCount === 1 ? "policy" : "policies"}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={statusBadgeVariant(agent.status)}>
                    {agent.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="size-4 shrink-0" aria-hidden />
                  <a
                    href={`mailto:${agent.email}`}
                    className="min-w-0 truncate text-foreground underline-offset-4 hover:underline"
                  >
                    {agent.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4 shrink-0" aria-hidden />
                  <span className="tabular-nums">{agent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="size-4 shrink-0" aria-hidden />
                  <span>
                    NPN{" "}
                    <span className="font-mono text-foreground">
                      {agent.npn}
                    </span>
                  </span>
                </div>
              </CardContent>
              <CardFooter className="text-muted-foreground flex flex-wrap gap-2">
                {(agent.types ?? []).length === 0 ? (
                  <span className="text-muted-foreground text-sm">
                    No lines assigned
                  </span>
                ) : (
                  (agent.types ?? []).map((t) => (
                    <Badge key={t.id}>
                      {t.name}
                    </Badge>
                  ))
                )}
              </CardFooter>
            </Card>
          ))
          : null}
      </div>
    </CrudLayout>
  )
}
