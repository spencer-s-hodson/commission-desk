package dev.commissiondesk.api.agent;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.commissiondesk.api.persistence.Agent;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

	private final AgentService agentService;

	public AgentController(AgentService agentService) {
		this.agentService = agentService;
	}

	@GetMapping
	public List<Agent> list(@RequestParam(required = false) UUID agentTypeId) {
		return agentService.findAll(agentTypeId);
	}

	@GetMapping("/{id}")
	public Agent get(@PathVariable UUID id) {
		return agentService.getById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Agent create(@Valid @RequestBody AgentCreateRequest body) {
		return agentService.create(body);
	}

	@PutMapping("/{id}")
	public Agent replace(@PathVariable UUID id, @Valid @RequestBody AgentReplaceRequest body) {
		return agentService.replace(id, body);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable UUID id) {
		agentService.deleteById(id);
	}
}
