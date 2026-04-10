package dev.commissiondesk.api.policy;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.commissiondesk.api.error.ResourceNotFoundException;
import dev.commissiondesk.api.persistence.Policy;
import dev.commissiondesk.api.repository.AgentRepository;
import dev.commissiondesk.api.repository.CarrierRepository;
import dev.commissiondesk.api.repository.PolicyRepository;

@Service
public class PolicyService {

	private final PolicyRepository policyRepository;
	private final CarrierRepository carrierRepository;
	private final AgentRepository agentRepository;

	public PolicyService(
			PolicyRepository policyRepository,
			CarrierRepository carrierRepository,
			AgentRepository agentRepository) {
		this.policyRepository = policyRepository;
		this.carrierRepository = carrierRepository;
		this.agentRepository = agentRepository;
	}

	@Transactional(readOnly = true)
	public List<Policy> findAll() {
		return policyRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Policy getById(UUID id) {
		return policyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Policy not found: " + id));
	}

	@Transactional
	public Policy create(PolicyCreateRequest request) {
		requireCarrier(request.carrierId());
		requireAgent(request.agentId());
		Policy policy = new Policy();
		policy.setCarrierId(request.carrierId());
		policy.setAgentId(request.agentId());
		policy.setPolicyNumber(request.policyNumber());
		policy.setEffectiveDate(request.effectiveDate());
		policy.setActive(request.active() != null ? request.active() : true);
		return policyRepository.save(policy);
	}

	@Transactional
	public Policy replace(UUID id, PolicyReplaceRequest request) {
		requireCarrier(request.carrierId());
		requireAgent(request.agentId());
		Policy policy = policyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Policy not found: " + id));
		policy.setCarrierId(request.carrierId());
		policy.setAgentId(request.agentId());
		policy.setPolicyNumber(request.policyNumber());
		policy.setEffectiveDate(request.effectiveDate());
		policy.setActive(request.active());
		return policyRepository.save(policy);
	}

	@Transactional
	public void deleteById(UUID id) {
		if (!policyRepository.existsById(id)) {
			throw new ResourceNotFoundException("Policy not found: " + id);
		}
		policyRepository.deleteById(id);
	}

	private void requireCarrier(UUID id) {
		if (!carrierRepository.existsById(id)) {
			throw new ResourceNotFoundException("Carrier not found: " + id);
		}
	}

	private void requireAgent(UUID id) {
		if (!agentRepository.existsById(id)) {
			throw new ResourceNotFoundException("Agent not found: " + id);
		}
	}
}
