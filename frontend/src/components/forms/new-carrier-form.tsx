import { useState } from "react"

import { createCarrier } from "@/api/carriers"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export type NewCarrierFormProps = {
  onSuccess: () => void
}

export function NewCarrierForm({ onSuccess }: NewCarrierFormProps) {
  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await createCarrier({ name: name.trim() })
      setName("")
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
          <FieldLabel htmlFor="new-carrier-name">Carrier name</FieldLabel>
          <FieldContent>
            <Input
              id="new-carrier-name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FieldContent>
        </Field>
      </FieldGroup>
      {error ? <FieldError>{error}</FieldError> : null}
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating…" : "Create carrier"}
        </Button>
      </div>
    </form>
  )
}
