package com.lithan.jumpstart.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lithan.jumpstart.erp.entity.Facility;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
	
}
