CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    npn INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE agent_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(32) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL UNIQUE,
    sort_order SMALLINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE agent_agent_types (
    agent_id UUID NOT NULL REFERENCES agents (id) ON DELETE CASCADE,
    agent_type_id UUID NOT NULL REFERENCES agent_types (id) ON DELETE RESTRICT,
    PRIMARY KEY (agent_id, agent_type_id)
);

CREATE INDEX idx_agent_agent_types_agent_type_id ON agent_agent_types (agent_type_id);

CREATE TABLE carriers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    carrier_id UUID NOT NULL REFERENCES carriers (id) ON DELETE RESTRICT,
    agent_id UUID NOT NULL REFERENCES agents (id) ON DELETE RESTRICT,
    policy_number VARCHAR(100) NOT NULL,
    effective_date DATE NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_policies_carrier_id ON policies (carrier_id);
CREATE INDEX idx_policies_agent_id ON policies (agent_id);

CREATE TABLE policy_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_id UUID NOT NULL UNIQUE REFERENCES policies (id) ON DELETE CASCADE,
    name VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE policy_persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_group_id UUID NOT NULL REFERENCES policy_groups (id) ON DELETE CASCADE,
    person_id UUID NOT NULL REFERENCES persons (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_policy_persons_policy_group_id ON policy_persons (policy_group_id);
CREATE INDEX idx_policy_persons_person_id ON policy_persons (person_id);
