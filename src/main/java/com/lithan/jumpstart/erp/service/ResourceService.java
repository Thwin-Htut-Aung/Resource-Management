package com.lithan.jumpstart.erp.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lithan.jumpstart.erp.entity.Employee;
import com.lithan.jumpstart.erp.entity.Facility;
import com.lithan.jumpstart.erp.entity.Instock;
import com.lithan.jumpstart.erp.entity.Outstock;

@Service
@Transactional
public interface ResourceService {
	
	public void updateEmployee(Employee employee);
	public void updateInstock(Instock instock);
	public void updateOutstock(Outstock outstock);
	public void updateFacility(Facility facility);
	
	public List<Employee> getAllEmployees();
	public List<Instock> getAllInstock();
	public List<Outstock> getAllOutstock();
	public List<Facility> getAllFacilities();
	
	public void deleteEmployee(Employee employee);
	public void deleteInstock(Instock instock);
	public void deleteOutstock(Outstock outstock);
	public void deleteFacility(Facility facility);

}
