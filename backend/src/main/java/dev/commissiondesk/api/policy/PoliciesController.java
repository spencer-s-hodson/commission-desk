package dev.commissiondesk.api.policy;

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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.commissiondesk.api.persistence.Policy;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/policies")
public class PoliciesController {

	private final PolicyService policyService;

	public PoliciesController(PolicyService policyService) {
		this.policyService = policyService;
	}

	@GetMapping
	public List<Policy> list() {
		return policyService.findAll();
	}

	@GetMapping("/{id}")
	public Policy get(@PathVariable UUID id) {
		return policyService.getById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Policy create(@Valid @RequestBody PolicyCreateRequest body) {
		return policyService.create(body);
	}

	@PutMapping("/{id}")
	public Policy replace(@PathVariable UUID id, @Valid @RequestBody PolicyReplaceRequest body) {
		return policyService.replace(id, body);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable UUID id) {
		policyService.deleteById(id);
	}
}
