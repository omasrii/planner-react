import axios, { AxiosRequestConfig } from 'axios'

export default class APIService {
  private host_url: string
  private options: AxiosRequestConfig = { headers: { 'Content-Type': 'application/json' } }

  constructor(host_url) {
    this.host_url = host_url
  }

  async get(path) {
    return await axios.get(`${this.host_url}/${path}`)
  }

  async post(path, body) {
    return await axios.post(`${this.host_url}/${path}`, body, this.options)
  }

  async put(path, body) {
    return await axios.put(`${this.host_url}/${path}`, body, this.options)
  }

  async del(path) {
    return await axios.put(`${this.host_url}/${path}`)
  }
}
