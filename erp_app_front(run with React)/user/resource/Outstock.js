import React, { Component } from 'react'
import { viewOutstock } from '../../service/ErpService'
import { deleteOutstock } from '../../service/ErpService'
import { NavLink } from 'react-router-dom'
import Alert from 'react-s-alert';
import './resources.css'

export class Outstock extends Component {
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
        viewOutstock()
        .then( (response) => {
          console.log("All stores by Component" + JSON.stringify(response))
          this.setState({
            products : response.data
          })
        })
      }

      //Update Button On Click
      updateOutstock = (product) =>{
        //Navigate to new route to render Update Component
          this.props.history.push({
            pathname: '/update-outstock',
            state: {detail: product}
          })
      }
    
      deleteOutstock = (product) =>{
        deleteOutstock(product);
        Alert.success('You have successfully deleted the product!');
      }


    render() {
        return (
            <div>
                <h1>OUT-OF-STOCK PRODUCTS</h1>

                <div className='btn btn-light'><NavLink to="/add-outstock">Add Product</NavLink></div>
    
            
                {/* HTML Table */}
                <table class="styled-table">
                  <thead>
                      <tr>
                          <th>PRODUCT NAME</th>
                          <th>PRICE</th>
                          <th>LAST IN STOCK</th>
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
                          <td>{product.productLastDate}</td>
                          <td><button className='btn btn-primary' onClick={() => this.updateOutstock(product)}>Edit</button><span> &nbsp;</span>
                          <span><button className='btn btn-primary' onClick={() => this.deleteOutstock(product)}>Delete</button></span>
                          </td>
                      </tr>
                    )
                  }
                  </tbody>
              </table>
              
            </div>
        )
    }
    
}

export default Outstock