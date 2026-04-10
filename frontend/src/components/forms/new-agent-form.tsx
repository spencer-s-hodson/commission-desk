import { useEffect, useState } from "react"

import { fetchAgentTypes } from "@/api/agent-types"
import { createAgent } from "@/api/agents"
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
import type { AgentType } from "@/types"

export type NewAgentFormProps = {
  onSuccess: () => void
}

export function NewAgentForm({ onSuccess }: NewAgentFormProps) {
  const [agentTypes, setAgentTypes] = useState<AgentType[] | null>(null)
  const [selectedTypeIds, setSelectedTypeIds] = useState<Set<string>>(
    () => new Set(),
  )
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [npn, setNpn] = useState("")
  const [active, setActive] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void fetchAgentTypes()
      .then(setAgentTypes)
      .catch(() => setAgentTypes([]))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const npnNum = Number.parseInt(npn, 10)
    if (!Number.isFinite(npnNum)) {
      setError("NPN must be a valid number.")
      return
    }
    setSubmitting(true)
    try {
      await createAgent({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        npn: npnNum,
        active,
        agentTypeIds:
          selectedTypeIds.size > 0 ? [...selectedTypeIds] : undefined,
      })
      setName("")
      setEmail("")
      setPhone("")
      setNpn("")
      setActive(true)
      setSelectedTypeIds(new Set())
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="new-agent-name">Full name</FieldLabel>
          <FieldContent>
            <Input
              id="new-agent-name"
              name="name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="new-agent-email">Email</FieldLabel>
          <FieldContent>
            <Input
              id="new-agent-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="new-agent-phone">Phone</FieldLabel>
          <FieldContent>
            <Input
              id="new-agent-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="new-agent-npn">NPN</FieldLabel>
          <FieldContent>
            <Input
              id="new-agent-npn"
              name="npn"
              inputMode="numeric"
              required
              value={npn}
              onChange={(e) => setNpn(e.target.value)}
            />
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="new-agent-active"
            checked={active}
            onCheckedChange={(v) => setActive(v === true)}
          />
          <FieldLabel htmlFor="new-agent-active" className="font-normal">
            Active
          </FieldLabel>
        </Field>
        {agentTypes && agentTypes.length > 0 ? (
          <Field>
            <FieldLabel>Lines of business</FieldLabel>
            <FieldContent className="flex flex-col gap-2 pt-1">
              {agentTypes.map((t) => (
                <Field key={t.id} orientation="horizontal">
                  <Checkbox
                    id={`new-agent-type-${t.id}`}
                    checked={selectedTypeIds.has(t.id)}
                    onCheckedChange={(v) => {
                      setSelectedTypeIds((prev) => {
                        const next = new Set(prev)
                        if (v === true) {
                          next.add(t.id)
                        } else {
                          next.delete(t.id)
                        }
                        return next
                      })
                    }}
                  />
                  <FieldLabel
                    htmlFor={`new-agent-type-${t.id}`}
                    className="font-normal"
                  >
                    {t.name}
                  </FieldLabel>
                </Field>
              ))}
            </FieldContent>
          </Field>
        ) : null}
      </FieldGroup>
      {error ? <FieldError>{error}</FieldError> : null}
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating…" : "Create agent"}
        </Button>
      </div>
    </form>
  )
}
