package dev.commissiondesk.api.carrier;

import jakarta.validation.constraints.NotBlank;

public record CarrierReplaceRequest(@NotBlank String name) {
}
