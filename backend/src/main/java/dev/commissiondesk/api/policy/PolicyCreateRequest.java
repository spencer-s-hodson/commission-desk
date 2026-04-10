package dev.commissiondesk.api.policy;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PolicyCreateRequest(
		@NotNull UUID carrierId,
		@NotNull UUID agentId,
		@NotBlank @Size(max = 100) String policyNumber,
		@NotNull LocalDate effectiveDate,
		Boolean active) {
}
