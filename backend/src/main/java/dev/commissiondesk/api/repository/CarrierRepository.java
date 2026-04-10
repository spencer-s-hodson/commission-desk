package dev.commissiondesk.api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.commissiondesk.api.persistence.Carrier;

public interface CarrierRepository extends JpaRepository<Carrier, UUID> {
}
