package com.lithan.jumpstart.erp.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name = "employee")
public class Employee {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="employee_id")
	private long employeeId;
	
	@NotBlank
	@Column(name="name")
	private String employeeName;
	
	@NotBlank
	@Column(name="shift")
	private String employeeShift;
	
	@NotBlank
	@Column(name="role")
	private String employeeRole;
	
	
	public long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getEmployeeShift() {
		return employeeShift;
	}

	public void setEmployeeShift(String employeeShift) {
		this.employeeShift = employeeShift;
	}

	public String getEmployeeRole() {
		return employeeRole;
	}

	public void setEmployeeRole(String employeeRole) {
		this.employeeRole = employeeRole;
	}
	
	
}
