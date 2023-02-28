package com.lithan.jumpstart.erp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name = "facilities")
public class Facility {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="facility_id")
	private long facilityId;
	
	@NotBlank
	@Column(name="name")
	private String facilityName;
	
	@NotBlank
	@Column(name="purpose")
	private String facilityPurpose;
	
	@NotBlank
	@Column(name="operator")
    private String facilityOperator;
	
	public long getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(long facilityId) {
		this.facilityId = facilityId;
	}

	public String getFacilityName() {
		return facilityName;
	}

	public void setFacilityName(String facilityName) {
		this.facilityName = facilityName;
	}

	public String getFacilityPurpose() {
		return facilityPurpose;
	}

	public void setFacilityPurpose(String facilityPurpose) {
		this.facilityPurpose = facilityPurpose;
	}

	public String getFacilityOperator() {
		return facilityOperator;
	}

	public void setFacilityOperator(String facilityOperator) {
		this.facilityOperator = facilityOperator;
	}
	


	
}
