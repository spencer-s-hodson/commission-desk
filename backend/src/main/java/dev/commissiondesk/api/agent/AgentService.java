package dev.commissiondesk.api.agent;

import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.commissiondesk.api.error.ResourceNotFoundException;
import dev.commissiondesk.api.persistence.Agent;
import dev.commissiondesk.api.persistence.AgentType;
import dev.commissiondesk.api.repository.AgentRepository;
import dev.commissiondesk.api.repository.AgentTypeRepository;
import dev.commissiondesk.api.repository.PolicyRepository;

@Service
public class AgentService {

	private final AgentRepository agentRepository;
	private final AgentTypeRepository agentTypeRepository;
	private final PolicyRepository policyRepository;

	public AgentService(
			AgentRepository agentRepository,
			AgentTypeRepository agentTypeRepository,
			PolicyRepository policyRepository) {
		this.agentRepository = agentRepository;
		this.agentTypeRepository = agentTypeRepository;
		this.policyRepository = policyRepository;
	}

	@Transactional(readOnly = true)
	public List<Agent> findAll(UUID agentTypeId) {
		Map<UUID, Long> activeByAgent = new HashMap<>();
		for (Object[] row : policyRepository.countActivePoliciesGroupedByAgentId()) {
			activeByAgent.put((UUID) row[0], (Long) row[1]);
		}
		List<Agent> agents = agentTypeId == null
				? agentRepository.findAll()
				: agentRepository.findDistinctByTypes_Id(agentTypeId);
		return agents.stream()
				.map(a -> {
					a.setActivePolicyCount(activeByAgent.getOrDefault(a.getId(), 0L).intValue());
					return a;
				})
				.toList();
	}

	@Transactional(readOnly = true)
	public Agent getById(UUID id) {
		Agent agent = agentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Agent not found: " + id));
		agent.setActivePolicyCount((int) policyRepository.countByAgentIdAndActiveTrue(id));
		return agent;
	}

	@Transactional
	public Agent create(AgentCreateRequest request) {
		Agent agent = new Agent();
		agent.setName(request.name());
		agent.setEmail(request.email());
		agent.setPhone(request.phone());
		agent.setNpn(request.npn());
		agent.setActive(request.active() != null ? request.active() : true);
		agent = agentRepository.save(agent);
		applyAgentTypes(agent, request.agentTypeIds());
		agent = agentRepository.save(agent);
		agent.setActivePolicyCount(0);
		return agent;
	}

	@Transactional
	public Agent replace(UUID id, AgentReplaceRequest request) {
		Agent agent = agentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Agent not found: " + id));
		agent.setName(request.name());
		agent.setEmail(request.email());
		agent.setPhone(request.phone());
		agent.setNpn(request.npn());
		agent.setActive(request.active());
		applyAgentTypes(agent, request.agentTypeIds());
		agent = agentRepository.save(agent);
		agent.setActivePolicyCount((int) policyRepository.countByAgentIdAndActiveTrue(id));
		return agent;
	}

	@Transactional
	public void deleteById(UUID id) {
		if (!agentRepository.existsById(id)) {
			throw new ResourceNotFoundException("Agent not found: " + id);
		}
		agentRepository.deleteById(id);
	}

	private void applyAgentTypes(Agent agent, List<UUID> typeIds) {
		if (typeIds == null || typeIds.isEmpty()) {
			agent.getTypes().clear();
			return;
		}
		if (typeIds.size() != new HashSet<>(typeIds).size()) {
			throw new IllegalArgumentException("Duplicate agent type ids are not allowed");
		}
		List<AgentType> resolved = agentTypeRepository.findAllById(typeIds);
		if (resolved.size() != typeIds.size()) {
			throw new IllegalArgumentException("One or more agent type ids are invalid");
		}
		resolved.sort(Comparator.comparing(AgentType::getSortOrder).thenComparing(AgentType::getName));
		agent.getTypes().clear();
		agent.getTypes().addAll(resolved);
	}
}
