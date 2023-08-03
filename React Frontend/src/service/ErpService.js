import axios from 'axios';
export const API_BASE_URL = 'http://localhost:4000';
export const ACCESS_TOKEN = 'accessToken';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', localStorage.getItem(ACCESS_TOKEN))
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
        url: API_BASE_URL + "/jumpstart/user/current-user",
        method: 'GET'
    });
    //return axios.get(API_BASE_URL + '/online/user/me');
}

//Post Login User - Public Route
export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/user/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

//Post Register User - Public Route
export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/user/register",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

//Adding resources

export function addEmployee(addRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/resource/add-employee",
        method: 'POST',
        body: JSON.stringify(addRequest)
    });
}

export function addInstock(addRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/resource/add-instock",
        method: 'POST',
        body: JSON.stringify(addRequest)
    });
}

export function addOutstock(addRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/resource/add-outstock",
        method: 'POST',
        body: JSON.stringify(addRequest)
    });
}

export function addDepartment(addRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/resource/add-department",
        method: 'POST',
        body: JSON.stringify(addRequest)
    });
}

//Updating resources
export function updateEmployee(updateRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/resource/update-employee",
        method: 'PUT',
        body: JSON.stringify(updateRequest)
    });
}
export function updateDepartment(updateRequest, id) {
    return request({
        url: API_BASE_URL + "/jumpstart/resource/update-department?id="+id,
        method: 'PUT',
        body: JSON.stringify(updateRequest)
    });
}
export function updateInstock(updateRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/resource/update-instock",
        method: 'PUT',
        body: JSON.stringify(updateRequest)
    });
}
export function updateOutstock(updateRequest) {
    return request({
        url: API_BASE_URL + "/jumpstart/resource/update-outstock",
        method: 'PUT',
        body: JSON.stringify(updateRequest)
    });
}

//Deleting resources
export function deleteEmployee(employee) {
        return request({
        url: API_BASE_URL + "/jumpstart/resource/delete-employee?employeeId="+employee.employeeId,
        method: 'DELETE'
    });
}

export function deleteDepartment(department) {
        return request({
        url: API_BASE_URL + "/jumpstart/resource/delete-department?id="+department._id,
        method: 'DELETE'
    });
}

export function deleteInstock(product) {
        return request({
        url: API_BASE_URL + "/jumpstart/resource/delete-instock?id="+product._id,
        method: 'DELETE'
    });
}

export function deleteOutstock(product) {
        return request({
        url: API_BASE_URL + "/jumpstart/resource/delete-outstock?id="+product._id,
        method: 'POST'
    });
}

export function deleteUser(user) {
    return request({
    url: API_BASE_URL + "/jumpstart/user/delete-user?id="+user._id,
    method: 'DELETE'
});
}

export function changeRole(targetUser) {
        return request({
        url: API_BASE_URL + "/jumpstart/user/change-role",
        method: 'PUT',
        body: JSON.stringify(targetUser)
    });
}


//Viewing resources
export function viewEmployees(){
    return axios.get(API_BASE_URL + '/jumpstart/resource/all-employees');
}
export function viewDepartments(){
    return axios.get(API_BASE_URL + '/jumpstart/resource/all-departments');
}
export function viewInstock(){
    return axios.get(API_BASE_URL + '/jumpstart/resource/all-instock');
}
export function viewOutstock(){
    return axios.get(API_BASE_URL + '/jumpstart/resource/all-outstock');
}
export function viewUsers(){
    return axios.get(API_BASE_URL + '/jumpstart/user/all-users');
}

export function changeProductStatus(id, currentStatus) {
    return request({
    url: API_BASE_URL + "/jumpstart/resource/change-status?id="+id+"&currentStatus="+currentStatus,
    method: 'GET'
});
}

