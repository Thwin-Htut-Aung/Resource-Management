import React, { Component } from 'react'
import { viewUsers } from '../../service/ErpService';
import { changeRole } from '../../service/ErpService';
import '../resource/resources.css'
import Alert from 'react-s-alert'

export class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount(){
        viewUsers()
        .then( (response) => {
          console.log("All users" + JSON.stringify(response))
          this.setState({
            users : response.data
          })
        })
      }

      changeUserRole = (user) =>{
        changeRole(user);
        Alert.success("The user role has been successfully altered.")
        window.location.reload()
      }

    render() {
        return (
            <div>
            <h1>All Users</h1>
            
                

                <table class="styled-table">
                  <thead>
                      <tr>
                          <th>USER NAME</th>
                          <th>USER EMAIL</th>
                          <th>USER ROLE</th>
                          <th>ACTION</th>
                      </tr>
                  </thead>
                  <tbody>
                    
                  {
                    this.state.users.map( user => 
                      <tr key={user.userId}>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.role === 'Role_Admin' && 
                      <button className='btn btn-primary' onClick={() => this.changeUserRole(user)}>Make User</button>}
                      {user.role === 'Role_User' && 
                      <button className='btn btn-primary' onClick={() => this.changeUserRole(user)}>Make Admin</button>}
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

export default Users