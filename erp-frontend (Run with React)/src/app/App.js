import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import AppHeader from './AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import NotFound from './NotFound';
import LoadingIndicator from './LoadingIndicator';
import { getCurrentUser } from '../service/ErpService';
import PrivateRoute from './PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import Staff from '../user/resource/Staff';
import Instock from '../user/resource/Instock';
import Facilities from '../user/resource/Facilities';
import Users from '../user/admin/Users';
import Outstock from '../user/resource/Outstock';
import UpdateStaff from '../user/resource/UpdateStaff';
import UpdateInstock from '../user/resource/UpdateInstock';
import UpdateFacil from '../user/resource/UpdateFacil';
import UpdateOutstock from '../user/resource/UpdateOutstock';
import AddStaff from '../user/resource/AddStaff';
import AddInstock from '../user/resource/AddInstock';
import AddFacil from '../user/resource/AddFacil';
import AddOutstock from '../user/resource/AddOutstock';
export const ACCESS_TOKEN = 'accessToken';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false,
      hasError: false
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      this.setState({
        loading: false
      });  
    });    
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }
    
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    
    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} currentUser={this.state.currentUser} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home}></Route>     
        
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Profile}></PrivateRoute>
            <PrivateRoute path="/employees" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Staff}></PrivateRoute>
              <PrivateRoute path="/instock" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Instock}></PrivateRoute>
              <PrivateRoute path="/outstock" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Outstock}></PrivateRoute>
              <PrivateRoute path="/facilities" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Facilities}></PrivateRoute>
              <PrivateRoute path="/view-users" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Users}></PrivateRoute>
              <PrivateRoute path="/add-employee" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={AddStaff}></PrivateRoute>
              <PrivateRoute path="/add-instock" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={AddInstock}></PrivateRoute>
              <PrivateRoute path="/add-outstock" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={AddOutstock}></PrivateRoute>
              <PrivateRoute path="/add-facility" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={AddFacil}></PrivateRoute>
              <PrivateRoute path="/update-employee" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={UpdateStaff}></PrivateRoute>
              <PrivateRoute path="/update-instock" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={UpdateInstock}></PrivateRoute>
              <PrivateRoute path="/update-outstock" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={UpdateOutstock}></PrivateRoute>
              <PrivateRoute path="/update-facility" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={UpdateFacil}></PrivateRoute>
            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route> 
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default App;
