import axios from 'axios'
import { Modal } from 'react-bootstrap'
const localStorage = window.localStorage

const hosted_api = () => {
    const url = window.location.href
    // starting on the 8th character after "http://" or "https://", find '/'
    const slash_loc = url.indexOf('/', 8)
    return url.substr(0, slash_loc + 1) + 'api'
}
const baseUrl = 'http://127.0.0.1:8001'
// const baseUrl = process.env.REACT_APP_API_URL || hosted_api()

const post = (endpoint, data, query_params) => {
    return axios.post(`${baseUrl}${endpoint}`, data, {
        params: query_params,
    })
}

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = `Bearer ${token}`
        config.headers.accept = 'application/json'
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response) => {
        return response
    },
    function (error) {
        const originalRequest = error ? error.config : null
        if (error.response && error.response.status === 422) {
            return Promise.accept(error)
        } else if (error.response && error.response.status === 401 && originalRequest.url.includes('/token')) {
            localStorage.removeItem('token')
        }

        return Promise.reject(error)
    }
)

const q = {
    isLoggedIn: () => localStorage.getItem('token') !== null,
    logout: () => {
        localStorage.removeItem('token')
    },
    login: ({ email, password }) => {
        console.log('username', email, 'password', password)
        const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
        const params = new URLSearchParams()
        params.append('username', email)
        params.append('password', password)
        return post('/token', params, config)
            .then((resp) => {
                console.log(resp)
                localStorage.setItem('token', resp.data.accessToken)
                return resp.data.accessToken != null
            })
            .catch((error) => {
                if (error === undefined) {
                    Modal.error({
                        title: 'Network or CORS error',
                        content: 'Please check browser console log',
                    })
                }
                return false
            })
    },
    getUsers: () => post('/random_data/list'),
}

export default q
