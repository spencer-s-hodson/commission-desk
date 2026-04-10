package dev.commissiondesk.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.commissiondesk.api.persistence.AgentType;

public interface AgentTypeRepository extends JpaRepository<AgentType, UUID> {

	Optional<AgentType> findByCode(String code);

	List<AgentType> findAllByOrderBySortOrderAscNameAsc();
}
