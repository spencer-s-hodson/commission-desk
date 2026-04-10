function apiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
}

export type Person = {
  id: string
  displayName: string
  createdAt: string
  updatedAt: string
}

export async function fetchPersons(): Promise<Person[]> {
  const res = await fetch(`${apiBaseUrl()}/api/persons`)
  if (!res.ok) {
    throw new Error(`Failed to load clients (${res.status})`)
  }
  return res.json() as Promise<Person[]>
}

export type PersonCreateBody = {
  displayName: string
}

export async function createPerson(body: PersonCreateBody): Promise<Person> {
  const res = await fetch(`${apiBaseUrl()}/api/persons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(
      detail || `Failed to create person (${res.status})`
    )
  }
  return res.json() as Promise<Person>
}
