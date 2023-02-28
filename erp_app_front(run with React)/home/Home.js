import React, { Component } from 'react';
import './Home.css';
import erp from '../img/erp img.jpg';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                    <h1 className="home-title">Jumpstart Enterprise Resource Planning</h1>
                    <div className="container">
                        
                        <img src={erp} alt="Online Store"></img>
                    </div>
            </div>
        )
    }
}

export default Home;