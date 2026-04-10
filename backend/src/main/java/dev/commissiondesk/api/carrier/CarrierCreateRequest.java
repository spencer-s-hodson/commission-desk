package dev.commissiondesk.api.carrier;

import jakarta.validation.constraints.NotBlank;

public record CarrierCreateRequest(@NotBlank String name) {
}
