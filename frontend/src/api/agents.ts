import type { Agent } from "@/types"

function apiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
}

export async function fetchAgents(): Promise<Agent[]> {
  const res = await fetch(`${apiBaseUrl()}/api/agents`)
  if (!res.ok) {
    throw new Error(`Failed to load agents (${res.status})`)
  }
  return res.json() as Promise<Agent[]>
}

export type AgentCreateBody = {
  name: string
  email: string
  phone: string
  npn: number
  active?: boolean
  agentTypeIds?: string[]
}

export async function createAgent(body: AgentCreateBody): Promise<Agent> {
  const res = await fetch(`${apiBaseUrl()}/api/agents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(
      detail || `Failed to create agent (${res.status})`
    )
  }
  return res.json() as Promise<Agent>
}
