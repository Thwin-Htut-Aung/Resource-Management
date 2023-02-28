package com.lithan.jumpstart.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lithan.jumpstart.erp.entity.Outstock;

@Repository
public interface OutstockRepository extends JpaRepository<Outstock, Long>{
	
}
