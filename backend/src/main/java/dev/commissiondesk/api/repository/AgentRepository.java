package dev.commissiondesk.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.commissiondesk.api.persistence.Agent;

public interface AgentRepository extends JpaRepository<Agent, UUID> {

	@EntityGraph(attributePaths = "types")
	@Override
	List<Agent> findAll();

	@EntityGraph(attributePaths = "types")
	@Override
	Optional<Agent> findById(UUID id);

	@EntityGraph(attributePaths = "types")
	List<Agent> findDistinctByTypes_Id(UUID typesId);
}
