package com.lithan.jumpstart.erp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lithan.jumpstart.erp.entity.Employee;
import com.lithan.jumpstart.erp.entity.Facility;
import com.lithan.jumpstart.erp.entity.Instock;
import com.lithan.jumpstart.erp.entity.Outstock;
import com.lithan.jumpstart.erp.repository.EmployeeRepository;
import com.lithan.jumpstart.erp.repository.FacilityRepository;
import com.lithan.jumpstart.erp.repository.InstockRepository;
import com.lithan.jumpstart.erp.repository.OutstockRepository;

@Service
@Transactional
public class ResourceServiceImpl implements ResourceService{
	
	@Autowired
	private EmployeeRepository employeeRepo;
	
	@Autowired
	private InstockRepository instockRepo;
	
	@Autowired
	private OutstockRepository outstockRepo;
	
	@Autowired
	private FacilityRepository facilityRepo;
	
	@Override
	public void updateEmployee(Employee employee){
		employeeRepo.save(employee);
	}
	
	@Override
	public void updateInstock(Instock instock){
		instockRepo.save(instock);
	}
	
	@Override
	public void updateOutstock(Outstock outstock){
		outstockRepo.save(outstock);
	}
	
	@Override
	public void updateFacility(Facility facility){
		facilityRepo.save(facility);
	}
	
	@Override
	public List<Employee> getAllEmployees(){
		return employeeRepo.findAll();
	}
	
	@Override
	public List<Instock> getAllInstock(){
		return instockRepo.findAll();
	}
	
	@Override
	public List<Outstock> getAllOutstock(){
		return outstockRepo.findAll();
	}
	
	@Override
	public List<Facility> getAllFacilities(){
		return facilityRepo.findAll();
	}
	
	@Override
	public void deleteEmployee(Employee employee){
		employeeRepo.delete(employee);
	}
	
	@Override
	public void deleteInstock(Instock instock){
		instockRepo.delete(instock);
	}
	
	@Override
	public void deleteOutstock(Outstock outstock){
		outstockRepo.delete(outstock);
	}
	
	@Override
	public void deleteFacility(Facility facility){
		facilityRepo.delete(facility);
	}
	
}
