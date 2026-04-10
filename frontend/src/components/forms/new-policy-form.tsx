import { useEffect, useState } from "react"

import { fetchAgents } from "@/api/agents"
import { fetchCarriers } from "@/api/carriers"
import { createPolicy } from "@/api/policies"
import type { Agent, Carrier } from "@/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type NewPolicyFormProps = {
  onSuccess: () => void
}

export function NewPolicyForm({ onSuccess }: NewPolicyFormProps) {
  const [carriers, setCarriers] = useState<Carrier[] | null>(null)
  const [agents, setAgents] = useState<Agent[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [carrierId, setCarrierId] = useState<string>("")
  const [agentId, setAgentId] = useState<string>("")
  const [policyNumber, setPolicyNumber] = useState("")
  const [effectiveDate, setEffectiveDate] = useState("")
  const [active, setActive] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([fetchCarriers(), fetchAgents()])
      .then(([c, a]) => {
        if (!cancelled) {
          setCarriers(c)
          setAgents(a)
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setLoadError(
            e instanceof Error ? e.message : "Failed to load carriers and agents"
          )
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!carrierId || !agentId) {
      setError("Select a carrier and an agent.")
      return
    }
    setSubmitting(true)
    try {
      await createPolicy({
        carrierId,
        agentId,
        policyNumber: policyNumber.trim(),
        effectiveDate,
        active,
      })
      setCarrierId("")
      setAgentId("")
      setPolicyNumber("")
      setEffectiveDate("")
      setActive(true)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  const optionsReady = carriers !== null && agents !== null && !loadError

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {loadError ? (
        <FieldError>{loadError}</FieldError>
      ) : null}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="new-policy-carrier">Carrier</FieldLabel>
          <FieldContent>
            <Select
              value={carrierId || undefined}
              onValueChange={setCarrierId}
              disabled={!optionsReady}
              required
            >
              <SelectTrigger id="new-policy-carrier" className="w-full">
                <SelectValue placeholder="Select carrier" />
              </SelectTrigger>
              <SelectContent>
                {carriers?.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="new-policy-agent">Agent</FieldLabel>
          <FieldContent>
            <Select
              value={agentId || undefined}
              onValueChange={setAgentId}
              disabled={!optionsReady}
              required
            >
              <SelectTrigger id="new-policy-agent" className="w-full">
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                {agents?.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="new-policy-number">Policy number</FieldLabel>
          <FieldContent>
            <Input
              id="new-policy-number"
              name="policyNumber"
              required
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="new-policy-effective">Effective date</FieldLabel>
          <FieldContent>
            <Input
              id="new-policy-effective"
              name="effectiveDate"
              type="date"
              required
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
            />
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="new-policy-active"
            checked={active}
            onCheckedChange={(v) => setActive(v === true)}
          />
          <FieldLabel htmlFor="new-policy-active" className="font-normal">
            Active
          </FieldLabel>
        </Field>
      </FieldGroup>
      {error ? <FieldError>{error}</FieldError> : null}
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={submitting || !optionsReady}>
          {submitting ? "Creating…" : "Create policy"}
        </Button>
      </div>
    </form>
  )
}
