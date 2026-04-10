package dev.commissiondesk.api.persistence;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "agents")
public class Agent {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false, length = 50)
	private String phone;

	@Column(nullable = false)
	private Integer npn;

	@Column(name = "is_active", nullable = false)
	private boolean active;

	@ManyToMany
	@JoinTable(
			name = "agent_agent_types",
			joinColumns = @JoinColumn(name = "agent_id"),
			inverseJoinColumns = @JoinColumn(name = "agent_type_id"))
	@OrderBy("sortOrder ASC, name ASC")
	private List<AgentType> types = new ArrayList<>();

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private Instant createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false)
	private Instant updatedAt;

	@Transient
	private int activePolicyCount;

	public UUID getId() {
		return id;
	}

	@JsonProperty("fullName")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@JsonSerialize(using = ToStringSerializer.class)
	public Integer getNpn() {
		return npn;
	}

	public void setNpn(Integer npn) {
		this.npn = npn;
	}

	@JsonIgnore
	public boolean isActive() {
		return active;
	}

	@JsonProperty("status")
	public String getStatus() {
		return active ? "active" : "inactive";
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public List<AgentType> getTypes() {
		return types;
	}

	public void setTypes(List<AgentType> types) {
		this.types = types;
	}

	@JsonIgnore
	public Instant getCreatedAt() {
		return createdAt;
	}

	@JsonIgnore
	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public int getActivePolicyCount() {
		return activePolicyCount;
	}

	public void setActivePolicyCount(int activePolicyCount) {
		this.activePolicyCount = activePolicyCount;
	}
}
