package dev.commissiondesk.api.agent;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AgentCreateRequest(
		@NotBlank String name,
		@NotBlank @Email String email,
		@NotBlank @Size(max = 50) String phone,
		@NotNull Integer npn,
		Boolean active,
		List<UUID> agentTypeIds) {
}
