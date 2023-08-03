import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
        }
    }
    render() {
        return (
            <div className="profile-container">
                <div className="container-fluid vh-100">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            
                             
                                    <div className="text-avatar">
                                        <span>{this.state.currentUser.userName && this.state.currentUser.userName[0]}</span>
                                    </div></div><br></br>
                                
                          <div className="detail">
                          <h2>Full Name : {this.state.currentUser.userName}</h2>
                          </div><br></br><br></br>
                          <div className="detail">
                           <h2>Email Address : {this.state.currentUser.email}</h2>
                          </div>
                    </div></div></div>
            
        );
    }
}

export default Profile