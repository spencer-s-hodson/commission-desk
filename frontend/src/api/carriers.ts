function apiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
}

export type Carrier = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export async function fetchCarriers(): Promise<Carrier[]> {
  const res = await fetch(`${apiBaseUrl()}/api/carriers`)
  if (!res.ok) {
    throw new Error(`Failed to load carriers (${res.status})`)
  }
  return res.json() as Promise<Carrier[]>
}

export type CarrierCreateBody = {
  name: string
}

export async function createCarrier(body: CarrierCreateBody): Promise<Carrier> {
  const res = await fetch(`${apiBaseUrl()}/api/carriers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(
      detail || `Failed to create carrier (${res.status})`
    )
  }
  return res.json() as Promise<Carrier>
}
