import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://10.3.10.142:3000'
});

export default instance