package dev.commissiondesk.api.person;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.commissiondesk.api.error.ResourceNotFoundException;
import dev.commissiondesk.api.persistence.Person;
import dev.commissiondesk.api.repository.PersonRepository;

@Service
public class PersonService {

	private final PersonRepository personRepository;

	public PersonService(PersonRepository personRepository) {
		this.personRepository = personRepository;
	}

	@Transactional(readOnly = true)
	public List<Person> findAll() {
		return personRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Person getById(UUID id) {
		return personRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Person not found: " + id));
	}

	@Transactional
	public Person create(PersonCreateRequest request) {
		Person person = new Person();
		person.setDisplayName(request.displayName());
		return personRepository.save(person);
	}

	@Transactional
	public Person replace(UUID id, PersonReplaceRequest request) {
		Person person = personRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Person not found: " + id));
		person.setDisplayName(request.displayName());
		return personRepository.save(person);
	}

	@Transactional
	public void deleteById(UUID id) {
		if (!personRepository.existsById(id)) {
			throw new ResourceNotFoundException("Person not found: " + id);
		}
		personRepository.deleteById(id);
	}
}
