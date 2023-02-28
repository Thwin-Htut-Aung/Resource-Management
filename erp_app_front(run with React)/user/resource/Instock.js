import React, { Component } from 'react'
import { viewInstock } from '../../service/ErpService'
import { deleteInstock } from '../../service/ErpService'
import { NavLink } from 'react-router-dom'
import './resources.css'
import Alert from 'react-s-alert';

export class Instock extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           products : [],
           keyword : ''
        }
    }
    
      //Rendering data to the browser at the very first time
      componentDidMount(){
        //Call viewStores method to display all the stores from the database
        viewInstock()
        .then( (response) => {
          console.log("All stores by Component" + JSON.stringify(response))
          this.setState({
            products : response.data
          })
        })
      }
    
      //Update Button On Click
      updateInstock = (product) =>{
        //Navigate to new route to render Update Component
          this.props.history.push({
            pathname: '/update-instock',
            state: {detail: product}
          })
      }
    
      deleteInstock = (product) =>{
        deleteInstock(product);
        Alert.success('You have successfully deleted the product!');
      }
      
    render() {
        return (
            <div>
                <h1>IN-STOCK PRODUCTS</h1>
    
                <div className='btn btn-light'><NavLink to="/add-instock">Add Product</NavLink></div>
                
                {/* HTML Table */}
                <table class="styled-table">
                  <thead>
                      <tr>
                          <th>PRODUCT NAME</th>
                          <th>PRICE</th>
                          <th>QUANTITY</th>
                          <th>ACTION</th>
                      </tr>
                  </thead>
                  <tbody>
                    {/* Retrieve all stores using map function */}
                  {
                    this.state.products.map( product => 
                      <tr key={product.productId}>
                          <td>{product.productName}</td>
                          <td>{product.productPrice}</td>
                          <td>{product.productQuantity}</td>
                          <td><button className='btn btn-primary' onClick={() => this.updateInstock(product)}>Edit</button><span> &nbsp;</span>
                          <span><button className='btn btn-primary' onClick={() => this.deleteInstock(product)}>Delete</button></span></td>
                      </tr>
                    )
                  }
                  </tbody>
              </table>
              
            </div>
        )
    }
    
}

export default Instock