import React, { useState, useEffect } from 'react'
import { deleteUser, viewUsers, changeRole } from '../../service/ErpService';
import '../resource/resources.css'
import Alert from 'react-s-alert'

const Users = (props) =>{
  
    const [users, setUsers] = useState([])

    useEffect(()=>{
      viewUsers()
        .then(response => {
          console.log("All users" + JSON.stringify(response))
          setUsers(response.data)
          })
        })

      const changeUserRole = (user) =>{
        changeRole(user).then(response=>{
          Alert.success(response.successMessage)
        }).catch(err=>{
          Alert.error(err && err.error)
        })
      }

      const deleteThisUser = (user) =>{
        deleteUser(user).then(response=>{
          Alert.success(response.successMessage)
        }).catch(err=>{
          Alert.error(err && err.error)
        })
      }


        return (
            <div className='container-fluid vh-100'>
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
                    users.map( user => 
                      <tr key={user._id}>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.role === 'Role_Admin' && 
                      <button className='btn btn-primary' onClick={() => changeUserRole(user)}>Make Employee</button>}
                      {user.role === 'Role_Employee' && 
                      <button className='btn btn-primary' onClick={() => changeUserRole(user)}>Make Admin</button>}
                      &nbsp;<button className='btn btn-primary' onClick={() => deleteThisUser(user)}>Delete</button>
                      </td>
                      </tr>
                    )
                  }
                  </tbody>
              </table>    
              </div>           

        )
    
}

export default Users