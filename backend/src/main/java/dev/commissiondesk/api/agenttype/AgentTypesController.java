package dev.commissiondesk.api.agenttype;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.commissiondesk.api.persistence.AgentType;
import dev.commissiondesk.api.repository.AgentTypeRepository;

@RestController
@RequestMapping("/api/agent-types")
public class AgentTypesController {

	private final AgentTypeRepository agentTypeRepository;

	public AgentTypesController(AgentTypeRepository agentTypeRepository) {
		this.agentTypeRepository = agentTypeRepository;
	}

	@GetMapping
	public List<AgentType> list() {
		return agentTypeRepository.findAllByOrderBySortOrderAscNameAsc();
	}
}
