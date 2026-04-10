# Commission Desk API (backend)

## PostgreSQL with Docker

Start Postgres (detached):

```bash
cd backend && docker compose up -d
```

Stop (data kept in the Docker volume):

```bash
docker compose down
```

Stop and wipe the database volume:

```bash
docker compose down -v
```

Connection defaults: host `localhost`, port `5432`, database/user/password `commissiondesk`.

### DBeaver

1. **Database** → **New Database Connection** → **PostgreSQL**.
2. **Main** tab: Host `localhost`, Port `5432`, Database `commissiondesk`, Username `commissiondesk`, Password `commissiondesk`.
3. **SSL** tab: turn SSL off for local Docker (default is usually fine).
4. **Test Connection** → **Finish**.

Browse tables under your connection → **Schemas** → **public** → **Tables** (for example `agents`). You can also open an SQL editor and run `SELECT * FROM agents;`.

To see which Flyway scripts have run: query the table `flyway_schema_history` (columns include `version`, `description`, `success`).

Open `psql` inside the container (no local Postgres client required):

```bash
docker exec -it commissiondesk-postgres psql -U commissiondesk -d commissiondesk
```

Open `psql` from your machine (if installed):

```bash
psql -h localhost -p 5432 -U commissiondesk -d commissiondesk
```

## Run the API

Postgres must be running (`docker compose up -d`). Configuration is in `application.properties`.

```bash
./gradlew bootRun
```

Flyway runs migrations on startup, then JPA validates the schema (`ddl-auto=validate`).

### Flyway CLI (optional)

If you install the [Flyway CLI](https://documentation.red-gate.com/flyway/getting-started-with-flyway/installers), connection settings and migration paths are saved in [conf/flyway.toml](conf/flyway.toml).

**From `backend/`**, use the repo helper (executable script named `flyway`) so you do not pass `-url` / `-user` / `-password` / `-locations` each time:

```bash
cd backend
./flyway info
./flyway migrate   # first time (or whenever you have pending migrations)
./flyway validate
```

`conf/flyway.toml` sets `ignoreMigrationPatterns` so **`validate` does not fail** just because migrations are still **pending** on an empty database (checksum checks still run for applied versions). Apply schema/data with **`migrate`** or by starting the API.

From the **repo root**:

```bash
backend/flyway info
```

**Optional — from any directory in a shell:** source [`.flyway.sh`](.flyway.sh) once; it defines a `flyway` function that calls `backend/flyway`. Remove it with `unset -f flyway`.

**Manual equivalent** (from `backend/`):

```bash
flyway -configFiles=conf/flyway.toml info
```

**If you see** `Unable to connect to the database. Configure the url, user and password` — you ran plain `flyway` (Homebrew default config only). Use `./flyway …` from `backend/`, `backend/flyway …` from the repo root, or `flyway -configFiles=conf/flyway.toml …` from `backend/`.

**`FLYWAY_CONFIG_FILES`:** you can `export FLYWAY_CONFIG_FILES=conf/flyway.toml` from `backend/` and then run `flyway` ([docs](https://documentation.red-gate.com/flyway/reference/command-line-parameters/config-files-parameter)); paths in `conf/flyway.toml` are still resolved from your **current working directory**, so stay in `backend/` or use [direnv](https://direnv.net/).

## Migrations (Flyway)

Scripts live in `src/main/resources/db/migration/`.

| File | Purpose |
|------|---------|
| `V1__initial_schema.sql` | Creates `agents`, `carriers`, `persons`, `policies`, `policy_groups`, and `policy_persons`. |

**Naming:** versioned scripts use `V{version}__description.sql` (e.g. `V3__add_column_foo.sql`). Use the next integer when you add a migration.

**How to apply new migrations:** keep Postgres running, add the new `.sql` file, then start the API. Flyway applies any pending versions in order and records them in `flyway_schema_history`.

**How to manage them safely**

- Do **not** edit a migration that has already been applied to a database you care about; add a new `V{n}__...` file instead.
- If you change an applied file, Flyway will fail checksum validation on the next startup.
- **Local full reset** (throws away all data): `docker compose down -v`, `docker compose up -d`, then `./gradlew bootRun` so `V1` runs on a clean database. If you previously applied an older `V1` checksum or a removed migration, reset the DB or repair `flyway_schema_history` before the app will start.

**Other seed patterns:** repeatable migrations `R__...sql` (re-run when the file changes; use idempotent SQL such as `ON CONFLICT DO NOTHING`), or a `@Profile("dev")` `CommandLineRunner` for local-only data.
