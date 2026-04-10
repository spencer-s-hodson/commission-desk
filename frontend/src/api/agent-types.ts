import type { AgentType } from "@/types"

function apiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
}

export async function fetchAgentTypes(): Promise<AgentType[]> {
  const res = await fetch(`${apiBaseUrl()}/api/agent-types`)
  if (!res.ok) {
    throw new Error(`Failed to load agent types (${res.status})`)
  }
  return res.json() as Promise<AgentType[]>
}
