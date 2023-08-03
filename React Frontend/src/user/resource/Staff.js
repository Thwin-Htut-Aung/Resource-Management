import React, { useEffect, useState } from 'react'
import { viewEmployees } from '../../service/ErpService'
import { deleteEmployee } from '../../service/ErpService'
import { NavLink } from 'react-router-dom'
import Alert from 'react-s-alert'
import './resources.css'

const Staff = (props) =>{

    const [employees, setEmployees] = useState([])
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
    useEffect(()=>{
      viewEmployees()
        .then((response) => {
          console.log("All employees by Component" + JSON.stringify(response))
          setEmployees(response.data)
        })

    })
      

     //Update Button On Click
    const updateEmployee = (employee) =>{
      //Navigate to new route to render Update Component
          props.history.push({
          pathname: '/update-employee',
          state: {detail: employee}
        })
    }

   const deleteThisEmployee = (employee)=>{

    deleteEmployee(employee).then(response =>{
      Alert.success(response.successMessage)
    })
    .catch(err=>{
      Alert.error(err.error)
    })
      
  }


        return (
            <div className='container-fluid vh-100'>
                <h1>EMPLOYEES</h1>

                {currentUser.role === 'Role_Admin' && 
                <div className='btn btn-warning'><NavLink to="/add-employee">Add Employee</NavLink></div>}

                {/* HTML Table */}
                <table className="styled-table">
                  <thead>
                      <tr>
                          <th>EMPLOYEE NAME</th>
                          <th>JOB ROLE</th>
                          <th>DEPARTMENT</th>
                          {currentUser.role === 'Role_Admin' && 
                          <th>ACTION</th>}
                      </tr>
                  </thead>
                  <tbody>

                    {/* Retrieve all employees using map function */}
                  {
                      employees.map( employee => 
                      <tr key={employee.employeeId}>
                          <td>{employee.employeeName}</td>
                          <td>{employee.jobRole}</td>
                          <td>{employee.department}</td>
                          {currentUser.role === 'Role_Admin' && 
                          <td><button className='btn btn-primary' onClick={()=>updateEmployee(employee)}>Edit</button><span> &nbsp;</span>
                          <span><button className='btn btn-primary' onClick={()=>deleteThisEmployee(employee)}>Delete</button></span></td>}
                      </tr>
                    )
                  }
                  </tbody>
              </table>
              
            </div>
        )
      
}
    

export default Staff