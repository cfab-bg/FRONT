import config from 'config';
import { fetchWrapper } from '@/_helpers';
import axios from 'axios';

const baseUrl = `${config.apiUrl}/Employer`;

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {    
    return fetchWrapper.post(baseUrl, params );
    //return params
}

function update(id, params) {
    params.employerID = id
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
