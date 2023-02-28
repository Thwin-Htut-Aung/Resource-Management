import axios from 'axios';
export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

//Get Current User Profile - Private Route
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/jumpstart/user/me",
        method: 'GET'
    });
    //return axios.get(API_BASE_URL + '/online/user/me');
}

//Post Login User - Public Route
export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

//Post Register User - Public Route
export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/register",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

//Updating or adding resources
export function updateEmployee(updateRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/update-employee",
        method: 'POST',
        body: JSON.stringify(updateRequest)
    });
}
export function updateFacil(updateRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/update-facility",
        method: 'POST',
        body: JSON.stringify(updateRequest)
    });
}
export function updateInstock(updateRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/update-instock",
        method: 'POST',
        body: JSON.stringify(updateRequest)
    });
}
export function updateOutstock(updateRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/update-outstock",
        method: 'POST',
        body: JSON.stringify(updateRequest)
    });
}

//Deleting resources
export function deleteEmployee(deleteEmployee) {
    return request({
        url: API_BASE_URL + "/jumpstart/delete-employee",
        method: 'POST',
        body: JSON.stringify(deleteEmployee)
    });
}

export function deleteFacil(deleteFacility) {
    return request({
        url: API_BASE_URL + "/jumpstart/delete-facility",
        method: 'POST',
        body: JSON.stringify(deleteFacility)
    });
}

export function deleteInstock(deleteProduct) {
    return request({
        url: API_BASE_URL + "/jumpstart/delete-instock",
        method: 'POST',
        body: JSON.stringify(deleteProduct)
    });
}

export function deleteOutstock(deleteProduct) {
    return request({
        url: API_BASE_URL + "/jumpstart/delete-outstock",
        method: 'POST',
        body: JSON.stringify(deleteProduct)
    });
}


//Viewing resources
export function viewEmployees(){
    return axios.get(API_BASE_URL + '/jumpstart/view-employees');
}
export function viewFacil(){
    return axios.get(API_BASE_URL + '/jumpstart/view-facilities');
}
export function viewInstock(){
    return axios.get(API_BASE_URL + '/jumpstart/view-instock');
}
export function viewOutstock(){
    return axios.get(API_BASE_URL + '/jumpstart/view-outstock');
}


