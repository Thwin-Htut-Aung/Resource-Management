import React, { useState, useEffect } from 'react'
import { viewInstock, deleteInstock, changeProductStatus } from '../../service/ErpService'
import { NavLink } from 'react-router-dom'
import './resources.css'
import Alert from 'react-s-alert';

const Instock = (props) =>{
    
  const [products, setProducts] = useState([])
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
        //Call viewInstock method to display all the instock-products from the database
        useEffect(()=>{
          viewInstock()
            .then((response) => {
              console.log("All employees by Component" + JSON.stringify(response))
              setProducts(response.data)
            })
    
        })
    
      //Update Button On Click
      const updateProduct = (product) =>{
        //Navigate to new route to render Update Component
          props.history.push({
            pathname: '/update-instock',
            state: {detail: product}
          })
      }
    
      const deleteProduct = (product) =>{
        deleteInstock(product);
        Alert.success('You have successfully deleted the product!');
      }

      const changeStatus = (product) =>{
        changeProductStatus(product._id, 'instock').then(response=>{
          Alert.success(response.successMessage)
        }).catch(err=>{
          Alert.error(err.error)
        })
      }
      
        return (
            <div className='container-fluid vh-100'>
                <h1>IN-STOCK PRODUCTS</h1>
    
                {currentUser.role === 'Role_Admin' && 
                <div className='btn btn-light'><NavLink to="/add-instock">Add Product</NavLink></div>}
                
                {/* HTML Table */}
                <table className="styled-table">
                  <thead>
                      <tr>
                          <th>PRODUCT NAME</th>
                          <th>PRICE</th>
                          <th>QUANTITY</th>
                          {currentUser.role === 'Role_Admin' && 
                          <th>ACTION</th>}
                      </tr>
                  </thead>
                  <tbody>
                    {/* Retrieve all stores using map function */}
                  {
                    products.map( product => 
                      <tr key={product._id}>
                          <td>{product.productName}</td>
                          <td>{product.productPrice}</td>
                          <td>{product.productQuantity}</td>
                          {currentUser.role === 'Role_Admin' && 
                          <td><button className='btn btn-primary' onClick={() => updateProduct(product)}>Edit</button>
                          <span> &nbsp;<button className='btn btn-primary' onClick={() => deleteProduct(product)}>Delete</button></span>
                          <span> &nbsp;<button className='btn btn-primary' onClick={() => changeStatus(product)}>Add to Out-of-stock</button></span></td>}
                      </tr>
                    )
                  }
                  </tbody>
              </table>
              
            </div>
        )
    
    
}

export default Instock