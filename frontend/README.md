# CommissionDesk (frontend)

React + TypeScript + Vite app for **insurance commission tracking** — dashboards, statements, reconciliation, and agency workflows.

## shadcn/ui

Add components:

```bash
npx shadcn@latest add button
```

Imports use the `@/` alias, for example:

```tsx
import { Button } from "@/components/ui/button"
```

# DB
- agents
- clients
- carriers
- policies (joins clients, carriers, agents)
- commission_schedules (expected rates per policy)
- carrier_statements (one per uploaded file)
- statement_line_items (rows from the statement)
- commission_payments (matched/reconciled payments)
