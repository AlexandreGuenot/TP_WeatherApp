import { API_URL, API_KEY } from '../config'
import axios from 'axios'

class API {
    constructor() {

    }
    getCurrentWeather(query) {
        return axios.get(API_URL + 'current?access_key=' + API_KEY + '&query=' + query)
    }
}


const api = new API()

export default api;