package dev.commissiondesk.api.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import dev.commissiondesk.api.persistence.Policy;

public interface PolicyRepository extends JpaRepository<Policy, UUID> {

	long countByAgentIdAndActiveTrue(UUID agentId);

	@Query("select p.agentId, count(p) from Policy p where p.active = true group by p.agentId")
	List<Object[]> countActivePoliciesGroupedByAgentId();
}
