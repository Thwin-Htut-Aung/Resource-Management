import React, { Component } from 'react';
import { addEmployee, viewDepartments } from '../../service/ErpService';
import Alert from 'react-s-alert';
import './update.css'


export class AddStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeId: '',
            employeeName: '',
            jobRole: '',
            department: '',
            departments: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        viewDepartments().then((response)=>{
            this.setState({
                departments: response.data
            })
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit(event) {
        event.preventDefault();   

        const addRequest = {
            employeeId: this.state.employeeId,
            employeeName: this.state.employeeName,
            jobRole: this.state.jobRole,
            department: this.state.department
        }

        addEmployee(addRequest)
        .then(response => {
            Alert.success(response.successMessage);
            this.props.history.push("/employees");
        }).catch(err => {
            Alert.error((err && err.error) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        return (
            <div className='update-container container-fluid vh-100'>
                <div className='update-content'>
            <h1>Add an employee.</h1>

            <form onSubmit={this.handleSubmit}>
            <div className="form-item">
                    <label>Employee ID</label>
                    <input type="text" name="employeeId" className="form-control"
                        value={this.state.employeeId} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Employee Name</label>
                    <input type="text" name="employeeName" className="form-control"
                        value={this.state.employeeName} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Employee Role</label>
                    <input type="text" name="jobRole" className="form-control"
                        value={this.state.jobRole} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Employee Department</label>
                    <select name='department' onChange={this.handleInputChange}>
                    {this.state.departments.map(department=>
                       <option value={department.departmentName}>{department.departmentName}</option>
                    )}
                    </select>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Save</button>
                </div>
            </form> 
            </div>    
            </div>               

        );
    }
}

export default AddStaff