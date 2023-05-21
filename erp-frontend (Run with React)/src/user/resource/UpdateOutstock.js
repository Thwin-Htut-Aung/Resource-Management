import React, { Component } from 'react';
import { updateOutstock } from '../../service/ErpService';
import Alert from 'react-s-alert';
import './update.css'

export class UpdateOutstock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.location.state.detail.productId,
            productName: this.props.location.state.detail.productName,
            productPrice: this.props.location.state.detail.productPrice,
            productLastDate: this.props.location.state.detail.productLastDate
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

        const updateRequest = Object.assign({}, this.state);

        updateOutstock(updateRequest)
        .then(response => {
            Alert.success(response.successMessage);
            this.props.history.push("/outstock");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        return (
            <div className='update-container'>
                <div className='update-content'>
            <h1>Edit your product.</h1>

            <form onSubmit={this.handleSubmit}>
            <div className="form-item">
                    <label>Product Name</label>
                    <input type="text" name="productName" className="form-control"
                        value={this.state.productName} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Product Price</label>
                    <input type="text" name="productPrice" className="form-control"
                        value={this.state.productPrice} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Product Last-in-stock Date</label>
                    <input type="text" name="productLastDate" className="form-control"
                        value={this.state.productLastDate} onChange={this.handleInputChange} required/>
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

export default UpdateOutstock