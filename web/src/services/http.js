/*const get = async (url) => {
    var data = {}
    await fetch(url)
        .then((response) => response.json())
        .then((dataJSON) => (data = dataJSON))
        .catch((error) => (data = { message: error, status: 500 }))

    return data
}

const post = async (url, body) => {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
    var data = {}
    await fetch(url, option)
        .then((response) => response.json())
        .then((dataJSON) => {
            data = dataJSON
        })
        .catch((error) => {
            data = { message: error, status: 500 }
        })
    return data
}

export { get, post }*/

import axios from 'axios'
import { history } from '.'

const baseURL = '/api'
const BEConfig = {
    baseURL,
    headers: {},
}

const handleStatusCodes = ({ data, status, ...rest }) => {
    switch (status) {
        case 400:
            return data
        case 401:
            //logout
            break
        case 403:
            return { error: 'forbidden' }
        case 404:
            history.push('/404')
            return
        case 500:
            console.error(`status ${status}: ${JSON.stringify(data)}`)
            return data
        case 504:
            return { message: 'Error al realizar la petición.', status }
        default:
            console.error(`status ${status}: ${JSON.stringify(data)}`)
            return { data, status, ...rest }
    }
}

const handleError = (error) => {
    if (error.response) {
        throw handleStatusCodes(error.response)
    }
    if (error.request) {
        console.error(error.request)
        throw new Error('The request was made but no response was received')
    }
    console.error('Error', error.message)
    console.error(error.config)
    throw new Error(
        'Something happened in setting up the request that triggered an Error'
    )
}

const addConfiguration = (params) => ({ ...BEConfig, ...params })

const processResponse = ({ data }) => data

const request = (config) =>
    axios.request(addConfiguration(config)).then(processResponse).catch(handleError)

export { request }
