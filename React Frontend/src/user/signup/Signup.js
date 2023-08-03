import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom'
import { signup, viewDepartments } from '../../service/ErpService';
import Alert from 'react-s-alert';

export const API_BASE_URL = 'http://localhost:4000';


class Signup extends Component {
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="signup-container container-fluid vh-100">
                <div className="signup-content">
                    <h1 className="signup-title">Signup for Jumpstart Enterprise Resource Planning</h1>

                    <SignupForm {...this.props} />
                    <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                </div>
            </div>
        );
    }
}


//SignUp Form
class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            employeeId: '',
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

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
        .then(response => {
            Alert.success(response.successMessage);
            this.props.history.push("/login");
        }).catch(err => {
            Alert.error((err && err.error) || 'Oops! Something went wrong. Please try again!'); 
                      
        });
    }

    render() {
        return (
      
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="username" 
                        className="form-control" placeholder="Name"
                        value={this.state.username} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="email" name="email" 
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password" 
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>

                <div className="form-item">
                    <input type='text' name='employeeId' className='form-control' placeholder='Employee ID'
                    value={this.state.employeeId} onChange={this.handleInputChange} required/>
                </div>

                <div className="form-item">
                    <input type='text' name='jobRole' className='form-control' placeholder='Job Role'
                    value={this.state.jobRole} onChange={this.handleInputChange} required/>
                </div>

                <div className="form-item">
                    <select name='department' onChange={this.handleInputChange}>
                    {this.state.departments.map(department=>
                       <option value={department.departmentName}>{department.departmentName}</option>
                    )}
                    </select>
                </div>

                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Sign Up</button>
                </div>
            </form>             

        );
    }
}

export default Signup