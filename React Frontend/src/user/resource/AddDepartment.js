import React, { Component } from 'react';
import { addDepartment } from '../../service/ErpService';
import Alert from 'react-s-alert';
import './update.css'


export class AddDepartment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            departmentName: '',
            task: ''
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

        addDepartment(addRequest)
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
            <h1>Add a department.</h1>

            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <label>Department Name</label>
                    <input type="text" name="departmentName" className="form-control"
                        value={this.state.departmentName} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Department Task</label>
                    <input type="text" name="task" className="form-control"
                        value={this.state.purpose} onChange={this.handleInputChange} required/>
                </div>

               
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Save</button>
                </div>
            </form> 
            </div>     
            </div>              

        );
    }
}

export default AddDepartment