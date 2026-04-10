package dev.commissiondesk.api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.commissiondesk.api.persistence.Person;

public interface PersonRepository extends JpaRepository<Person, UUID> {
}
