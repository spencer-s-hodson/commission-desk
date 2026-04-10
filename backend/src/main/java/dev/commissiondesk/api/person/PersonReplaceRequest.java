package dev.commissiondesk.api.person;

import jakarta.validation.constraints.NotBlank;

public record PersonReplaceRequest(@NotBlank String displayName) {
}
