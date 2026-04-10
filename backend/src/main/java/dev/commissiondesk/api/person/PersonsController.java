package dev.commissiondesk.api.person;

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

import dev.commissiondesk.api.persistence.Person;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/persons")
public class PersonsController {

	private final PersonService personService;

	public PersonsController(PersonService personService) {
		this.personService = personService;
	}

	@GetMapping
	public List<Person> list() {
		return personService.findAll();
	}

	@GetMapping("/{id}")
	public Person get(@PathVariable UUID id) {
		return personService.getById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Person create(@Valid @RequestBody PersonCreateRequest body) {
		return personService.create(body);
	}

	@PutMapping("/{id}")
	public Person replace(@PathVariable UUID id, @Valid @RequestBody PersonReplaceRequest body) {
		return personService.replace(id, body);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable UUID id) {
		personService.deleteById(id);
	}
}
