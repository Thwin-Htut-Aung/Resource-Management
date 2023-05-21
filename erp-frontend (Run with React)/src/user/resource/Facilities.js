import React, { Component } from 'react'
import { viewFacil } from '../../service/ErpService'
import { deleteFacil } from '../../service/ErpService'
import { NavLink } from 'react-router-dom'
import Alert from 'react-s-alert';
import './resources.css'

export class Facilities extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           facilities : [],
        }
    }
    
      //Rendering data to the browser at the very first time
      componentDidMount(){
        //Call viewStores method to display all the stores from the database
        viewFacil()
        .then( (response) => {
          console.log("All employees by Component" + JSON.stringify(response))
          this.setState({
            facilities : response.data
          })
        })
      }
      
       //Update Button On Click
       updateFacil = (facility) =>{
        //Navigate to new route to render Update Component
        this.props.history.push({
          pathname: '/update-facility',
          state: {detail: facility}
        })
         
      }

      deleteFacil = (facility) =>{
        deleteFacil(facility);
        Alert.success('You have successfully deleted the facility!');
        window.location.reload()
      }
    
    render() {
        return (
            <div>
                <h1>FACILITIES</h1>
                
                {this.props.currentUser.role === 'Role_Admin' && 
                <div className='btn btn-light'><NavLink to="/add-facility">Add Facility</NavLink></div>}
                

                {/* HTML Table */}
                <table class="styled-table">
                  <thead>
                      <tr>
                          <th>FACILITY NAME</th>
                          <th>PURPOSE</th>
                          <th>OPERATOR</th>
                          {this.props.currentUser.role === 'Role_Admin' && 
                          <th>ACTION</th>}
                      </tr>
                  </thead>
                  <tbody>
                    {/* Retrieve all stores using map function */}
                  {
                    this.state.facilities.map( facility => 
                      <tr key={facility.facilityId}>
                          <td>{facility.facilityName}</td>
                          <td>{facility.facilityPurpose}</td>
                          <td>{facility.facilityOperator}</td>
                          {this.props.currentUser.role === 'Role_Admin' && 
                          <td><button className='btn btn-primary' onClick={() => this.updateFacil(facility)}>Edit</button><span> &nbsp;</span>
                          <span><button className='btn btn-primary' onClick={() => this.deleteFacil(facility)}>Delete</button></span></td>}
                          
                      </tr>
                    )
                  }
                  </tbody>
              </table>
              
            </div>
        )
    }
    
}

export default Facilities