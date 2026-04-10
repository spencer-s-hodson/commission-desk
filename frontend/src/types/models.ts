// Aligned with V1__initial_schema.sql and Jackson output from persistence entities.
// For generated types, add springdoc OpenAPI and openapi-typescript (or equivalent).

export type IsoDateTime = string
export type IsoDate = string

export interface Carrier {
  id: string
  name: string
  createdAt: IsoDateTime
  updatedAt: IsoDateTime
}

export interface Person {
  id: string
  displayName: string
  createdAt: IsoDateTime
  updatedAt: IsoDateTime
}

export interface Policy {
  id: string
  carrierId: string
  agentId: string
  policyNumber: string
  effectiveDate: IsoDate
  active: boolean
  createdAt: IsoDateTime
  updatedAt: IsoDateTime
}

export interface PolicyGroup {
  id: string
  policyId: string
  name: string | null
  createdAt: IsoDateTime
  updatedAt: IsoDateTime
}

export interface PolicyPerson {
  id: string
  policyGroupId: string
  personId: string
  createdAt: IsoDateTime
  updatedAt: IsoDateTime
}

export type AgentStatus = "active" | "inactive"

export interface AgentType {
  id: string
  code: string
  name: string
}

export interface Agent {
  id: string
  fullName: string
  email: string
  phone: string
  npn: string
  status: AgentStatus
  activePolicyCount: number
  types: AgentType[]
}
