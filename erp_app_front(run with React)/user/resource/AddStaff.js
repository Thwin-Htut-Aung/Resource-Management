import React, { Component } from 'react';
import { updateEmployee } from '../../service/ErpService';
import Alert from 'react-s-alert';
import './update.css'


export class AddStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            employeeRole: '',
            employeeShift: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        const addRequest = Object.assign({}, this.state);

        updateEmployee(addRequest)
        .then(response => {
            Alert.success("You've successfully added the employee!");
            this.props.history.push("/employees");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        return (
            <div className='update-container'>
                <div className='update-content'>
            <h1>Add an employee.</h1>

            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <label>Employee Name</label>
                    <input type="text" name="employeeName" className="form-control"
                        value={this.state.employeeName} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Employee Role</label>
                    <input type="text" name="employeeRole" className="form-control"
                        value={this.state.employeeRole} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Employee Shift</label>
                    <input type="text" name="employeeShift" className="form-control"
                        value={this.state.employeeShift} onChange={this.handleInputChange} required/>
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