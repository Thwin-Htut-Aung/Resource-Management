import React, { Component } from 'react';
import { updateFacil } from '../../service/ErpService';
import Alert from 'react-s-alert';
import './update.css'


export class AddFacil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            facilityName: '',
            facilityPurpose: '',
            facilityOperator: ''
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

        updateFacil(addRequest)
        .then(response => {
            Alert.success(response.successMessage);
            this.props.history.push("/facilities");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        return (
            <div className='update-container'>
                <div className='update-content'>
            <h1>Add a facility.</h1>

            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <label>Facility Name</label>
                    <input type="text" name="facilityName" className="form-control"
                        value={this.state.facilityName} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Facility Purpose</label>
                    <input type="text" name="facilityPurpose" className="form-control"
                        value={this.state.purpose} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Facility Operator</label>
                    <input type="text" name="facilityOperator" className="form-control"
                        value={this.state.operator} onChange={this.handleInputChange} required/>
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

export default AddFacil