import React, { Component } from 'react';
import { updateInstock } from '../../service/ErpService';
import Alert from 'react-s-alert';
import './update.css'

export class UpdateInstock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.detail._id,
            productName: this.props.location.state.detail.productName,
            productPrice: this.props.location.state.detail.productPrice,
            productQuantity: this.props.location.state.detail.productQuantity
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

        updateInstock(updateRequest)
        .then(response => {
            Alert.success(response.successMessage);
            this.props.history.push("/instock");
        }).catch(err => {
            Alert.error((err && err.error) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        return (
            <div className='update-container container-fluid vh-100'>
                <div className='update-content'>
            <h1>Edit your products.</h1>

            <form onSubmit={this.handleSubmit}>
             
            <input type="hidden" name="productId" value={this.state.productId}/>
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
                    <label>Product Quantity</label>
                    <input type="number" name="productQuantity" className="form-control"
                        value={this.state.productQuantity} onChange={this.handleInputChange} required/>
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

export default UpdateInstock