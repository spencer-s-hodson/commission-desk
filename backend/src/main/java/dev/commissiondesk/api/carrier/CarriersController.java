package dev.commissiondesk.api.carrier;

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

import dev.commissiondesk.api.persistence.Carrier;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/carriers")
public class CarriersController {

	private final CarrierService carrierService;

	public CarriersController(CarrierService carrierService) {
		this.carrierService = carrierService;
	}

	@GetMapping
	public List<Carrier> list() {
		return carrierService.findAll();
	}

	@GetMapping("/{id}")
	public Carrier get(@PathVariable UUID id) {
		return carrierService.getById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Carrier create(@Valid @RequestBody CarrierCreateRequest body) {
		return carrierService.create(body);
	}

	@PutMapping("/{id}")
	public Carrier replace(@PathVariable UUID id, @Valid @RequestBody CarrierReplaceRequest body) {
		return carrierService.replace(id, body);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable UUID id) {
		carrierService.deleteById(id);
	}
}
