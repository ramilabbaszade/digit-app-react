import { API_URL } from "@/constants";

const HEADERS = { 'Content-Type': 'application/json', lang: 'EN' };

export const post = async (url, data) => {
    const TOKEN = localStorage.getItem("@token")
    return fetch(`${API_URL}${url}`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            // headers: TOKEN ? { ...HEADERS, Authorization: 'Bearer ' + TOKEN } : HEADERS
        })
        .then(handleResponse)
        .catch(handleError)
}

export const put = async (url, data) => {
    const TOKEN = localStorage.getItem("@token")
    return fetch(`${API_URL}${url}`,
        {
            method: 'PUT',
            body: JSON.stringify(data),
            // headers: TOKEN ? { ...HEADERS, Authorization: 'Bearer ' + TOKEN } : HEADERS
            headers: HEADERS
        })
        .then(handleResponse)
        .catch(handleError)
}

export const del = async (url, data) => {
    const TOKEN = localStorage.getItem("@token")
    return fetch(`${API_URL}${url}`,
        {
            method: 'DELETE',
            body: JSON.stringify(data),
            // headers: TOKEN ? { ...HEADERS, Authorization: 'Bearer ' + TOKEN } : HEADERS
        })
        .then(handleResponse)
        .catch(handleError)
}

export const get = async (url) => {
    // const TOKEN = localStorage.getItem("@token")
    return fetch(`${API_URL}${url}`,
        {
            method: 'GET',
            // headers: TOKEN ? { ...HEADERS, Authorization: 'Bearer ' + TOKEN } : HEADERS
        })
        .then(handleResponse)
        .catch(handleError)
}

export const handleResponse = async response => {
    const data = await response.json();
    if (response.status === 401) window.location = '/'
    if (response.ok) {
        return data;
    }
    throw new Error('An error occurred.');
}

export const handleError = err => {
    console.error(err.message);
    throw err;
}