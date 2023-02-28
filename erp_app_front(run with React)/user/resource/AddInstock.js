import React, { Component } from 'react';
import { updateInstock } from '../../service/ErpService';
import Alert from 'react-s-alert';
import './update.css'

export class AddInstock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productPrice: '',
            productQuantity: ''
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

        updateInstock(addRequest)
        .then(response => {
            Alert.success("You've successfully added the product");
            this.props.history.push("/instock");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        return (
            <div className='update-container'>
                <div className='update-content'>
            <h1>Add a product.</h1>

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

export default AddInstock