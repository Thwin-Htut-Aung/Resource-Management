import React, { useState, useEffect } from 'react'
import { viewDepartments } from '../../service/ErpService'
import { deleteDepartment } from '../../service/ErpService'
import { NavLink } from 'react-router-dom'
import Alert from 'react-s-alert';
import './resources.css'

const Departments = (props) =>{
    
  const [departments, setDepartments] = useState([])
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  
        //Call viewDepartments method to display all the departments from the database
        useEffect(()=>{
          viewDepartments()
            .then((response) => {
              console.log("All employees by Component" + JSON.stringify(response))
              setDepartments(response.data)
            })
    
        })
      
       //Update Button On Click
      const updateDepartment = (department) =>{
        //Navigate to new route to render Update Component
        props.history.push({
          pathname: '/update-department',
          state: {detail: department}
        })
         
      }

      const deleteThisDepartment = (department) =>{
        deleteDepartment(department).then(response =>{
          Alert.success(response.successMessage)
        })
        .catch(err=>{
          Alert.error(err.error)
        })
      
      }
    
        return (
            <div className='container-fluid vh-100'>
                <h1>DEPARTMENTS</h1>
                
                {currentUser.role === 'Role_Admin' && 
                <div className='btn btn-light'><NavLink to="/add-department">Add department</NavLink></div>}
                

                {/* HTML Table */}
                <table className="styled-table">
                  <thead>
                      <tr>
                          <th>DEPARTMENT NAME</th>
                          <th>TASK</th>
                          <th>EMPLOYEES</th>
                          {currentUser.role === 'Role_Admin' && 
                          <th>ACTION</th>}
                      </tr>
                  </thead>
                  <tbody>
                    {/* Retrieve all stores using map function */}
                  {
                    departments.map( department => 
                      <tr key={department._id}>
                          <td>{department.departmentName}</td>
                          <td>{department.task}</td>
                          
                          <td>
                          {department.employees.length > 0 ? (
                          department.employees.map(employee=>
                          <div>{employee.employeeId} - {employee.employeeName}<br></br></div> 
                          )) : (
                            <div>No employees</div>)
                          }
                          </td>

                          {currentUser.role === 'Role_Admin' && 
                          <td><button className='btn btn-primary' onClick={() => updateDepartment(department)}>Edit</button><span> &nbsp;</span>
                          <span><button className='btn btn-primary' onClick={() => deleteThisDepartment(department)}>Delete</button></span></td>}
                          
                      </tr>
                    )
                  }
                  </tbody>
              </table>
              
            </div>
        )
    
    
}

export default Departments