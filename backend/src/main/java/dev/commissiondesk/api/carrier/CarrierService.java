package dev.commissiondesk.api.carrier;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.commissiondesk.api.error.ResourceNotFoundException;
import dev.commissiondesk.api.persistence.Carrier;
import dev.commissiondesk.api.repository.CarrierRepository;

@Service
public class CarrierService {

	private final CarrierRepository carrierRepository;

	public CarrierService(CarrierRepository carrierRepository) {
		this.carrierRepository = carrierRepository;
	}

	@Transactional(readOnly = true)
	public List<Carrier> findAll() {
		return carrierRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Carrier getById(UUID id) {
		return carrierRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Carrier not found: " + id));
	}

	@Transactional
	public Carrier create(CarrierCreateRequest request) {
		Carrier carrier = new Carrier();
		carrier.setName(request.name());
		return carrierRepository.save(carrier);
	}

	@Transactional
	public Carrier replace(UUID id, CarrierReplaceRequest request) {
		Carrier carrier = carrierRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Carrier not found: " + id));
		carrier.setName(request.name());
		return carrierRepository.save(carrier);
	}

	@Transactional
	public void deleteById(UUID id) {
		if (!carrierRepository.existsById(id)) {
			throw new ResourceNotFoundException("Carrier not found: " + id);
		}
		carrierRepository.deleteById(id);
	}
}
