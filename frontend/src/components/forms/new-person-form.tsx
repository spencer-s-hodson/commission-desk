import { useState } from "react"

import { createPerson } from "@/api/persons"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export type NewPersonFormProps = {
  onSuccess: () => void
}

export function NewPersonForm({ onSuccess }: NewPersonFormProps) {
  const [displayName, setDisplayName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await createPerson({ displayName: displayName.trim() })
      setDisplayName("")
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
          <FieldLabel htmlFor="new-person-display-name">Display name</FieldLabel>
          <FieldContent>
            <Input
              id="new-person-display-name"
              name="displayName"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </FieldContent>
        </Field>
      </FieldGroup>
      {error ? <FieldError>{error}</FieldError> : null}
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating…" : "Create client"}
        </Button>
      </div>
    </form>
  )
}
