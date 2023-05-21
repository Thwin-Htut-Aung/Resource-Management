package com.lithan.jumpstart.erp.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lithan.jumpstart.erp.entity.Employee;
import com.lithan.jumpstart.erp.entity.Facility;
import com.lithan.jumpstart.erp.entity.Instock;
import com.lithan.jumpstart.erp.entity.Outstock;
import com.lithan.jumpstart.erp.payload.UpdateResponse;
import com.lithan.jumpstart.erp.service.ResourceService;



@RestController
@RequestMapping("/jumpstart")
public class ResourceController {


    @Autowired
    private ResourceService resourceService;
    

	@GetMapping(value = "/view-employees")
	public List<Employee> viewEmployees(){
		List<Employee> employees = resourceService.getAllEmployees();
		return employees;
	}
	
	@GetMapping(value = "/view-instock")
	public List<Instock> viewInstock(){
		List<Instock> instock = resourceService.getAllInstock();
		return instock;
	}
	
	@GetMapping(value = "/view-outstock")
	public List<Outstock> viewOutstock(){
		List<Outstock> outstock = resourceService.getAllOutstock();
		return outstock;
	}
	
	@GetMapping(value = "/view-facilities")
	public List<Facility> viewFacilities(){
		List<Facility> facilities = resourceService.getAllFacilities();
		return facilities;
	}
	

    @PostMapping(value = "/update-employee")
   	public UpdateResponse updateEmployee(@RequestBody Employee employee) {
    	
    		resourceService.updateEmployee(employee);
       	System.out.println("Update employee controller method");
       	return new UpdateResponse();
   		
   	}
    
    @PostMapping(value = "/update-instock")
	public UpdateResponse updateInstock(@RequestBody Instock instock) {
    	
    		resourceService.updateInstock(instock);
    	System.out.println("Update instock controller method");
    	return new UpdateResponse();
		
	}
    
    @PostMapping(value = "/update-outstock")
   	public UpdateResponse updateOutstock(@RequestBody Outstock outstock) {
    	
    		resourceService.updateOutstock(outstock);
       	System.out.println("Update outstock controller method");
       	return new UpdateResponse();
    
   		
   	}
    
    @PostMapping(value = "/update-facility")
   	public UpdateResponse updateFacility(@RequestBody Facility facility) {
    	
    		resourceService.updateFacility(facility);
       	System.out.println("Update facility controller method");
       	return new UpdateResponse();
   		
   	}
    
	
    @PostMapping(value = "/delete-employee")
    public void deleteEmployee(@RequestBody Employee employee) {
       resourceService.deleteEmployee(employee);
    }
    
    @PostMapping(value = "/delete-instock")
    public void deleteInstock(@RequestBody Instock instock) {
       resourceService.deleteInstock(instock);
    }
    
    @PostMapping(value = "/delete-outstock")
    public void deleteOutstock(@RequestBody Outstock outstock) {
       resourceService.deleteOutstock(outstock);
    }
    
    @PostMapping(value = "/delete-facility")
    public void deleteFacility(@RequestBody Facility facility) {
       resourceService.deleteFacility(facility);
    }
		

    
    
}
