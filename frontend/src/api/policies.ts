function apiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
}

export type Policy = {
  id: string
  carrierId: string
  agentId: string
  policyNumber: string
  effectiveDate: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export async function fetchPolicies(): Promise<Policy[]> {
  const res = await fetch(`${apiBaseUrl()}/api/policies`)
  if (!res.ok) {
    throw new Error(`Failed to load policies (${res.status})`)
  }
  return res.json() as Promise<Policy[]>
}

export type PolicyCreateBody = {
  carrierId: string
  agentId: string
  policyNumber: string
  effectiveDate: string
  active?: boolean
}

export async function createPolicy(body: PolicyCreateBody): Promise<Policy> {
  const res = await fetch(`${apiBaseUrl()}/api/policies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(
      detail || `Failed to create policy (${res.status})`
    )
  }
  return res.json() as Promise<Policy>
}
