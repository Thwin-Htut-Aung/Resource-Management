import React, { Component } from 'react';
import { viewEmployees, updateDepartment } from '../../service/ErpService';
import Alert from 'react-s-alert';
import './update.css'


export class UpdateDepartment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.detail._id,
            departmentName: this.props.location.state.detail.departmentName,
            task: this.props.location.state.detail.task,
            allEmployees: [],
            selectedEmployees: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this)
    }

    componentDidMount(){
        viewEmployees().then((response)=>{
            this.setState({
                allEmployees: response.data
            })

            this.state.allEmployees.map(employee =>{
                if(employee.department===this.state.departmentName){
                    this.setState(prevState=>({
                        selectedEmployees: [...prevState.selectedEmployees, employee]
                        }))
                }
            })

        })
    }

    handleInputChange = (event) =>{
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    //When checkbox is checked, add the employee to selectedEmployees, remove when unchecked
    handleCheckChange = (event) => {
        const { value, checked } = event.target;

        const employee = this.state.allEmployees.find((emp) => emp.employeeId === value);
    
        // Update the selectedEmployees array based on checkbox changes
        this.setState((prevState) => {
          if (checked) {
            return { selectedEmployees: [...prevState.selectedEmployees, employee] }
          } else {
            return {
              selectedEmployees: prevState.selectedEmployees.filter(emp => emp !== employee
              )
            }
          }

        })
      }

    handleSubmit(event) {
        event.preventDefault();   

        const updateRequest = {
            departmentName: this.state.departmentName,
            task: this.state.task,
            employees: this.state.selectedEmployees

        }

        const id = this.state.id
        updateDepartment(updateRequest, id)
        .then(response => {
            Alert.success(response.successMessage);
            this.props.history.push("/departments");
        }).catch(err => {
            Alert.error((err && err.error) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        return (
            <div className='update-container container-fluid vh-100'>
                <div className='update-content'>
            <h1>Edit your department.</h1>

            <form onSubmit={this.handleSubmit}>

            <input type="hidden" name="departmentId" value={this.state.departmentId}/>
            <div className="form-item">
                    <label>Department Name</label>
                    <input type="text" name="departmentName" className="form-control"
                        value={this.state.departmentName} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Department Task</label>
                    <input type="text" name="departmentPurpose" className="form-control"
                        value={this.state.task} onChange={this.handleInputChange} required/>
                </div>

                <label>Department Employees</label>
                {this.state.allEmployees.map(employee=>

                       <div className="form-item">
                       <input type="checkbox" name="employees" value={employee.employeeId} 
                       onChange={this.handleCheckChange} checked={this.state.selectedEmployees.includes(employee)}/>
                       <label>{employee.employeeName}</label>
                       </div>
              
                    
                   )}
                
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Save</button>
                </div>
            </form> 
            </div>     
            </div>              

        );
    }
}

export default UpdateDepartment