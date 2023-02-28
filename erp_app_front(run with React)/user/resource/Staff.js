import React, { Component } from 'react'
import { viewEmployees } from '../../service/ErpService'
import { deleteEmployee } from '../../service/ErpService'
import { NavLink } from 'react-router-dom'
import Alert from 'react-s-alert'
import './resources.css'

export class Staff extends Component {
 
    constructor(props) {
        super(props)
      
        this.state = {
           employees : [],
        }
    }
    
      //Rendering data to the browser at the very first time
      componentDidMount(){
        //Call viewStores method to display all the stores from the database
        viewEmployees()
        .then( (response) => {
          console.log("All employees by Component" + JSON.stringify(response))
          this.setState({
            employees : response.data
          })
        })
      }
      
     //Update Button On Click
     updateEmployee = (employee) =>{
      //Navigate to new route to render Update Component
        this.props.history.push({
          pathname: '/update-employee',
          state: {detail: employee}
        })
    }

    deleteEmployee = (employee) =>{
      deleteEmployee(employee);
      Alert.success('You have successfully deleted the employee!');
    }


    render() {
        return (
            <div>
                <h1>EMPLOYEES</h1>

                <div className='btn btn-light'><NavLink to="/add-employee">Add Employee</NavLink></div>

                {/* HTML Table */}
                <table className="styled-table">
                  <thead>
                      <tr>
                          <th>EMPLOYEE NAME</th>
                          <th>JOB ROLE</th>
                          <th>SHIFT</th>
                          <th>ACTION</th>
                      </tr>
                  </thead>
                  <tbody>
                    {/* Retrieve all stores using map function */}
                  {
                    this.state.employees.map( employee => 
                      <tr key={employee.employeeId}>
                          <td>{employee.employeeName}</td>
                          <td>{employee.employeeRole}</td>
                          <td>{employee.employeeShift}</td>
                          <td><button className='btn btn-primary' onClick={() => this.updateEmployee(employee)}>Edit</button><span> &nbsp;</span>
                          <span><button className='btn btn-primary' onClick={() => this.deleteEmployee(employee)}>Delete</button></span>
                          </td>
                      </tr>
                    )
                  }
                  </tbody>
              </table>
              
            </div>
        )
    }
    
}

export default Staff