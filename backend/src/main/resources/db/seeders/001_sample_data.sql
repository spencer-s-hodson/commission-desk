-- Optional sample data (safe to run more than once). Order: agents → carriers → persons → policies → policy_groups → policy_persons.

INSERT INTO agents (name, email, phone, npn, is_active)
SELECT v.name, v.email, v.phone, v.npn, v.is_active
FROM (VALUES
  ('Sean Harris', 'sean.harris@commissiondesk.demo', '(555) 000-0001', 1000001, true),
  ('Lauren Man', 'lauren.man@commissiondesk.demo', '(555) 000-0002', 1000002, true),
  ('John Doe', 'john.doe@commissiondesk.demo', '(555) 000-0003', 1000003, true)
) AS v(name, email, phone, npn, is_active)
WHERE NOT EXISTS (SELECT 1 FROM agents a WHERE a.name = v.name);

INSERT INTO agent_types (code, name, sort_order)
SELECT v.code, v.name, v.sort_order
FROM (VALUES
  ('LIFE', 'Life', 10),
  ('MEDICAL', 'Medical', 20),
  ('AUTO', 'Auto', 30),
  ('HOME', 'Home', 40),
  ('BUSINESS', 'Business', 50),
  ('RETIREMENT', 'Retirement', 60),
  ('OTHER', 'Other', 70)
) AS v(code, name, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM agent_types t WHERE t.code = v.code);

INSERT INTO agent_agent_types (agent_id, agent_type_id)
SELECT a.id, t.id
FROM (VALUES
  ('Sean Harris', 'LIFE'),
  ('Sean Harris', 'MEDICAL'),
  ('Lauren Man', 'MEDICAL'),
  ('Lauren Man', 'AUTO'),
  ('John Doe', 'LIFE'),
  ('John Doe', 'MEDICAL'),
  ('John Doe', 'AUTO'),
  ('John Doe', 'HOME')

) AS v(agent_name, type_code)
JOIN agents a ON a.name = v.agent_name
JOIN agent_types t ON t.code = v.type_code
WHERE NOT EXISTS (
  SELECT 1
  FROM agent_agent_types j
  WHERE j.agent_id = a.id AND j.agent_type_id = t.id
);

INSERT INTO carriers (name)
SELECT v.name
FROM (VALUES
  ('Blue Cross Blue Shield'),
  ('United Healthcare')
) AS v(name)
WHERE NOT EXISTS (SELECT 1 FROM carriers c WHERE c.name = v.name);

INSERT INTO persons (display_name)
SELECT v.display_name
FROM (VALUES
  ('Spencer Hodson'),
  ('Alexa Hodson'),
  ('Sammy Jones')
) AS v(display_name)
WHERE NOT EXISTS (SELECT 1 FROM persons p WHERE p.display_name = v.display_name);

INSERT INTO policies (carrier_id, agent_id, policy_number, effective_date, is_active)
SELECT c.id, a.id, v.policy_number, v.effective_date::date, v.is_active
FROM (VALUES
  ('Blue Cross Blue Shield', 'Sean Harris', '453-5643-1299', '2024-01-15', true),
  ('United Healthcare', 'Lauren Man', '453-5643-1298', '2024-06-01', true)
) AS v(carrier_name, agent_name, policy_number, effective_date, is_active)
JOIN carriers c ON c.name = v.carrier_name
JOIN agents a ON a.name = v.agent_name
WHERE NOT EXISTS (SELECT 1 FROM policies p WHERE p.policy_number = v.policy_number);

INSERT INTO policy_groups (policy_id, name)
SELECT p.id, v.group_name
FROM (VALUES
  ('453-5643-1299', 'Household - 453-5643-1299'),
  ('453-5643-1298', 'Household - 453-5643-1298')
) AS v(policy_number, group_name)
JOIN policies p ON p.policy_number = v.policy_number
WHERE NOT EXISTS (SELECT 1 FROM policy_groups pg WHERE pg.policy_id = p.id);

INSERT INTO policy_persons (policy_group_id, person_id)
SELECT pg.id, pr.id
FROM (VALUES
  ('453-5643-1299', 'Spencer Hodson'),
  ('453-5643-1299', 'Alexa Hodson'),
  ('453-5643-1298', 'Alexa Hodson'),
  ('453-5643-1298', 'Sammy Jones')
) AS v(policy_number, person_name)
JOIN policies pol ON pol.policy_number = v.policy_number
JOIN policy_groups pg ON pg.policy_id = pol.id
JOIN persons pr ON pr.display_name = v.person_name
WHERE NOT EXISTS (
  SELECT 1
  FROM policy_persons pp
  WHERE pp.policy_group_id = pg.id AND pp.person_id = pr.id
);
