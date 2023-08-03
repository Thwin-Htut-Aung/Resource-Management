import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
            <header className="app-header">
                <div className="container">
                    <div className="app-branding">
                        <Link to="/" className="app-title">HOME</Link>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                                { this.props.authenticated ? (
                                    <ul>
                                        <li>
                                            <NavLink to="/profile">PROFILE</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="employees">STAFF</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/instock">IN-STOCK</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/outstock">OUT-OF-STOCK</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/departments">DEPARTMENTS</NavLink>
                                        </li>
                                        {this.props.currentUser.role === 'Role_Admin' && 
                                        <li><NavLink to="/view-users">USERS</NavLink></li>}
                                        <li>
                                            <a onClick={this.props.onLogout}>LOGOUT</a>
                                        </li>
                                
                                    </ul>
                                ): (
                                    <ul>
                                        <li>
                                            <NavLink to="/login">LOGIN</NavLink>        
                                        </li>
                                        <li>
                                            <NavLink to="/signup">SIGNUP</NavLink>        
                                        </li>
                                    </ul>
                                )}
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;