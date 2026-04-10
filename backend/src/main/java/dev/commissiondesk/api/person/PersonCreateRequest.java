package dev.commissiondesk.api.person;

import jakarta.validation.constraints.NotBlank;

public record PersonCreateRequest(@NotBlank String displayName) {
}
